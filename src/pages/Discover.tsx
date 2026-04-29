import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Discover = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold mb-4">Halo!</h1>
            <p className="text-gray-600 mb-8">Selamat datang di halaman Discover Yukkos.</p>
            <button 
                onClick={handleLogout}
                className="bg-red-500 text-white px-6 py-2 rounded-full font-bold hover:bg-red-600"
            >
                Keluar
            </button>
        </div>
    );
};

export default Discover;