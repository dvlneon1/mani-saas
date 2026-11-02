import React from 'react';
import { View, Text, Pressable, TextInput, ScrollView, Modal } from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import { Icon } from './Icon';

const selectVariants = cva('flex-row items-center justify-between px-3 py-2 border rounded-lg bg-white transition-colors', {
  variants: {
    error: {
      true: 'border-[#EF4444]',
      false: 'border-[#E5E7EB]',
    },
    disabled: {
      true: 'opacity-50 bg-[#F9FAFB]',
      false: '',
    },
    open: {
      true: 'border-[#8B5CF6] shadow-sm',
      false: '',
    },
  },
  defaultVariants: {
    error: false,
    disabled: false,
    open: false,
  },
});

export interface SelectOption {
  value: any;
  label: string;
  disabled?: boolean;
}

export interface SelectProps
  extends VariantProps<typeof selectVariants> {
  /** Current value */
  value?: any;
  /** Change handler */
  onChange?: (value: any) => void;
  /** Options */
  options: SelectOption[];
  /** Placeholder */
  placeholder?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Error state */
  error?: boolean;
  /** Searchable */
  searchable?: boolean;
  /** Multiple selection */
  multiple?: boolean;
  /** Max options to show before scroll */
  maxHeight?: number;
  /** Additional class names */
  className?: string;
}

export const Select = React.forwardRef<React.ElementRef<typeof View>, SelectProps>(
  (
    {
      value,
      onChange,
      options,
      placeholder = 'Selecionar',
      disabled = false,
      error = false,
      searchable = false,
      multiple = false,
      maxHeight = 200,
      className,
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [searchQuery, setSearchQuery] = React.useState('');

    const selectedOption = options.find(o => o.value === value);
    const displayValue = selectedOption?.label || placeholder;
    const isPlaceholder = !selectedOption;

    const filteredOptions = options.filter(o =>
      o.label.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleToggle = () => {
      if (!disabled) {
        setIsOpen(!isOpen);
        if (!isOpen) setSearchQuery('');
      }
    };

    const handleSelect = (option: SelectOption) => {
      if (!option.disabled) {
        onChange?.(option.value);
        setIsOpen(false);
      }
    };

    const handleSearch = (text: string) => {
      setSearchQuery(text);
    };

    const renderDropdown = () => (
      <Modal visible={isOpen} animationType="fade" transparent onRequestClose={() => setIsOpen(false)}>
        <Pressable onPress={() => setIsOpen(false)} className="flex-1" />
        <View className="flex-1 justify-flex-end">
          <View className="bg-white rounded-t-2xl max-h-[80%] flex-col">
            <View className="flex-row items-center justify-between p-4 border-b border-[#E5E7EB] sticky top-0 bg-white">
              <Text className="font-semibold text-[16px] text-[#111827]">Selecionar</Text>
              <Pressable onPress={() => setIsOpen(false)} className="p-2">
                <Icon name="x" size="md" color="#9CA3AF" />
              </Pressable>
            </View>
            {searchable && (
              <View className="p-4 border-b border-[#E5E7EB] sticky top-0 bg-white">
                <TextInput
                  value={searchQuery}
                  onChangeText={handleSearch}
                  placeholder="Buscar..."
                  className="px-3 py-2 border border-[#E5E7EB] rounded-lg text-[14px] text-[#111827]"
                  autoFocus
                />
              </View>
            )}
            <ScrollView contentContainerStyle={{ maxHeight }} showsVerticalScrollIndicator={false}>
              {filteredOptions.map((option, index) => (
                <Pressable
                  key={option.value}
                  onPress={() => handleSelect(option)}
                  disabled={option.disabled}
                  className="px-4 py-3 border-b border-[#F3F4F6] last:border-0 flex-row items-center justify-between"
                  accessibilityRole="option"
                  accessibilityState={{ selected: option.value === value, disabled: option.disabled }}
                >
                  <Text className={cn(
                    'text-[14px]',
                    option.disabled ? 'text-[#9CA3AF]' : 'text-[#111827]',
                    option.value === value && 'font-medium text-[#8B5CF6]'
                  )}>
                    {option.label}
                  </Text>
                  {option.value === value && (
                    <Icon name="check" size="sm" color="#8B5CF6" />
                  )}
                </Pressable>
              ))}
              {filteredOptions.length === 0 && (
                <View className="px-4 py-8 flex-items-center">
                  <Text className="text-[#9CA3AF] text-[14px]">Nenhuma opção encontrada</Text>
                </View>
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>
    );

    return (
      <View ref={ref} className="flex-1" {...props}>
        <Pressable
          onPress={handleToggle}
          className={cn(selectVariants({ error, disabled, open: isOpen }), className)}
          disabled={disabled}
          accessibilityRole="combobox"
          accessibilityState={{ expanded: isOpen, disabled }}
          accessibilityLabel={placeholder}
        >
          <Text className={cn(
            'text-[14px] flex-1',
            isPlaceholder ? 'text-[#9CA3AF]' : 'text-[#111827]'
          )}>
            {displayValue}
          </Text>
          <Icon
            name={isOpen ? 'chevron-up' : 'chevron-down'}
            size="sm"
            color={isOpen ? '#8B5CF6' : '#9CA3AF'}
          />
        </Pressable>
        {renderDropdown()}
      </View>
    );
  }
);

Select.displayName = 'Select';