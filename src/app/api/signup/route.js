import { NextResponse } from 'next/server';
import QRCode from 'qrcode';
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { User } from '@/lib/models/User';

export async function POST(req) {
  try {
    console.log('--- Signup request received ---');
    const formData = await req.formData();

    const data = {
      nin: formData.get('nin'),
      surname: formData.get('surname'),
      otherNames: formData.get('otherNames'),
      address: formData.get('address'),
      lga: formData.get('lga'),
      phone: formData.get('phone'),
      gender: formData.get('gender'),
      ageRange: formData.get('ageRange'),
      occupation: formData.get('occupation'),
      email: formData.get('email'),
      password: formData.get('password'),
    };

    const photoFile = formData.get('photo');
    console.log('Received photo:', photoFile?.name);

    let photoBuffer = null;
    if (photoFile) {
      photoBuffer = Buffer.from(await photoFile.arrayBuffer());
    }

    // 1️⃣ Create user first
    const user = await User.create({
      ...data,
      profilePicture: photoBuffer,
    });
    console.log(`User created with ID: ${user.id}`);

    // 2️⃣ Generate QR code with user info
    const qrBuffer = await QRCode.toBuffer(
      `${data.surname} ${data.otherNames} | NIN: ${data.nin}`,
      { type: 'png', errorCorrectionLevel: 'H', margin: 2, width: 400 }
    );

    // 3️⃣ Resize photo for QR overlay
    const profilePicPath = path.join('/tmp', `profile_${Date.now()}.png`);
    if (photoBuffer) await sharp(photoBuffer).resize(120, 120).png().toFile(profilePicPath);

    // 4️⃣ Overlay profile picture in center
    let qrWithPic = await sharp(qrBuffer)
      .composite([{ input: profilePicPath, gravity: 'center' }])
      .png()
      .toBuffer();

    // 5️⃣ Add "Remioseni Foundation" text at top
    qrWithPic = await sharp(qrWithPic)
      .extend({
        top: 50,
        background: { r: 255, g: 255, b: 255, alpha: 1 },
      })
      .composite([{
        input: Buffer.from(
          `<svg width="400" height="50">
            <text x="50%" y="50%" font-size="24" text-anchor="middle" fill="green" font-family="Arial">Remioseni Foundation</text>
          </svg>`
        ),
        top: 0,
        left: 0,
      }])
      .png()
      .toBuffer();

    const qrCodeDataUrl = `data:image/png;base64,${qrWithPic.toString('base64')}`;

    // 6️⃣ Save QR code to user in DB
    user.qrCode = qrCodeDataUrl;
    await user.save();
    console.log('✅ QR code saved successfully for user:', user.email);

    return NextResponse.json({ qrCode: qrCodeDataUrl });
  } catch (err) {
    console.error('❌ Signup error:', err);
    return NextResponse.json({ error: 'Signup failed. Check server logs.' }, { status: 500 });
  }
}
