import React from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const containerVariants = cva('flex-row gap-2', {
  variants: {
    scrollable: {
      true: '',
      false: 'flex-wrap',
    },
  },
  defaultVariants: {
    scrollable: true,
  },
});

const chipVariants = cva(
  'flex-row items-center gap-1.5 px-3 py-1.5 rounded-full border transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-white border-[#E5E7EB]',
        selected: 'bg-[#8B5CF6] border-[#8B5CF6]',
        outline: 'bg-transparent border-[#8B5CF6]',
      },
      size: {
        sm: 'text-[11px]',
        md: 'text-[13px]',
        lg: 'text-[14px]',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export interface FilterChip {
  id: string;
  label: string;
  count?: number;
  icon?: React.ReactNode;
}

export interface FilterChipsProps {
  /** Filter chips */
  chips: FilterChip[];
  /** Selected chip IDs */
  selectedIds: string[];
  /** Selection change handler */
  onSelectionChange: (ids: string[]) => void;
  /** Allow multiple selection */
  multiSelect?: boolean;
  /** Show clear all button */
  showClearAll?: boolean;
  /** Clear all text */
  clearAllText?: string;
  /** Chip variant */
  variant?: 'default' | 'outline';
  /** Chip size */
  size?: 'sm' | 'md' | 'lg';
  /** Scrollable horizontal list */
  scrollable?: boolean;
  /** Additional class names */
  className?: string;
  /** Content container style */
  contentContainerStyle?: any;
}

export const FilterChips = React.forwardRef<React.ElementRef<typeof ScrollView>, FilterChipsProps>(
  (
    {
      chips,
      selectedIds,
      onSelectionChange,
      multiSelect = true,
      showClearAll = false,
      clearAllText = 'Limpar todos',
      variant = 'default',
      size = 'md',
      scrollable = true,
      className,
      contentContainerStyle,
    },
    ref
  ) => {
    const handleChipPress = (chipId: string) => {
      let newSelection: string[];
      if (multiSelect) {
        newSelection = selectedIds.includes(chipId)
          ? selectedIds.filter(id => id !== chipId)
          : [...selectedIds, chipId];
      } else {
        newSelection = selectedIds.includes(chipId) ? [] : [chipId];
      }
      onSelectionChange(newSelection);
    };

    const handleClearAll = () => {
      onSelectionChange([]);
    };

    const selectedCount = selectedIds.length;

    return (
      <View className="flex-col gap-2">
        {showClearAll && selectedCount > 0 && (
          <Pressable
            onPress={handleClearAll}
            className="flex-row items-center gap-1 px-3 py-1.5 rounded-full bg-[#FEF2F2] border border-[#FECACA]"
            accessibilityRole="button"
            accessibilityLabel="Limpar todos os filtros"
          >
            <Text className="text-[11px] font-medium text-[#EF4444]">{clearAllText}</Text>
            <Text className="text-[11px] text-[#EF4444]">({selectedCount})</Text>
          </Pressable>
        )}

        <ScrollView
          ref={ref}
          horizontal={scrollable}
          className={cn(containerVariants({ scrollable }), className)}
          contentContainerStyle={{
            paddingHorizontal: scrollable ? 4 : 0,
            paddingVertical: 2,
            gap: 2,
            ...contentContainerStyle,
          }}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          {chips.map((chip) => {
            const isSelected = selectedIds.includes(chip.id);
            const chipVariant = isSelected ? 'selected' : variant;

            return (
              <Pressable
                key={chip.id}
                onPress={() => handleChipPress(chip.id)}
                className={cn(chipVariants({ variant: chipVariant, size }), 'flex-shrink-0')}
                accessibilityRole={multiSelect ? 'checkbox' : 'radio'}
                accessibilityState={{ checked: isSelected }}
                accessibilityLabel={chip.label}
              >
                {chip.icon && <View className="flex-shrink-0">{chip.icon}</View>}
                <Text className={cn(
                  'font-medium',
                  isSelected ? 'text-white' : variant === 'outline' ? 'text-[#8B5CF6]' : 'text-[#111827]'
                )}>
                  {chip.label}
                </Text>
                {chip.count !== undefined && (
                  <View
                    className={cn(
                      'w-5 h-5 rounded-full flex-items-center justify-center text-[10px] font-bold',
                      isSelected ? 'bg-white/20 text-white' : 'bg-[#F3F4F6] text-[#4B5563]'
                    )}
                  >
                    {chip.count}
                  </View>
                )}
              </Pressable>
            );
          })}
        </ScrollView>
      </View>
    );
  }
);

FilterChips.displayName = 'FilterChips';