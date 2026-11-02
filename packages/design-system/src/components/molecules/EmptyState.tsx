import React from 'react';
import { View, Text } from 'react-native';
import { Button, ButtonProps } from '../atoms/Button';
import { cn } from '../../utils/cn';

/**
 * EmptyState component for displaying empty content states
 * Supports icon/illustration, title, description, and action
 */

export interface EmptyStateProps {
  /**
   * Icon or illustration component
   */
  icon?: React.ReactNode;
  /**
   * Title text
   */
  title: string;
  /**
   * Description text
   */
  description?: string;
  /**
   * Primary action button props
   */
  action?: Omit<ButtonProps, 'children'> & { label: string };
  /**
   * Additional class names
   */
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  action,
  className,
}) => {
  return (
    <View
      className={cn('flex-1 items-center justify-center p-6', className)}
      accessibilityRole="text"
    >
      {icon && <View className="mb-4">{icon}</View>}
      <Text className="text-[16px] font-medium text-[#111827] text-center">
        {title}
      </Text>
      {description && (
        <Text className="text-[14px] text-[#4B5563] text-center mt-2">
          {description}
        </Text>
      )}
      {action && (
        <Button
          {...action}
          className="mt-4"
        >
          {action.label}
        </Button>
      )}
    </View>
  );
};
