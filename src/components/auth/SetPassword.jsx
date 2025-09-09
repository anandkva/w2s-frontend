import React, { useState, useEffect } from 'react';
import { Shield, Mail, Lock, CheckCircle } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import Input from '../ui/Input';
import Button from '../ui/Button';
import Alert from '../ui/Alert';
import { authAPI } from '../../services/auth_api';

const SetPassword = () => {
  const [formData, setFormData] = useState({ otp: '', email: '', newPassword: '' });
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate(); 

  useEffect(() => {
    
    const tempEmail = localStorage.getItem('tempEmail');
    if (tempEmail) {
      setFormData(prev => ({ ...prev, email: tempEmail }));
    }
  }, []);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.otp.trim()) {
      newErrors.otp = 'OTP is required';
    } else if (formData.otp.length !== 6) {
      newErrors.otp = 'OTP must be 6 digits';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    }
    
    if (!formData.newPassword.trim()) {
      newErrors.newPassword = 'Password is required';
    } else if (formData.newPassword.length < 6) {
      newErrors.newPassword = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    
    setLoading(true);
    setAlert(null);

    try {
      await authAPI.resetPassword(formData);
      setAlert({ type: 'success', message: 'Password reset successful!' });
      
      localStorage.removeItem('tempEmail');
      
      
      setTimeout(() => navigate('/login'), 2000);
    } catch (error) {
      setAlert({ type: 'error', message: error.message });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-600 via-yellow-600 to-red-700 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-xl p-8">
        <div className="text-center mb-8">
          <div className="mx-auto h-16 w-16 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-full flex items-center justify-center mb-4">
            <Lock className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Set New Password</h2>
          <p className="mt-2 text-gray-600">Enter OTP and your new password</p>
        </div>

        {alert && (
          <div className="mb-6">
            <Alert type={alert.type} message={alert.message} />
          </div>
        )}

        <div className="space-y-6">
          <Input
            icon={Shield}
            placeholder="Enter 6-digit OTP"
            value={formData.otp}
            onChange={(e) => handleInputChange('otp', e.target.value.replace(/\D/g, '').slice(0, 6))}
            error={errors.otp}
            maxLength={6}
            required
          />
          <Input
            icon={Mail}
            type="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            error={errors.email}
            required
          />
          <Input
            icon={Lock}
            type="password"
            placeholder="New Password"
            value={formData.newPassword}
            onChange={(e) => handleInputChange('newPassword', e.target.value)}
            error={errors.newPassword}
            required
          />
          <Button loading={loading} onClick={handleSubmit}>
            <span>Reset Password</span>
            <CheckCircle className="h-5 w-5" />
          </Button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Back to{' '}
            <Link
              to="/login"
              className="text-indigo-600 hover:text-indigo-500 font-medium transition-colors"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SetPassword;
