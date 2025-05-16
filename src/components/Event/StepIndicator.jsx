import React from "react";
import { CheckCircle } from "lucide-react";

const StepIndicator = ({ steps, currentStep }) => {
  return (
    <div className="px-6 pt-2 pb-4">
      <div className="flex items-center">
        {steps.map((step, index) => {
          const isCompleted = step.id < currentStep;
          const isCurrent = step.id === currentStep;
          
          return (
            <React.Fragment key={step.id}>
              {/* Step circle */}
              <div className="relative flex items-center justify-center">
                <div
                  className={`
                    w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200
                    ${isCompleted ? 'bg-indigo-600' : isCurrent ? 'bg-indigo-600' : 'bg-gray-200'}
                  `}
                >
                  {isCompleted ? (
                    <CheckCircle size={20} className="text-white" />
                  ) : (
                    <span className={`text-sm font-medium ${isCurrent ? 'text-white' : 'text-gray-600'}`}>
                      {step.id}
                    </span>
                  )}
                </div>
                
                {/* Step label */}
                <div className="absolute -bottom-6 whitespace-nowrap">
                  <span className={`text-xs font-medium ${isCurrent ? 'text-indigo-700' : 'text-gray-500'}`}>
                    {step.name}
                  </span>
                </div>
              </div>
              
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div 
                  className={`
                    flex-1 h-1 mx-2
                    ${index < currentStep - 1 ? 'bg-indigo-600' : 'bg-gray-200'}
                  `}
                ></div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default StepIndicator;