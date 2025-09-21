'use client';

import { useRef, useEffect, useState } from 'react';
import * as faceapi from '@vladmandic/face-api';

export default function FaceCapture() {
  const videoRef = useRef(null);
  const [initialized, setInitialized] = useState(false);

  // Load models
  useEffect(() => {
    const loadModels = async () => {
      await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
      await faceapi.nets.faceRecognitionNet.loadFromUri('/models');
      await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
      setInitialized(true);
    };
    loadModels();
  }, []);

  // Start webcam
  useEffect(() => {
    if (initialized && videoRef.current) {
      navigator.mediaDevices
        .getUserMedia({ video: {} })
        .then((stream) => {
          videoRef.current.srcObject = stream;
        })
        .catch((err) => console.error('Error accessing webcam:', err));
    }
  }, [initialized]);

  // Detect face on button click
  const handleCapture = async () => {
    if (!videoRef.current) return;

    const detections = await faceapi
      .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceDescriptors();

    console.log('Detections:', detections);
    // You can now store descriptors to check for duplicates or verification
  };

  return (
    <div>
      <h2>Face Capture</h2>
      <video ref={videoRef} autoPlay muted width={320} height={240} />
      <button onClick={handleCapture}>Capture Face</button>
    </div>
  );
}
