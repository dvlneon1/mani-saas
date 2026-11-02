import React from 'react';
import { View, Text } from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

/**
 * Divider component for separating content
 * Supports horizontal and vertical orientations
 */

const dividerVariants = cva('bg-[#E5E7EB]', {
  variants: {
    orientation: {
      horizontal: 'w-full h-px',
      vertical: 'h-full w-px',
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
  },
});

export interface DividerProps extends VariantProps<typeof dividerVariants> {
  /**
   * Optional label for horizontal divider
   */
  label?: string;
  /**
   * Additional class names
   */
  className?: string;
}

export const Divider: React.FC<DividerProps> = ({
  orientation = 'horizontal',
  label,
  className,
}) => {
  if (orientation === 'vertical') {
    return (
      <View
        className={cn(dividerVariants({ orientation }), className)}
        accessibilityRole="none"
      />
    );
  }

  if (label) {
    return (
      <View
        className="flex-row items-center my-4"
        accessibilityRole="none"
      >
        <View className={cn(dividerVariants({ orientation }), 'flex-1')} />
        <Text className="mx-3 text-[12px] text-[#9CA3AF]">{label}</Text>
        <View className={cn(dividerVariants({ orientation }), 'flex-1')} />
      </View>
    );
  }

  return (
    <View
      className={cn(dividerVariants({ orientation }), 'my-2', className)}
      accessibilityRole="none"
    />
  );
};
