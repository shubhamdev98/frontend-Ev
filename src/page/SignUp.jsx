import React, { useState } from 'react';
import { Mail, Lock, AlertCircle, Eye, EyeOff, User, Building, ArrowRight } from 'lucide-react';
import Logo from '../assets/Logo.png';
import { NavLink } from 'react-router';

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user', // 'user' or 'company'
    companyName: '' // Only required for company role
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim() && formData.role === 'user') {
      newErrors.lastName = 'Last name is required';
    }

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

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (formData.role === 'company' && !formData.companyName.trim()) {
      newErrors.companyName = 'Company name is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      setIsSubmitting(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Account created:', formData);
      
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'user',
        companyName: ''
      });
    } catch (error) {
      setErrors({
        general: 'Failed to create account. Please try again.'
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
      {/* Left side - Sign Up Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-gradient-to-b from-primary-dark to-primary p-8">
        <div className="w-full max-w-md space-y-8 bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-background-light/20 animate-fadeIn">
          <div className="flex flex-col items-center space-y-4">
           <NavLink to="/" className="transition-transform hover:scale-105">
              <img className="w-12" src={Logo} alt="Logo" />
            </NavLink>

            <h2 className="text-lg font-bold text-background-light text-center">
              Crystal Event Management System
            </h2>

            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-background-light text-center">
                Create an Account
              </h3>
              <p className="text-sm text-background-light/70 text-center">
                Join EventCraft and start planning your perfect event
              </p>
            </div>
          </div>

          {errors.general && (
            <div className="p-4 bg-red-50 border border-red-100 rounded-lg text-red-600 text-sm flex items-start">
              <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
              <span>{errors.general}</span>
            </div>
          )}

          {/* Role Selection */}
          <div className="flex justify-center space-x-4">
            <button
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, role: 'user' }))}
              className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors ${
                formData.role === 'user'
                  ? 'bg-secondary/20 text-secondary border border-secondary'
                  : 'bg-white/5 text-background-light/70 border border-background-light/20 hover:bg-white/10'
              }`}
            >
              <User size={16} />
              <span>User</span>
            </button>
            <button
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, role: 'company' }))}
              className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors ${
                formData.role === 'company'
                  ? 'bg-secondary/20 text-secondary border border-secondary'
                  : 'bg-white/5 text-background-light/70 border border-background-light/20 hover:bg-white/10'
              }`}
            >
              <Building size={16} />
              <span>Company</span>
            </button>
          </div>

          <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              {/* First Name and Last Name (for users) */}
              {formData.role === 'user' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-background-light">
                      First Name
                    </label>
                    <div className="mt-1 relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                        <User className="h-5 w-5 text-background-light/50" />
                      </div>
                      <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        value={formData.firstName}
                        onChange={handleChange}
                        className={`block w-full pl-10 pr-3 py-2 border ${
                          errors.firstName ? 'border-error' : 'border-background-light/30'
                        } placeholder-background-light/50 text-background-light bg-white/5 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary sm:text-sm`}
                        placeholder="John"
                      />
                      {errors.firstName && (
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                          <AlertCircle className="h-5 w-5 text-error" />
                        </div>
                      )}
                    </div>
                    {errors.firstName && (
                      <p className="mt-1 text-xs text-error">{errors.firstName}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-background-light">
                      Last Name
                    </label>
                    <div className="mt-1 relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                        <User className="h-5 w-5 text-background-light/50" />
                      </div>
                      <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        value={formData.lastName}
                        onChange={handleChange}
                        className={`block w-full pl-10 pr-3 py-2 border ${
                          errors.lastName ? 'border-error' : 'border-background-light/30'
                        } placeholder-background-light/50 text-background-light bg-white/5 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary sm:text-sm`}
                        placeholder="Doe"
                      />
                      {errors.lastName && (
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                          <AlertCircle className="h-5 w-5 text-error" />
                        </div>
                      )}
                    </div>
                    {errors.lastName && (
                      <p className="mt-1 text-xs text-error">{errors.lastName}</p>
                    )}
                  </div>
                </div>
              ) : (
                <div>
                  <label htmlFor="companyName" className="block text-sm font-medium text-background-light">
                    Company Name
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                      <Building className="h-5 w-5 text-background-light/50" />
                    </div>
                    <input
                      id="companyName"
                      name="companyName"
                      type="text"
                      value={formData.companyName}
                      onChange={handleChange}
                      className={`block w-full pl-10 pr-3 py-2 border ${
                        errors.companyName ? 'border-error' : 'border-background-light/30'
                      } placeholder-background-light/50 text-background-light bg-white/5 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary sm:text-sm`}
                      placeholder="Your Company Inc."
                    />
                    {errors.companyName && (
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                        <AlertCircle className="h-5 w-5 text-error" />
                      </div>
                    )}
                  </div>
                  {errors.companyName && (
                    <p className="mt-1 text-xs text-error">{errors.companyName}</p>
                  )}
                </div>
              )}

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

              {/* Confirm Password */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-background-light">
                  Confirm Password
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                    <Lock className="h-5 w-5 text-background-light/50" />
                  </div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`block w-full pl-10 pr-10 py-2 border ${
                      errors.confirmPassword ? 'border-error' : 'border-background-light/30'
                    } placeholder-background-light/50 text-background-light bg-white/5 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary sm:text-sm`}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5 text-background-light/50" />
                    ) : (
                      <Eye className="h-5 w-5 text-background-light/50" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="mt-1 text-xs text-error">{errors.confirmPassword}</p>
                )}
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
                {isSubmitting ? 'Creating Account...' : formData.role === 'user' ? 'Create User Account' : 'Create Company Account'}
              </button>
            </div>

            {/* Already have an account? */}
            <div className="text-center">
              <p className="text-sm text-background-light/70">
                Already have an account?{' '}
                <a href="/signin" className="font-medium text-secondary hover:text-secondary-dark transition">
                  Sign in
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>

      {/* Right side - Image */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <img
          src="https://images.pexels.com/photos/7648513/pexels-photo-7648513.jpeg"
          alt="Event Planning"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary-dark/80 mix-blend-multiply" />
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-6">
              Join Our Community
            </h1>
            <p className="text-xl text-white/90 max-w-xl">
              Create an account today and start planning your next memorable event with our powerful tools and resources
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;