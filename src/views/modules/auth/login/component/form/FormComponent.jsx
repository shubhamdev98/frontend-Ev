
import React, { useCallback, useState } from "react";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import Logo from "../../../../../../assets/Logo.png";
import { Link } from "react-router";
import { LoginSocialGoogle } from "reactjs-social-login";
import { GoogleLoginButton } from "react-social-login-buttons";
import LoadingOverlay from "../../../../../../components/LoadingOverlay";

const FormComponent = ({ formik, isLoading, handleGoogleLogin }) => {
  const [showPassword, setShowPassword] = useState(false);

  const onLoginStart = useCallback(() => {
    alert("Login started");
  }, []);

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {isLoading && <LoadingOverlay />}

      {/* Left Panel */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <img
          src="https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg"
          alt="Event"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/80 to-primary/80 mix-blend-multiply" />
        <div className="absolute inset-0 flex items-center justify-center p-12 text-center text-white">
          <div>
            <h1 className="text-4xl font-bold mb-6">
              Create Unforgettable Events
            </h1>
            <p className="text-xl max-w-xl mx-auto">
              Your all-in-one platform for planning, managing, and executing
              exceptional events.
            </p>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-gradient-to-b from-primary-dark to-primary px-4 py-12">
        <div className="w-full max-w-md bg-white/5 backdrop-blur-lg p-8 rounded-2xl border border-white/10 shadow-lg space-y-6">
          {/* Logo & Heading */}
          <div className="text-center space-y-2">
            <Link to="/">
              <img src={Logo} alt="Logo" className="w-10 mx-auto" />
            </Link>
            <p className="text-white/80 text-sm">
              Sign in to your EventCraft account
            </p>
          </div>

          {/* Google Login */}
          <div className="flex justify-center w-full">
            <LoginSocialGoogle
              client_id={
                "1234567890-abcdefghijklmnopqrstuvwxyz.apps.googleusercontent.com"
              }
              onLoginStart={onLoginStart}
              redirect_uri={"/"}
              scope="openid profile email"
              discoveryDocs="claims_supported"
              access_type="offline"
              onResolve={({ provider, data }) => {
                const socialId = data?.sub;

                const payload = {
                  email: data?.email,
                  name: data?.name,
                  socialId,
                  loginType: "google",
                };

                handleGoogleLogin(payload);
              }}
              onReject={(err) => console.log("Google Login Error:", err)}
            >
              <GoogleLoginButton />
            </LoginSocialGoogle>
          </div>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-grow h-px bg-white/20" />
            <span className="mx-4 text-white/60 text-sm">
              Or sign in with email
            </span>
            <div className="flex-grow h-px bg-white/20" />
          </div>

          {/* Form */}
          <form onSubmit={formik.handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-white mb-1"
              >
                Email address
              </label>
              <div
                className={`flex items-center gap-2 px-3 py-2 rounded-md bg-white/5 border ${
                  formik.errors.email
                    ? "border-red-500 focus-within:ring-red-500"
                    : "border-white/30 focus-within:ring-secondary"
                } focus-within:ring-2`}
              >
                <Mail className="w-5 h-5 text-white/50" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  placeholder="you@example.com"
                  className="flex-1 bg-transparent text-white placeholder-white/50 outline-none text-sm"
                />
              </div>
              {formik.errors.email && (
                <p className="text-xs text-red-500 mt-1">
                  {formik.errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-white mb-1"
              >
                Password
              </label>
              <div
                className={`flex items-center gap-2 px-3 py-2 rounded-md bg-white/5 border ${
                  formik.errors.password
                    ? "border-red-500 focus-within:ring-red-500"
                    : "border-white/30 focus-within:ring-secondary"
                } focus-within:ring-2`}
              >
                <Lock className="w-5 h-5 text-white/50" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  placeholder="••••••••"
                  className="flex-1 bg-transparent text-white placeholder-white/50 outline-none text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5 text-white/50" />
                  ) : (
                    <Eye className="w-5 h-5 text-white/50" />
                  )}
                </button>
              </div>
              {formik.errors.password && (
                <p className="text-xs text-red-500 mt-1">
                  {formik.errors.password}
                </p>
              )}
            </div>

            {/* Remember Me & Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex items-center text-sm text-white">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formik.values.rememberMe}
                  onChange={formik.handleChange}
                  className="mr-2 h-4 w-4 text-secondary border-white/30 bg-transparent"
                />
                Remember me
              </label>
              <Link
                to="/forgot-password"
                className="text-sm text-secondary hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="w-full flex justify-center items-center gap-2 py-3 px-4 rounded-lg text-sm font-medium text-white bg-secondary hover:bg-secondary-dark transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {formik.isSubmitting ? "Signing in..." : "Sign in"}
              <ArrowRight
                className={`w-5 h-5 transition-transform ${
                  formik.isSubmitting
                    ? "animate-pulse"
                    : "group-hover:translate-x-1"
                }`}
              />
            </button>
          </form>

          {/* Sign Up Link */}
          <p className="text-center text-sm text-white/70">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-secondary hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FormComponent;
