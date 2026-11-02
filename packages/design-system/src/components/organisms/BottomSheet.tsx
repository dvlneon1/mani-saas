import React, { useRef } from 'react';
import { View, Modal, Pressable, Animated, Dimensions, PanResponder } from 'react-native';
import { cn } from '../../utils/cn';

/**
 * BottomSheet component structure (basic implementation)
 * Full implementation with gestures pending
 */

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const MAX_TRANSLATE_Y = -SCREEN_HEIGHT * 0.8;

export interface BottomSheetProps {
  /**
   * BottomSheet visibility
   */
  visible: boolean;
  /**
   * Close callback
   */
  onClose: () => void;
  /**
   * Snap point height (0-1, percentage of screen)
   */
  snapPoint?: number;
  /**
   * Show drag handle
   */
  showHandle?: boolean;
  /**
   * BottomSheet content
   */
  children: React.ReactNode;
  /**
   * Additional class names
   */
  className?: string;
}

export const BottomSheet: React.FC<BottomSheetProps> = ({
  visible,
  onClose,
  snapPoint = 0.5,
  showHandle = true,
  children,
  className,
}) => {
  const translateY = useRef(new Animated.Value(0)).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) {
          translateY.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 100) {
          onClose();
        } else {
          Animated.spring(translateY, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  if (!visible) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <Pressable
        className="flex-1 bg-black/50"
        onPress={onClose}
      >
        <Animated.View
          className={cn(
            'absolute bottom-0 left-0 right-0 bg-[#FFFFFF] rounded-t-2xl',
            className
          )}
          style={{
            height: SCREEN_HEIGHT * snapPoint,
            transform: [{ translateY }],
          }}
          {...panResponder.panHandlers}
        >
          {showHandle && (
            <View className="items-center py-3">
              <View className="w-10 h-1 rounded-full bg-[#D1D5DB]" />
            </View>
          )}
          {children}
        </Animated.View>
      </Pressable>
    </Modal>
  );
};
