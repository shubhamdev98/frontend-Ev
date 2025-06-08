import { Check } from 'lucide-react'
import React from 'react'

const VerificationSuccessful = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-primary-dark to-primary">
            <div className="bg-white/10 p-8 rounded-2xl max-w-md w-full border border-background-light/20">
                <div className="text-center space-y-4">
                    <div className="bg-green-500/20 p-3 rounded-full inline-block">
                        <Check className="h-8 w-8 text-green-500" />
                    </div>
                    <h2 className="text-xl font-bold text-background-light">Verification Successful!</h2>
                    <p className="text-sm text-background-light/70">Redirecting...</p>
                </div>
            </div>
        </div>
    )
}

export default VerificationSuccessful
