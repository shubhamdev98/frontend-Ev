import React, { useState } from 'react';
import { Mail, Lock, AlertCircle, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { NavLink } from 'react-router';
import Logo from '../assets/Logo.png';

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({}); 

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      setIsSubmitting(true);
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Logging in with:', { ...formData, rememberMe });
      
      setFormData({
        email: '',
        password: ''
      });
      setRememberMe(false);
    } catch (error) {
      setErrors({
        general: 'Failed to sign in. Please check your credentials and try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Image */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <img
          src="https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg"
          alt="Event Management"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/80 to-primary/80 mix-blend-multiply" />
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-6">
              Create Unforgettable Events
            </h1>
            <p className="text-xl text-white/90 max-w-xl">
              Your all-in-one platform for planning, managing, and executing exceptional events
            </p>
          </div>
        </div>
      </div>

      {/* Right side - Sign In Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-gradient-to-b from-primary-dark to-primary p-8">
      <div className="w-full max-w-md space-y-8 backdrop-blur-md p-8 rounded-2xl border border-background-light/10 animate-fadeIn">
          <div className="flex flex-col items-center space-y-6">
            <NavLink to="/" className="transition-transform hover:scale-105">
              <img className="w-10" src={Logo} alt="Logo" />
            </NavLink>


            <div className="space-y-2">
          
              <p className="text-sm text-background-light/70 text-center">
                Sign in to your EventCraft account
              </p>
            </div>
          </div>

          {errors.general && (
            <div className="p-4 bg-red-50 border border-red-100 rounded-lg text-red-600 text-sm flex items-start">
              <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
              <span>{errors.general}</span>
            </div>
          )}

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-background-light">
                  Email address
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                    <Mail className="h-5 w-5 text-background-light/50" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`block w-full pl-10 pr-3 py-2 border ${
                      errors.email ? 'border-error' : 'border-background-light/30'
                    } placeholder-background-light/50 text-background-light bg-white/5 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary sm:text-sm`}
                    placeholder="you@example.com"
                  />
                  {errors.email && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                      <AlertCircle className="h-5 w-5 text-error" />
                    </div>
                  )}
                </div>
                {errors.email && (
                  <p className="mt-1 text-xs text-error">{errors.email}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-background-light">
                  Password
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                    <Lock className="h-5 w-5 text-background-light/50" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleChange}
                    className={`block w-full pl-10 pr-10 py-2 border ${
                      errors.password ? 'border-error' : 'border-background-light/30'
                    } placeholder-background-light/50 text-background-light bg-white/5 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary sm:text-sm`}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-background-light/50" />
                    ) : (
                      <Eye className="h-5 w-5 text-background-light/50" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-xs text-error">{errors.password}</p>
                )}
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 rounded border-background-light/30 text-secondary focus:ring-secondary"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-background-light"
                  >
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <NavLink
                    to="/forgot-password"
                    className="font-medium text-secondary hover:text-secondary-dark transition"
                  >
                    Forgot password?
                  </NavLink>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-sm font-medium text-white bg-gradient-to-r from-secondary to-secondary-light hover:from-secondary-dark hover:to-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary transform transition-all duration-150 hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <span className="absolute right-3 inset-y-0 flex items-center">
                  <ArrowRight 
                    size={18} 
                    className={`text-secondary-light group-hover:text-secondary-lighter transition-transform duration-300 ${isSubmitting ? 'animate-pulse' : 'group-hover:translate-x-1'}`} 
                  />
                </span>
                {isSubmitting ? 'Signing in...' : 'Sign in'}
              </button>
            </div>
          </form>

          <div className="text-center">
            <p className="text-sm text-background-light/70">
              Don't have an account?{' '}
              <NavLink
                to="/signup"
                className="font-medium text-secondary hover:text-secondary-dark transition"
              >
                Sign up
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;