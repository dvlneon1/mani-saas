import React from 'react';
import { Image, View, Text } from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

/**
 * Avatar component for user profile images
 * Supports image, initials, and placeholder modes
 * Border radius: full
 */

const avatarVariants = cva('rounded-full bg-[#E5E7EB] items-center justify-center overflow-hidden', {
  variants: {
    size: {
      sm: 'w-8 h-8',
      default: 'w-10 h-10',
      lg: 'w-12 h-12',
      xl: 'w-16 h-16',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

const avatarTextVariants = cva('font-medium text-white', {
  variants: {
    size: {
      sm: 'text-[12px]',
      default: 'text-[14px]',
      lg: 'text-[16px]',
      xl: 'text-[20px]',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

const onlineIndicatorVariants = cva(
  'absolute bottom-0 right-0 rounded-full border-2 border-white bg-[#10B981]',
  {
    variants: {
      size: {
        sm: 'w-2.5 h-2.5',
        default: 'w-3 h-3',
        lg: 'w-3.5 h-3.5',
        xl: 'w-4 h-4',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
);

export interface AvatarProps extends VariantProps<typeof avatarVariants> {
  /**
   * Image source URL
   */
  src?: string;
  /**
   * User name for initials fallback
   */
  name?: string;
  /**
   * Show online status indicator
   */
  onlineIndicator?: boolean;
  /**
   * Additional class names
   */
  className?: string;
  /** Children content (initials fallback) */
  children?: React.ReactNode;
}

/**
 * Get initials from name
 */
function getInitials(name: string): string {
  const words = name.trim().split(' ');
  if (words.length === 1) {
    return words[0].charAt(0).toUpperCase();
  }
  return (words[0].charAt(0) + words[words.length - 1].charAt(0)).toUpperCase();
}

/**
 * Get consistent background color from name
 */
function getAvatarColor(name: string): string {
  const colors = ['#8B5CF6', '#EC4899', '#F97316', '#10B981', '#3B82F6'];
  const index = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return colors[index % colors.length];
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  name,
  size,
  onlineIndicator = false,
  className,
}) => {
  const hasImage = !!src;
  const hasName = !!name;
  const initials = hasName ? getInitials(name) : '';
  const bgColor = hasName ? getAvatarColor(name) : '#9CA3AF';

  return (
    <View className={cn(avatarVariants({ size }), className)}>
      {hasImage ? (
        <Image
          source={{ uri: src }}
          className="w-full h-full"
          accessibilityLabel={name ? `Avatar de ${name}` : 'Avatar'}
        />
      ) : hasName ? (
        <View
          className="w-full h-full items-center justify-center"
          style={{ backgroundColor: bgColor }}
        >
          <Text className={avatarTextVariants({ size })}>{initials}</Text>
        </View>
      ) : (
        <View className="w-full h-full items-center justify-center bg-[#E5E7EB]">
          <Text className={cn(avatarTextVariants({ size }), 'text-[#9CA3AF]')}>
            ?
          </Text>
        </View>
      )}
      {onlineIndicator && (
        <View className={onlineIndicatorVariants({ size })} />
      )}
    </View>
  );
};
