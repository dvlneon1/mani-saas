import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import { Badge } from '../atoms/Badge';

const itemVariants = cva('flex-row items-center gap-3 p-3 rounded-xl bg-white border border-[#E5E7EB]', {
  variants: {
    variant: {
      default: '',
      compact: 'p-2',
      detailed: 'p-4',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

const typeConfig = {
  income: { label: 'Entrada', color: '#10B981', bg: '#F0FDF4', icon: '↑' },
  expense: { label: 'Saída', color: '#EF4444', bg: '#FEF2F2', icon: '↓' },
  transfer: { label: 'Transferência', color: '#8B5CF6', bg: '#F5F3FF', icon: '↔' },
  refund: { label: 'Estorno', color: '#F59E0B', bg: '#FFFBEB', icon: '↩' },
} as const;

const methodConfig = {
  pix: { label: 'PIX', color: '#06B6D4' },
  cash: { label: 'Dinheiro', color: '#10B981' },
  card: { label: 'Cartão', color: '#8B5CF6' },
  bank_transfer: { label: 'TED/DOC', color: '#64748B' },
  other: { label: 'Outro', color: '#9CA3AF' },
} as const;

const statusConfig = {
  completed: { label: 'Concluído', variant: 'default' as const, color: '#10B981' },
  pending: { label: 'Pendente', variant: 'outline' as const, color: '#F59E0B' },
  cancelled: { label: 'Cancelado', variant: 'destructive' as const, color: '#EF4444' },
  failed: { label: 'Falhou', variant: 'destructive' as const, color: '#EF4444' },
} as const;

export interface TransactionItemProps
  extends VariantProps<typeof itemVariants> {
  /** Transaction type */
  type: 'income' | 'expense' | 'transfer' | 'refund';
  /** Amount value */
  amount: number;
  /** Description */
  description: string;
  /** Date string */
  date: string;
  /** Payment method */
  method?: keyof typeof methodConfig;
  /** Status */
  status?: keyof typeof statusConfig;
  /** Category */
  category?: string;
  /** Client name (for income) */
  clientName?: string;
  /** Appointment reference */
  appointmentId?: string;
  /** Press handler */
  onPress?: () => void;
  /** Additional class names */
  className?: string;
}

export const TransactionItem = React.forwardRef<React.ElementRef<typeof View>, TransactionItemProps>(
  (
    {
      type,
      amount,
      description,
      date,
      method,
      status = 'completed',
      category,
      clientName,
      appointmentId,
      variant = 'default',
      onPress,
      className,
      ...props
    },
    ref
  ) => {
    const typeInfo = typeConfig[type];
    const methodInfo = method ? methodConfig[method] : null;
    const statusInfo = statusConfig[status];

    const formatCurrency = (value: number) => {
      return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(Math.abs(value));
    };

    const isIncome = type === 'income' || type === 'refund';

    return (
      <Pressable
        ref={ref as any}
        onPress={onPress}
        className={cn(itemVariants({ variant }), className)}
        accessibilityRole={onPress ? 'button' : 'none'}
        accessibilityLabel={`Transação ${typeInfo.label}: ${description}, ${formatCurrency(amount)}`}
        {...props}
      >
        <View className="flex-row items-center gap-3 flex-1 min-w-0">
          {/* Type indicator */}
          <View
            className="w-10 h-10 rounded-lg flex-items-center justify-center flex-shrink-0"
            style={{ backgroundColor: typeInfo.bg }}
          >
            <Text className="text-[16px] font-bold" style={{ color: typeInfo.color }}>
              {typeInfo.icon}
            </Text>
          </View>

          {/* Content */}
          <View className="flex-1 min-w-0 flex-col gap-1">
            <View className="flex-row items-center justify-between gap-2">
              <Text className="font-medium text-[#111827] text-[14px] truncate flex-1">
                {description}
              </Text>
              <Text
                className={cn(
                  'font-bold tabular-nums text-[14px] flex-shrink-0',
                  isIncome ? 'text-[#10B981]' : 'text-[#EF4444]'
                )}
              >
                {isIncome ? '+' : '-'}{formatCurrency(amount)}
              </Text>
            </View>

            <View className="flex-row items-center gap-2 flex-wrap">
              <Text className="text-[11px] text-[#9CA3AF] font-mono">{date}</Text>

              {methodInfo && (
                <Badge variant="secondary" size="sm" className="flex-shrink-0">
                  {methodInfo.label}
                </Badge>
              )}

              {category && (
                <Badge variant="secondary" size="sm" className="flex-shrink-0">
                  {category}
                </Badge>
              )}

              {clientName && (
                <Badge variant="secondary" size="sm" className="flex-shrink-0">
                  👤 {clientName}
                </Badge>
              )}

              <Badge variant={statusInfo.variant === 'outline' ? 'secondary' : statusInfo.variant} size="sm" className="flex-shrink-0">
                {statusInfo.label}
              </Badge>
            </View>

            {appointmentId && variant === 'detailed' && (
              <Text className="text-[11px] text-[#9CA3AF] font-mono">
                Agendamento: {appointmentId}
              </Text>
            )}
          </View>
        </View>
      </Pressable>
    );
  }
);

TransactionItem.displayName = 'TransactionItem';