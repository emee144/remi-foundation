"use client";

import { useState, useEffect } from "react";
import { User, Camera } from "lucide-react";

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  
useEffect(() => {
  const token = localStorage.getItem("token");
  if (!token) return;

  const fetchProfile = async () => {
    try {
      const res = await fetch("/api/profile", {
        method: "GET", // ✅ FIXED
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch profile");
      const data = await res.json();
      setProfile(data);
      setProfilePicture(data.profilePicture || null); // ✅ use DB picture
    } catch (err) {
      console.error(err);
    }
  };

  fetchProfile();
}, []);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64 = reader.result;
      setPreview(base64); // for animation
      setLoading(true);

      try {
        const token = localStorage.getItem("token");
        const res = await fetch("/api/profile/picture", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ profilePicture: base64 }),
        });

        if (!res.ok) throw new Error("Failed to upload profile picture");

        const data = await res.json();
        setProfilePicture(data.profilePicture); // ✅ saved in DB
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  if (!profile) {
    return <p className="text-center mt-20 text-gray-500">Loading profile...</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 to-gray-50 flex flex-col items-center px-4 pt-12">
      <h1 className="text-4xl font-extrabold text-green-700 mb-8">My Profile</h1>

      <div className="flex flex-col items-center gap-8 bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg">
        {/* Profile Picture */}
        <div className="relative w-36 h-36 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center border-4 border-green-200 shadow-md">
          {profilePicture ? (
            <img
              key={preview || profilePicture} // ensures re-render on change
              src={preview || profilePicture}
              alt="Profile"
              className="w-full h-full object-cover transform transition-all duration-700 ease-in-out opacity-0 scale-90 animate-fadeIn"
            />
          ) : (
            <User className="w-20 h-20 text-gray-400" />
          )}

          {/* Camera Icon overlay */}
          <label className="absolute bottom-2 right-2 bg-green-500 p-2 rounded-full cursor-pointer hover:bg-green-600 transition">
            <Camera className="w-5 h-5 text-white" />
            <input
              type="file"
              accept="image/*"
              onChange={handleUpload}
              className="hidden"
            />
          </label>
        </div>

        {loading && <p className="text-green-600 text-sm">Uploading...</p>}

        {/* Profile Info */}
        <div className="grid grid-cols-1 gap-4 w-full">
          {[
            ["ID", profile.id],
            ["Created", new Date(profile.createdAt).toLocaleDateString()],
            ["Email", profile.email],
            ["Name", `${profile.surname} ${profile.otherNames}`],
            ["Phone", profile.phone],
            ["Occupation", profile.occupation],
            ["Address", profile.address],
            ["NIN", profile.nin],
          ].map(([label, value], i) => (
            <div
              key={i}
              className="p-4 rounded-xl shadow hover:shadow-lg transition bg-green-50"
            >
              <p className="text-gray-700 font-medium">{label}</p>
              <p className="text-gray-900 font-semibold">{value}</p>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .animate-fadeIn {
          opacity: 1 !important;
          transform: scale(1) !important;
          transition: all 0.7s ease-in-out;
        }
      `}</style>
    </div>
  );
}