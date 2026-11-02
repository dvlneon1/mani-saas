import React from 'react';
import { View, Text, Pressable, Image, Animated } from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import { Avatar } from '../atoms/Avatar';
import { Button } from '../atoms/Button';

const topBarVariants = cva('flex-row items-center justify-between px-4 py-3 bg-white border-b border-[#E5E7EB]', {
  variants: {
    variant: {
      default: '',
      transparent: 'bg-transparent border-none',
      elevated: 'shadow-sm',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

const titleVariants = cva('font-semibold text-[18px] text-[#111827]', {
  variants: {
    size: {
      default: '',
      large: 'text-[22px]',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

export interface TopBarProps {
  /** Title text */
  title?: string;
  /** Title size */
  titleSize?: 'default' | 'large';
  /** Left element (back button, etc.) */
  left?: React.ReactNode;
  /** Right elements (actions) */
  right?: React.ReactNode;
  /** Center element (replaces title) */
  center?: React.ReactNode;
  /** Background variant */
  variant?: 'default' | 'transparent' | 'elevated';
  /** Show back button */
  showBack?: boolean;
  /** Back button handler */
  onBackPress?: () => void;
  /** Back button accessibility label */
  backLabel?: string;
  /** Scroll Y animated value for hide/show on scroll */
  scrollY?: Animated.Value;
  /** Hide on scroll down */
  hideOnScroll?: boolean;
  /** Additional class names */
  className?: string;
  /** Safe area top inset */
  safeAreaInset?: number;
}

export const TopBar = React.forwardRef<React.ElementRef<typeof View>, TopBarProps>(
  (
    {
      title,
      titleSize = 'default',
      left,
      right,
      center,
      variant = 'default',
      showBack = false,
      onBackPress,
      backLabel = 'Voltar',
      scrollY,
      hideOnScroll = false,
      className,
      safeAreaInset = 0,
    },
    ref
  ) => {
    const animatedStyle = scrollY && hideOnScroll
      ? {
          transform: [
            {
              translateY: scrollY.interpolate({
                inputRange: [0, 100],
                outputRange: [0, -60 - safeAreaInset],
                extrapolate: 'clamp',
              }),
            },
          ],
        }
      : {};

    const renderBackButton = () => (
      <Pressable
        onPress={onBackPress}
        className="p-2 rounded-lg active:bg-[#F3F4F6]"
        accessibilityRole="button"
        accessibilityLabel={backLabel}
      >
        <Text className="text-[20px] text-[#111827]">‹</Text>
      </Pressable>
    );

    return (
      <Animated.View
        ref={ref}
        className={cn(topBarVariants({ variant }), className)}
        style={[
          { paddingTop: safeAreaInset + 12 },
          animatedStyle,
        ]}
        accessibilityRole="banner"
      >
        <View className="flex-row items-center justify-between w-full gap-4">
          {/* Left */}
          <View className="flex-row items-center gap-2 flex-shrink-0">
            {showBack && !left ? renderBackButton() : null}
            {left}
          </View>

          {/* Center */}
          <View className="flex-1 flex-items-center justify-center px-4">
            {center ? (
              center
            ) : title ? (
              <Text className={titleVariants({ size: titleSize })}>{title}</Text>
            ) : null}
          </View>

          {/* Right */}
          <View className="flex-row items-center gap-2 flex-shrink-0 justify-flex-end">
            {right}
          </View>
        </View>
      </Animated.View>
    );
  }
);

TopBar.displayName = 'TopBar';