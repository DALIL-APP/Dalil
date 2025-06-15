import React, { useState, useEffect, useRef } from "react";
import { Video, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServiceDetails from "@/components/ServiceTemplate";
import Footer from "@/components/Footer";
import filler from "../../assets/filler.png";
import dot from "../../assets/Ellipse 4.png";
// Type definitions
interface Landmark {
  x: number;
  y: number;
  z?: number;
}

interface Results {
  image: HTMLCanvasElement;
  multiHandLandmarks: Landmark[][];
  multiHandedness: unknown[];
}

interface WsMessage {
  type: string;
  value?: string;
  landmarks?: number[];
  prediction?: string;
}

const DaleelSignLanguage: React.FC = () => {
  const [tracking, setTracking] = useState<boolean>(false);
  const [currentMode, setCurrentMode] = useState<string>("EN");
  const [latestPrediction, setLatestPrediction] = useState<string>("...");
  const [cameraOpen, setCameraOpen] = useState<boolean>(false);
  const [handsInitialized, setHandsInitialized] = useState<boolean>(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wsRef = useRef<WebSocket | null>(null);

  // Initialize Mediapipe Hands
  useEffect(() => {
    if (!cameraOpen) return;

    const initializeHands = async () => {
      // Use the global objects now available from the CDN scripts
      const hands = new (window as any).self.Hands({
        locateFile: (file: string) =>
          `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
      });

      const camera = new (window as any).self.Camera(videoRef.current!, {
        onFrame: async () => {
          await hands.send({ image: videoRef.current! });
        },
        width: 640,
        height: 480,
      });

      hands.setOptions({
        maxNumHands: 1,
        modelComplexity: 1,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5,
      });

      const onResults = (results: Results) => {
        const canvasCtx = canvasRef.current?.getContext("2d");
        if (!canvasCtx || !canvasRef.current) return;

        canvasCtx.save();
        canvasCtx.clearRect(
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        );

        // Draw the video frame
        canvasCtx.drawImage(
          results.image,
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        );

        if (
          !results.multiHandLandmarks ||
          results.multiHandLandmarks.length === 0 ||
          !tracking
        ) {
          canvasCtx.restore();
          return;
        }

        const landmarks = results.multiHandLandmarks[0];

        // Calculate bounding box
        const margin = 20;
        const xs = landmarks.map((p) => p.x * canvasRef.current!.width);
        const ys = landmarks.map((p) => p.y * canvasRef.current!.height);
        const minX = Math.min(...xs) - margin;
        const minY = Math.min(...ys) - margin;
        const maxX = Math.max(...xs) + margin;
        const maxY = Math.max(...ys) + margin;
        const boxWidth = maxX - minX;
        const boxHeight = maxY - minY;

        // Draw purple bounding box
        canvasCtx.strokeStyle = "#FF00FF";
        canvasCtx.lineWidth = 4;
        canvasCtx.strokeRect(minX, minY, boxWidth, boxHeight);

        // Draw yellow prediction text
        canvasCtx.font = "bold 26px 'Cairo'";
        canvasCtx.fillStyle = "yellow";
        canvasCtx.save();
        canvasCtx.scale(-1, 1);
        const textWidth = canvasCtx.measureText(latestPrediction).width;
        canvasCtx.fillText(latestPrediction, -minX - textWidth, minY - 10);
        canvasCtx.restore();

        // Prepare data for WebSocket
        let data_aux: number[] = [];
        const flippedLandmarks: Landmark[] = landmarks.map((p) => ({
          x: 1 - p.x,
          y: p.y,
        }));
        const minLandmarkX = Math.min(...flippedLandmarks.map((p) => p.x));
        const minLandmarkY = Math.min(...flippedLandmarks.map((p) => p.y));

        flippedLandmarks.forEach((p) => {
          data_aux.push(p.x - minLandmarkX);
          data_aux.push(p.y - minLandmarkY);
        });

        if (wsRef.current?.readyState === WebSocket.OPEN) {
          const message: WsMessage = {
            type: "predict",
            landmarks: data_aux,
          };
          wsRef.current.send(JSON.stringify(message));
        }

        canvasCtx.restore();
      };

      hands.onResults(onResults);

      // Start camera
      if (videoRef.current) {
        const camera = new Camera(videoRef.current, {
          onFrame: async () => {
            await hands.send({ image: videoRef.current! });
          },
          width: 640,
          height: 480,
        });
        camera.start();
      }

      setHandsInitialized(true);
    };

    initializeHands();
  }, [cameraOpen, tracking, latestPrediction]);

  // WebSocket connection
  useEffect(() => {
    if (!cameraOpen) return;

    const connectWebSocket = () => {
      const ws = new WebSocket("ws://localhost:8000/ws");

      ws.onopen = () => {
        console.log("WebSocket connected.");
        const message: WsMessage = { type: "mode", value: currentMode };
        ws.send(JSON.stringify(message));
      };

      ws.onmessage = (event: MessageEvent) => {
        try {
          const message: WsMessage = JSON.parse(event.data);
          if (message.prediction) {
            setLatestPrediction(message.prediction);
          }
        } catch (error) {
          console.error("Error parsing WebSocket message:", error);
        }
      };

      ws.onclose = () => {
        console.log("WebSocket disconnected. Reconnecting in 2s...");
        setTimeout(connectWebSocket, 2000);
      };

      wsRef.current = ws;
    };

    connectWebSocket();

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [cameraOpen, currentMode]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "s" || e.key === "S") {
        setTracking((prev) => !prev);
      } else if (["1", "2", "3", "4"].includes(e.key)) {
        const modes: Record<string, string> = {
          "1": "EN",
          "2": "AR",
          "3": "Words",
          "4": "Numbers",
        };
        const newMode = modes[e.key];
        setCurrentMode(newMode);
        if (wsRef.current?.readyState === WebSocket.OPEN) {
          const message: WsMessage = { type: "mode", value: newMode };
          wsRef.current.send(JSON.stringify(message));
        }
      } else if (e.key === "q" || e.key === "Q") {
        setTracking(false);
        if (wsRef.current) wsRef.current.close();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleOpenCamera = () => {
    setCameraOpen(true);
  };

  const handleCloseCamera = () => {
    setCameraOpen(false);
    setTracking(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <HeroSection
        backgroundImage={filler}
        breadcrumb={
          <span className="flex flex-row items-center gap-2 text-right text-base">
            <span className="text-blue-600">ترجمة لغة الاشارة</span>
            <img src={dot} alt="dot" className="w-2 h-2" />
            <span>الخدمات</span>
          </span>
        }
      />
      <ServiceDetails
        serviceName="ترجمة لغة الإشارة إلى نص مكتوب خلال فتح الكاميرا"
        serviceDescription="خدمة فتح الكاميرا وترجمة لغة الإشارة إلى نص مكتوب هي تقنية مبتكرة تستخدم الذكاء الاصطناعي لتحويل إشارات وحركات اليد إلى محتوى نصي، مما يسهل التواصل بين الأشخاص ذوي الإعاقة السمعية أو النطقية وبين المجتمع. توفر هذه الخدمة أداة فعالة للتواصل والتفاعل الفعّال والمباشر في المجتمع."
        serviceMerits={[
          "تحويل فوري: يتم تحويل حركات اليد أو لغة الإشارة إلى نص مكتوب بشكل فوري ودقيق، مما يوفر الوقت والجهد.",
          "سهولة الاستخدام: النظام سهل الاستخدام ويتطلب فقط فتح الكاميرا لبدء الترجمة.",
          "دعم متنوع: يمكن استخدام الخدمة للتواصل اليومي أو في حالات الطوارئ أو أثناء الاجتماعات.",
          "تعزز الدمج المجتمعي: تتيح للأشخاص ذوي الإعاقة السمعية أو النطقية التفاعل مع المجتمع والمشاركة في الحياة اليومية دون الحاجة إلى مترجمين إضافيين.",
        ]}
      />
      <div className="container mx-auto px-4 pb-8">
        <div className="border-2 border-blue-200 rounded-xl p-8 flex flex-col items-center gap-4 bg-white shadow-sm">
          {!cameraOpen ? (
            <>
              <Video size={48} className="text-blue-500 mx-auto" />
              <p className="text-gray-600 text-center text-lg">
                قم بفتح الكاميرا وسيتم ترجمة حركات يدك أو الشيء الذي تريد التعرف
                عليه إلى نص يمكنك قراءته هنا......
              </p>
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-2 rounded-lg flex items-center gap-2 mt-2"
                onClick={handleOpenCamera}
              >
                <Video size={20} />
                فتح الكاميرا
              </button>
            </>
          ) : (
            <>
              <div className="w-full flex justify-end">
                <button
                  className="flex items-center gap-1 text-blue-600 hover:text-red-600 font-bold mb-2"
                  onClick={handleCloseCamera}
                  title="إغلاق الكاميرا"
                >
                  <X size={24} />
                  إغلاق الكاميرا
                </button>
              </div>
              <div className="relative">
                {/* Hidden video element (same as index.html) */}
                <video ref={videoRef} style={{ display: "none" }} playsInline />
                {/* Canvas that will show the video feed (same as index.html) */}
                <canvas
                  ref={canvasRef}
                  width={640}
                  height={480}
                  className="border-2 border-green-500 rounded-lg"
                  style={{ transform: "scaleX(-1)" }}
                />
              </div>
              <div className="mt-4 w-full max-w-md mx-auto p-4 border border-gray-200 rounded-lg bg-gray-50 text-center">
                <span className="block text-blue-600 font-bold mb-2">
                  النص المترجم من لغة الإشارة:
                </span>
                <span className="text-gray-700 text-lg">
                  {latestPrediction}
                </span>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg w-full max-w-md">
                <p className="text-gray-700 mb-2">
                  <strong>S:</strong> {tracking ? "إيقاف التعرف" : "بدء التعرف"}
                </p>
                <p className="text-gray-700">
                  <strong>1:</strong> English | <strong>2:</strong> العربية |{" "}
                  <strong>3:</strong> كلمات | <strong>4:</strong> أرقام
                </p>
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DaleelSignLanguage;
