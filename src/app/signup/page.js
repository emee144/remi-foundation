'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';

const oyoLGAs = [
  "Afijio", "Akinyele", "Atiba", "Atisbo", "Egbeda", "Ibadan North",
  "Ibadan North-East", "Ibadan North-West", "Ibadan South-East",
  "Ibadan South-West", "Ibarapa Central", "Ibarapa East", "Ibarapa North",
  "Ido", "Irepo", "Iseyin", "Itesiwaju", "Iwajowa", "Kajola", "Lagelu",
  "Ogbomosho North", "Ogbomosho South", "Ogo Oluwa", "Olorunsogo",
  "Oluyole", "Ona Ara", "Orelope", "Ori Ire", "Oyo East", "Oyo West",
  "Saki East", "Saki West", "Surulere"
];

const ageRanges = ["21-40", "41-60", "Above 61"];

export default function SignupForm() {
  const [form, setForm] = useState({
    nin: '',
    surname: '',
    otherNames: '',
    address: '',
    lga: '',
    phone: '',
    gender: 'male',
    ageRange: '',
    occupation: '',
    email: '',
    password: '',
  });

  const [photo, setPhoto] = useState(null); // NEW
  const [qrCode, setQrCode] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if ((name === 'nin' || name === 'phone') && !/^\d*$/.test(value)) return;
    if ((name === 'nin' || name === 'phone') && value.length > 11) return;
    setForm({ ...form, [name]: value });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) setPhoto(file);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!photo) {
      setError('Photo is required.');
      setLoading(false);
      return;
    }

    if (form.nin.length !== 11) {
      setError('NIN must be exactly 11 digits.');
      setLoading(false);
      return;
    }

    if (form.phone.length !== 11) {
      setError('Phone number must be exactly 11 digits.');
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => formData.append(key, value));
      formData.append('photo', photo);

      const res = await fetch('/api/signup', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setQrCode(data.qrCode);

        setTimeout(() => {
          window.location.href = '/login';
        }, 2000);
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Signup failed. Try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 via-green-300 to-yellow-300 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 120 }}
        className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md"
      >
        <div className="flex flex-col items-center mb-6">
          <img src="/remilogo.jpeg" alt="Remi Foundation Logo" className="w-24 h-24 mb-2 rounded-full shadow-lg" />
          <h2 className="text-3xl font-bold text-green-900">Remi Foundation</h2>
        </div>

        <form onSubmit={handleSignup} className="space-y-4" encType="multipart/form-data">
          <input type="text" name="nin" placeholder="NIN (11 digits)" value={form.nin} onChange={handleChange} required
            className="w-full p-3 rounded-xl border-2 border-green-400 focus:outline-none focus:border-yellow-500 transition-colors" />
          <input type="text" name="phone" placeholder="Phone (11 digits)" value={form.phone} onChange={handleChange} required
            className="w-full p-3 rounded-xl border-2 border-green-400 focus:outline-none focus:border-yellow-500 transition-colors" />

          {['surname','otherNames','address','occupation','email'].map(field => (
            <input key={field} type="text" name={field} placeholder={field} value={form[field]} onChange={handleChange} required
              className="w-full p-3 rounded-xl border-2 border-green-400 focus:outline-none focus:border-yellow-500 transition-colors" />
          ))}

          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-xl border-2 border-green-400 focus:outline-none focus:border-yellow-500 transition-colors pr-12"
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <select name="gender" value={form.gender} onChange={handleChange} required
            className="w-full p-3 rounded-xl border-2 border-green-400 focus:outline-none focus:border-yellow-500 transition-colors">
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>

          <select name="ageRange" value={form.ageRange} onChange={handleChange} required
            className="w-full p-3 rounded-xl border-2 border-green-400 focus:outline-none focus:border-yellow-500 transition-colors">
            <option value="">Select Age Range</option>
            {ageRanges.map(range => <option key={range} value={range}>{range}</option>)}
          </select>

          <select name="lga" value={form.lga} onChange={handleChange} required
            className="w-full p-3 rounded-xl border-2 border-green-400 focus:outline-none focus:border-yellow-500 transition-colors">
            <option value="">Select LGA</option>
            {oyoLGAs.map(lga => <option key={lga} value={lga}>{lga}</option>)}
          </select>

          {/* Photo Upload */}
          <div>
            <label className="block mb-1 font-semibold text-green-900">Upload Photo</label>
            <input type="file" accept="image/*" onChange={handlePhotoChange} required
              className="w-full p-2 rounded-xl border-2 border-green-400 focus:outline-none focus:border-yellow-500 transition-colors" />
          </div>

          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            type="submit" disabled={loading}
            className="w-full bg-green-500 hover:bg-yellow-400 text-white font-bold py-3 rounded-xl shadow-lg transition-colors">
            {loading ? 'Signing up...' : 'Signup'}
          </motion.button>
        </form>

        {error && <p className="mt-4 text-red-600 font-semibold">{error}</p>}

        {qrCode && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="mt-6 text-center">
            <h3 className="text-xl font-bold text-green-900 mb-2">Your QR Code</h3>
            <img src={qrCode} alt="Your QR code" className="mx-auto w-48 h-48 rounded-xl shadow-lg" />
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
