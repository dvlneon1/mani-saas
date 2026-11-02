import React from 'react';
import { TextInput, TextInputProps } from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const textareaVariants = cva('border rounded-lg bg-white px-3 py-2 text-[14px] text-[#111827] placeholder:text-[#9CA3AF] transition-colors', {
  variants: {
    error: {
      true: 'border-[#EF4444] focus:border-[#EF4444]',
      false: 'border-[#E5E7EB] focus:border-[#8B5CF6]',
    },
    disabled: {
      true: 'opacity-50 bg-[#F9FAFB]',
      false: '',
    },
  },
  defaultVariants: {
    error: false,
    disabled: false,
  },
});

export interface TextareaProps
  extends Omit<TextInputProps, 'multiline' | 'onChangeText' | 'onChange'>,
    VariantProps<typeof textareaVariants> {
  /** Current value */
  value?: string;
  /** Change handler */
  onChange?: (value: string) => void;
  /** Placeholder */
  placeholder?: string;
  /** Number of rows */
  rows?: number;
  /** Max length */
  maxLength?: number;
  /** Disabled state */
  disabled?: boolean;
  /** Error state */
  error?: boolean;
  /** Read only */
  readOnly?: boolean;
  /** Additional class names */
  className?: string;
}

export const Textarea = React.forwardRef<any, TextareaProps>(
  (
    {
      value = '',
      onChange,
      placeholder,
      rows = 4,
      maxLength,
      disabled = false,
      error = false,
      readOnly = false,
      className,
      ...props
    },
    ref
  ) => {
    void ref;
    // @ts-ignore
    return (
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        multiline
        numberOfLines={rows}
        maxLength={maxLength}
        // @ts-ignore
        disabled={disabled}
        editable={!readOnly}
        className={cn(textareaVariants({ error, disabled }), className)}
        style={{
          minHeight: rows * 24,
          textAlignVertical: 'top',
        }}
      />
    ) as any;
  }
);

Textarea.displayName = 'Textarea';