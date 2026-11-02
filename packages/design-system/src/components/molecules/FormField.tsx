import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import { Input } from '../atoms/Input';
import { Textarea } from '../atoms/Textarea';
import { Select } from '../atoms/Select';
import { Switch } from '../atoms/Switch';
import { Checkbox } from '../atoms/Checkbox';
import { RadioGroup } from '../atoms/RadioGroup';
import { Slider } from '../atoms/Slider';
import { TagInput } from '../molecules/TagInput';

const fieldVariants = cva('flex-col gap-1.5', {
  variants: {},
  defaultVariants: {},
});

const labelVariants = cva('font-medium text-[13px] text-[#111827] flex-row items-center gap-1', {
  variants: {
    required: {
      true: '',
      false: '',
    },
  },
  defaultVariants: {
    required: false,
  },
});

export type FieldType =
  | 'text'
  | 'email'
  | 'password'
  | 'number'
  | 'tel'
  | 'url'
  | 'textarea'
  | 'select'
  | 'switch'
  | 'checkbox'
  | 'radio'
  | 'slider'
  | 'tags'
  | 'date'
  | 'time'
  | 'datetime';

export interface FormFieldProps
  extends VariantProps<typeof fieldVariants> {
  /** Field label */
  label: string;
  /** Field name (for form) */
  name: string;
  /** Field type */
  type: FieldType;
  /** Current value */
  value?: any;
  /** Value change handler */
  onChange?: (value: any, name: string) => void;
  /** Blur handler */
  onBlur?: (name: string) => void;
  /** Placeholder */
  placeholder?: string;
  /** Helper text */
  helperText?: string;
  /** Error message */
  error?: string;
  /** Required indicator */
  required?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Read only */
  readOnly?: boolean;
  /** Options for select/radio */
  options?: Array<{ value: any; label: string }>;
  /** Min/max for number/slider/date */
  min?: number | string;
  max?: number | string;
  step?: number;
  /** Rows for textarea */
  rows?: number;
  /** Max length */
  maxLength?: number;
  /** Input mode */
  inputMode?: 'text' | 'numeric' | 'decimal' | 'email' | 'tel' | 'url' | 'search';
  /** Auto complete */
  autoComplete?: string;
  /** Secure text entry */
  secureTextEntry?: boolean;
  /** Custom render */
  renderInput?: (props: any) => React.ReactNode;
  /** Additional class names */
  className?: string;
  /** Input class names */
  inputClassName?: string;
  /** Label class names */
  labelClassName?: string;
}

export const FormField = React.forwardRef<any, FormFieldProps>(
  (
    {
      label,
      name,
      type,
      value,
      onChange,
      onBlur,
      placeholder,
      helperText,
      error,
      required = false,
      disabled = false,
      readOnly = false,
      options = [],
      min,
      max,
      step,
      rows = 4,
      maxLength,
      inputMode,
      autoComplete,
      secureTextEntry = false,
      renderInput,
      className,
      inputClassName,
      labelClassName,
      ...props
    },
    ref
  ) => {
    const handleChange = (val: any) => onChange?.(val, name);
    const handleBlur = () => onBlur?.(name);

    const renderField = () => {
      const commonProps = {
        value,
        onChange: handleChange,
        onBlur: handleBlur,
        placeholder,
        disabled,
        error: !!error,
        className: inputClassName,
      };

      switch (type) {
        case 'textarea':
          return (
            <Textarea
              {...commonProps}
              rows={rows}
              maxLength={maxLength}
              readOnly={readOnly}
            />
          );
        case 'select':
          return (
            <Select
              {...commonProps}
              options={options}
              placeholder={placeholder}
            />
          );
        case 'switch':
          return (
            <Switch
              value={!!value}
              onChange={handleChange}
              disabled={disabled}
            />
          );
        case 'checkbox':
          return (
            <Checkbox
              checked={!!value}
              onChange={handleChange}
              disabled={disabled}
            />
          );
        case 'radio':
          return (
            <RadioGroup
              value={value}
              onChange={handleChange}
              options={options}
              disabled={disabled}
            />
          );
        case 'slider':
          return (
            <Slider
              value={value || 0}
              onChange={handleChange}
              minimumValue={min as number}
              maximumValue={max as number}
              step={step}
              disabled={disabled}
              showValue
            />
          );
        case 'tags':
          return (
            <TagInput
              tags={value || []}
              onTagsChange={handleChange}
              suggestions={options.map(o => o.label)}
              disabled={disabled}
            />
          );
        case 'password':
          return (
            // @ts-ignore
            <Input
              {...commonProps}
              secureTextEntry={secureTextEntry}
              maxLength={maxLength}
              inputMode={inputMode as any}
              autoComplete={autoComplete as any}
            />
            );
        default:
          return (
            // @ts-ignore
            <Input
              {...commonProps}
              maxLength={maxLength}
              inputMode={inputMode as any}
              autoComplete={autoComplete as any}
              secureTextEntry={secureTextEntry}
            /> as any
          );
      }
    };

    void ref;
    return (
      <View
        className={cn(fieldVariants(), className)}
        {...props}
      >
        <View className="flex-row items-center justify-between">
          <Text
            className={cn(labelVariants({ required }), labelClassName)}
          >
            {label}
            {required && <Text className="text-[#EF4444]">*</Text>}
          </Text>
        </View>

        {renderInput ? renderInput({ value, onChange: handleChange, onBlur: handleBlur, disabled, error }) : renderField()}

        {error && (
          <Text className="text-[11px] text-[#EF4444] flex-row items-center gap-1">
            <Text>⚠</Text>
            {error}
          </Text>
        )}

        {helperText && !error && (
          <Text className="text-[11px] text-[#9CA3AF]">{helperText}</Text>
        )}
      </View>
    );
  }
);

FormField.displayName = 'FormField';