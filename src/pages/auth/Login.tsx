import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import InputBox from "../../components/InputBox";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Login = () => { // Destructure di sini
    const navigate = useNavigate();
    const { login } = useAuth();
    
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleLogin = async () => {
        try {
            setError("");
            setIsLoading(true);
            // Pakai akun dummy: test@yukkos.com / 123456
            await login(formData.email, formData.password);
            navigate("/discover"); // Arahkan ke discover jika sukses
        } catch (err: unknown) {
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
            {/* Header Section */}
            <div className="p-10 pt-16 flex-1">
                <h1 className="text-3xl font-bold text-gray-800 leading-tight">
                    Lanjutkan <br /> Perjalanan Kamu
                </h1>
                <p className="text-gray-600 mt-4 text-sm max-w-62.5">
                    Masuk kembali untuk mengelola hunian atau mencari kos impianmu.
                </p>
            </div>

            {/* Form Section */}
            <div className="bg-white rounded-t-[40px] p-8 pb-12 shadow-2xl">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Masuk</h2>
                <p className="text-gray-500 text-sm mb-8">Lengkapi data diri di bawah ini untuk memulai</p>

                <div className="space-y-5 mt-8">
                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                    <InputBox
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        placeholder="Masukkan Email"
                        onChange={handleChange}
                        // Tambahkan rounded-full jika ingin sesuai desain lonjong
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
                            <div onClick={() => setShowPassword(!showPassword)} className="select-none">
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </div>
                        }
                    />

                    <div className="flex justify-start">
                        <button 
                            type="button"
                            className="text-sm text-gray-500 hover:text-blue-600 transition-colors" 
                            onClick={() => navigate("/forgot-password")}
                        >
                            Lupa kata sandi?
                        </button>
                    </div>

                    <button 
                        onClick={handleLogin}
                        disabled={isLoading}
                        className={`w-full font-bold py-4 rounded-full mt-6 transition-all text-lg shadow-md 
                            ${isLoading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700 text-white"}`}
                    >
                        {isLoading ? "Memproses..." : "Lanjutkan"}
                    </button>

                    <p className="text-center text-sm text-gray-500 mt-6">
                        Belum punya akun?{" "}
                        <span
                            onClick={() => navigate("/register")}
                            className="text-blue-600 font-semibold cursor-pointer hover:underline"
                        >
                            Daftar
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;