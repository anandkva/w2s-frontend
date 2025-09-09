import React, { useState } from 'react';
import { Mail, ArrowRight, Lock } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import Input from '../ui/Input';
import Button from '../ui/Button';
import Alert from '../ui/Alert';
import { authAPI } from '../../services/auth_api';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate(); 

  const validateForm = () => {
    const newErrors = {};
    
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    
    setLoading(true);
    setAlert(null);

    try {
      await authAPI.forgotPassword(email);
      setAlert({ type: 'success', message: 'Password reset OTP sent to your email!' });
      
      
      localStorage.setItem('tempEmail', email);
      
      
      setTimeout(() => navigate('/set-password'), 2000);
    } catch (error) {
      setAlert({ type: 'error', message: error.message });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (value) => {
    setEmail(value);
    if (errors.email) {
      setErrors({ ...errors, email: '' });
    }
  };

  return (
    <div className="min-h-screen  bg-gradient-to-br from-orange-600 via-yellow-600 to-red-700 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-xl p-8">
        <div className="text-center mb-8">
          <div className="mx-auto h-16 w-16 bg-gradient-to-r from-orange-600 to-red-600 rounded-full flex items-center justify-center mb-4">
            <Lock className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Forgot Password</h2>
          <p className="mt-2 text-gray-600">We'll send you a reset code</p>
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
            placeholder="Enter your email"
            value={email}
            onChange={(e) => handleInputChange(e.target.value)}
            error={errors.email}
            required
          />
          <Button loading={loading} onClick={handleSubmit}>
            <span>Send Reset Code</span>
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Remember your password?{' '}
            <Link
              to="/login"
              className="text-orange-600 hover:text-orange-500 font-medium transition-colors"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
