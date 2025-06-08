import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, ArrowLeft, AlertCircle, Check, Clock } from 'lucide-react';
import { useLocation, useNavigate, NavLink } from 'react-router';
import Logo from '../assets/Logo.png';

const VerifyOTP = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || '';
  
  const [otp, setOtp] = useState(['', '', '', '']);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [isExpired, setIsExpired] = useState(false);
  const [isResending, setIsResending] = useState(false);
  
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  
  // Redirect to forgot password if no email is provided
  // useEffect(() => {
  //   if (!email) {
  //     navigate('/forgot-password');
  //   }
  // }, [email, navigate]);
  
  // OTP expiration timer
  useEffect(() => {
    if (timeLeft > 0 && !isExpired && !success) {
      const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timerId);
    } else if (timeLeft === 0 && !isExpired) {
      setIsExpired(true);
      setError('Your verification code has expired. Please request a new one.');
    }
  }, [timeLeft, isExpired, success]);

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Handle input changes
  const handleChange = (index, value) => {
    if (isNaN(value)) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    // Auto-focus next input
    if (value && index < 3) {
      inputRefs[index + 1].current.focus();
    }
    
    // Clear error when user starts typing
    if (error) setError('');
  };
  
  // Handle keyboard navigation between inputs
  const handleKeyDown = (index, e) => {
    // Move to previous input on backspace
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs[index - 1].current.focus();
    }
    
    // Allow arrow key navigation
    if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs[index - 1].current.focus();
    }
    if (e.key === 'ArrowRight' && index < 3) {
      inputRefs[index + 1].current.focus();
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if OTP is complete
    if (otp.some(digit => !digit)) {
      setError('Please enter the complete verification code');
      return;
    }
    
    // Check if OTP is expired
    if (isExpired) {
      setError('Your verification code has expired. Please request a new one.');
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const otpString = otp.join('');
      console.log('Verifying OTP:', otpString, 'for email:', email);
      
      // For demo, we'll consider "1234" as valid OTP
      if (otpString === '1234') {
        setSuccess(true);
        setError('');
        
        // Navigate to home page after short delay
        setTimeout(() => {
          navigate('/', { replace: true });
        }, 1500);
      } else {
        setError('Invalid verification code. Please try again.');
      }
    } catch (err) {
      setError('Verification failed. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Handle resend OTP
  const handleResendOTP = async () => {
    try {
      setIsResending(true);
      setError('');
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Resending OTP to:', email);
      
      // Reset the timer and expired state
      setTimeLeft(300);
      setIsExpired(false);
      setOtp(['', '', '', '']);
      
      // Auto-focus first input after resetting
      setTimeout(() => {
        if (inputRefs[0].current) {
          inputRefs[0].current.focus();
        }
      }, 100);
      
    } catch (err) {
      setError('Failed to resend verification code. Please try again later.');
    } finally {
      setIsResending(false);
    }
  };

  // If success, show success message
  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-primary-dark to-primary py-10 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8 bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-background-light/20 animate-fadeIn">
          <div className="flex flex-col items-center space-y-4">
            <div className="bg-green-500/20 p-3 rounded-full">
              <Check className="h-8 w-8 text-green-500" />
            </div>
            <h2 className="text-xl font-bold text-background-light text-center">
              Verification Successful!
            </h2>
            <p className="text-sm text-background-light/70 text-center">
              Redirecting you to home page...
            </p>
          </div>
        </div>
      </div>
    );
  }

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
              Enter Verification Code
            </h3>
            <p className="text-sm text-background-light/70 text-center">
              We've sent a verification code to <span className="font-medium">{email}</span>
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
            <div className="flex justify-between items-center">
              <label className="block text-sm font-medium text-background-light">
                Verification Code
              </label>
              <div className={`flex items-center text-xs ${
                isExpired ? 'text-red-400' : timeLeft < 60 ? 'text-amber-400' : 'text-background-light/70'
              }`}>
                <Clock className="h-3.5 w-3.5 mr-1" />
                <span>{isExpired ? 'Expired' : formatTime(timeLeft)}</span>
              </div>
            </div>
            
            <div className="mt-2">
              <div className="flex justify-center space-x-3 sm:space-x-4">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={inputRefs[index]}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-12 h-14 sm:w-14 sm:h-16 text-center text-xl font-bold bg-white/5 border border-background-light/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary text-background-light"
                    autoFocus={index === 0}
                    disabled={isSubmitting}
                  />
                ))}
              </div>
              
              <p className="mt-2 text-xs text-center text-background-light/70">
                Enter the 4-digit code sent to your email
              </p>
            </div>
          </div>

          <div className="flex flex-col space-y-4">
            <button
              type="submit"
              disabled={isSubmitting || isExpired}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-sm font-medium text-white bg-gradient-to-r from-secondary to-secondary-light hover:from-secondary-dark hover:to-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary transform transition-all duration-150 hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <span className="absolute right-3 inset-y-0 flex items-center">
                <ArrowRight 
                  size={18} 
                  className={`text-secondary-light group-hover:text-secondary-lighter transition-transform duration-300 ${isSubmitting ? 'animate-pulse' : 'group-hover:translate-x-1'}`} 
                />
              </span>
              {isSubmitting ? 'Verifying...' : 'Verify Code'}
            </button>
            
            <div className="flex flex-col sm:flex-row sm:justify-between items-center pt-2 space-y-4 sm:space-y-0">
              <NavLink 
                to="/forgot-password"
                className="inline-flex items-center justify-center text-sm font-medium text-secondary hover:text-secondary-dark transition group"
              >
                <ArrowLeft className="h-4 w-4 mr-2 transition-transform duration-300 group-hover:-translate-x-1" />
                Back
              </NavLink>
              
              <button
                type="button"
                onClick={handleResendOTP}
                disabled={isResending || (!isExpired && timeLeft > 0)}
                className={`text-sm font-medium flex items-center ${
                  isResending || (!isExpired && timeLeft > 0)
                    ? 'text-background-light/40 cursor-not-allowed'
                    : 'text-secondary hover:text-secondary-dark cursor-pointer'
                }`}
              >
                {isResending ? (
                  <span className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 animate-spin" />
                    Resending...
                  </span>
                ) : (
                  <span>Resend Code</span>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerifyOTP;