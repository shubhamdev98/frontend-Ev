import React from 'react';
import { Loader } from 'lucide-react';

const LoadingOverlay = ({ text = "Loading..." }) => (
  <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center">
    <div className="text-center bg-white p-6 rounded-xl shadow-lg">
      <Loader size={48} className="animate-spin text-indigo-600 mx-auto mb-4" />
      <p className="text-gray-800 font-medium">{text}</p>
    </div>
  </div>
);

export default LoadingOverlay;
