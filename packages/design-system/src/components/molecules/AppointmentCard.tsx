import React from 'react';
import { View, Text, Pressable, PressableProps, Image } from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import { Avatar } from '../atoms/Avatar';
import { Badge } from '../atoms/Badge';

const cardVariants = cva('rounded-xl bg-[#FFFFFF] shadow-sm border border-[#E5E7EB]', {
  variants: {
    variant: {
      compact: 'p-3',
      full: 'p-4',
      detail: 'p-6',
    },
  },
  defaultVariants: {
    variant: 'full',
  },
});

const timeVariants = cva('flex-row items-center gap-1', {
  variants: {
    variant: {
      compact: 'text-[11px]',
      full: 'text-[12px]',
      detail: 'text-[13px]',
    },
  },
  defaultVariants: {
    variant: 'full',
  },
});

export type AppointmentCardVariant = VariantProps<typeof cardVariants>['variant'];

export interface AppointmentCardProps
  extends VariantProps<typeof cardVariants>,
    Omit<PressableProps, 'children'> {
  /** Appointment time (e.g., "14:30") */
  time: string;
  /** Duration in minutes */
  duration?: number;
  /** Client name */
  clientName: string;
  /** Client avatar URL */
  clientAvatar?: string;
  /** Service name */
  service: string;
  /** Service price */
  price?: string;
  /** Status badge */
  status?: 'scheduled' | 'confirmed' | 'completed' | 'cancelled' | 'noshow';
  /** Phase for workflow (atendimento, finalização, pagamento) */
  phase?: 'atendimento' | 'finalizacao' | 'pagamento';
  /** Notes preview */
  notes?: string;
  /** Whether this is the current/next appointment */
  isCurrent?: boolean;
  /** Additional class names */
  className?: string;
  /** Press handler */
  onPress?: () => void;
  /** Long press handler */
  onLongPress?: () => void;
  /** Children content (detail variant) */
  children?: React.ReactNode;
}

const statusConfig = {
  scheduled: { label: 'Agendado', variant: 'secondary' as const, color: '#8B5CF6' },
  confirmed: { label: 'Confirmado', variant: 'default' as const, color: '#10B981' },
  completed: { label: 'Concluído', variant: 'secondary' as const, color: '#10B981' },
  cancelled: { label: 'Cancelado', variant: 'destructive' as const, color: '#EF4444' },
  noshow: { label: 'Não compareceu', variant: 'warning' as const, color: '#F59E0B' },
};

const phaseConfig = {
  atendimento: { label: 'Atendimento', color: '#8B5CF6', bg: '#F5F3FF' },
  finalizacao: { label: 'Finalização', color: '#EC4899', bg: '#FDF2F8' },
  pagamento: { label: 'Pagamento', color: '#10B981', bg: '#F0FDF4' },
};

export const AppointmentCard = React.forwardRef<View, AppointmentCardProps>(
  (
    {
      time,
      duration,
      clientName,
      clientAvatar,
      service,
      price,
      status = 'scheduled',
      phase,
      notes,
      isCurrent = false,
      variant = 'full',
      className,
      onPress,
      onLongPress,
      children,
      ...props
    },
    ref
  ) => {
    const statusInfo = statusConfig[status];
    const phaseInfo = phase ? phaseConfig[phase] : null;

    return (
      <Pressable
        ref={ref as any}
        onPress={onPress}
        onLongPress={onLongPress}
        className={cn(
          cardVariants({ variant }),
          isCurrent && 'border-2 border-[#8B5CF6] shadow-md',
          className
        )}
        accessibilityRole="button"
        accessibilityLabel={`Agendamento ${time} com ${clientName}, ${service}`}
        {...props}
      >
        <View className="flex-row gap-3">
          <View className="flex-col items-center justify-start gap-1">
            <Text className={cn(timeVariants({ variant }), 'font-mono font-medium text-[#111827]')}>
              {time}
            </Text>
            {duration && (
              <Text className={cn(timeVariants({ variant }), 'text-[#9CA3AF]')}>
                {duration}min
              </Text>
            )}
            {isCurrent && (
              <View className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6]" />
            )}
          </View>

          <View className="flex-1 min-w-0 flex-col gap-1.5">
            <View className="flex-row items-start justify-between gap-2">
              <View className="flex-row items-center gap-2 flex-1 min-w-0">
                {clientAvatar && (
                  <Avatar size="sm" src={clientAvatar} />
                )}
                <View className="flex-1 min-w-0 flex-col gap-0.5">
                  <Text
                    className={cn(
                      'font-medium truncate',
                      variant === 'compact' ? 'text-[13px]' : 'text-[14px]'
                    )}
                  >
                    {clientName}
                  </Text>
                  <Text
                    className={cn(
                      'text-[#4B5563] truncate',
                      variant === 'compact' ? 'text-[11px]' : 'text-[12px]'
                    )}
                  >
                    {service}
                  </Text>
                </View>
              </View>

              <View className="flex-row items-center gap-2 flex-shrink-0">
                {price && (
                  <Text
                    className={cn(
                      'font-semibold text-[#111827]',
                      variant === 'compact' ? 'text-[13px]' : 'text-[14px]'
                    )}
                  >
                    {price}
                  </Text>
                )}
                <Badge variant={statusInfo.variant} size="sm">
                  {statusInfo.label}
                </Badge>
              </View>
            </View>

            {phaseInfo && (
              <View
                className="px-2 py-0.5 rounded-full flex-row items-center gap-1"
                style={{ backgroundColor: phaseInfo.bg }}
              >
                <View
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: phaseInfo.color }}
                />
                <Text
                  className={cn(
                    'font-medium',
                    variant === 'compact' ? 'text-[10px]' : 'text-[11px]'
                  )}
                  style={{ color: phaseInfo.color }}
                >
                  {phaseInfo.label}
                </Text>
              </View>
            )}

            {notes && variant !== 'compact' && (
              <Text
                className={cn(
                  'text-[#9CA3AF] line-clamp-2',
                  variant === 'full' ? 'text-[11px]' : 'text-[12px]'
                )}
              >
                {notes}
              </Text>
            )}

            {variant === 'detail' && children && <View className="mt-3">{children}</View>}
          </View>
        </View>
      </Pressable>
    );
  }
);

AppointmentCard.displayName = 'AppointmentCard';