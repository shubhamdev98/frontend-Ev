import React from 'react';
import { useFormik } from 'formik';
import { Mail, Lock, AlertCircle, Eye, EyeOff, ArrowRight } from 'lucide-react';
import Logo from '../../../../../../assets/Logo.png';
import { Link } from 'react-router';
import { LoginValidation } from '../ruls';
import { useAppDispatch } from '../../../../../../store/hooks';
import { loginApi } from '../../../utils/slice';

const FormComponent = () => {
    const [showPassword, setShowPassword] = React.useState(false);
    const dispatch = useAppDispatch()
    const handleSubmit = async (data) => {
        console.log("data", data);
        await dispatch(loginApi(data)).then((res) => {
            console.log("res", res);

        }).catch((error) => {
            console.log("error", error);

        })
    }

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
        validationSchema: LoginValidation,
        onSubmit: handleSubmit
    });

    return (
        <div className="min-h-screen flex">
            {/* Left image */}
            <div className="hidden lg:block lg:w-1/2 relative">
                <img
                    src="https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg"
                    alt="Event"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/80 to-primary/80 mix-blend-multiply" />
                <div className="absolute inset-0 flex items-center justify-center p-12 text-center text-white">
                    <div>
                        <h1 className="text-4xl font-bold mb-6">Create Unforgettable Events</h1>
                        <p className="text-xl max-w-xl mx-auto">
                            Your all-in-one platform for planning, managing, and executing exceptional events
                        </p>
                    </div>
                </div>
            </div>

            {/* Right form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center bg-gradient-to-b from-primary-dark to-primary p-8">
                <div className="w-full max-w-md space-y-8 backdrop-blur-md p-8 rounded-2xl border border-white/10">
                    <div className="flex flex-col items-center space-y-4">
                        <Link to="/">
                            <img className="w-10" src={Logo} alt="Logo" />
                        </Link>
                        <p className="text-sm text-white/70">Sign in to your EventCraft account</p>
                    </div>

                    <form onSubmit={formik.handleSubmit} className="space-y-6">
                        {/* Email */}
                        <div>
                            <div className="mt-2 space-y-1">
                                <label htmlFor="email" className="block text-sm font-medium text-white">
                                    Email address
                                </label>

                                <div
                                    className={`flex items-center gap-2 px-3 py-2 rounded-md bg-white/5 border ${formik.errors.email
                                        ? 'border-red-500 focus-within:ring-2 focus-within:ring-red-500'
                                        : 'border-white/30 focus-within:ring-2 focus-within:ring-secondary'
                                        }`}
                                >
                                    <Mail className="h-5 w-5 text-white/50" />
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        className="flex-1 bg-transparent text-white placeholder-white/50 outline-none text-sm"
                                        placeholder="you@example.com"
                                    />
                                </div>

                                {formik.errors.email && (
                                    <p className="text-xs text-red-500">{formik.errors.email}</p>
                                )}
                            </div>

                        </div>

                        {/* Password */}
                        <div className="mt-4 space-y-1">
                            <label htmlFor="password" className="block text-sm font-medium text-white">
                                Password
                            </label>

                            <div
                                className={`flex items-center px-3 py-2 gap-2 rounded-md bg-white/5 border ${formik.errors.password
                                    ? 'border-red-500 focus-within:ring-2 focus-within:ring-red-500'
                                    : 'border-white/30 focus-within:ring-2 focus-within:ring-secondary'
                                    }`}
                            >
                                {/* Lock icon */}
                                <Lock className="h-5 w-5 text-white/50" />

                                {/* Input field */}
                                <input
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    placeholder="••••••••"
                                    className="flex-1 bg-transparent text-white placeholder-white/50 outline-none text-sm"
                                />

                                {/* Eye toggle button */}
                                <button type="button" onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? (
                                        <EyeOff className="h-5 w-5 text-white/50" />
                                    ) : (
                                        <Eye className="h-5 w-5 text-white/50" />
                                    )}
                                </button>
                            </div>

                            {/* Error */}
                            {formik.errors.password && (
                                <p className="text-xs text-red-500">{formik.errors.password}</p>
                            )}
                        </div>


                        {/* Remember Me */}
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
                            <Link to="/forgot-password" className="text-sm text-secondary hover:underline">
                                Forgot password?
                            </Link>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={formik.isSubmitting}
                            className="w-full flex justify-center items-center gap-2 py-3 px-4 rounded-lg text-sm font-medium text-white bg-secondary hover:bg-secondary-dark transition disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {formik.isSubmitting ? 'Signing in...' : 'Sign in'}
                            <ArrowRight
                                className={`h-5 w-5 transition-transform ${formik.isSubmitting ? 'animate-pulse' : 'group-hover:translate-x-1'
                                    }`}
                            />
                        </button>
                    </form>

                    <p className="text-center text-sm text-white/70">
                        Don't have an account?{' '}
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
