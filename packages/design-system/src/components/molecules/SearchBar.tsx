import React from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import { Icon } from '../atoms/Icon';

const containerVariants = cva('flex-row items-center gap-2 px-3 py-2 rounded-xl bg-white border transition-colors', {
  variants: {
    focused: {
      true: 'border-[#8B5CF6] shadow-sm',
      false: 'border-[#E5E7EB]',
    },
    disabled: {
      true: 'opacity-50 bg-[#F9FAFB]',
      false: '',
    },
  },
  defaultVariants: {
    focused: false,
    disabled: false,
  },
});

export interface SearchBarProps
  extends VariantProps<typeof containerVariants> {
  /** Current search value */
  value: string;
  /** Value change handler */
  onChange: (value: string) => void;
  /** Submit handler */
  onSubmit?: (value: string) => void;
  /** Clear handler */
  onClear?: () => void;
  /** Placeholder */
  placeholder?: string;
  /** Show clear button */
  showClear?: boolean;
  /** Show filter button */
  showFilter?: boolean;
  /** Filter button handler */
  onFilterPress?: () => void;
  /** Filter badge count */
  filterCount?: number;
  /** Disabled state */
  disabled?: boolean;
  /** Auto focus */
  autoFocus?: boolean;
  /** Additional class names */
  className?: string;
  /** Input class names */
  inputClassName?: string;
}

export const SearchBar = React.forwardRef<any, SearchBarProps>(
  (
    {
      value,
      onChange,
      onSubmit,
      onClear,
      placeholder = 'Buscar...',
      showClear = true,
      showFilter = false,
      onFilterPress,
      filterCount = 0,
      disabled = false,
      autoFocus = false,
      focused = false,
      className,
      inputClassName,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = React.useState(false);

    const handleChange = (text: string) => {
      onChange(text);
    };

    const handleClear = () => {
      onChange('');
      onClear?.();
    };

    const handleSubmit = () => {
      onSubmit?.(value);
    };

    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

    void ref;
    return (
      <View
        className={cn(
          containerVariants({ focused: isFocused || focused, disabled }),
          className
        )}
        {...props}
      >
        <Icon name="search" size="sm" color="#9CA3AF" className="flex-shrink-0" />

        // @ts-ignore
        <TextInput
          value={value}
          onChangeText={handleChange}
          onSubmitEditing={handleSubmit}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          placeholderTextColor="#9CA3AF"
          className={cn('flex-1 text-[14px] text-[#111827]', inputClassName)}
          disabled={disabled}
          autoFocus={autoFocus}
          autoComplete="off"
          accessibilityLabel="Campo de busca"
        /> as any

        {showClear && value && (
          <Pressable
            onPress={handleClear}
            className="p-1 rounded-full active:bg-[#F3F4F6] flex-shrink-0"
            accessibilityLabel="Limpar busca"
          >
            <Icon name="x" size="xs" color="#9CA3AF" />
          </Pressable>
        )}

        {showFilter && (
          <Pressable
            onPress={onFilterPress}
            className={cn(
              'p-2 rounded-lg flex-items-center justify-center flex-shrink-0',
              filterCount > 0 ? 'bg-[#F5F3FF]' : 'active:bg-[#F3F4F6]'
            )}
            accessibilityLabel={filterCount > 0 ? `Filtros ativos (${filterCount})` : 'Filtros'}
          >
            <Icon
              name="filter"
              size="sm"
              color={filterCount > 0 ? '#8B5CF6' : '#9CA3AF'}
            />
            {filterCount > 0 && (
              <View className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#EF4444] flex-items-center justify-center">
                <Text className="text-white text-[8px] font-bold">{filterCount > 9 ? '9+' : filterCount}</Text>
              </View>
            )}
          </Pressable>
        )}
      </View>
    );
  }
);

SearchBar.displayName = 'SearchBar';