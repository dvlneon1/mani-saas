import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import { Radio } from './Radio';

const groupVariants = cva('flex-col gap-2', {
  variants: {
    orientation: {
      vertical: 'flex-col gap-2',
      horizontal: 'flex-row flex-wrap gap-3',
    },
  },
  defaultVariants: {
    orientation: 'vertical',
  },
});

export interface RadioOption {
  value: any;
  label: string;
  disabled?: boolean;
}

export interface RadioGroupProps
  extends VariantProps<typeof groupVariants> {
  /** Current value */
  value?: any;
  /** Change handler */
  onChange?: (value: any) => void;
  /** Options */
  options: RadioOption[];
  /** Disabled state */
  disabled?: boolean;
  /** Orientation */
  orientation?: 'vertical' | 'horizontal';
  /** Additional class names */
  className?: string;
}

export const RadioGroup = React.forwardRef<React.ElementRef<typeof View>, RadioGroupProps>(
  (
    {
      value,
      onChange,
      options,
      disabled = false,
      orientation = 'vertical',
      className,
      ...props
    },
    ref
  ) => {
    return (
      <View
        ref={ref}
        className={cn(groupVariants({ orientation }), className)}
        role="radiogroup"
        {...props}
      >
        {options.map((option, index) => (
          <Radio
            key={option.value}
            value={option.value}
            checked={value === option.value}
            onChange={(checked) => checked && onChange?.(option.value)}
            label={option.label}
            disabled={disabled || option.disabled}
          />
        ))}
      </View>
    );
  }
);

RadioGroup.displayName = 'RadioGroup';