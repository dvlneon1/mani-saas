import React from 'react';
import { View, Text, Pressable, PressableProps } from 'react-native';
import { cn } from '../../utils/cn';

/**
 * ListItem component for displaying items in a list
 * Supports leading and trailing content
 */

export interface ListItemProps extends Omit<PressableProps, 'children'> {
  /**
   * Main title text
   */
  title: string;
  /**
   * Optional subtitle text
   */
  subtitle?: string;
  /**
   * Leading content (avatar, icon, etc.)
   */
  leading?: React.ReactNode;
  /**
   * Trailing content (badge, chevron, etc.)
   */
  trailing?: React.ReactNode;
  /**
   * Enable press interaction
   */
  pressable?: boolean;
  /**
   * Additional class names
   */
  className?: string;
}

export const ListItem: React.FC<ListItemProps> = ({
  title,
  subtitle,
  leading,
  trailing,
  pressable = false,
  className,
  onPress,
  ...props
}) => {
  const isInteractive = pressable || !!onPress;

  const content = (
    <View className="flex-row items-center py-3 px-4">
      {leading && <View className="mr-3">{leading}</View>}
      <View className="flex-1">
        <Text className="text-[14px] font-medium text-[#111827]">{title}</Text>
        {subtitle && (
          <Text className="text-[12px] text-[#4B5563] mt-0.5">{subtitle}</Text>
        )}
      </View>
      {trailing && <View className="ml-3">{trailing}</View>}
    </View>
  );

  if (isInteractive) {
    return (
      <Pressable
        className={cn(
          'bg-[#FFFFFF] active:bg-[#F3F4F6]',
          className
        )}
        onPress={onPress}
        accessibilityRole="button"
        {...props}
      >
        {content}
      </Pressable>
    );
  }

  return (
    <View className={cn('bg-[#FFFFFF]', className)}>
      {content}
    </View>
  );
};
