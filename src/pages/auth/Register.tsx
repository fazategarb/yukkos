import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import InputBox from "../../components/InputBox";

const Register = () => {
    const navigate = useNavigate(); // Hook untuk navigasi
    const [formData, setFormData] = useState({
        nama: "",
        email: "",
        password: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async () => {
        setIsLoading(true);
        try {
            // Simulasi API Register (Bisa kamu ganti dengan API asli nanti)
            console.log("Mendaftarkan:", formData);
            await new Promise((resolve) => setTimeout(resolve, 1500));
            
            alert("Registrasi Berhasil! Silakan masuk.");
            navigate("/login"); // Pindah ke login setelah sukses
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("An unknown error occurred");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#D9D9D9] flex flex-col">
            <div className="p-10 pt-16 flex-1">
                <h1 className="text-3xl font-bold text-gray-800 leading-tight">
                    Mulai Langkah <br /> Kamu Disini
                </h1>
                <p className="text-gray-600 mt-4 text-sm max-w-62.5">
                    Lengkapi data diri di bawah ini untuk memulai langkahmu bersama Yukkos.
                </p>
            </div>

            <div className="bg-white rounded-t-[40px] p-8 pb-12 shadow-2xl">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Daftar</h2>
                <p className="text-gray-500 text-sm mb-8">Lengkapi data diri di bawah ini untuk memulai</p>

                <div className="space-y-5">
                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                    <InputBox
                        label="Nama Lengkap"
                        name="nama"
                        value={formData.nama}
                        placeholder="Masukkan Nama Lengkap"
                        onChange={handleChange}
                        className="[&_input]:rounded-full"
                    />

                    <InputBox
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        placeholder="Masukkan Email"
                        onChange={handleChange}
                        className="[&_input]:rounded-full"
                    />

                    <InputBox
                        label="Password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        placeholder="Masukkan Password"
                        onChange={handleChange}
                        className="[&_input]:rounded-full"
                        rightIcon={
                            <div onClick={() => setShowPassword(!showPassword)} className="select-none cursor-pointer">
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </div>
                        }
                    />

                    <button 
                        onClick={handleRegister}
                        disabled={isLoading}
                        className={`w-full font-bold py-4 rounded-full mt-6 transition-all text-lg shadow-md 
                            ${isLoading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700 text-white"}`}
                    >
                        {isLoading ? "Memproses..." : "Lanjutkan"}
                    </button>

                    <p className="text-center text-sm text-gray-500 mt-6">
                        Sudah punya akun?{" "}
                        <span
                            onClick={() => navigate("/login")}
                            className="text-blue-600 font-semibold cursor-pointer hover:underline"
                        >
                            Masuk
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;