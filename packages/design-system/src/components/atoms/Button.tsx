import React from 'react';
import { Pressable, Text, ActivityIndicator, View, PressableProps } from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

/**
 * Button component with variants, sizes, and states
 * Touch target minimum: 48dp (tokens.touchTargets.min)
 */

const buttonVariants = cva(
  'flex-row items-center justify-center rounded-lg active:opacity-80 transition-opacity',
  {
    variants: {
      variant: {
        default: 'bg-[#8B5CF6] active:bg-[#7C3AED]',
        secondary: 'bg-[#EC4899] active:bg-[#DB2777]',
        outline: 'border-2 border-[#8B5CF6] bg-transparent',
        ghost: 'bg-transparent active:bg-gray-100',
        destructive: 'bg-[#EF4444] active:bg-[#DC2626]',
        link: 'bg-transparent',
      },
      size: {
        default: 'h-12 px-6 min-h-[48px]',
        sm: 'h-10 px-4 min-h-[48px]',
        lg: 'h-14 px-8 min-h-[48px]',
        icon: 'h-12 w-12 min-h-[48px] min-w-[48px]',
      },
      disabled: {
        true: 'opacity-50',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      disabled: false,
    },
  }
);

const buttonTextVariants = cva('font-medium text-center', {
  variants: {
    variant: {
      default: 'text-white',
      secondary: 'text-white',
      outline: 'text-[#8B5CF6]',
      ghost: 'text-[#111827]',
      destructive: 'text-white',
      link: 'text-[#8B5CF6] underline',
    },
    size: {
      default: 'text-[14px]',
      sm: 'text-[12px]',
      lg: 'text-[16px]',
      icon: 'text-[14px]',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

export interface ButtonProps
  extends Omit<PressableProps, 'children' | 'disabled'>,
    VariantProps<typeof buttonVariants> {
  /**
   * Button label text
   */
  children: React.ReactNode;
  /**
   * Icon to display on the left
   */
  leftIcon?: React.ReactNode;
  /**
   * Icon to display on the right
   */
  rightIcon?: React.ReactNode;
  /**
   * Loading state - shows spinner
   */
  isLoading?: boolean;
  /**
   * Additional class names
   */
  className?: string;
  /**
   * Additional text class names
   */
  textClassName?: string;
}

export const Button = React.forwardRef<View, ButtonProps>(
  (
    {
      children,
      variant,
      size,
      disabled,
      isLoading = false,
      leftIcon,
      rightIcon,
      className,
      textClassName,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || isLoading;

    return (
      <Pressable
        ref={ref as any}
        disabled={isDisabled}
        className={cn(
          buttonVariants({ variant, size, disabled: isDisabled }),
          className
        )}
        accessibilityRole="button"
        accessibilityState={{ disabled: isDisabled, busy: isLoading }}
        {...props}
      >
        {isLoading ? (
          <ActivityIndicator
            color={
              variant === 'outline' || variant === 'ghost' || variant === 'link'
                ? '#8B5CF6'
                : '#FFFFFF'
            }
          />
        ) : (
          <>
            {leftIcon && <View className="mr-2">{leftIcon}</View>}
            <Text
              className={cn(
                buttonTextVariants({ variant, size }),
                textClassName
              )}
            >
              {children}
            </Text>
            {rightIcon && <View className="ml-2">{rightIcon}</View>}
          </>
        )}
      </Pressable>
    );
  }
);

Button.displayName = 'Button';
