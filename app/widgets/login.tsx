'use client';

import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

interface AuthDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function AuthDrawer({ open, onClose }: AuthDrawerProps) {
  const [isLogin, setIsLogin] = useState(true);
  // const [step, setStep] = useState<'form' | 'otp'>('form');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    // otp: '',
  });

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [open]);


  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (form.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (!isLogin && form.password !== form.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!isLogin && !form.name.trim()) {
      newErrors.name = 'Name is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await fetch(isLogin ? '/api/auth/login' : '/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrors({ email: data.message || 'Something went wrong' });
        setLoading(false);
        return;
      }
      if (data.token) {
        Cookies.set('auth_token', data.token, { expires: 7 }); 
        Cookies.set('name', data.user.name, { expires: 7 }); 
      }

      alert(isLogin ? 'Logged in successfully' : 'Registered successfully, We will get back to you soon');
      setForm({ name: '', email: '', password: '', confirmPassword: '' });
      setErrors({});
      onClose();
    } catch (error) {
      setErrors({ email: 'Network error. Please try again.' });
    } finally {
      setLoading(false);
    }
  };


  // const handleVerifyOTP = () => {
  //   if (form.otp === '123456') {
  //     alert('Registered successfully!');
  //     onClose();
  //     setForm({ name: '', email: '', password: '', confirmPassword: '', otp: '' });
  //     setStep('form');
  //     setIsLogin(true);
  //     setErrors({});
  //   } else {
  //     setErrors({ otp: 'Invalid OTP' });
  //   }
  // };

  return (
    <>
    <div className={`fixed inset-0 bg-black transition-opacity duration-300 z-[100] ${ open ? 'opacity-60 visible' : 'opacity-0 invisible' }`} onClick={onClose} />
    <div
      className={`fixed top-0 right-0 h-screen w-full sm:w-[450px] bg-white z-[101] p-8 shadow-2xl transform transition-transform duration-300 ease-in-out ${
        open ? 'translate-x-0' : 'translate-x-full'
      }`}
      aria-hidden={!open}
    >
    <button 
      onClick={onClose} 
      className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl transition-colors"
      aria-label="Close drawer"
    >
      ✕
    </button>
    <p className="text-2xl font-bold mb-8 text-center text-gray-800">
      {isLogin ? 'Welcome Back' : 
      // step === 'otp' ? 'Verify Your Email' : 
      'Create Account'}
    </p>
    {/* {step === 'form' && ( */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {!isLogin && (
          <div>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Full Name"
              className={`w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
          </div>
        )}        
        <div>
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email Address"
            type="email"
            className={`w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
        </div>
        <div>
          <input
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            type="password"
            className={`w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
              errors.password ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
        </div>
        {!isLogin && (
          <div>
            <input
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              type="password"
              className={`w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>
            )}
          </div>
        )}
        <button
          type="submit"
          disabled={loading}
          className="w-full px-4 py-2 bg-black rounded-md text-white hover:bg-gray-800 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {loading ? 'Please wait...' : isLogin ? 'Sign In' : 'Create Account'}
        </button>
      </form>
    {/* )} */}
    {/* {step === 'otp' && (
      <div className="space-y-6">
        <p className="text-sm text-gray-600 text-center">
          Enter the 6-digit OTP sent to {form.email}
        </p>
        <div>
          <input
            name="otp"
            value={form.otp}
            onChange={handleChange}
            placeholder="Enter OTP"
            className={`w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
              errors.otp ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.otp && <p className="mt-1 text-sm text-red-500">{errors.otp}</p>}
        </div>
        <button
          onClick={handleVerifyOTP}
          className="w-full px-4 py-2 bg-black rounded-md text-white hover:bg-gray-800 transition"
        >
          Verify OTP
        </button>
      </div>
    )} */}
    {/* {step === 'form' && ( */}
      <p className="text-center text-sm mt-6 text-gray-600">
        {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
        <button
          onClick={() => {
            setIsLogin(!isLogin);
            setForm({ name: '', email: '', password: '', confirmPassword: '' });
            setErrors({});
          }}
          className="text-blue-600 hover:underline font-medium"
        >
          {isLogin ? 'Sign Up' : 'Sign In'}
        </button>
      </p>
    {/* )} */}
  </div>
  </>
  );
}