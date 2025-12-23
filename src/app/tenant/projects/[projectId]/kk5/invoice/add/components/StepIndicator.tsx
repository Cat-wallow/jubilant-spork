'use client';

interface Step {
  number: number;
  label: string;
  active: boolean;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
}

export function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div className="flex w-full max-w-sm flex-col items-center gap-4">
      {/* Circles with Line */}
      <div className="flex w-full items-center">
        {steps.map((step, index) => (
          <div key={step.number} className="flex flex-1 items-center">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                currentStep >= step.number
                  ? 'border-blue-600 bg-blue-600 text-white'
                  : 'border-gray-300 bg-white text-gray-400'
              }`}
            >
              <span className="text-base font-normal">{step.number}</span>
            </div>
            {index < steps.length - 1 && (
              <div className="h-0.5 flex-1 bg-gray-300"></div>
            )}
          </div>
        ))}
      </div>

      {/* Labels */}
      <div className="grid w-full grid-cols-2 gap-16">
        {steps.map((step) => (
          <div key={step.number} className="text-center">
            <p
              className={`text-sm font-normal ${
                currentStep >= step.number ? 'text-blue-600' : 'text-gray-500'
              }`}
            >
              {step.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
