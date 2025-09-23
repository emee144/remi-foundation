import { Sequelize, DataTypes } from "sequelize";
import QRCode from "qrcode";
import sharp from "sharp";
import fs from "fs";
import path from "path";

// 🎯 Railway credentials
const sequelize = new Sequelize("remiosen_remi", "root", "pNGPnrzripHsAMOtUoVetjrLssmYkiSy", {
  host: "centerbeam.proxy.rlwy.net",
  port: 23216,
  dialect: "mysql",
  logging: console.log,
});

// Define User model (matches your database table)
const User = sequelize.define("User", {
  email: { type: DataTypes.STRING },
  nin: { type: DataTypes.STRING },
  surname: { type: DataTypes.STRING },
  otherNames: { type: DataTypes.STRING },
  profilePicture: { type: DataTypes.BLOB("long") },
  qrCode: { type: DataTypes.TEXT("long") },
}, { tableName: "users", timestamps: true });

async function backfillQR() {
  try {
    await sequelize.authenticate();
    console.log("✅ Connected to Railway MySQL successfully.");

    const users = await User.findAll({ where: { qrCode: null } });
    console.log(`Found ${users.length} users without QR code.`);

    for (const user of users) {
      // QR text with Remi Oseni Foundation header
      const qrText = `Remi Oseni Foundation\n${user.surname} ${user.otherNames} | NIN: ${user.nin}`;

      // Generate QR buffer
      const qrBuffer = await QRCode.toBuffer(qrText, { errorCorrectionLevel: "H", width: 400, margin: 2 });

      // Embed profile picture if exists
      let finalQRBuffer = qrBuffer;
      if (user.profilePicture) {
        const profilePicPath = path.join("/tmp", `user_${user.id}.png`);
        fs.writeFileSync(profilePicPath, user.profilePicture);

        const finalPath = path.join("/tmp", `qr_${user.id}.png`);
        await sharp(qrBuffer)
          .composite([{ input: profilePicPath, gravity: "center" }])
          .png()
          .toFile(finalPath);

        finalQRBuffer = fs.readFileSync(finalPath);
      }

      // Save QR to DB as base64
      const qrDataUrl = `data:image/png;base64,${finalQRBuffer.toString("base64")}`;
      user.qrCode = qrDataUrl;
      await user.save();
      console.log(`✅ QR code generated for ${user.email}`);
    }

    console.log("All missing QR codes have been backfilled.");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error:", err);
    process.exit(1);
  }
}

backfillQR();
