import React from 'react';
import { View, Text, Pressable, ScrollView, TextInput, Switch } from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import { Button } from '../atoms/Button';
import { FilterChips } from '../molecules/FilterChips';
import { TagInput } from '../molecules/TagInput';

const drawerVariants = cva('fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-xl', {
  variants: {
    size: {
      small: 'h-[40%]',
      medium: 'h-[60%]',
      large: 'h-[80%]',
      full: 'h-[95%]',
    },
  },
  defaultVariants: {
    size: 'medium',
  },
});

const handleVariants = cva('w-10 h-1.5 rounded-full mx-auto bg-[#E5E7EB]', {
  variants: {},
  defaultVariants: {},
});

export interface FilterOption {
  id: string;
  label: string;
  type: 'chips' | 'range' | 'date' | 'boolean' | 'text' | 'select';
  value?: any;
  options?: Array<{ id: string; label: string }>;
  min?: number;
  max?: number;
  step?: number;
  placeholder?: string;
}

export interface FilterDrawerProps {
  /** Filter options configuration */
  filters: FilterOption[];
  /** Current filter values */
  values: Record<string, any>;
  /** Values change handler */
  onValuesChange: (values: Record<string, any>) => void;
  /** Apply filters handler */
  onApply: (values: Record<string, any>) => void;
  /** Clear filters handler */
  onClear: () => void;
  /** Drawer visibility */
  visible: boolean;
  /** Close handler */
  onClose: () => void;
  /** Drawer size */
  size?: 'small' | 'medium' | 'large' | 'full';
  /** Title */
  title?: string;
  /** Show apply button */
  showApply?: boolean;
  /** Apply button text */
  applyText?: string;
  /** Clear button text */
  clearText?: string;
  /** Additional class names */
  className?: string;
}

export const FilterDrawer = React.forwardRef<any, FilterDrawerProps>(
  (
    {
      filters,
      values,
      onValuesChange,
      onApply,
      onClear,
      visible,
      onClose,
      size = 'medium',
      title = 'Filtros',
      showApply = true,
      applyText = 'Aplicar',
      clearText = 'Limpar',
      className,
    },
    ref
  ) => {
    if (!visible) return null;

    const hasActiveFilters = Object.entries(values).some(([_, v]) => {
      if (Array.isArray(v)) return v.length > 0;
      if (typeof v === 'object') return Object.keys(v).length > 0;
      return v !== undefined && v !== '' && v !== false;
    });

    const handleValueChange = (key: string, value: any) => {
      onValuesChange({ ...values, [key]: value });
    };

    const handleClearAll = () => {
      onClear();
    };

    const renderFilter = (filter: FilterOption) => {
      const value = values[filter.id];

      switch (filter.type) {
        case 'chips':
          return (
            <View key={filter.id} className="flex-col gap-2">
              <Text className="font-medium text-[13px] text-[#111827]">{filter.label}</Text>
              <FilterChips
                chips={filter.options?.map(o => ({ id: o.id, label: o.label })) || []}
                selectedIds={value || []}
                onSelectionChange={ids => handleValueChange(filter.id, ids)}
                multiSelect
                scrollable
              />
            </View>
          );

        case 'range':
          return (
            <View key={filter.id} className="flex-col gap-2">
              <Text className="font-medium text-[13px] text-[#111827]">{filter.label}</Text>
              <View className="flex-row items-center gap-3">
                <View className="flex-1">
                  <Text className="text-[11px] text-[#9CA3AF]">Mín</Text>
                  <TextInput
                    value={value?.min?.toString() || ''}
                    onChangeText={t => handleValueChange(filter.id, { ...value, min: parseFloat(t) || undefined })}
                    placeholder={filter.min?.toString()}
                    className="px-3 py-2 border border-[#E5E7EB] rounded-lg text-[14px] text-[#111827]"
                    keyboardType="numeric"
                  />
                </View>
                <View className="flex-1">
                  <Text className="text-[11px] text-[#9CA3AF]">Máx</Text>
                  <TextInput
                    value={value?.max?.toString() || ''}
                    onChangeText={t => handleValueChange(filter.id, { ...value, max: parseFloat(t) || undefined })}
                    placeholder={filter.max?.toString()}
                    className="px-3 py-2 border border-[#E5E7EB] rounded-lg text-[14px] text-[#111827]"
                    keyboardType="numeric"
                  />
                </View>
              </View>
            </View>
          );

        case 'date':
          return (
            <View key={filter.id} className="flex-col gap-2">
              <Text className="font-medium text-[13px] text-[#111827]">{filter.label}</Text>
              <View className="flex-row gap-3">
                <View className="flex-1">
                  <Text className="text-[11px] text-[#9CA3AF]">Início</Text>
                  <TextInput
                    value={value?.start || ''}
                    onChangeText={t => handleValueChange(filter.id, { ...value, start: t })}
                    placeholder="DD/MM/AAAA"
                    className="px-3 py-2 border border-[#E5E7EB] rounded-lg text-[14px] text-[#111827]"
                  />
                </View>
                <View className="flex-1">
                  <Text className="text-[11px] text-[#9CA3AF]">Fim</Text>
                  <TextInput
                    value={value?.end || ''}
                    onChangeText={t => handleValueChange(filter.id, { ...value, end: t })}
                    placeholder="DD/MM/AAAA"
                    className="px-3 py-2 border border-[#E5E7EB] rounded-lg text-[14px] text-[#111827]"
                  />
                </View>
              </View>
            </View>
          );

        case 'boolean':
          return (
            <View key={filter.id} className="flex-row items-center justify-between">
              <Text className="font-medium text-[13px] text-[#111827]">{filter.label}</Text>
              <Switch
                value={value || false}
                onValueChange={v => handleValueChange(filter.id, v)}
                thumbColor={value ? '#8B5CF6' : '#9CA3AF'}
                trackColor={{ true: '#F5F3FF', false: '#E5E7EB' }}
              />
            </View>
          );

        case 'text':
          return (
            <View key={filter.id} className="flex-col gap-1">
              <Text className="font-medium text-[13px] text-[#111827]">{filter.label}</Text>
              <TextInput
                value={value || ''}
                onChangeText={t => handleValueChange(filter.id, t)}
                placeholder={filter.placeholder}
                className="px-3 py-2 border border-[#E5E7EB] rounded-lg text-[14px] text-[#111827]"
              />
            </View>
          );

        case 'select':
          return (
            <View key={filter.id} className="flex-col gap-1">
              <Text className="font-medium text-[13px] text-[#111827]">{filter.label}</Text>
              <TextInput
                value={value || ''}
                onChangeText={t => handleValueChange(filter.id, t)}
                placeholder={filter.placeholder || 'Selecionar'}
                className="px-3 py-2 border border-[#E5E7EB] rounded-lg text-[14px] text-[#111827]"
                editable={false}
              />
            </View>
          );

        default:
          return null;
      }
    };

    return (
      <View
        ref={ref}
        className={cn(drawerVariants({ size }), className)}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
        }}
        pointerEvents={visible ? 'auto' : 'none'}
      >
        {/* Backdrop */}
        // @ts-ignore
        <Pressable
          onPress={onClose}
          className="absolute inset-0 bg-black/50 z-[-1]"
          style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 } as any}
          accessibilityHidden={true}
        /> as any

        {/* Handle */}
        <View className="pt-3 pb-2">
          <View className={handleVariants()} />
        </View>

        {/* Header */}
        <View className="flex-row items-center justify-between px-4 pb-3 border-b border-[#E5E7EB]">
          <Text className="font-semibold text-[16px] text-[#111827]">{title}</Text>
          <View className="flex-row items-center gap-2">
            {hasActiveFilters && (
              <Pressable onPress={handleClearAll} className="px-3 py-1.5">
                <Text className="text-[#8B5CF6] font-medium text-[13px]">{clearText}</Text>
              </Pressable>
            )}
            <Pressable onPress={onClose} className="p-2" accessibilityLabel="Fechar">
              <Text className="text-[20px] text-[#9CA3AF]">✕</Text>
            </Pressable>
          </View>
        </View>

        {/* Filters */}
        <ScrollView className="flex-1 px-4 py-4" showsVerticalScrollIndicator={false}>
          <View className="flex-col gap-6">
            {filters.map(renderFilter)}
          </View>
        </ScrollView>

        {/* Footer */}
        {showApply && (
          <View className="px-4 py-3 border-t border-[#E5E7EB] flex-row gap-2 safe-area-bottom">
            <Button variant="outline" className="flex-1" onPress={handleClearAll} disabled={!hasActiveFilters}>
              {clearText}
            </Button>
            <Button variant="default" className="flex-1" onPress={() => onApply(values)}>
              {applyText}            {hasActiveFilters ? `(${Object.keys(values).filter(k => values[k]).length})` : ''}
            </Button>
          </View>
        )}
      </View>
    );
  }
);

FilterDrawer.displayName = 'FilterDrawer';