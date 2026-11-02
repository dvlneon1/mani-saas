import React, { useState, useRef } from 'react';
import { View, Text, Pressable, Image, ScrollView, Platform, Alert } from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import { Button } from '../atoms/Button';
import { Badge } from '../atoms/Badge';

const pickerVariants = cva('rounded-xl bg-white border border-[#E5E7EB] overflow-hidden', {
  variants: {
    variant: {
      default: '',
      modal: 'shadow-xl',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

const gridItemVariants = cva('aspect-[1/1] relative overflow-hidden bg-[#F3F4F6]', {
  variants: {
    selected: {
      true: 'border-3 border-[#8B5CF6]',
      false: '',
    },
  },
  defaultVariants: {
    selected: false,
  },
});

export interface ImageAsset {
  uri: string;
  width?: number;
  height?: number;
  type?: string;
  fileName?: string;
  fileSize?: number;
}

export interface ImagePickerProps {
  /** Selected images */
  selectedImages: ImageAsset[];
  /** Selection change handler */
  onSelectionChange: (images: ImageAsset[]) => void;
  /** Max images allowed */
  maxImages?: number;
  /** Allow multiple selection */
  multiple?: boolean;
  /** Show camera button */
  showCamera?: boolean;
  /** Camera handler */
  onCameraPress?: () => void;
  /** Gallery handler */
  onGalleryPress?: () => void;
  /** Remove image handler */
  onRemoveImage?: (index: number) => void;
  /** Reorder handler */
  onReorder?: (from: number, to: number) => void;
  /** Additional class names */
  className?: string;
  /** Variant */
  variant?: 'default' | 'modal';
  /** Show as grid */
  grid?: boolean;
  /** Grid columns */
  gridColumns?: number;
  /** Empty state message */
  emptyMessage?: string;
  /** Error message */
  error?: string;
}

export const ImagePicker = React.forwardRef<React.ElementRef<typeof View>, ImagePickerProps>(
  (
    {
      selectedImages,
      onSelectionChange,
      maxImages = 10,
      multiple = true,
      showCamera = true,
      onCameraPress,
      onGalleryPress,
      onRemoveImage,
      onReorder,
      className,
      variant = 'default',
      grid = true,
      gridColumns = 4,
      emptyMessage = 'Nenhuma imagem selecionada',
      error,
    },
    ref
  ) => {
    const [dragIndex, setDragIndex] = useState<number | null>(null);

    const canAddMore = selectedImages.length < maxImages;

    const handleAddImages = (newImages: ImageAsset[]) => {
      const combined = [...selectedImages, ...newImages].slice(0, maxImages);
      onSelectionChange(combined);
    };

    const handleRemove = (index: number) => {
      if (onRemoveImage) {
        onRemoveImage(index);
      } else {
        const newImages = selectedImages.filter((_, i) => i !== index);
        onSelectionChange(newImages);
      }
    };

    const renderImageItem = (image: ImageAsset, index: number) => (
      <View
        key={index}
        className={cn(gridItemVariants({ selected: dragIndex === index }), 'relative')}
        style={{
          width: grid ? `100%` : undefined,
        }}
      >
        <Image
          source={{ uri: image.uri }}
          className="w-full h-full"
          resizeMode="cover"
        />
        <Pressable
          onPress={() => handleRemove(index)}
          className="absolute top-1 right-1 w-6 h-6 rounded-full bg-black/60 flex-items-center justify-center"
          accessibilityLabel="Remover imagem"
        >
          <Text className="text-white text-[12px] font-bold">✕</Text>
        </Pressable>
        {multiple && (
          <View className="absolute bottom-1 left-1 w-5 h-5 rounded-full bg-white flex-items-center justify-center border border-[#E5E7EB]">
            <Text className="text-[#111827] text-[10px] font-bold">{index + 1}</Text>
          </View>
        )}
        {dragIndex === index && (
          <View className="absolute inset-0 bg-black/30 flex-items-center justify-center">
            <Text className="text-white text-[14px] font-medium">Arrastar para reordenar</Text>
          </View>
        )}
      </View>
    );

    const renderCameraButton = () => (
      <Pressable
        onPress={onCameraPress}
        className={cn(gridItemVariants(), 'flex-items-center justify-center')}
        accessibilityRole="button"
        accessibilityLabel="Tirar foto"
      >
        <View className="flex-col items-center gap-2">
          <View className="w-12 h-12 rounded-full bg-[#F5F3FF] flex-items-center justify-center">
            <Text className="text-[24px]">📷</Text>
          </View>
          <Text className="text-[12px] text-[#9CA3AF] font-medium">Câmera</Text>
        </View>
      </Pressable>
    );

    const renderGalleryButton = () => (
      <Pressable
        onPress={onGalleryPress}
        className={cn(gridItemVariants(), 'flex-items-center justify-center')}
        accessibilityRole="button"
        accessibilityLabel="Escolher da galeria"
      >
        <View className="flex-col items-center gap-2">
          <View className="w-12 h-12 rounded-full bg-[#F5F3FF] flex-items-center justify-center">
            <Text className="text-[24px]">🖼</Text>
          </View>
          <Text className="text-[12px] text-[#9CA3AF] font-medium">Galeria</Text>
        </View>
      </Pressable>
    );

    const renderEmptyState = () => (
      <View className={cn(gridItemVariants(), 'flex-items-center justify-center flex-col gap-2 min-h-[120px]')}>
        <Text className="text-[28px]">📷</Text>
        <Text className="text-[#9CA3AF] text-[13px] text-center px-4">{emptyMessage}</Text>
        <View className="flex-row gap-2 mt-2">
          {showCamera && onCameraPress && (
            <Button variant="outline" size="sm" onPress={onCameraPress}>
              Câmera
            </Button>
          )}
          {onGalleryPress && (
            <Button variant="default" size="sm" onPress={onGalleryPress}>
              Galeria
            </Button>
          )}
        </View>
      </View>
    );

    if (variant === 'modal') {
      return (
        <View ref={ref} className={cn(pickerVariants({ variant }), className, 'flex-1')}>
          <View className="flex-row items-center justify-between px-4 py-3 border-b border-[#E5E7EB]">
            <Text className="font-semibold text-[16px] text-[#111827]">Selecionar Imagens</Text>
            <Pressable onPress={() => onSelectionChange([])} className="p-2" accessibilityLabel="Fechar">
              <Text className="text-[20px] text-[#9CA3AF]">✕</Text>
            </Pressable>
          </View>
          <ScrollView className="flex-1 p-4" showsVerticalScrollIndicator={false}>
            {grid ? (
              <View className="flex-row flex-wrap gap-2">
                {selectedImages.map(renderImageItem)}
                {canAddMore && showCamera && onCameraPress && renderCameraButton()}
                {canAddMore && onGalleryPress && renderGalleryButton()}
                {!selectedImages.length && renderEmptyState()}
              </View>
            ) : (
              <View className="flex-col gap-3">
                {selectedImages.map(renderImageItem)}
                {canAddMore && (
                  <View className="flex-row gap-2">
                    {showCamera && onCameraPress && (
                      <Button variant="outline" className="flex-1" leftIcon={<Text>📷</Text>} onPress={onCameraPress}>
                        Câmera
                      </Button>
                    )}
                    {onGalleryPress && (
                      <Button variant="default" className="flex-1" leftIcon={<Text>🖼</Text>} onPress={onGalleryPress}>
                        Galeria
                      </Button>
                    )}
                  </View>
                )}
                {!selectedImages.length && renderEmptyState()}
              </View>
            )}
          </ScrollView>
          {selectedImages.length > 0 && (
            <View className="px-4 py-3 border-t border-[#E5E7EB] flex-row gap-2">
              <Button variant="outline" className="flex-1" onPress={() => onSelectionChange([])}>
                Limpar
              </Button>
              <Button variant="default" className="flex-1" onPress={() => {}}>
                Confirmar ({String(selectedImages.length)})
              </Button>
            </View>
          )}
        </View>
      );
    }

    return (
      <View ref={ref} className={cn(pickerVariants({ variant }), className)}>
        <View className="p-4 border-b border-[#E5E7EB] flex-col gap-2">
          <View className="flex-row items-center justify-between">
            <Text className="font-medium text-[14px] text-[#111827]">
              Imagens ({selectedImages.length}/{maxImages})
            </Text>
            {error && (
              <Badge variant="destructive" size="sm">{error}</Badge>
            )}
          </View>
        </View>

        <ScrollView className="p-4" showsVerticalScrollIndicator={false}>
          {grid ? (
            <View className="flex-row flex-wrap gap-2">
              {selectedImages.map(renderImageItem)}
              {canAddMore && showCamera && onCameraPress && renderCameraButton()}
              {canAddMore && onGalleryPress && renderGalleryButton()}
              {!selectedImages.length && renderEmptyState()}
            </View>
          ) : (
            <View className="flex-col gap-3">
              {selectedImages.map(renderImageItem)}
              {canAddMore && (
                <View className="flex-row gap-2">
                  {showCamera && onCameraPress && (
                    <Button variant="outline" className="flex-1" leftIcon={<Text>📷</Text>} onPress={onCameraPress}>
                      Câmera
                    </Button>
                  )}
                  {onGalleryPress && (
                    <Button variant="default" className="flex-1" leftIcon={<Text>🖼</Text>} onPress={onGalleryPress}>
                      Galeria
                    </Button>
                  )}
                </View>
              )}
              {!selectedImages.length && renderEmptyState()}
            </View>
          )}
        </ScrollView>
      </View>
    );
  }
);

ImagePicker.displayName = 'ImagePicker';