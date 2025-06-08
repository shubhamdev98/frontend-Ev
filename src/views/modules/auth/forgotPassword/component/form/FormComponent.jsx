import React from "react";
import { Link } from "react-router"; // For react-router v3; use react-router-dom for v4+
import { Mail, ArrowLeft } from "lucide-react"; // Lucide icons
import Logo from "../../../../../../assets/Logo.png";

const FormComponent = ({ formik }) => {
  const isSubmitting = formik.isSubmitting;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-primary-dark to-primary py-10 px-4">
      <div className="w-full max-w-md space-y-8 bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-background-light/20">
        <div className="flex flex-col items-center space-y-4">
          <Link to="/" className="transition-transform hover:scale-105">
            <img className="w-12" src={Logo} alt="Logo" />
          </Link>
          <h2 className="text-lg font-bold text-background-light text-center">
            Crystal Event Management System
          </h2>
          <div className="text-center space-y-2">
            <h3 className="text-lg font-semibold text-background-light">
              Reset Your Password
            </h3>
            <p className="text-sm text-background-light/70">
              Enter your email and we'll send you a verification code
            </p>
          </div>
        </div>

        <form className="space-y-6" onSubmit={formik.handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-background-light"
            >
              Email address
            </label>
            <div className="mt-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="w-4 h-4 text-background-light/50" />
              </div>
              <input
                autoFocus
                name="email"
                type="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                className={`block w-full pl-10 pr-3 py-2 border ${
                  formik.errors.email && formik.touched.email
                    ? "border-error"
                    : "border-background-light/30"
                } placeholder-background-light/50 text-background-light bg-white/5 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary sm:text-sm`}
                placeholder="you@example.com"
              />
            </div>
            {formik.errors.email && (
              <p className="mt-2 text-sm text-error flex items-center">
                {formik.errors.email}
              </p>
            )}
          </div>

          <div className="flex flex-col space-y-4">
            <button
              type="submit"
              disabled={!formik.isValid || !formik.dirty}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-sm font-medium text-white bg-gradient-to-r from-secondary to-secondary-light hover:from-secondary-dark hover:to-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Sending..." : "Send Verification Code"}
            </button>

            <div className="text-center pt-2">
              <Link
                to="/signin"
                className="inline-flex items-center justify-center text-sm font-medium text-secondary hover:text-secondary-dark transition group"
              >
                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                Back to Sign In
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormComponent;