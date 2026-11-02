import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, Pressable, ScrollView, Keyboard } from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import { Badge } from '../atoms/Badge';

const containerVariants = cva('rounded-lg border bg-white flex-row flex-wrap items-center gap-2', {
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

const inputVariants = cva('flex-1 min-w-[60px] py-2 px-0 text-[14px] text-[#111827]', {
  variants: {},
  defaultVariants: {},
});

export interface TagInputProps {
  /** Current tags */
  tags: string[];
  /** Tags change handler */
  onTagsChange: (tags: string[]) => void;
  /** Available suggestions */
  suggestions?: string[];
  /** Placeholder text */
  placeholder?: string;
  /** Max tags allowed */
  maxTags?: number;
  /** Allow custom tags (not just from suggestions) */
  allowCustom?: boolean;
  /** Tag validation regex */
  validationRegex?: RegExp;
  /** Show suggestion dropdown */
  showSuggestions?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Error message */
  error?: string;
  /** Label */
  label?: string;
  /** Helper text */
  helperText?: string;
  /** Additional class names */
  className?: string;
  /** Input ref */
  inputRef?: React.RefObject<any>;
}

export const TagInput = React.forwardRef<any, TagInputProps>(
  (
    {
      tags,
      onTagsChange,
      suggestions = [],
      placeholder = 'Adicionar tag...',
      maxTags,
      allowCustom = true,
      validationRegex,
      showSuggestions = true,
      disabled = false,
      error,
      label,
      helperText,
      className,
      inputRef,
    },
    ref
  ) => {
    const [inputValue, setInputValue] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const [focused, setFocused] = useState(false);
    const containerRef = useRef<any>(null);

    const filteredSuggestions = suggestions.filter(
      s => s.toLowerCase().includes(inputValue.toLowerCase()) && !tags.includes(s)
    );

    const handleAddTag = (tag: string) => {
      const trimmed = tag.trim();
      if (!trimmed) return;
      if (validationRegex && !validationRegex.test(trimmed)) return;
      if (tags.includes(trimmed)) return;
      if (maxTags && tags.length >= maxTags) return;

      onTagsChange([...tags, trimmed]);
      setInputValue('');
      setShowDropdown(false);
    };

    const handleRemoveTag = (tagToRemove: string) => {
      onTagsChange(tags.filter(t => t !== tagToRemove));
    };

    const handleInputChange = (text: string) => {
      setInputValue(text);
      if (showSuggestions && text.length > 0) {
        setShowDropdown(true);
      } else {
        setShowDropdown(false);
      }
    };

    const handleKeyPress = (e: any) => {
      if (e.nativeEvent.key === 'Enter' || e.nativeEvent.key === ',') {
        e.preventDefault();
        handleAddTag(inputValue);
      }
    };

    const handleBackspace = (e: any) => {
      if (inputValue === '' && tags.length > 0) {
        handleRemoveTag(tags[tags.length - 1]);
      }
    };

    const handleBlur = () => {
      setTimeout(() => setShowDropdown(false), 200);
      if (inputValue.trim() && allowCustom) {
        handleAddTag(inputValue);
      }
    };

    useEffect(() => {
      (inputRef?.current as any)?.focus();
    }, []);

    void ref;
    return (
      <View ref={ref} className="flex-col gap-1.5">
        {label && (
          <Text className="font-medium text-[13px] text-[#111827]">{label}</Text>
        )}

        <Pressable
          ref={containerRef}
          onPress={() => !disabled && inputRef?.current?.focus()}
          className={cn(
            containerVariants({ focused, disabled }),
            className
          )}
          accessibilityRole="textbox"
          accessibilityLabel={label || 'Entrada de tags'}
          accessibilityState={{ disabled }}
        >
          {tags.map((tag, index) => (
            <Pressable
              key={index}
              onPress={() => handleRemoveTag(tag)}
              className="flex-shrink-0"
            >
              <Text className="font-medium text-[13px] text-[#111827]">{tag}</Text>
              <Text className="text-[10px] text-[#EF4444] font-bold ml-1">✕</Text>
            </Pressable>
          ))}

          // @ts-ignore
          <TextInput
            value={inputValue}
            onChangeText={handleInputChange}
            onFocus={() => setFocused(true)}
            onBlur={handleBlur}
            onKeyPress={handleKeyPress}
            onKeyDown={handleBackspace}
            placeholder={tags.length > 0 ? '' : placeholder}
            placeholderTextColor="#9CA3AF"
            className={cn(inputVariants(), showDropdown && filteredSuggestions.length > 0 && 'pr-8')}
            disabled={disabled || (maxTags && tags.length >= maxTags)}
            autoComplete="off"
            autoCorrect={false}
            spellCheck={false}
            maxLength={50}
            accessibilityLabel="Digite uma tag"
          /> as any

          {showDropdown && filteredSuggestions.length > 0 && !disabled && (
            <View className="absolute bottom-full left-0 right-0 mb-1 bg-white border border-[#E5E7EB] rounded-lg shadow-lg z-10 max-h-48 overflow-hidden">
              <ScrollView showsVerticalScrollIndicator={false}>
                {filteredSuggestions.map((suggestion, index) => (
                  <Pressable
                    key={index}
                    onPress={() => handleAddTag(suggestion)}
                    className="px-3 py-2 border-b border-[#F3F4F6] last:border-0"
                    accessibilityRole="option"
                    accessibilityLabel={suggestion}
                  >
                    <Text className="text-[13px] text-[#111827]">{suggestion}</Text>
                  </Pressable>
                ))}
              </ScrollView>
            </View>
          )}
        </Pressable>

        {error && (
          <Text className="text-[11px] text-[#EF4444] flex-row items-center gap-1">
            <Text>⚠</Text>
            {error}
          </Text>
        )}

        {helperText && !error && (
          <Text className="text-[11px] text-[#9CA3AF]">{helperText}</Text>
        )}

        {maxTags && (
          <Text className="text-[11px] text-[#9CA3AF] text-right">
            {tags.length}/{maxTags}
          </Text>
        )}
      </View>
    );
  }
);

TagInput.displayName = 'TagInput';