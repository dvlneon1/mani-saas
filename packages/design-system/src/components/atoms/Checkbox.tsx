import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const checkboxVariants = cva('w-5 h-5 rounded border-2 flex-items-center justify-center transition-colors', {
  variants: {
    checked: {
      true: 'bg-[#8B5CF6] border-[#8B5CF6]',
      false: 'border-[#E5E7EB] bg-white',
    },
    disabled: {
      true: 'opacity-50',
      false: '',
    },
  },
  defaultVariants: {
    checked: false,
    disabled: false,
  },
});

export interface CheckboxProps
  extends VariantProps<typeof checkboxVariants> {
  /** Checked state */
  checked?: boolean;
  /** Change handler */
  onChange?: (checked: boolean) => void;
  /** Label text */
  label?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Indeterminate state */
  indeterminate?: boolean;
  /** Additional class names */
  className?: string;
  /** Name for form submission */
  name?: string;
  /** Value for form submission */
  value?: string;
}

export const Checkbox = React.forwardRef<View, CheckboxProps>(
  (
    {
      checked = false,
      onChange,
      label,
      disabled = false,
      indeterminate = false,
      className,
      ...props
    },
    ref
  ) => {
    const handlePress = () => {
      if (!disabled) {
        onChange?.(!checked);
      }
    };

    return (
      <Pressable
        ref={ref as any}
        onPress={handlePress}
        className={cn('flex-row items-center gap-2', className)}
        accessibilityRole="checkbox"
        accessibilityState={{ checked, disabled }}
        accessibilityLabel={label}
        disabled={disabled}
        {...props}
      >
        <View
          className={cn(checkboxVariants({ checked, disabled }))}
        >
          {checked && !indeterminate && (
            <Text className="text-white text-[12px] font-bold leading-none">✓</Text>
          )}
          {indeterminate && (
            <View className="w-2.5 h-0.5 bg-white rounded" />
          )}
        </View>
        {label && (
          <Text
            className={cn(
              'text-[14px] text-[#111827]',
              disabled && 'text-[#9CA3AF]'
            )}
          >
            {label}
          </Text>
        )}
      </Pressable>
    );
  }
);

Checkbox.displayName = 'Checkbox';