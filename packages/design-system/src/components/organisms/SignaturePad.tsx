import React, { useRef, useState, useEffect } from 'react';
import { View, Text, PanResponder, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import { Button } from '../atoms/Button';

const containerVariants = cva('rounded-xl bg-white border border-[#E5E7EB] overflow-hidden', {
  variants: {
    variant: {
      default: '',
      compact: '',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export interface SignaturePadProps {
  /** Canvas width */
  width?: number;
  /** Canvas height */
  height?: number;
  /** Stroke color */
  strokeColor?: string;
  /** Stroke width */
  strokeWidth?: number;
  /** Background color */
  backgroundColor?: string;
  /** Signature change handler */
  onSignatureChange?: (signature: string | null) => void;
  /** Signature clear handler */
  onClear?: () => void;
  /** Signature save handler (returns base64 PNG) */
  onSave?: (base64: string) => void;
  /** Show clear button */
  showClearButton?: boolean;
  /** Show save button */
  showSaveButton?: boolean;
  /** Clear button text */
  clearButtonText?: string;
  /** Save button text */
  saveButtonText?: string;
  /** Additional class names */
  className?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Placeholder text */
  placeholder?: string;
}

export const SignaturePad = React.forwardRef<HTMLCanvasElement, SignaturePadProps>(
  (
    {
      width = 320,
      height = 160,
      strokeColor = '#111827',
      strokeWidth = 2,
      backgroundColor = '#FFFFFF',
      onSignatureChange,
      onClear,
      onSave,
      showClearButton = true,
      showSaveButton = true,
      clearButtonText = 'Limpar',
      saveButtonText = 'Salvar',
      className,
      disabled = false,
      placeholder = 'Assine aqui',
    },
    ref
  ) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [signature, setSignature] = useState<string | null>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [points, setPoints] = useState<Array<{ x: number; y: number }>>([]);

    // Since we can't use HTMLCanvasElement in React Native directly,
    // we'll use a PanResponder on a View to simulate drawing
    // For production, use react-native-signature-canvas or similar

    const panResponder = useRef(
      PanResponder.create({
        onStartShouldSetPanResponder: () => !disabled,
        onMoveShouldSetPanResponder: () => !disabled,
        onPanResponderGrant: (_, gesture) => {
          setIsDrawing(true);
          const newPoint = { x: gesture.moveX, y: gesture.moveY };
          setPoints(prev => [...prev, newPoint]);
          onSignatureChange?.('drawing');
        },
        onPanResponderMove: (_, gesture) => {
          if (!isDrawing) return;
          const newPoint = { x: gesture.moveX, y: gesture.moveY };
          setPoints(prev => [...prev, newPoint]);
        },
        onPanResponderRelease: () => {
          setIsDrawing(false);
          // Generate signature data (simplified)
          const sigData = JSON.stringify(points);
          setSignature(sigData);
          onSignatureChange?.(sigData);
        },
        onPanResponderTerminate: () => {
          setIsDrawing(false);
        },
      })
    ).current;

    const handleClear = () => {
      setPoints([]);
      setSignature(null);
      onSignatureChange?.(null);
      onClear?.();
    };

    const handleSave = () => {
      if (points.length === 0) return;
      // In production, convert points to base64 PNG using a library
      const mockBase64 = 'data:image/png;base64,mocksignature';
      onSave?.(mockBase64);
    };

    const hasSignature = points.length > 0;

    return (
      <View className={cn(containerVariants(), className)}>
        <View
          {...panResponder.panHandlers}
          className="relative"
          style={{ width, height, backgroundColor }}
          accessibilityRole="none"
          accessibilityLabel="Área de assinatura"
          accessibilityHint={disabled ? 'Desabilitado' : 'Desenhe sua assinatura'}
        >
          {!hasSignature && !disabled && (
            <View className="absolute inset-0 flex-items-center justify-center pointer-events-none">
              <Text className="text-[#9CA3AF] text-[14px]">{placeholder}</Text>
            </View>
          )}
          {points.length > 1 && (
            <View className="absolute inset-0">
              {/* 
                In production, render the signature path here using 
                react-native-svg or similar. This is a simplified version.
              */}
              {points.map((point, index) => (
                index > 0 && (
                  <View
                    key={index}
                    className="absolute"
                    style={{
                      left: (points[index - 1].x + point.x) / 2 - strokeWidth / 2,
                      top: (points[index - 1].y + point.y) / 2 - strokeWidth / 2,
                      width: Math.sqrt(
                        Math.pow(point.x - points[index - 1].x, 2) +
                        Math.pow(point.y - points[index - 1].y, 2)
                      ),
                      height: strokeWidth,
                      backgroundColor: strokeColor,
                      transform: [
                        {
                          rotate: `${Math.atan2(
                            point.y - points[index - 1].y,
                            point.x - points[index - 1].x
                          ) * (180 / Math.PI)}deg`,
                        },
                      ],
                    }}
                  />
                )
              ))}
            </View>
          )}
        </View>

        {(showClearButton || showSaveButton) && (
          <View className="flex-row items-center justify-end gap-2 p-3 border-t border-[#E5E7EB]">
            {showClearButton && (
              <Button
                variant="outline"
                size="sm"
                onPress={handleClear}
                disabled={disabled || !hasSignature}
              >
                {clearButtonText}
              </Button>
            )}
            {showSaveButton && (
              <Button
                variant="default"
                size="sm"
                onPress={handleSave}
                disabled={disabled || !hasSignature}
              >
                {saveButtonText}
              </Button>
            )}
          </View>
        )}
      </View>
    );
  }
);

SignaturePad.displayName = 'SignaturePad';