import React from 'react';
import { View, Pressable, Text, Switch as RNSwitch } from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const switchVariants = cva('', {
  variants: {
    size: {
      sm: '',
      md: '',
      lg: '',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

const thumbSize = {
  sm: 16,
  md: 20,
  lg: 24,
};

const trackSize = {
  sm: { width: 36, height: 20 },
  md: { width: 44, height: 24 },
  lg: { width: 52, height: 28 },
};

export interface SwitchProps
  extends VariantProps<typeof switchVariants> {
  /** Checked state */
  value?: boolean;
  /** Change handler */
  onChange?: (value: boolean) => void;
  /** Disabled state */
  disabled?: boolean;
  /** Thumb color when checked */
  thumbColor?: string;
  /** Track color when checked */
  trackColor?: { true: string; false: string };
  /** Additional class names */
  className?: string;
  /** Label */
  label?: string;
}

export const Switch = React.forwardRef<React.ElementRef<typeof View>, SwitchProps>(
  (
    {
      value = false,
      onChange,
      disabled = false,
      thumbColor = '#FFFFFF',
      trackColor = { true: '#8B5CF6', false: '#E5E7EB' },
      size = 'md',
      label,
      className,
      ...props
    },
    ref
  ) => {
    const handleChange = (newValue: boolean) => {
      if (!disabled) {
        onChange?.(newValue);
      }
    };

    return (
      <View
        ref={ref as any}
        className={cn(switchVariants({ size }), 'flex-row items-center gap-2', className)}
        {...props}
      >
        {label && (
          <Text className={cn('text-[14px] text-[#111827]', disabled && 'text-[#9CA3AF]')}>
            {label}
          </Text>
        )}
        <RNSwitch
          value={value}
          onValueChange={handleChange}
          disabled={disabled}
          thumbColor={thumbColor}
          trackColor={trackColor}
        />
      </View>
    );
  }
);

Switch.displayName = 'Switch';