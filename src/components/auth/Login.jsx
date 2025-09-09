import React, { useState } from "react";
import { Mail, Lock, ArrowRight } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import Input from "../ui/Input";
import Button from "../ui/Button";
import Alert from "../ui/Alert";
import { authAPI } from "../../services/auth_api";
import { useAuth } from "../../context/AuthContext";
import { userAPI } from "../../services/user_api";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [errors, setErrors] = useState({});
  const { login } = useAuth();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    setAlert(null);

    try {
      const response = await authAPI.login(formData);
      console.log("res", response);

      const resData = response.data;

      if (resData.status === "error") {
        setAlert({ type: "error", message: resData.error || "Login failed" });
        return;
      }

      const token = resData.data?.token;
      if (!token) {
        throw new Error("Login API did not return a token");
      }

      localStorage.setItem("authToken", token);

      const profileRes = await userAPI.getProfile();
      const userData = profileRes.data?.data;

      login(userData, token);

      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      const message =
        error.response?.data?.error || error.message || "Something went wrong";
      setAlert({ type: "error", message });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-orange-600 via-yellow-600 to-red-700 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 right-20 w-24 h-24 bg-white bg-opacity-5 rounded-full"></div>
          <div className="absolute bottom-20 right-32 w-32 h-32 bg-white bg-opacity-3 rounded-full"></div>
          <div className="absolute top-2/3 right-10 w-16 h-16 bg-white bg-opacity-4 rounded-full"></div>
        </div>

        <div className="relative z-10 flex flex-col justify-center px-12 py-16">
          <div className="flex items-center space-x-4 mb-12">
            <div className="h-16 w-16 bg-orange-800 bg-opacity-20 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white border-opacity-30 shadow-2xl">
              <span className="text-white font-bold text-2xl">W2S</span>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white drop-shadow-lg">
                W2S Solutions
              </h1>
              <p className="text-white text-opacity-80 text-lg">
                Technology Consulting
              </p>
            </div>
          </div>

          <div className="space-y-6 max-w-lg">
            <h2 className="text-3xl font-bold text-white leading-tight drop-shadow-lg">
              Supercharging growth with technology and compelling brand
              experiences
            </h2>
            <p className="text-xl text-white text-opacity-90 leading-relaxed drop-shadow">
              We increase the odds for excellence by pushing the boundaries of
              what's possible. Discover enhanced business value with our
              technology consulting services.
            </p>

            <div className="grid grid-cols-1 gap-4 mt-8">
              <div className="flex items-center space-x-3">
                <div className="h-2 w-2 bg-white rounded-full shadow-sm"></div>
                <span className="text-white text-opacity-80 font-medium">
                  Innovation-Driven Solutions
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="h-2 w-2 bg-white rounded-full shadow-sm"></div>
                <span className="text-white text-opacity-80 font-medium">
                  Expert Technology Consulting
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="h-2 w-2 bg-white rounded-full shadow-sm"></div>
                <span className="text-white text-opacity-80 font-medium">
                  Enhanced Business Value
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 lg:w-1/2 flex items-center justify-center px-4 py-8 bg-gray-50">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
          <div className="lg:hidden flex items-center justify-center space-x-3 mb-8">
            <div className="h-12 w-12 bg-gradient-to-br from-orange-600 via-yellow-600 to-red-700 rounded-lg flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">W2S</span>
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-orange-600 via-yellow-600 to-red-700 bg-clip-text text-transparent">
                W2S Solutions
              </h1>
            </div>
          </div>

          <div className="text-center mb-8">
            <div className="mx-auto h-14 w-14 bg-gradient-to-r from-orange-600 via-yellow-600 to-red-700 rounded-full flex items-center justify-center mb-4 shadow-lg">
              <Lock className="h-7 w-7 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Welcome Back</h2>
            <p className="mt-2 text-gray-600">
              Sign in to access your dashboard
            </p>
          </div>

          {alert && (
            <div className="mb-6">
              <Alert type={alert.type} message={alert.message} />
            </div>
          )}

          <div className="space-y-6">
            <Input
              icon={Mail}
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              error={errors.email}
              required
            />
            <Input
              icon={Lock}
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              error={errors.password}
              required
            />
            <Button loading={loading} onClick={handleSubmit}>
              <span>Sign In to W2S</span>
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>

          <div className="mt-6 text-center space-y-4">
            <Link
              to="/forgot-password"
              className="text-orange-600 hover:text-orange-500 font-medium transition-colors"
            >
              Forgot your password?
            </Link>
            <p className="text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-orange-600 hover:text-orange-500 font-medium transition-colors"
              >
                Create one
              </Link>
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-center text-xs text-gray-500">
              Powered by{" "}
              <span className="font-semibold text-orange-600">
                W2S Solutions
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
