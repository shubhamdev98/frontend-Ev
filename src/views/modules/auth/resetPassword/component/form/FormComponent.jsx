import React, { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";
import Logo from "../../../../../../assets/Logo.png";
import { Link } from "react-router";
import LoadingOverlay from "../../../../../../components/LoadingOverlay";

const FormComponent = ({ formik, isLoading }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-primary-dark to-primary py-10 px-4">
      {isLoading && <LoadingOverlay text="Resetting Password..." />}
      <div className="w-full max-w-md space-y-8 bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-background-light/20">
        <div className="flex flex-col items-center space-y-4">
          <Link to="/" className="transition-transform hover:scale-105">
            <img className="w-12" src={Logo} alt="Logo" />
          </Link>
          <h2 className="text-lg font-bold text-background-light text-center">
            Reset Your Password
          </h2>
        </div>

        <form className="space-y-6" onSubmit={formik.handleSubmit}>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-background-light"
            >
              New Password
            </label>
            <div className="mt-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="w-4 h-4 text-background-light/50" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                name="new_password"
                autoComplete="new-password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.new_password}
                className={`block w-full pl-10 pr-10 py-2 border ${
                  formik.errors.new_password
                    ? "border-error"
                    : "border-background-light/30"
                } placeholder-background-light/50 text-background-light bg-white/5 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary sm:text-sm`}
                placeholder="Enter new password"
              />
              <div
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4 text-background-light/50" />
                ) : (
                  <Eye className="w-4 h-4 text-background-light/50" />
                )}
              </div>
            </div>
            {formik.errors.new_password && (
              <p className="mt-2 text-sm text-error">
                {formik.errors.new_password}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-background-light"
            >
              Confirm Password
            </label>
            <div className="mt-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="w-4 h-4 text-background-light/50" />
              </div>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                autoComplete="new-password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmPassword}
                className={`block w-full pl-10 pr-10 py-2 border ${
                  formik.errors.confirmPassword
                    ? "border-error"
                    : "border-background-light/30"
                } placeholder-background-light/50 text-background-light bg-white/5 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary sm:text-sm`}
                placeholder="Confirm your password"
              />
              <div
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-4 h-4 text-background-light/50" />
                ) : (
                  <Eye className="w-4 h-4 text-background-light/50" />
                )}
              </div>
            </div>
            {formik.errors.confirmPassword && (
              <p className="mt-2 text-sm text-error">
                {formik.errors.confirmPassword}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!formik.isValid || !formik.dirty}
            className="group relative w-full flex justify-center py-3 px-4 cursor-pointer border border-transparent rounded-lg text-sm font-medium text-white bg-gradient-to-r from-secondary to-secondary-light hover:from-secondary-dark hover:to-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {formik.isSubmitting ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormComponent;