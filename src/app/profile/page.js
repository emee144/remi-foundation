"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ProfilePage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      // Example API call: GET /api/profile
      const res = await fetch("/api/profile");
      const data = await res.json();
      setUser(data);
    }
    fetchUser();
  }, []);

  if (!user) {
    return <p className="text-center text-gray-500">Loading profile...</p>;
  }

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      {/* Profile Header */}
      <Card className="flex items-center gap-4 p-4 shadow-lg">
        <Image
          src={user.profilePicture || "/default-avatar.png"} // fallback if missing
          alt="Profile Picture"
          width={80}
          height={80}
          className="rounded-full object-cover"
        />
        <div>
          <h2 className="text-xl font-semibold">{user.name}</h2>
          <p className="text-gray-500">{user.email}</p>
        </div>
      </Card>

      {/* Contact Info */}
      <Card>
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold mb-2">Contact Information</h3>
          <p>📞 {user.phone || "No phone added"}</p>
          <p>📍 {user.address || "No address set"}</p>
        </CardContent>
      </Card>

      {/* Bio / About */}
      <Card>
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold mb-2">About</h3>
          <p>{user.bio || "No bio available"}</p>
        </CardContent>
      </Card>

      {/* Edit Button */}
      <div className="text-center">
        <Button>Edit Profile</Button>
      </div>
    </div>
  );
}
