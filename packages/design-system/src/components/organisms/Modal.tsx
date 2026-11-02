import React from 'react';
import { View, Modal as RNModal, Pressable, Text } from 'react-native';
import { cn } from '../../utils/cn';

/**
 * Modal component structure (basic implementation)
 * Full implementation pending requirements
 */

export interface ModalProps {
  /**
   * Modal visibility
   */
  visible: boolean;
  /**
   * Close callback
   */
  onClose: () => void;
  /**
   * Modal title
   */
  title?: string;
  /**
   * Modal content
   */
  children: React.ReactNode;
  /**
   * Additional class names
   */
  className?: string;
}

export const Modal: React.FC<ModalProps> = ({
  visible,
  onClose,
  title,
  children,
  className,
}) => {
  return (
    <RNModal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <Pressable
        className="flex-1 bg-black/50 items-center justify-center"
        onPress={onClose}
      >
        <Pressable
          className={cn(
            'bg-[#FFFFFF] rounded-lg p-6 mx-4 max-w-md w-full shadow-xl',
            className
          )}
          onPress={(e) => e.stopPropagation()}
        >
          {title && (
            <Text className="text-[18px] font-medium text-[#111827] mb-4">
              {title}
            </Text>
          )}
          {children}
        </Pressable>
      </Pressable>
    </RNModal>
  );
};
