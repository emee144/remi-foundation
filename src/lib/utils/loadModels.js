"use client";
import { useEffect, useRef, useState } from "react";

let faceapi;
async function loadFaceApi() {
  if (!faceapi) {
    faceapi = await import("face-api.js");
  }
  return faceapi;
}

export async function loadModels() {
  const faceapi = await loadFaceApi();
  const MODEL_URL = "/models";

  await Promise.all([
    faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL + "/ssd_mobilenetv1_model"),
    faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL + "/face_landmark_68_model"),
    faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL + "/face_recognition_model"),
  ]);
}
