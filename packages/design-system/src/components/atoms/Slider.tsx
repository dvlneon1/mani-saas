import React from 'react';
import { View, Text } from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const sliderVariants = cva('flex-1', {
  variants: {},
  defaultVariants: {},
});

export interface SliderProps
  extends VariantProps<typeof sliderVariants> {
  /** Current value */
  value?: number;
  /** Change handler */
  onChange?: (value: number) => void;
  /** Minimum value */
  minimumValue?: number;
  /** Maximum value */
  maximumValue?: number;
  /** Step increment */
  step?: number;
  /** Disabled state */
  disabled?: boolean;
  /** Show value label */
  showValue?: boolean;
  /** Value formatter */
  formatValue?: (value: number) => string;
  /** Minimum track color */
  minimumTrackTintColor?: string;
  /** Maximum track color */
  maximumTrackTintColor?: string;
  /** Thumb color */
  thumbTintColor?: string;
  /** Additional class names */
  className?: string;
  /** Label */
  label?: string;
}

export const Slider = React.forwardRef<React.ElementRef<typeof View>, SliderProps>(
  (
    {
      value = 0,
      onChange,
      minimumValue = 0,
      maximumValue = 100,
      step = 1,
      disabled = false,
      showValue = false,
      formatValue,
      minimumTrackTintColor = '#8B5CF6',
      maximumTrackTintColor = '#E5E7EB',
      thumbTintColor = '#8B5CF6',
      label,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <View
        ref={ref as any}
        className={cn(sliderVariants(), 'flex-col gap-2', className)}
        {...props}
      >
        {label && (
          <View className="flex-row items-center justify-between">
            <Text className="font-medium text-[13px] text-[#111827]">{label}</Text>
            {showValue && (
              <Text className="font-mono text-[12px] text-[#8B5CF6]">
                {formatValue ? formatValue(value) : value}
              </Text>
            )}
          </View>
        )}

        <View
          className="w-full h-1 bg-[#E5E7EB] rounded-full"
          style={{ height: 4 }}
        >
          <View
            className="h-full bg-[#8B5CF6] rounded-full"
            style={{ width: `${((value - minimumValue) / (maximumValue - minimumValue)) * 100}%` }}
          />
          <View
            className="absolute left-[calc(50%-6px)] top-[-6px] w-3 h-3 rounded-full bg-[#8B5CF6] border-2 border-white shadow-sm"
            style={{
              left: `${((value - minimumValue) / (maximumValue - minimumValue)) * 100}%`,
            }}
          />
        </View>
      </View>
    );
  }
);

Slider.displayName = 'Slider';