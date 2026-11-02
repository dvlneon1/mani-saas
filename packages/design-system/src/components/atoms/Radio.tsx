import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const radioVariants = cva('w-5 h-5 rounded-full border-2 flex-items-center justify-center transition-colors', {
  variants: {
    checked: {
      true: 'border-[#8B5CF6]',
      false: 'border-[#E5E7EB]',
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

export interface RadioProps
  extends VariantProps<typeof radioVariants> {
  /** Checked state */
  checked?: boolean;
  /** Change handler */
  onChange?: (checked: boolean) => void;
  /** Label text */
  label?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Additional class names */
  className?: string;
  /** Value for form submission */
  value?: string;
}

export const Radio = React.forwardRef<View, RadioProps>(
  (
    {
      checked = false,
      onChange,
      label,
      disabled = false,
      className,
      ...props
    },
    ref
  ) => {
    const handlePress = () => {
      if (!disabled) {
        onChange?.(true);
      }
    };

    return (
      <Pressable
        ref={ref as any}
        onPress={handlePress}
        className={cn('flex-row items-center gap-2', className)}
        accessibilityRole="radio"
        accessibilityState={{ checked, disabled }}
        accessibilityLabel={label}
        disabled={disabled}
        {...props}
      >
        <View className={cn(radioVariants({ checked, disabled }))}>
          {checked && (
            <View className="w-2.5 h-2.5 rounded-full bg-[#8B5CF6]" />
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

Radio.displayName = 'Radio';