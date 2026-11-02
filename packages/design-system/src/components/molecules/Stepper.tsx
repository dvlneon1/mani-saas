import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import { Button } from '../atoms/Button';
import { Input } from '../atoms/Input';

const stepperVariants = cva('flex-1', {
  variants: {
    orientation: {
      vertical: 'flex-col',
      horizontal: 'flex-row',
    },
  },
  defaultVariants: {
    orientation: 'vertical',
  },
});

const stepIndicatorVariants = cva('flex-row items-center gap-3', {
  variants: {
    orientation: {
      vertical: 'flex-col gap-4',
      horizontal: 'flex-row',
    },
  },
  defaultVariants: {
    orientation: 'vertical',
  },
});

export interface Step {
  id: string;
  label: string;
  icon?: React.ReactNode;
  content: React.ReactNode;
  validation?: () => boolean | Promise<boolean>;
  isOptional?: boolean;
}

export interface StepperProps {
  /** Steps configuration */
  steps: Step[];
  /** Current step index */
  currentStep?: number;
  /** Step change handler */
  onStepChange?: (index: number) => void;
  /** Finish handler */
  onFinish?: (data: Record<string, any>) => void;
  /** Orientation */
  orientation?: 'vertical' | 'horizontal';
  /** Show step numbers */
  showNumbers?: boolean;
  /** Allow clicking step indicators to navigate */
  allowStepClick?: boolean;
  /** Next button text */
  nextText?: string;
  /** Previous button text */
  prevText?: string;
  /** Finish button text */
  finishText?: string;
  /** Additional class names */
  className?: string;
  /** Validate on step change */
  validateOnChange?: boolean;
}

export const Stepper = React.forwardRef<React.ElementRef<typeof View>, StepperProps>(
  (
    {
      steps,
      currentStep = 0,
      onStepChange,
      onFinish,
      orientation = 'vertical',
      showNumbers = true,
      allowStepClick = true,
      nextText = 'Próximo',
      prevText = 'Voltar',
      finishText = 'Finalizar',
      className,
      validateOnChange = true,
    },
    ref
  ) => {
    const [activeStep, setActiveStep] = React.useState(currentStep);
    const [completedSteps, setCompletedSteps] = React.useState<Set<number>>(new Set());
    const [isValidating, setIsValidating] = React.useState(false);

    const handleNext = async () => {
      if (validateOnChange && steps[activeStep].validation) {
        setIsValidating(true);
        const isValid = await steps[activeStep].validation!();
        setIsValidating(false);
        if (!isValid) return;
      }

      setCompletedSteps(prev => new Set([...prev, activeStep]));
      if (activeStep < steps.length - 1) {
        const next = activeStep + 1;
        setActiveStep(next);
        onStepChange?.(next);
      } else if (onFinish) {
        // Collect form data from steps (would need refs in real implementation)
        onFinish({});
      }
    };

    const handlePrev = () => {
      if (activeStep > 0) {
        const prev = activeStep - 1;
        setActiveStep(prev);
        onStepChange?.(prev);
      }
    };

    const handleStepClick = (index: number) => {
      if (!allowStepClick) return;
      if (index <= activeStep || completedSteps.has(index - 1)) {
        setActiveStep(index);
        onStepChange?.(index);
      }
    };

    const renderStepIndicator = () => (
      <View className={cn(stepIndicatorVariants({ orientation }), 'mb-6')}>
        {steps.map((step, index) => {
          const isActive = index === activeStep;
          const isCompleted = completedSteps.has(index);
          const isClickable = allowStepClick && (index <= activeStep || isCompleted);

          return (
            <Pressable
              key={step.id}
              onPress={() => handleStepClick(index)}
              disabled={!isClickable}
              className="flex-row items-center gap-2"
              accessibilityRole="button"
              accessibilityLabel={`Passo ${index + 1}: ${step.label}`}
              accessibilityState={{ selected: isActive, disabled: !isClickable }}
            >
              <View className="flex-row items-center justify-center flex-shrink-0">
                <View
                  className={cn(
                    'w-8 h-8 rounded-full flex-items-center justify-center border-2 transition-colors',
                    isCompleted
                      ? 'bg-[#10B981] border-[#10B981]'
                      : isActive
                      ? 'bg-[#8B5CF6] border-[#8B5CF6]'
                      : 'bg-white border-[#E5E7EB]'
                  )}
                >
                  {isCompleted ? (
                    <Text className="text-white text-[12px] font-bold">✓</Text>
                  ) : showNumbers ? (
                    <Text className={cn(
                      'font-bold text-[12px]',
                      isActive ? 'text-white' : 'text-[#9CA3AF]'
                    )}>
                      {index + 1}
                    </Text>
                  ) : (
                    step.icon
                  )}
                </View>
              </View>
              {orientation === 'vertical' && (
                <View className="flex-1 flex-col items-start gap-0.5">
                  <Text className={cn(
                    'font-medium text-[13px]',
                    isActive || isCompleted ? 'text-[#111827]' : 'text-[#9CA3AF]'
                  )}>
                    {step.label}
                  </Text>
                  {step.isOptional && (
                    <Text className="text-[10px] text-[#9CA3AF]">(opcional)</Text>
                  )}
                </View>
              )}
              {index < steps.length - 1 && orientation === 'vertical' && (
                <View
                  className="absolute left-3 top-8 bottom-8 w-0.5"
                  style={{
                    backgroundColor: isCompleted ? '#10B981' : '#E5E7EB',
                  }}
                />
              )}
            </Pressable>
          );
        })}
      </View>
    );

    const renderHorizontalIndicator = () => (
      <View className="flex-row items-center mb-6">
        {steps.map((step, index) => {
          const isActive = index === activeStep;
          const isCompleted = completedSteps.has(index);

          return (
            <View key={step.id} className="flex-1 flex-row items-center">
              <View className="flex-row items-center gap-2">
                <View
                  className={cn(
                    'w-8 h-8 rounded-full flex-items-center justify-center border-2 flex-shrink-0',
                    isCompleted
                      ? 'bg-[#10B981] border-[#10B981]'
                      : isActive
                      ? 'bg-[#8B5CF6] border-[#8B5CF6]'
                      : 'bg-white border-[#E5E7EB]'
                  )}
                >
                  {isCompleted ? (
                    <Text className="text-white text-[12px] font-bold">✓</Text>
                  ) : showNumbers ? (
                    <Text className={cn(
                      'font-bold text-[12px]',
                      isActive ? 'text-white' : 'text-[#9CA3AF]'
                    )}>
                      {index + 1}
                    </Text>
                  ) : (
                    step.icon
                  )}
                </View>
                <Text className={cn(
                  'font-medium text-[12px] hidden sm:block',
                  isActive || isCompleted ? 'text-[#111827]' : 'text-[#9CA3AF]'
                )}>
                  {step.label}
                </Text>
              </View>
              {index < steps.length - 1 && (
                <View
                  className="flex-1 h-0.5 mx-2"
                  style={{ backgroundColor: isCompleted ? '#10B981' : '#E5E7EB' }}
                />
              )}
            </View>
          );
        })}
      </View>
    );

    return (
      <View ref={ref} className={cn(stepperVariants({ orientation }), className)}>
        {orientation === 'vertical' ? renderStepIndicator() : renderHorizontalIndicator()}

        <View className="flex-1">
          {steps[activeStep]?.content}
        </View>

        <View className="flex-row items-center justify-between gap-3 mt-6 pt-4 border-t border-[#E5E7EB]">
          {activeStep > 0 && (
            <Button variant="outline" onPress={handlePrev} disabled={isValidating}>
              {prevText}
            </Button>
          )}
          <View className="flex-row items-center gap-2 ml-auto">
            {activeStep < steps.length - 1 ? (
              <Button
                variant="default"
                onPress={handleNext}
                disabled={isValidating}
                isLoading={isValidating}
              >
                {nextText}
              </Button>
            ) : (
              <Button
                variant="default"
                onPress={handleNext}
                disabled={isValidating}
                isLoading={isValidating}
              >
                {finishText}
              </Button>
            )}
          </View>
        </View>
      </View>
    );
  }
);

Stepper.displayName = 'Stepper';