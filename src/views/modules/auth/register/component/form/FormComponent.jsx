import React, { useState } from 'react'
import { Link } from 'react-router'
import { Mail, Lock, AlertCircle, Eye, EyeOff, User, Building, ArrowRight } from 'lucide-react';
import Logo from '../../../../../../assets/Logo.png'
import { useFormik } from 'formik';
import { registerValidation } from '../ruls';

const FormComponent = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleSubmit = (data) => {
        console.log("data", data);

    }
    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            companyName: '',
            role: 'user',
        },
        validationSchema: registerValidation,
        onSubmit: handleSubmit,
    });
    return (
        <div>
            <div className="min-h-screen flex">
                {/* Left side - Sign Up Form */}
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

                        {/* {errors.general && (
                            <div className="p-4 bg-red-50 border border-red-100 rounded-lg text-red-600 text-sm flex items-start">
                                <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                                <span>{errors.general}</span>
                            </div>
                        )} */}

                        {/* Role Selection */}
                        <div className="flex justify-center space-x-4">
                            <button
                                type="button"
                                onClick={() => formik.setFieldValue('role', 'user')}
                                className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors ${formik.values.role === 'user'
                                    ? 'bg-secondary/20 text-secondary border border-secondary'
                                    : 'bg-white/5 text-background-light/70 border border-background-light/20 hover:bg-white/10'
                                    }`}
                            >
                                <User size={16} />
                                <span>User</span>
                            </button>

                            <button
                                type="button"
                                onClick={() => formik.setFieldValue('role', 'company')}
                                className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors ${formik.values.role === 'company'
                                    ? 'bg-secondary/20 text-secondary border border-secondary'
                                    : 'bg-white/5 text-background-light/70 border border-background-light/20 hover:bg-white/10'
                                    }`}
                            >
                                <Building size={16} />
                                <span>Company</span>
                            </button>
                        </div>


                        <form className="mt-6 space-y-6" onSubmit={formik.handleSubmit}>
                            <div className="space-y-4">
                                {/* First Name and Last Name (for users) */}
                                {formik.values.role === 'user' ? (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {/* First Name */}
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
                                                    value={formik.values.firstName}
                                                    onChange={formik.handleChange}
                                                    className={`block w-full pl-10 pr-3 py-2 border ${formik.errors.firstName ? 'border-error' : 'border-background-light/30'
                                                        } placeholder-background-light/50 text-background-light bg-white/5 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary sm:text-sm`}
                                                    placeholder="John"
                                                />
                                                {formik.errors.firstName && (
                                                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                                        <AlertCircle className="h-5 w-5 text-error" />
                                                    </div>
                                                )}
                                            </div>
                                            {formik.errors.firstName && (
                                                <p className="mt-1 text-xs text-error">{formik.errors.firstName}</p>
                                            )}
                                        </div>

                                        {/* Last Name */}
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
                                                    value={formik.values.lastName}  // Using formik.values for consistency
                                                    onChange={formik.handleChange}  // Consistent onChange handler
                                                    className={`block w-full pl-10 pr-3 py-2 border ${formik.errors.lastName ? 'border-error' : 'border-background-light/30'
                                                        } placeholder-background-light/50 text-background-light bg-white/5 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary sm:text-sm`}
                                                    placeholder="Doe"
                                                />
                                                {formik.errors.lastName && (
                                                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                                        <AlertCircle className="h-5 w-5 text-error" />
                                                    </div>
                                                )}
                                            </div>
                                            {formik.errors.lastName && (
                                                <p className="mt-1 text-xs text-error">{formik.errors.lastName}</p>
                                            )}
                                        </div>
                                    </div>

                                ) : (
                                    <div>
                                        <label htmlFor="companyName" className="block text-sm font-medium text-background-light">
                                            Company Name
                                        </label>
                                        <div className="mt-1 relative">
                                            {/* Icon inside the input field */}
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                                                <Building className="h-5 w-5 text-background-light/50" />
                                            </div>

                                            {/* Input Field */}
                                            <input
                                                id="companyName"
                                                name="companyName"
                                                type="text"
                                                value={formik.values.companyName} // Using formik for consistent state management
                                                onChange={formik.handleChange} // Consistent formik handleChange
                                                className={`block w-full pl-10 pr-3 py-2 border ${formik.errors.companyName ? 'border-error' : 'border-background-light/30'}
        placeholder-background-light/50 text-background-light bg-white/5 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary sm:text-sm`}
                                                placeholder="Your Company Inc."
                                            />

                                            {/* Error Icon */}
                                            {formik.errors.companyName && (
                                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                                    <AlertCircle className="h-5 w-5 text-error" />
                                                </div>
                                            )}
                                        </div>

                                        {/* Error Message */}
                                        {formik.errors.companyName && (
                                            <p className="mt-1 text-xs text-error">{formik.errors.companyName}</p>
                                        )}
                                    </div>


                                )}

                                {/* Email */}
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-background-light">
                                        Email address
                                    </label>
                                    <div className="mt-1 flex items-center border rounded-lg bg-white/5
                  focus-within:ring-2 focus-within:ring-secondary
                  focus-within:border-secondary
                  border-background-light/30">
                                        <div className="pl-3">
                                            <Mail className="h-5 w-5 text-background-light/50" />
                                        </div>
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            value={formik.values.email}
                                            onChange={formik.handleChange}
                                            className="flex-1 py-2 px-3 text-sm bg-transparent text-background-light placeholder-background-light/50 focus:outline-none"
                                            placeholder="you@example.com"
                                        />
                                    </div>
                                    {formik.errors.email && (
                                        <p className="mt-1 text-xs text-error">{formik.errors.email}</p>
                                    )}
                                </div>

                                {/* Repeat similar layout for Password and Confirm Password */}


                                {/* Password Field */}
                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-background-light">
                                        Password
                                    </label>
                                    <div className="mt-1 flex items-center border rounded-lg bg-white/5
                  focus-within:ring-2 focus-within:ring-secondary
                  focus-within:border-secondary
                  border-background-light/30">
                                        <div className="pl-3">
                                            <Lock className="h-5 w-5 text-background-light/50" />
                                        </div>
                                        <input
                                            id="password"
                                            name="password"
                                            type={showPassword ? 'text' : 'password'}
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
                                        <p className="mt-1 text-xs text-error">{formik.errors.password}</p>
                                    )}
                                </div>



                                {/* Confirm Password */}
                                <div>
                                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-background-light">
                                        Confirm Password
                                    </label>
                                    <div
                                        className={`mt-1 flex items-center border rounded-lg bg-white/5 ${formik.errors.confirmPassword ? 'border-error' : 'border-background-light/30'
                                            } focus-within:ring-2 focus-within:ring-secondary focus-within:border-secondary`}
                                    >
                                        {/* Lock Icon */}
                                        <div className="pl-3">
                                            <Lock className="h-5 w-5 text-background-light/50" />
                                        </div>

                                        {/* Input Field */}
                                        <input
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            type={showConfirmPassword ? 'text' : 'password'}
                                            value={formik.values.confirmPassword}
                                            onChange={formik.handleChange}
                                            className="flex-1 py-2 px-3 text-sm bg-transparent text-background-light placeholder-background-light/50 focus:outline-none"
                                            placeholder="••••••••"
                                        />

                                        {/* Toggle Visibility Button */}
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="px-3"
                                        >
                                            {showConfirmPassword ? (
                                                <EyeOff className="h-5 w-5 text-background-light/50" />
                                            ) : (
                                                <Eye className="h-5 w-5 text-background-light/50" />
                                            )}
                                        </button>
                                    </div>

                                    {/* Error Message */}
                                    {formik.errors.confirmPassword && (
                                        <p className="mt-1 text-xs text-error">{formik.errors.confirmPassword}</p>
                                    )}
                                </div>


                            </div>

                            <div>
                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={!formik.isValid || formik.isSubmitting}
                                    className="w-full cursor-pointer flex justify-center py-3 px-4 border border-transparent rounded-lg text-sm font-medium text-white bg-gradient-to-r from-secondary to-secondary-light hover:from-secondary-dark hover:to-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary transform transition-all duration-150 hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    <span className="flex items-center pr-3">
                                        <ArrowRight
                                            size={18}
                                            className={`text-secondary-light transition-transform duration-300 ${formik.isSubmitting ? 'animate-pulse' : 'group-hover:translate-x-1'
                                                }`}
                                        />
                                    </span>
                                    {formik.isSubmitting
                                        ? 'Creating Account...'
                                        : formik.values.role === 'user'
                                            ? 'Create User Account'
                                            : 'Create Company Account'}
                                </button>

                            </div>

                            {/* Already have an account? */}
                            <div className="text-center mt-4">
                                <p className="text-sm text-background-light/70">
                                    Already have an account?{' '}
                                    {/* <a href="/signin" className="font-medium text-secondary hover:text-secondary-dark transition">
                                        Sign in
                                    </a> */}
                                    <Link
                                        to={"/signin"}
                                        className="font-medium text-secondary hover:text-secondary-dark transition"
                                    >Sign in</Link>
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
        </div>
    )
}

export default FormComponent
