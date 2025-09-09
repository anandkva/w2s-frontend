import React, { useState } from "react";
import { User, Mail, Lock, LogOut, CheckCircle } from "lucide-react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import Alert from "../ui/Alert";
import { useAuth } from "../../context/AuthContext";
import { userAPI } from "../../services/user_api";

const Dashboard = () => {
  const { user, logout, updateUser } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(false);

  const [profileData, setProfileData] = useState({
    name: user?.name || "",
  });

  const [emailData, setEmailData] = useState({ newEmail: "" });
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const [errors, setErrors] = useState({});

  const getProfileImage = () => {
    const initials = user?.name 
      ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
      : 'U';
    return initials;
  };

  const handleUpdateProfile = async () => {
    if (!profileData.name.trim()) {
      setErrors({ name: "Name is required" });
      return;
    }

    setLoading(true);
    setAlert(null);

    try {
      await userAPI.updateProfile({ name: profileData.name });
      updateUser({ ...user, name: profileData.name });
      setAlert({ type: "success", message: "Profile updated successfully!" });
      setErrors({});
    } catch (error) {
      setAlert({ type: "error", message: error.message });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateEmail = async () => {
    if (!emailData.newEmail.trim()) {
      setErrors({ newEmail: "New email is required" });
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailData.newEmail)) {
      setErrors({ newEmail: "Please enter a valid email address" });
      return;
    }

    setLoading(true);
    setAlert(null);

    try {
      await userAPI.updateEmail(emailData);

      updateUser({ ...user, email: emailData.newEmail });

      setAlert({
        type: "success",
        message:
          "Email update request sent! Check your email for verification.",
      });
      setEmailData({ newEmail: "" });
      setErrors({});
    } catch (error) {
      setAlert({ type: "error", message: error.response.data.error });
    } finally {
      setLoading(false);
    }
  };

  const clearError = (field) => {
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-lg border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 bg-gradient-to-br from-orange-600 via-yellow-600 to-red-700 rounded-lg flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg">W2S</span>
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 via-yellow-600 to-red-700 bg-clip-text text-transparent">
                    W2S Dashboard
                  </h1>
                  <p className="text-gray-600 text-sm">Welcome back, {user?.name}! 👋</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3 bg-gray-50 rounded-lg px-4 py-2">
                <div className="h-10 w-10 bg-gradient-to-br from-orange-600 via-yellow-600 to-red-700 rounded-full flex items-center justify-center text-white font-semibold shadow-md">
                  {getProfileImage()}
                </div>
                <div className="text-sm">
                  <p className="font-medium text-gray-900">{user?.name}</p>
                  <p className="text-gray-500">{user?.email}</p>
                </div>
              </div>
              
              <button
                onClick={logout}
                className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200 border border-red-200 hover:border-red-300"
              >
                <LogOut className="h-4 w-4" />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-gradient-to-r from-orange-600 via-yellow-600 to-red-700 rounded-xl p-8 text-white mb-8 shadow-xl">
          <div className="flex items-center space-x-6">
            <div className="h-20 w-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white border-opacity-20">
              <div className="h-16 w-16 bg-white bg-opacity-30 rounded-full flex items-center justify-center text-2xl font-bold text-gray-800">
                {getProfileImage()}
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-1 text-white drop-shadow-lg">{user?.name}</h2>
              <p className="text-white text-opacity-90 text-lg drop-shadow">{user?.email}</p>
              <div className="flex items-center space-x-2 mt-2">
                <div className="h-2 w-2 bg-green-400 rounded-full shadow-sm"></div>
                <span className="text-white text-opacity-80 text-sm font-medium drop-shadow">Active Account</span>
              </div>
            </div>
          </div>
        </div>

        {alert && (
          <div className="mb-6">
            <Alert type={alert.type} message={alert.message} />
          </div>
        )}

        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
          <div className="border-b border-gray-200 bg-gray-50">
            <nav className="-mb-px flex">
              <button
                onClick={() => setActiveTab("profile")}
                className={`py-4 px-6 text-sm font-medium border-b-2 transition-all duration-200 ${
                  activeTab === "profile"
                    ? "border-orange-500 text-orange-600 bg-white"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                }`}
              >
                <User className="h-4 w-4 inline mr-2" />
                Profile Info
              </button>
              <button
                onClick={() => setActiveTab("email")}
                className={`py-4 px-6 text-sm font-medium border-b-2 transition-all duration-200 ${
                  activeTab === "email"
                    ? "border-orange-500 text-orange-600 bg-white"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Mail className="h-4 w-4 inline mr-2" />
                Change Email
              </button>
            </nav>
          </div>

          <div className="p-8">
            {activeTab === "profile" && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <Input
                    icon={User}
                    value={profileData.name}
                    onChange={(e) => {
                      setProfileData({ ...profileData, name: e.target.value });
                      clearError("name");
                    }}
                    placeholder="Enter your full name"
                    error={errors.name}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <Input
                    icon={Mail}
                    value={user?.email}
                    placeholder="Your current email"
                    disabled
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Use the "Change Email" tab to update your email
                  </p>
                </div>
                <Button loading={loading} onClick={handleUpdateProfile}>
                  <span>Update Profile</span>
                  <CheckCircle className="h-5 w-5" />
                </Button>
              </div>
            )}

            {activeTab === "email" && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Email
                  </label>
                  <Input icon={Mail} value={user?.email} disabled />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    New Email Address
                  </label>
                  <Input
                    icon={Mail}
                    type="email"
                    value={emailData.newEmail}
                    onChange={(e) => {
                      setEmailData({ ...emailData, newEmail: e.target.value });
                      clearError("newEmail");
                    }}
                    placeholder="Enter new email address"
                    error={errors.newEmail}
                    required
                  />
                </div>
                <Button loading={loading} onClick={handleUpdateEmail}>
                  <span>Update Email</span>
                  <CheckCircle className="h-5 w-5" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;