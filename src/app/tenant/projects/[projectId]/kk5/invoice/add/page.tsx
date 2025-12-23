'use client';

import { useState } from 'react';
import { StepIndicator } from './components/StepIndicator';
import { BASTSelection } from './components/BASTSelection';
import { InvoiceConfiguration } from './components/InvoiceConfiguration';
import data from './data.json';

export default function AddInvoicePage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedBAST, setSelectedBAST] = useState<string[]>(['bast-008']);

  const handleNext = () => {
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center gap-8 p-6">
      {/* Step Indicator */}
      <StepIndicator steps={data.steps} currentStep={currentStep} />

      {/* Content */}
      <div className="w-full max-w-6xl">
        {currentStep === 1 && (
          <BASTSelection
            bastList={data.bastList}
            selectedBAST={selectedBAST}
            onSelectBAST={setSelectedBAST}
            onNext={handleNext}
          />
        )}
        {currentStep === 2 && (
          <InvoiceConfiguration
            selectedBAST={selectedBAST}
            onPrevious={handlePrevious}
          />
        )}
      </div>
    </div>
  );
}
