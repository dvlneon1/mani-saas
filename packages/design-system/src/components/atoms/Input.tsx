import React from 'react';
import { TextInput, View, Text, TextInputProps } from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

/**
 * Input component with label, error, and helper text
 * React Hook Form compatible via ref forwarding
 * Accessibility: aria-label, aria-invalid, aria-describedby
 */

const inputVariants = cva(
  'rounded-lg border px-4 py-3 text-[14px] text-[#111827] bg-[#FFFFFF]',
  {
    variants: {
      variant: {
        default: 'border-[#E5E7EB]',
        error: 'border-[#EF4444]',
      },
      state: {
        default: '',
        focused: 'border-[#8B5CF6]',
        disabled: 'opacity-50 bg-gray-50',
        filled: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      state: 'default',
    },
  }
);

const labelVariants = cva('text-[14px] font-medium mb-1.5 text-[#111827]');

const helperTextVariants = cva('text-[12px] mt-1', {
  variants: {
    type: {
      default: 'text-[#9CA3AF]',
      error: 'text-[#EF4444]',
    },
  },
  defaultVariants: {
    type: 'default',
  },
});

export interface InputProps
  extends Omit<TextInputProps, 'value' | 'placeholder'>,
    VariantProps<typeof inputVariants> {
  /**
   * Label text displayed above input
   */
  label?: string;
  /**
   * Error message - displays in red and applies error styling
   */
  error?: string;
  /**
   * Helper text displayed below input
   */
  helperText?: string;
  /**
   * Icon to display on the left
   */
  leftIcon?: React.ReactNode;
  /**
   * Icon to display on the right
   */
  rightIcon?: React.ReactNode;
  /**
   * Additional container class names
   */
  containerClassName?: string;
  /**
   * Additional input class names
   */
  className?: string;
  /**
   * Controlled input value
   */
  value?: string;
  /**
   * Placeholder text
   */
  placeholder?: string;
}

export const Input: React.ForwardRefExoticComponent<
  InputProps & React.RefAttributes<TextInput>
> = React.forwardRef<TextInput, InputProps>(
  (
    {
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      variant,
      state,
      containerClassName,
      className,
      editable = true,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = React.useState(false);

    const currentState = state ?? (isFocused ? 'focused' : props.value ? 'filled' : 'default');
    const currentVariant = variant ?? (error ? 'error' : 'default');

    const helperId = props.id ? `${props.id}-helper` : undefined;
    const errorId = props.id ? `${props.id}-error` : undefined;

    return (
      <View className={cn('w-full', containerClassName)}>
        {label && (
          <Text className={labelVariants()} accessibilityRole="text">
            {label}
          </Text>
        )}
        <View className="relative flex-row items-center">
          {leftIcon && (
            <View className="absolute left-3 z-10">{leftIcon}</View>
          )}
          <TextInput
            ref={ref as any}
            className={cn(
              inputVariants({ variant: currentVariant, state: currentState }),
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              className
            )}
            placeholderTextColor="#9CA3AF"
            editable={editable && !error}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            accessibilityLabel={label ?? props.accessibilityLabel}
            {...props}
          />
          {rightIcon && (
            <View className="absolute right-3 z-10">{rightIcon}</View>
          )}
        </View>
        {error && (
          <Text
            id={errorId}
            className={helperTextVariants({ type: 'error' })}
            accessibilityRole="alert"
          >
            {error}
          </Text>
        )}
        {!error && helperText && (
          <Text id={helperId} className={helperTextVariants()}>
            {helperText}
          </Text>
        )}
      </View>
    );
  }
);

Input.displayName = 'Input';
