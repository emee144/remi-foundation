"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";

function PasswordInput({ value, setValue, placeholder, autoComplete }) {
  const [show, setShow] = useState(false);
  const inputRef = useRef(null);

  const toggleShow = () => {
    setShow(!show);
    setTimeout(() => inputRef.current?.focus(), 10); // keep cursor in input
  };

  return (
    <div className="relative">
      <input
        ref={inputRef}
        type={show ? "text" : "password"}
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        autoComplete={autoComplete}
        className="p-3 border rounded-lg w-full pr-10 focus:outline-none focus:ring-2 focus:ring-orange-400"
      />
      <button
        type="button"
        onClick={toggleShow}
        className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
      >
        {show ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
      </button>
    </div>
  );
}

export default function SettingsPage() {
  const router = useRouter();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleUpdate = async () => {
    if (newPassword !== confirmPassword) {
      setMessage("New passwords do not match");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await fetch("/api/settings/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ oldPassword, newPassword }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to update password");

      setMessage("Password updated successfully!");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start px-4 py-12 bg-gray-50">
      {/* Foundation heading + logo */}
      <div className="flex flex-col items-center mb-8">
        <Image
          src="/remilogo.jpeg"
          alt="Remi Oseni Foundation Logo"
          width={80}
          height={80}
          className="rounded-full mb-3"
        />
        <h2 className="text-2xl font-bold text-gray-800">Remi Oseni Foundation</h2>
      </div>

      <h1 className="text-4xl font-extrabold text-orange-600 mb-8">Settings</h1>

      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        {message && (
          <p className="mb-4 text-center text-red-500 font-medium">{message}</p>
        )}
        <div className="flex flex-col gap-4">
          <PasswordInput
            value={oldPassword}
            setValue={setOldPassword}
            placeholder="Old Password"
            autoComplete="current-password"
          />
          <PasswordInput
            value={newPassword}
            setValue={setNewPassword}
            placeholder="New Password"
            autoComplete="new-password"
          />
          <PasswordInput
            value={confirmPassword}
            setValue={setConfirmPassword}
            placeholder="Confirm New Password"
            autoComplete="new-password"
          />
          <button
            onClick={handleUpdate}
            className="bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition"
          >
            Update Password
          </button>
        </div>
      </div>
    </div>
  );
}
