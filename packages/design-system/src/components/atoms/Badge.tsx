import React from 'react';
import { View, Text } from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

/**
 * Badge component for status, tags, and counts
 * Supports dot indicator and count display
 */

const badgeVariants = cva(
  'flex-row items-center justify-center rounded-full',
  {
    variants: {
      variant: {
        default: 'bg-[#E5E7EB]',
        success: 'bg-[#10B981]',
        warning: 'bg-[#F59E0B]',
        destructive: 'bg-[#EF4444]',
        secondary: 'bg-[#EC4899]',
      },
      size: {
        sm: 'px-2 py-0.5 min-h-[20px]',
        default: 'px-3 py-1 min-h-[24px]',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

const badgeTextVariants = cva('font-medium', {
  variants: {
    variant: {
      default: 'text-[#4B5563]',
      success: 'text-white',
      warning: 'text-[#78350F]',
      destructive: 'text-white',
      secondary: 'text-white',
    },
    size: {
      sm: 'text-[10px]',
      default: 'text-[12px]',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

const dotVariants = cva('rounded-full', {
  variants: {
    variant: {
      default: 'bg-[#4B5563]',
      success: 'bg-white',
      warning: 'bg-[#78350F]',
      destructive: 'bg-white',
      secondary: 'bg-white',
    },
    size: {
      sm: 'w-1.5 h-1.5',
      default: 'w-2 h-2',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

export interface BadgeProps extends VariantProps<typeof badgeVariants> {
  /**
   * Badge label text
   */
  children?: React.ReactNode;
  /**
   * Show dot indicator before text
   */
  dot?: boolean;
  /**
   * Count number to display
   */
  count?: number;
  /**
   * Additional class names
   */
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  dot = false,
  count,
  variant,
  size,
  className,
}) => {
  const showCount = count !== undefined;
  const displayText = showCount ? (count > 99 ? '99+' : String(count)) : children;

  if (!displayText && !dot) return null;

  return (
    <View
      className={cn(badgeVariants({ variant, size }), className)}
      accessibilityRole="text"
    >
      {dot && (
        <View className={cn(dotVariants({ variant, size }), children && 'mr-1.5')} />
      )}
      {displayText && (
        <Text className={badgeTextVariants({ variant, size })}>
          {displayText}
        </Text>
      )}
    </View>
  );
};
