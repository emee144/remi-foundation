"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { loadModels } from "@/lib/utils/loadModels";

export default function Signup() {
  const router = useRouter();

  const [form, setForm] = useState({
    nin: "",
    surname: "",
    otherNames: "",
    address: "",
    lga: "",
    phone: "",
    gender: "",
    ageRange: "",
    occupation: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [faceCaptured, setFaceCaptured] = useState(false);
  const [faceData, setFaceData] = useState(null);
  const [isDuplicateFace, setIsDuplicateFace] = useState(false); // ✅ track duplicates

  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // Load face-api models
  useEffect(() => {
    async function init() {
      await loadModels();
      setModelsLoaded(true);
      startVideo();
    }
    init();
  }, []);

  const startVideo = () => {
    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then(stream => {
          if (videoRef.current) videoRef.current.srcObject = stream;
        })
        .catch(err => console.error("Webcam error:", err));
    }
  };

  // Face capture & duplicate check
  useEffect(() => {
    if (!modelsLoaded) return;
    let interval;

    const runFaceDetection = async () => {
      if (!videoRef.current || faceCaptured) return;

      const faceapi = await import("face-api.js");
      const detection = await faceapi
        .detectSingleFace(videoRef.current, new faceapi.SsdMobilenetv1Options())
        .withFaceLandmarks()
        .withFaceDescriptor();

      if (detection) {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

        const descriptorArray = Array.from(detection.descriptor);

        try {
          const res = await fetch("/api/compare-face", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ descriptor: descriptorArray }),
          });
          const data = await res.json();

          if (data.exists) {
            setMessage("A user with this face already exists. Cannot register again.");
            setFaceCaptured(false);
            setFaceData(null);
            setIsDuplicateFace(true); // ✅ mark duplicate
            return;
          } else {
            setIsDuplicateFace(false); // ✅ face is new
          }
        } catch (err) {
          console.error("Face comparison error:", err);
        }

        setFaceCaptured(true);
        setFaceData({ descriptor: descriptorArray, image: canvas.toDataURL("image/jpeg") });
      }
    };

    interval = setInterval(runFaceDetection, 1000);
    return () => clearInterval(interval);
  }, [modelsLoaded, faceCaptured]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "nin" || name === "phone") {
      setForm({ ...form, [name]: value.replace(/\D/g, "").slice(0, 11) });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (!faceCaptured || !faceData) {
      setMessage("Please ensure your face is visible to the camera.");
      setLoading(false);
      return;
    }

    if (isDuplicateFace) {
      setMessage("Cannot submit: face already registered.");
      setLoading(false);
      return;
    }

    const payload = { ...form, faceDescriptor: faceData.descriptor };

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (res.ok) {
        router.push("/login");
      } else {
        setMessage(data.error || "Signup failed.");
      }
    } catch (err) {
      console.error(err);
      setMessage("Server error. Try later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex justify-center items-center bg-gray-50 p-6">
      <form onSubmit={handleSubmit} className="bg-white p-10 rounded-2xl shadow-xl max-w-lg w-full space-y-6 relative">
        <img src="/remilogo.jpeg" alt="Logo" className="w-20 h-20 mx-auto mb-4 object-contain" />
        <h1 className="text-3xl font-extrabold text-center text-gray-900">Sign Up</h1>

        {/* Webcam */}
        <div className="flex flex-col items-center">
          <video ref={videoRef} autoPlay muted playsInline className="w-64 h-48 rounded-lg border" />
          <canvas ref={canvasRef} className="hidden" />
          {faceCaptured ? (
            <p className="text-green-600 font-semibold mt-2">Face captured ✔️</p>
          ) : (
            <p className="text-gray-500 mt-2">Ensure your face is visible</p>
          )}
        </div>

        {/* Form fields */}
        {[
          { name: "nin", placeholder: "NIN (11 digits max)" },
          { name: "surname", placeholder: "Surname" },
          { name: "otherNames", placeholder: "Other Names" },
          { name: "address", placeholder: "Address" },
          { name: "lga", placeholder: "LGA" },
          { name: "phone", placeholder: "Phone Number", type: "tel" },
          { name: "email", placeholder: "Email", type: "email" },
          { name: "occupation", placeholder: "Occupation" },
        ].map((field) => (
          <input
            key={field.name}
            type={field.type || "text"}
            name={field.name}
            placeholder={field.placeholder}
            value={form[field.name]}
            onChange={handleChange}
            maxLength={field.name === "nin" || field.name === "phone" ? 11 : undefined}
            className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 placeholder-gray-500 text-gray-900"
            required
          />
        ))}

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 placeholder-gray-500 text-gray-900"
            required
          />
          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-3 flex items-center text-gray-500">
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <select name="gender" value={form.gender} onChange={handleChange} className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-gray-900" required>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <select name="ageRange" value={form.ageRange} onChange={handleChange} className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-gray-900" required>
          <option value="">Select Age Range</option>
          <option value="25-40">25-40</option>
          <option value="41-60">41-60</option>
          <option value="61+">61+</option>
        </select>

        <button type="submit" disabled={loading || !faceCaptured || isDuplicateFace} className="w-full bg-gradient-to-r from-yellow-400 to-green-500 text-white p-4 rounded-lg font-bold hover:opacity-90 transition">
          {loading ? "Signing up..." : "Signup"}
        </button>

        {message && <p className="text-center mt-2 text-red-600">{message}</p>}

        <p className="text-center text-gray-600">
          Already registered?{" "}
          <Link href="/login" className="text-yellow-500 font-semibold hover:underline">Login</Link>
        </p>
      </form>
    </main>
  );
}
