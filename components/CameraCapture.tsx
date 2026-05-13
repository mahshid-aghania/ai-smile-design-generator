"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Camera } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type CameraCaptureProps = {
  onCapture: (dataUrl: string) => void;
  onError: (message: string) => void;
  onCancel?: () => void;
};

export function CameraCapture({ onCapture, onError, onCancel }: CameraCaptureProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [ready, setReady] = useState(false);

  const stopStream = useCallback(() => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setReady(false);
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function start() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: { ideal: "user" },
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
          audio: false,
        });
        if (cancelled) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }
        streamRef.current = stream;
        const video = videoRef.current;
        if (video) {
          video.srcObject = stream;
          await video.play();
          setReady(true);
        }
      } catch (e) {
        const name = e instanceof DOMException ? e.name : "";
        if (name === "NotAllowedError" || name === "PermissionDeniedError") {
          onError(
            "Camera access was denied. Please allow camera permissions in your browser settings and try again."
          );
        } else if (name === "NotFoundError" || name === "DevicesNotFoundError") {
          onError("No camera was found on this device.");
        } else if (name === "NotReadableError" || name === "TrackStartError") {
          onError("The camera is already in use or cannot be opened.");
        } else {
          onError("Could not start the camera. Check permissions and try again.");
        }
      }
    }

    void start();

    return () => {
      cancelled = true;
      stopStream();
    };
  }, [onError, stopStream]);

  const capturePhoto = useCallback(() => {
    const video = videoRef.current;
    if (!video || !ready || video.videoWidth === 0) {
      onError("Camera is not ready yet. Wait a moment and try again.");
      return;
    }
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      onError("Could not read camera frame.");
      return;
    }
    ctx.drawImage(video, 0, 0);
    const dataUrl = canvas.toDataURL("image/jpeg", 0.92);
    stopStream();
    onCapture(dataUrl);
  }, [onCapture, onError, ready, stopStream]);

  return (
    <Card className="overflow-hidden">
      <CardContent className="space-y-4 p-4 sm:p-6">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-slate-900">
          <video
            ref={videoRef}
            playsInline
            muted
            autoPlay
            className="h-full w-full object-cover"
          />
          {!ready && (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-900/80 text-sm text-white">
              Starting camera…
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
          {onCancel && (
            <Button type="button" variant="secondary" className="sm:mr-auto" onClick={onCancel}>
              Cancel
            </Button>
          )}
          <Button type="button" onClick={capturePhoto} disabled={!ready}>
            <Camera className="size-4" aria-hidden />
            Capture Photo
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
