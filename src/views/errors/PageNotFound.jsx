import React from 'react'
import { Link } from 'react-router'

const PageNotFound = () => {
    return (
        <>
            <div
                className="min-h-screen flex items-center justify-center bg-cover bg-center"
                style={{
                    backgroundImage:
                        "url('https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg ')",
                }}
            >
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-primary-dark/80 to-primary/80"></div>

                {/* Content */}
                <div className="relative z-10 w-full max-w-md space-y-8 backdrop-blur-md p-8 rounded-2xl border border-background-light/10 animate-fadeIn text-center">
                    {/* 404 Message */}
                    <h1 className="text-6xl font-bold text-white">404</h1>
                    <p className="text-2xl font-medium text-white">Page Not Found</p>
                    <p className="text-base text-background-light/70">
                        The page you're looking for doesn't exist or has been moved.
                    </p>

                    {/* Back Home Button */}
                    <Link
                        to="/"
                        className="inline-flex justify-center py-3 px-4 border border-transparent rounded-lg text-sm font-medium text-white bg-gradient-to-r from-secondary to-secondary-light hover:from-secondary-dark hover:to-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary transform transition-all duration-150 hover:-translate-y-0.5 w-full"
                    >
                        Go Back Home
                    </Link>
                </div>
            </div>
        </>
    )
}

export default PageNotFound
