// --------------- FormComponent.jsx --------------------------

import React, { useState } from "react";
import { Link } from "react-router";
import {Mail,Lock,Eye,EyeOff,User,Building,ArrowRight,} from "lucide-react";
import Logo from "../../../../../../assets/Logo.png";
import RoleBtn from "./RoleBtn";
import RightSideImage from "./RightSideImage";

const FormComponent = ({ formik }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div>
      <div className="min-h-screen flex">
        <div className="w-full lg:w-1/2 flex items-center justify-center bg-gradient-to-b from-primary-dark to-primary p-8">
          <div className="w-full max-w-md space-y-8 backdrop-blur-md p-8 rounded-2xl border border-background-light/10 animate-fadeIn">
            <div className="flex flex-col items-center space-y-6">
              <Link to="/" className="transition-transform hover:scale-105">
                <img className="w-10" src={Logo} alt="Logo" />
              </Link>
              <div className="space-y-2">
                <p className="text-sm text-background-light/70 text-center">
                  Join EventCraft and start planning your perfect event
                </p>
              </div>
            </div>

            <RoleBtn formik={formik} />

            <form className="mt-6 space-y-6" onSubmit={formik.handleSubmit}>
              <div className="space-y-4">
                {formik.values.role === "user" ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="first_name"
                        className="block text-sm font-medium text-background-light"
                      >
                        First Name
                      </label>
                      <div className="mt-1 relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                          <User className="h-5 w-5 text-background-light/50" />
                        </div>
                        <input
                          name="first_name"
                          type="text"
                          value={formik.values.first_name}
                          onChange={formik.handleChange}
                          className={`block w-full pl-10 pr-3 py-2 border ${
                            formik.errors.first_name
                              ? "border-error"
                              : "border-background-light/30"
                          } placeholder-background-light/50 text-background-light bg-white/5 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary sm:text-sm`}
                          placeholder="John"
                        />
                      </div>
                      {formik.errors.first_name && (
                        <p className="mt-1 text-xs text-error">
                          {formik.errors.first_name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="last_name"
                        className="block text-sm font-medium text-background-light"
                      >
                        Last Name
                      </label>
                      <div className="mt-1 relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                          <User className="h-5 w-5 text-background-light/50" />
                        </div>
                        <input
                          name="last_name"
                          type="text"
                          value={formik.values.last_name} // Using formik.values for consistency
                          onChange={formik.handleChange} // Consistent onChange handler
                          className={`block w-full pl-10 pr-3 py-2 border ${
                            formik.errors.last_name
                              ? "border-error"
                              : "border-background-light/30"
                          } placeholder-background-light/50 text-background-light bg-white/5 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary sm:text-sm`}
                          placeholder="Doe"
                        />
                      </div>
                      {formik.errors.last_name && (
                        <p className="mt-1 text-xs text-error">
                          {formik.errors.last_name}
                        </p>
                      )}
                    </div>
                  </div>
                ) : (
                  <div>
                    <label
                      htmlFor="companyName"
                      className="block text-sm font-medium text-background-light"
                    >
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
                        value={formik.values.companyName} // Using formik for consistent state management
                        onChange={formik.handleChange} // Consistent formik handleChange
                        className={`block w-full pl-10 pr-3 py-2 border ${
                          formik.errors.companyName
                            ? "border-error"
                            : "border-background-light/30"
                        }
        placeholder-background-light/50 text-background-light bg-white/5 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary sm:text-sm`}
                        placeholder="Your Company Inc."
                      />
                    </div>

                    {formik.errors.companyName && (
                      <p className="mt-1 text-xs text-error">
                        {formik.errors.companyName}
                      </p>
                    )}
                  </div>
                )}

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-background-light"
                  >
                    Email address
                  </label>
                  <div
                    className="mt-1 flex items-center border rounded-lg bg-white/5
                  focus-within:ring-2 focus-within:ring-secondary
                  focus-within:border-secondary
                  border-background-light/30"
                  >
                    <div className="pl-3">
                      <Mail className="h-5 w-5 text-background-light/50" />
                    </div>
                    <input
                      name="email"
                      type="email"
                      autoComplete="off"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      className="flex-1 py-2 px-3 text-sm bg-transparent text-background-light placeholder-background-light/50 focus:outline-none"
                      placeholder="you@example.com"
                    />
                  </div>
                  {formik.errors.email && (
                    <p className="mt-1 text-xs text-error">
                      {formik.errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-background-light"
                  >
                    Password
                  </label>
                  <div
                    className="mt-1 flex items-center border rounded-lg bg-white/5
                  focus-within:ring-2 focus-within:ring-secondary
                  focus-within:border-secondary
                  border-background-light/30"
                  >
                    <div className="pl-3">
                      <Lock className="h-5 w-5 text-background-light/50" />
                    </div>
                    <input
                      id="password"
                      name="password"
                      autoComplete="new-password"
                      type={showPassword ? "text" : "password"}
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      className="flex-1 py-2 px-3 text-sm bg-transparent text-background-light placeholder-background-light/50 focus:outline-none"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="px-3"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-background-light/50" />
                      ) : (
                        <Eye className="h-5 w-5 text-background-light/50" />
                      )}
                    </button>
                  </div>
                  {formik.errors.password && (
                    <p className="mt-1 text-xs text-error">
                      {formik.errors.password}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-background-light"
                  >
                    Confirm Password
                  </label>
                  <div
                    className={`mt-1 flex items-center border rounded-lg bg-white/5 ${
                      formik.errors.confirmPassword
                        ? "border-error"
                        : "border-background-light/30"
                    } focus-within:ring-2 focus-within:ring-secondary focus-within:border-secondary`}
                  >
                    <div className="pl-3">
                      <Lock className="h-5 w-5 text-background-light/50" />
                    </div>

                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={formik.values.confirmPassword}
                      onChange={formik.handleChange}
                      className="flex-1 py-2 px-3 text-sm bg-transparent text-background-light placeholder-background-light/50 focus:outline-none"
                      placeholder="••••••••"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="px-3"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-5 w-5 text-background-light/50" />
                      ) : (
                        <Eye className="h-5 w-5 text-background-light/50" />
                      )}
                    </button>
                  </div>

                  {formik.errors.confirmPassword && (
                    <p className="mt-1 text-xs text-error">
                      {formik.errors.confirmPassword}
                    </p>
                  )}
                </div>
              </div>

              <div>
                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={!formik.isValid || !formik.dirty}
                  className="w-full cursor-pointer flex justify-center py-3 px-4 border border-transparent rounded-lg text-sm font-medium text-white bg-gradient-to-r from-secondary to-secondary-light hover:from-secondary-dark hover:to-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary transform transition-all duration-150 hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  <span className="flex items-center pr-3">
                    <ArrowRight
                      size={18}
                      className={`text-secondary-light transition-transform duration-300 ${
                        formik.isSubmitting
                          ? "animate-pulse"
                          : "group-hover:translate-x-1"
                      }`}
                    />
                  </span>
                  {formik.isSubmitting
                    ? "Creating Account..."
                    : formik.values.role === "user"
                    ? "Create User Account"
                    : "Create Company Account"}
                </button>
              </div>

              <div className="text-center mt-4">
                <p className="text-sm text-background-light/70">
                  Already have an account?{" "}
                  <Link
                    to={"/signin"}
                    className="font-medium text-secondary hover:text-secondary-dark transition"
                  >
                    Sign in
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>

        {/* Right side - Image */}
        <RightSideImage />
      </div>
    </div>
  );
};

export default FormComponent;
