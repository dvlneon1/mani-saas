import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

/**
 * Spinner component for loading states
 * Uses ActivityIndicator with theming
 */

const spinnerVariants = cva('', {
  variants: {
    size: {
      sm: '',
      default: '',
      lg: '',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

const sizeMap = {
  sm: 'small' as const,
  default: 'small' as const,
  lg: 'large' as const,
};

export interface SpinnerProps extends VariantProps<typeof spinnerVariants> {
  /**
   * Spinner color - defaults to primary
   */
  color?: string;
  /**
   * Additional class names
   */
  className?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({
  size = 'default',
  color = '#8B5CF6',
  className,
}) => {
  const activitySize = size ? sizeMap[size] : 'small';
  
  return (
    <View className={cn(spinnerVariants({ size }), className)}>
      <ActivityIndicator size={activitySize} color={color} />
    </View>
  );
};
