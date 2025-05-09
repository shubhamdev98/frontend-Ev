import React from 'react';
import { Loader } from 'lucide-react';

const Loading = ({ text = "Loading..." }) => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <div className="text-center">
      <Loader size={48} className="mx-auto mb-4 animate-spin text-indigo-500" />
      <p className="text-gray-600">{text}</p>
    </div>
  </div>
);

export default Loading;
