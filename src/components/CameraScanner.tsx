'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Camera,
  RefreshCw,
  X,
  Upload,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  SwitchCamera,
  ShieldCheck,
  Smartphone,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface CameraScannerProps {
  isOpen: boolean;
  onClose: () => void;
  onPhotoCaptured: (photoDataUrl: string) => void;
}

export function CameraScanner({ isOpen, onClose, onPhotoCaptured }: CameraScannerProps) {
  const { language } = useLanguage();
  const isTe = language === 'te';

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [qualityWarning, setQualityWarning] = useState<string | null>(null);

  // Safely stop video tracks
  const stopCameraStream = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => {
        try {
          track.stop();
        } catch {
          // ignore
        }
      });
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsStreaming(false);
  }, []);

  // Start video stream with fallback constraint ladder
  const startCameraStream = useCallback(async () => {
    setCameraError(null);
    setCapturedImage(null);
    setQualityWarning(null);
    stopCameraStream();

    if (typeof window === 'undefined') return;

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setCameraError(
        isTe
          ? 'కెమెరా అందుబాటులో లేదు. దయచేసి కెమెరా అనుమతిని ఇవ్వండి లేదా ఫోటోను అప్‌లోడ్ చేయండి.'
          : 'Camera access is unavailable. Please allow camera permission or upload an image.'
      );
      return;
    }

    let stream: MediaStream | null = null;

    // Constraint 1: Ideal back camera
    try {
      stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: facingMode },
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      });
    } catch (err1) {
      console.warn('Initial camera constraint failed, trying basic video constraint:', err1);
      // Constraint 2: Basic video fallback
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        });
      } catch (err2: any) {
        console.warn('All WebRTC video constraints failed:', err2);
        setCameraError(
          isTe
            ? 'కెమెరా అందుబాటులో లేదు. దయచేసి కెమెరా అనుమతిని ఇవ్వండి లేదా ఫోటోను అప్‌లోడ్ చేయండి.'
            : 'Camera access is unavailable. Please allow camera permission or upload an image.'
        );
        return;
      }
    }

    if (stream && videoRef.current) {
      streamRef.current = stream;
      videoRef.current.srcObject = stream;
      try {
        await videoRef.current.play();
        setIsStreaming(true);
      } catch (playErr) {
        console.warn('Video play interrupted:', playErr);
        setIsStreaming(true);
      }
    }
  }, [facingMode, isTe, stopCameraStream]);

  useEffect(() => {
    if (isOpen && !capturedImage) {
      startCameraStream();
    } else {
      stopCameraStream();
    }

    return () => {
      stopCameraStream();
    };
  }, [isOpen, startCameraStream, stopCameraStream, capturedImage]);

  // Flip camera (Back vs Front)
  const handleToggleCamera = () => {
    setFacingMode((prev) => (prev === 'environment' ? 'user' : 'environment'));
  };

  // Capture Snapshot
  const handleCaptureSnapshot = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/jpeg', 0.92);

    // Brightness check
    try {
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      let totalBrightness = 0;
      const data = imgData.data;
      for (let i = 0; i < data.length; i += 40) {
        totalBrightness += (data[i] + data[i + 1] + data[i + 2]) / 3;
      }
      const avgBrightness = totalBrightness / (data.length / 40);

      if (avgBrightness < 35) {
        setQualityWarning(
          isTe
            ? 'వెలుతురు చాలా తక్కువగా ఉంది. ఆకు స్పష్టంగా కనిపించేలా మరింత వెలుతురులో ఫోటో తీయండి.'
            : 'Low lighting detected. For accurate AI diagnosis, ensure the leaf is well lit.'
        );
      } else {
        setQualityWarning(null);
      }
    } catch {
      // ignore
    }

    setCapturedImage(dataUrl);
    stopCameraStream();
  };

  // Retake
  const handleRetake = () => {
    setCapturedImage(null);
    setQualityWarning(null);
    startCameraStream();
  };

  // Confirm and Use Photo
  const handleUsePhoto = () => {
    if (capturedImage) {
      onPhotoCaptured(capturedImage);
      onClose();
    }
  };

  // Native Device Camera or File Upload Fallback with Strict Validation
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 1. Validate File Format
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/heic', 'image/heif'];
    const hasValidExt = file.name.match(/\.(jpg|jpeg|png|webp|heic)$/i);
    if (!validTypes.includes(file.type.toLowerCase()) && !hasValidExt) {
      setCameraError(
        isTe
          ? 'చెల్లని ఫైల్ ఫార్మాట్. దయచేసి JPG, PNG లేదా WebP పంట ఆకు ఫోటోను ఎంచుకోండి.'
          : 'Unsupported image format. Please upload a JPEG, PNG, or WebP crop image.'
      );
      return;
    }

    // 2. Validate File Size (Min 500 B, Max 15 MB)
    const MAX_SIZE = 15 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      setCameraError(
        isTe
          ? 'ఫోటో పరిమాణం 15MB కంటే ఎక్కువగా ఉంది. దయచేసి చిన్న ఫోటోను అప్‌లోడ్ చేయండి.'
          : 'File size exceeds 15MB limit. Please upload a compressed or smaller crop photo.'
      );
      return;
    }
    if (file.size < 500) {
      setCameraError(
        isTe
          ? 'ఎంచుకున్న ఫైల్ ఖాళీగా లేదా దెబ్బతిన్నట్లుంది. దయచేసి సరైన ఫోటోను ఎంచుకోండి.'
          : 'Selected file appears corrupted or empty. Please select a valid photo.'
      );
      return;
    }

    // 3. Validate Dimensions and Image Integrity
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const img = new window.Image();
      img.onload = () => {
        if (img.naturalWidth < 50 || img.naturalHeight < 50) {
          setCameraError(
            isTe
              ? 'ఫోటో రిజల్యూషన్ చాలా తక్కువగా ఉంది (కనీసం 50x50 పిక్సెల్స్ ఉండాలి).'
              : 'Image dimensions are too low for crop diagnosis (minimum 50x50 pixels).'
          );
          return;
        }
        setCameraError(null);
        setCapturedImage(result);
        stopCameraStream();
      };
      img.onerror = () => {
        setCameraError(
          isTe
            ? 'చిత్రం దెబ్బతింది లేదా తెరవబడలేదు. దయచేసి వేరొక ఫోటో తీయండి.'
            : 'Corrupted image file. Please capture or upload another photo.'
        );
      };
      img.src = result;
    };
    reader.onerror = () => {
      setCameraError(isTe ? 'ఫైల్ చదవడంలో విఫలమైంది.' : 'Failed to read image file.');
    };
    reader.readAsDataURL(file);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-slate-900 text-white rounded-3xl overflow-hidden shadow-2xl border border-slate-800">
        {/* Top Header */}
        <div className="flex items-center justify-between p-4 bg-slate-950/80 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold">
                {isTe ? 'పంట ఆకు కెమెరా స్కానర్' : 'Live Crop Health Camera'}
              </h3>
              <p className="text-[11px] text-slate-400">
                {isTe ? 'బాధిత ఆకుపై కెమెరాను గురిపెట్టి ఫోటో తీయండి' : 'Point camera at affected leaf or pest'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Close camera"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Viewfinder Area */}
        <div className="relative bg-black aspect-4/3 flex items-center justify-center overflow-hidden">
          <canvas ref={canvasRef} className="hidden" />

          {capturedImage ? (
            <div className="relative w-full h-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={capturedImage}
                alt="Captured crop snapshot"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-bold text-emerald-400 flex items-center gap-1.5 border border-emerald-500/40">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{isTe ? 'ఫోటో తీయబడింది' : 'Photo Ready'}</span>
              </div>
            </div>
          ) : cameraError ? (
            <div className="p-6 text-center max-w-sm space-y-3">
              <div className="w-12 h-12 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center mx-auto">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <p className="text-xs font-semibold text-rose-200">{cameraError}</p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-md active:scale-95"
                >
                  <Smartphone className="w-4 h-4" />
                  <span>{isTe ? 'ఫోన్ కెమెరాతో తీయండి' : 'Open Device Camera'}</span>
                </button>

                <label className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold cursor-pointer transition-all border border-slate-700">
                  <Upload className="w-4 h-4" />
                  <span>{isTe ? 'గ్యాలరీ' : 'Choose File'}</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          ) : (
            <div className="relative w-full h-full flex items-center justify-center">
              <video
                ref={videoRef}
                autoPlay={true}
                playsInline={true}
                muted={true}
                className="w-full h-full object-cover"
              />

              {/* Reticle Overlay */}
              <div className="pointer-events-none absolute inset-8 border-2 border-emerald-400/60 rounded-2xl flex flex-col justify-between p-3">
                <div className="flex justify-between">
                  <div className="w-4 h-4 border-t-2 border-l-2 border-emerald-400" />
                  <div className="w-4 h-4 border-t-2 border-r-2 border-emerald-400" />
                </div>
                <div className="text-center text-[11px] font-bold text-emerald-300 bg-black/50 px-2 py-0.5 rounded-md self-center">
                  {isTe ? 'ఆకును ఫ్రేమ్ మధ్యలో ఉంచండి' : 'Keep leaf centered'}
                </div>
                <div className="flex justify-between">
                  <div className="w-4 h-4 border-b-2 border-l-2 border-emerald-400" />
                  <div className="w-4 h-4 border-b-2 border-r-2 border-emerald-400" />
                </div>
              </div>

              {/* Flip camera */}
              <button
                type="button"
                onClick={handleToggleCamera}
                className="absolute top-3 right-3 p-2.5 rounded-full bg-black/60 backdrop-blur-md text-white hover:bg-black/80 transition-all border border-white/20"
                title="Flip Camera"
              >
                <SwitchCamera className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Quality Warning */}
        {qualityWarning && (
          <div className="p-3 bg-amber-950/80 border-t border-amber-800/80 text-amber-200 text-xs flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
            <span>{qualityWarning}</span>
          </div>
        )}

        {/* Hidden File Input for Native Camera Capture */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleFileUpload}
          className="hidden"
        />

        {/* Bottom Actions */}
        <div className="p-4 bg-slate-950 border-t border-slate-800">
          {capturedImage ? (
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleRetake}
                className="flex-1 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors min-h-[46px]"
              >
                <RefreshCw className="w-4 h-4" />
                <span>{isTe ? 'మళ్ళీ తీయండి (Retake)' : 'Retake Photo'}</span>
              </button>

              <button
                type="button"
                onClick={handleUsePhoto}
                className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-lg shadow-emerald-900/40 min-h-[46px]"
              >
                <Sparkles className="w-4 h-4" />
                <span>{isTe ? 'ఈ ఫోటోతో AI స్కాన్ చేయండి' : 'Analyze with AI Doctor'}</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
                title="Use phone camera or upload"
              >
                <Smartphone className="w-4 h-4" />
                <span>{isTe ? 'ఫోన్ కెమెరా' : 'Device Cam'}</span>
              </button>

              {/* Capture Shutter Button */}
              <button
                type="button"
                onClick={handleCaptureSnapshot}
                disabled={!isStreaming}
                className="w-16 h-16 rounded-full border-4 border-white bg-emerald-500 hover:bg-emerald-400 active:scale-95 transition-all flex items-center justify-center shadow-lg disabled:opacity-50 disabled:cursor-not-allowed mx-auto"
                aria-label="Capture Photo"
              >
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
                  <Camera className="w-6 h-6 text-emerald-700" />
                </div>
              </button>

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
              >
                <Upload className="w-4 h-4" />
                <span>{isTe ? 'గ్యాలరీ' : 'Gallery'}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
