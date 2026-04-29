import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import SplashScreen from "./components/SplashScreen";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./components/ForgotPassword";

import { ProtectedRoute } from "./components/auth/ProtectedRoute";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <main className="max-w-112.5 mx-auto shadow-2xl min-h-screen bg-white relative">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<SplashScreen onFinish={() => window.location.href = '/login'} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            {/* Protected Route (Harus Login) */}
            <Route 
              path="/discover" 
              element={
                <ProtectedRoute>
                  <div>Discover Page</div>
                </ProtectedRoute>
              } 
            />
          </Routes>
        </main>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;