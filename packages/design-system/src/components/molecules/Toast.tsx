import React, { useEffect, useRef } from 'react';
import { View, Text, Pressable, Animated } from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

/**
 * Toast component for notifications
 * Auto-dismiss after configurable duration (default 3s)
 */

const toastVariants = cva(
  'flex-row items-start p-4 rounded-lg shadow-lg bg-[#FFFFFF]',
  {
    variants: {
      variant: {
        success: 'border-l-4 border-[#10B981]',
        error: 'border-l-4 border-[#EF4444]',
        warning: 'border-l-4 border-[#F59E0B]',
        info: 'border-l-4 border-[#3B82F6]',
      },
    },
    defaultVariants: {
      variant: 'info',
    },
  }
);

const iconColors = {
  success: '#10B981',
  error: '#EF4444',
  warning: '#F59E0B',
  info: '#3B82F6',
};

export interface ToastAction {
  label: string;
  onPress: () => void;
}

export interface ToastProps extends VariantProps<typeof toastVariants> {
  /**
   * Toast title
   */
  title: string;
  /**
   * Optional description
   */
  description?: string;
  /**
   * Action button (CTA)
   */
  action?: ToastAction;
  /**
   * Auto-dismiss duration in ms (0 to disable)
   */
  duration?: number;
  /**
   * Dismiss callback
   */
  onDismiss?: () => void;
  /**
   * Additional class names
   */
  className?: string;
}

export const Toast: React.FC<ToastProps> = ({
  title,
  description,
  action,
  duration = 3000,
  variant = 'info',
  onDismiss,
  className,
}) => {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(-20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();

    if (duration > 0) {
      const timer = setTimeout(() => {
        handleDismiss();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration]);

  const handleDismiss = () => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: -20,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onDismiss?.();
    });
  };

  return (
    <Animated.View
      style={{ opacity, transform: [{ translateY }] }}
      className={cn(toastVariants({ variant }), className)}
      accessibilityRole="alert"
      accessibilityLiveRegion="polite"
    >
      <View className="flex-1">
        <Text className="text-[14px] font-medium text-[#111827]">{title}</Text>
        {description && (
          <Text className="text-[12px] text-[#4B5563] mt-0.5">{description}</Text>
        )}
      </View>
      {action && (
        <Pressable
          onPress={action.onPress}
          className="ml-3 px-3 py-1 rounded bg-[#F3F4F6]"
          accessibilityRole="button"
        >
          <Text className="text-[12px] font-medium text-[#8B5CF6]">
            {action.label}
          </Text>
        </Pressable>
      )}
    </Animated.View>
  );
};
