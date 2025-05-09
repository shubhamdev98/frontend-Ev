import React, { useState, useEffect, useRef } from 'react';
import { Mail, ArrowRight, ArrowLeft, AlertCircle, RefreshCw } from 'lucide-react';
import { useNavigate, NavLink, useLocation } from 'react-router';
import Logo from '../assets/Logo.png';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [showResend, setShowResend] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isResend = location.state?.resend;

  const emailInputRef = useRef(null);

  useEffect(() => {
    emailInputRef.current?.focus();
  }, []);

  const validateEmail = (email) => {
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setShowResend(false);

    if (!email.trim()) {
      setError('Email is required');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email');
      return;
    }

    try {
      setIsSubmitting(true);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      console.log('Password reset requested for:', email);

      // Navigate to OTP verification page with email
      navigate('/verify-otp', { state: { email } });
    } catch (err) {
      setError('Failed to process your request. Please try again later.');
      setShowResend(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-primary-dark to-primary py-10 px-4 sm:px-6 lg:px-8">
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
              {isResend ? 'Resend Verification Code' : 'Reset Your Password'}
            </h3>
            <p className="text-sm text-background-light/70 text-center">
              {isResend
                ? 'Enter your email to receive a new verification code'
                : "Enter your email and we'll send you a verification code"}
            </p>
          </div>
        </div>

        {error && (
          <div className="p-4 bg-red-50 border border-red-100 rounded-lg text-red-600 text-sm flex items-start animate-fadeIn">
            <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-background-light">
              Email address
            </label>
            <div className="mt-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                <Mail className="h-5 w-5 text-background-light/50" />
              </div>
              <input
                ref={emailInputRef}
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`block w-full pl-10 pr-3 py-2 border ${
                  error ? 'border-error' : 'border-background-light/30'
                } placeholder-background-light/50 text-background-light bg-white/5 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary sm:text-sm`}
                placeholder="you@example.com"
              />
              {error && (
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <AlertCircle className="h-5 w-5 text-error" />
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col space-y-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-sm font-medium text-white bg-gradient-to-r from-secondary to-secondary-light hover:from-secondary-dark hover:to-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary transform transition-all duration-150 hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <span className="absolute right-3 inset-y-0 flex items-center">
                {isResend ? (
                  <RefreshCw
                    size={18}
                    className={`text-secondary-light group-hover:text-secondary-lighter transition-transform duration-300 ${
                      isSubmitting ? 'animate-spin' : 'group-hover:rotate-180'
                    }`}
                  />
                ) : (
                  <ArrowRight
                    size={18}
                    className={`text-secondary-light group-hover:text-secondary-lighter transition-transform duration-300 ${
                      isSubmitting ? 'animate-pulse' : 'group-hover:translate-x-1'
                    }`}
                  />
                )}
              </span>
              {isSubmitting ? 'Sending...' : isResend ? 'Resend Code' : 'Send Verification Code'}
            </button>

            <div className="text-center pt-2">
              <NavLink
                to="/signin"
                className="inline-flex items-center justify-center text-sm font-medium text-secondary hover:text-secondary-dark transition group"
              >
                <ArrowLeft className="h-4 w-4 mr-2 transition-transform duration-300 group-hover:-translate-x-1" />
                Back to Sign In
              </NavLink>
            </div>

            {showResend && !isResend && (
              <div className="text-center pt-2">
                <NavLink
                  to="/forgot-password"
                  state={{ resend: true }}
                  className="inline-flex items-center justify-center text-sm font-medium text-secondary hover:text-secondary-dark transition group"
                >
                  <RefreshCw className="h-4 w-4 mr-2 transition-transform duration-300 group-hover:rotate-180" />
                  Resend Verification Code
                </NavLink>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
