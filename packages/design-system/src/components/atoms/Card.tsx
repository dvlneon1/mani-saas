import React from 'react';
import { View, Pressable, PressableProps } from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

/**
 * Card component with variants and pressable support
 * Border radius: lg (12px)
 * Shadow: sm by default
 */

const cardVariants = cva('rounded-lg bg-[#FFFFFF]', {
  variants: {
    variant: {
      default: 'shadow-sm',
      elevated: 'shadow-md bg-[#FFFFFF]',
      outlined: 'border border-[#E5E7EB]',
      interactive: 'shadow-sm active:scale-[0.98] transition-transform',
    },
    padding: {
      none: '',
      sm: 'p-3',
      default: 'p-4',
      lg: 'p-6',
    },
  },
  defaultVariants: {
    variant: 'default',
    padding: 'default',
  },
});

export interface CardProps
  extends VariantProps<typeof cardVariants>,
    Omit<PressableProps, 'children'> {
  /**
   * Card content
   */
  children: React.ReactNode;
  /**
   * Enable press interaction
   */
  pressable?: boolean;
  /**
   * Additional class names
   */
  className?: string;
}

export const Card = React.forwardRef<View, CardProps>(
  (
    {
      children,
      variant,
      padding,
      pressable = false,
      className,
      onPress,
      ...props
    },
    ref
  ) => {
    const isInteractive = pressable || !!onPress || variant === 'interactive';

    if (isInteractive) {
      return (
        <Pressable
          ref={ref as any}
          className={cn(cardVariants({ variant, padding }), className)}
          onPress={onPress}
          accessibilityRole="button"
          {...props}
        >
          {children}
        </Pressable>
      );
    }

    return (
      <View
        ref={ref as any}
        className={cn(cardVariants({ variant, padding }), className)}
      >
        {children}
      </View>
    );
  }
);

Card.displayName = 'Card';
