import React, { useState } from 'react';
import { User, Mail, ArrowRight } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import Input from '../ui/Input';
import Button from '../ui/Button';
import Alert from '../ui/Alert';
import { authAPI } from '../../services/auth_api';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
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
      await authAPI.register(formData);
      setAlert({ type: 'success', message: 'Registration successful! Please check your email for OTP.' });
      
      localStorage.setItem('tempEmail', formData.email);
      
      setTimeout(() => navigate('/verify-otp'), 2000);
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
    <div className="min-h-screen flex">
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
              <User className="h-7 w-7 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Create Account</h2>
            <p className="mt-2 text-gray-600">Join us today and get started</p>
          </div>

          {alert && (
            <div className="mb-6">
              <Alert type={alert.type} message={alert.message} />
            </div>
          )}

          <div className="space-y-6">
            <Input
              icon={User}
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              error={errors.name}
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
            <Button loading={loading} onClick={handleSubmit}>
              <span>Create Account</span>
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link
                to="/login"
                className="text-orange-600 hover:text-orange-500 font-medium transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-center text-xs text-gray-500">
              Powered by{' '}
              <span className="font-semibold text-orange-600">W2S Solutions</span>
            </p>
          </div>
        </div>
      </div>

      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-orange-600 via-yellow-600 to-red-700 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-20 w-24 h-24 bg-white bg-opacity-5 rounded-full"></div>
         
        </div>
        
        <div className="relative z-10 flex flex-col justify-center px-12 py-16">
          <div className="flex items-center space-x-4 mb-12">
            <div className="h-16 w-16 from-orange-600 via-yellow-700 to-red-700 bg-opacity-20 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white border-opacity-30 shadow-2xl">
              <span className="text-white font-bold text-2xl">W2S</span>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white drop-shadow-lg">
                W2S Solutions
              </h1>
              <p className="text-white text-opacity-80 text-lg">Technology Consulting</p>
            </div>
          </div>

          <div className="space-y-6 max-w-lg">
            <h2 className="text-3xl font-bold text-white leading-tight drop-shadow-lg">
              Start your journey with innovative technology solutions
            </h2>
            <p className="text-xl text-white text-opacity-90 leading-relaxed drop-shadow">
              Join thousands of businesses already transforming their operations with our cutting-edge technology consulting services. Your success story begins here.
            </p>
            
            <div className="grid grid-cols-1 gap-4 mt-8">
              <div className="flex items-center space-x-3">
                <div className="h-2 w-2 bg-white rounded-full shadow-sm"></div>
                <span className="text-white text-opacity-80 font-medium">Quick & Easy Onboarding</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="h-2 w-2 bg-white rounded-full shadow-sm"></div>
                <span className="text-white text-opacity-80 font-medium">24/7 Expert Support</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="h-2 w-2 bg-white rounded-full shadow-sm"></div>
                <span className="text-white text-opacity-80 font-medium">Scalable Business Solutions</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;