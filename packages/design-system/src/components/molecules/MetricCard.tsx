import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import { Card } from '../atoms/Card';

const cardVariants = cva('rounded-xl bg-white border border-[#E5E7EB] p-4', {
  variants: {
    variant: {
      default: '',
      compact: 'p-3',
      elevated: 'shadow-md',
    },
    size: {
      sm: '',
      md: '',
      lg: '',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
});

const trendVariants = cva('flex-row items-center gap-1', {
  variants: {
    trend: {
      up: 'text-[#10B981]',
      down: 'text-[#EF4444]',
      neutral: 'text-[#9CA3AF]',
    },
  },
  defaultVariants: {
    trend: 'neutral',
  },
});

export interface MetricCardProps
  extends VariantProps<typeof cardVariants> {
  /** Metric label */
  label: string;
  /** Metric value */
  value: string | number;
  /** Icon to display */
  icon?: React.ReactNode;
  /** Trend direction */
  trend?: 'up' | 'down' | 'neutral';
  /** Trend value (e.g., "+12%") */
  trendValue?: string;
  /** Trend label (e.g., "vs mês passado") */
  trendLabel?: string;
  /** Value prefix (e.g., "R$") */
  prefix?: string;
  /** Value suffix (e.g., "/mês") */
  suffix?: string;
  /** Loading state */
  isLoading?: boolean;
  /** Press handler */
  onPress?: () => void;
  /** Additional class names */
  className?: string;
  /** Accessibility label */
  accessibilityLabel?: string;
}

export const MetricCard = React.forwardRef<View, MetricCardProps>(
  (
    {
      label,
      value,
      icon,
      trend = 'neutral',
      trendValue,
      trendLabel,
      prefix,
      suffix,
      isLoading = false,
      variant = 'default',
      size = 'md',
      onPress,
      className,
      accessibilityLabel,
      ...props
    },
    ref
  ) => {
    const displayValue = isLoading ? '—' : value;

    return (
      <Pressable
        ref={ref as any}
        onPress={onPress}
        className={cn(cardVariants({ variant, size }), className)}
        accessibilityRole={onPress ? 'button' : 'none'}
        accessibilityLabel={accessibilityLabel || `${label}: ${displayValue}`}
        {...props}
      >
        <View className="flex-row items-start justify-between gap-3">
          <View className="flex-1 min-w-0 flex-col gap-1">
            <Text className="text-[12px] font-medium text-[#9CA3AF] uppercase tracking-wide">
              {label}
            </Text>
            {isLoading ? (
              <View className="h-8 w-24 bg-[#E5E7EB] rounded animate-pulse" />
            ) : (
              <Text className={cn(
                'font-bold tabular-nums',
                size === 'sm' ? 'text-[20px]' : size === 'md' ? 'text-[24px]' : 'text-[28px]'
              )}>
                {prefix && <Text className="font-medium text-[#4B5563]">{prefix}</Text>}
                {displayValue}
                {suffix && <Text className="font-medium text-[#4B5563]">{suffix}</Text>}
              </Text>
            )}
            {(trendValue || trendLabel) && (
              <View className={trendVariants({ trend })}>
                {trendValue && (
                  <Text className={cn(
                    'font-semibold',
                    size === 'sm' ? 'text-[11px]' : 'text-[12px]'
                  )}>
                    {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'} {trendValue}
                  </Text>
                )}
                {trendLabel && (
                  <Text className={cn(
                    'text-[#9CA3AF]',
                    size === 'sm' ? 'text-[10px]' : 'text-[11px]'
                  )}>
                    {trendLabel}
                  </Text>
                )}
              </View>
            )}
          </View>

          {icon && (
            <View className="w-12 h-12 rounded-xl flex-items-center justify-center flex-shrink-0 bg-[#F5F3FF]">
              {icon}
            </View>
          )}
        </View>
      </Pressable>
    );
  }
);

MetricCard.displayName = 'MetricCard';