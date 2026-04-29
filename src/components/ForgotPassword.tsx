import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import InputBox from "./InputBox";

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [isSent, setIsSent] = useState(false);

    const handleReset = async () => {
        // Simulasi API Kirim Link Reset
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setIsSent(true);
    };

    return (
        <div className="min-h-screen bg-[#D9D9D9] flex flex-col">
            <div className="absolute top-6 left-6">
                <button 
                    onClick={() => navigate("/login")}
                    className="p-2 bg-white/50 rounded-full hover:bg-white transition-colors"
                >
                    <ArrowLeft size={20} className="text-gray-700" />
                </button>
            </div>

            <div className="p-10 pt-20 flex-1">
                <h1 className="text-3xl font-bold text-gray-800 leading-tight">
                    Jangan Khawatir
                </h1>
                <p className="text-gray-600 mt-4 text-sm max-w-70">
                    Lupa password adalah hal wajar. Masukkan emailmu untuk mendapatkan link reset.
                </p>
            </div>

            <div className="bg-white rounded-t-[40px] p-8 pb-16 shadow-2xl flex-[1.5]">
                {isSent ? (
                    <div className="text-center py-10">
                        <h2 className="text-2xl font-bold text-green-600 mb-2">Email Terkirim!</h2>
                        <p className="text-gray-500 mb-8">Silakan periksa kotak masuk email kamu untuk instruksi selanjutnya.</p>
                        <button 
                            onClick={() => navigate("/login")}
                            className="text-blue-600 font-bold underline"
                        >
                            Kembali ke Login
                        </button>
                    </div>
                ) : (
                    <>
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">Lupa Kata Sandi?</h2>
                        <p className="text-gray-500 text-sm mb-10">
                            Masukkan email anda yang terdaftar untuk memulihkan kata sandi.
                        </p>

                        <div className="space-y-8">
                            <InputBox
                                label="Email"
                                name="Email"
                                value={email}
                                placeholder="Masukkan Email"
                                onChange={(e) => setEmail(e.target.value)}
                                className="[&_input]:rounded-full"
                            />

                            <button
                                onClick={handleReset}
                                disabled={!email.includes("@")}
                                className={`w-full py-4 rounded-full font-bold text-lg shadow-md transition-all
                                    ${email.includes("@") ? "bg-blue-600 text-white" : "bg-gray-400 text-white"}`}
                            >
                                Kirim
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default ForgotPassword;