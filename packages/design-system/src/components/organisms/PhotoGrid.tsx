import React from 'react';
import { View, Text, Image, ImageStyle, ScrollView, Pressable } from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const gridVariants = cva('flex-1', {
  variants: {
    columns: {
      1: '',
      2: '',
      3: '',
    },
  },
  defaultVariants: {
    columns: 2,
  },
});

const itemVariants = cva('rounded-lg overflow-hidden bg-[#F3F4F6]', {
  variants: {
    aspectRatio: {
      square: 'aspect-[1/1]',
      portrait: 'aspect-[3/4]',
      landscape: 'aspect-[4/3]',
      nail: 'aspect-[4/5]',
    },
  },
  defaultVariants: {
    aspectRatio: 'nail',
  },
});

export interface PhotoGridProps {
  /** Array of image URLs */
  images: string[];
  /** Number of columns */
  columns?: 1 | 2 | 3;
  /** Aspect ratio for items */
  aspectRatio?: 'square' | 'portrait' | 'landscape' | 'nail';
  /** Gap between items */
  gap?: number;
  /** Max items to show (rest shows +N) */
  maxItems?: number;
  /** Placeholder blurhash strings */
  blurhashes?: string[];
  /** Low quality image URLs */
  lowQualityUrls?: string[];
  /** Item press handler */
  onItemPress?: (index: number) => void;
  /** Item long press handler */
  onItemLongPress?: (index: number) => void;
  /** Render custom overlay */
  renderOverlay?: (index: number, image: string) => React.ReactNode;
  /** Additional class names */
  className?: string;
  /** Show skeleton while loading */
  showSkeleton?: boolean;
  /** Loading state */
  isLoading?: boolean;
}

const COLUMNS_STYLES = {
  1: 'flex-col',
  2: 'flex-row flex-wrap',
  3: 'flex-row flex-wrap',
};

const ITEM_WIDTH = {
  1: 'w-full',
  2: 'w-1/2',
  3: 'w-1/3',
};

export const PhotoGrid = React.forwardRef<React.ElementRef<typeof ScrollView>, PhotoGridProps>(
  (
    {
      images,
      columns = 2,
      aspectRatio = 'nail',
      gap = 8,
      maxItems,
      blurhashes,
      lowQualityUrls,
      onItemPress,
      onItemLongPress,
      renderOverlay,
      className,
      showSkeleton = false,
      isLoading = false,
    },
    ref
  ) => {
    const displayImages = maxItems ? images.slice(0, maxItems) : images;
    const remainingCount = maxItems && images.length > maxItems ? images.length - maxItems : 0;

    if (showSkeleton || (isLoading && images.length === 0)) {
      return (
        <ScrollView
          ref={ref}
          className={cn(gridVariants({ columns }), className)}
          contentContainerStyle={{ paddingHorizontal: gap, paddingVertical: gap }}
          showsVerticalScrollIndicator={false}
        >
          {Array.from({ length: maxItems || 6 }).map((_, i) => (
            <View
              key={`skeleton-${i}`}
              className={cn(
                itemVariants({ aspectRatio }),
                ITEM_WIDTH[columns],
                'animate-pulse'
              )}
              style={{ padding: gap / 2 }}
            >
              <View className="w-full h-full bg-[#E5E7EB] rounded-lg" />
            </View>
          ))}
        </ScrollView>
      );
    }

    if (displayImages.length === 0) {
      return (
        <View
          ref={ref}
          className={cn(gridVariants({ columns }), className, 'flex-1 flex-items-center justify-center py-12')}
        >
          <Text className="text-[#9CA3AF] text-[14px]">Nenhuma foto</Text>
        </View>
      );
    }

    return (
      <ScrollView
        // @ts-ignore
        ref={ref}
        className={cn(gridVariants({ columns }), className)}
        contentContainerStyle={{
          paddingHorizontal: gap,
          paddingVertical: gap,
          gap,
        }}
        showsVerticalScrollIndicator={false}
      >
        {displayImages.map((image, index) => (
          <Pressable
            key={index}
            onPress={() => onItemPress?.(index)}
            onLongPress={() => onItemLongPress?.(index)}
            className={cn(itemVariants({ aspectRatio }), ITEM_WIDTH[columns])}
            style={{ padding: gap / 2 }}
            accessibilityRole="image"
            accessibilityLabel={`Foto ${index + 1}`}
          >
            <View className="relative w-full h-full rounded-lg overflow-hidden">
              {/* Blurhash placeholder */}
              {blurhashes?.[index] && (
                <View
                  className="absolute inset-0"
                  style={{
                    backgroundColor: '#E5E7EB',
                  }}
                />
              )}
              {/* Low quality image */}
              {lowQualityUrls?.[index] && (
                <Image
                  source={{ uri: lowQualityUrls[index] }}
                  className="absolute inset-0 w-full h-full"
                  resizeMode="cover"
                  style={{ opacity: 0.7 } as ImageStyle}
                />
              )}
              {/* Full quality image */}
              <Image
                source={{ uri: image }}
                className="absolute inset-0 w-full h-full"
                resizeMode="cover"
                style={{ opacity: 1 } as ImageStyle}
              />
              {renderOverlay && renderOverlay(index, image)}
            </View>
          </Pressable>
        ))}

        {remainingCount > 0 && (
          <Pressable
            className={cn(itemVariants({ aspectRatio }), ITEM_WIDTH[columns], 'flex-items-center justify-center bg-[#F9FAFB]')}
            style={{ padding: gap / 2 }}
            accessibilityRole="button"
            accessibilityLabel={`Ver mais ${remainingCount} fotos`}
          >
            <View className="flex-col items-center gap-1">
              <Text className="font-semibold text-[#111827] text-[16px]">+{remainingCount}</Text>
              <Text className="text-[#9CA3AF] text-[11px]">fotos</Text>
            </View>
          </Pressable>
        )}
      </ScrollView>
    );
  }
);

PhotoGrid.displayName = 'PhotoGrid';