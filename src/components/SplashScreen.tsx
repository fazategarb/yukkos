import { useEffect, useState } from "react";
import { Loader2, WifiOff } from "lucide-react";

interface SplashProps {
  onFinish: () => void;
}

const SplashScreen = ({ onFinish }: SplashProps) => {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkConnection = () => {
      if (!navigator.onLine) {
        setError("Koneksi terputus. Periksa internet kamu.");
      } else {
        setError(null);
        // Simulasi loading 2 detik sebelum masuk ke Login
        const timer = setTimeout(() => {
          onFinish();
        }, 2000);
        return () => clearTimeout(timer);
      }
    };

    checkConnection();

    // Listener jika status internet berubah saat sedang di splash screen
    window.addEventListener("online", checkConnection);
    window.addEventListener("offline", checkConnection);

    return () => {
      window.removeEventListener("online", checkConnection);
      window.removeEventListener("offline", checkConnection);
    };
  }, [onFinish]);

  return (
    <div className="min-h-screen bg-[#D9D9D9] flex flex-col items-center justify-center p-6 text-center">
      {/* Logo Area */}
      <div className="flex flex-col items-center mb-20">
        <img 
          src="/Giga Oyen NLB White.svg" // Ganti dengan path logo kamu
          alt="YukKos Logo" 
          className="w-32 h-32 object-contain mb-4"
        />
        <h1 className="text-4xl font-bold text-gray-800">
          Yuk<span className="text-[#FF4D00]">kos</span>
        </h1>
      </div>

      {/* Loading / Error Area */}
      <div className="flex flex-col items-center gap-4">
        {error ? (
          <>
            <WifiOff className="text-red-500 animate-bounce" size={40} />
            <p className="text-gray-700 font-medium">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-2 text-sm text-blue-600 font-bold underline"
            >
              Coba Lagi
            </button>
          </>
        ) : (
          <>
            <Loader2 className="animate-spin text-gray-800" size={40} />
            <p className="text-gray-500 text-sm tracking-widest uppercase">Loading...</p>
          </>
        )}
      </div>
    </div>
  );
};

export default SplashScreen;