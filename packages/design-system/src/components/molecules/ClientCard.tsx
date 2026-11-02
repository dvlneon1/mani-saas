import React from 'react';
import { View, Text, Pressable, PressableProps, Image } from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import { Avatar } from '../atoms/Avatar';
import { Badge } from '../atoms/Badge';

const cardVariants = cva('rounded-xl bg-[#FFFFFF] shadow-sm border border-[#E5E7EB] p-4', {
  variants: {
    variant: {
      default: '',
      compact: 'p-3',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export interface ClientCardProps
  extends VariantProps<typeof cardVariants>,
    Omit<PressableProps, 'children'> {
  /** Client name */
  name: string;
  /** Client avatar URL */
  avatar?: string;
  /** Client since date */
  since?: string;
  /** Total appointments count */
  totalAppointments?: number;
  /** Lifetime value (LTV) */
  ltv?: number;
  /** Last appointment date */
  lastVisit?: string;
  /** Favorite service */
  favoriteService?: string;
  /** Tags/badges */
  tags?: Array<{ label: string; color?: string; variant?: 'default' | 'secondary' | 'outline' }>;
  /** Whether client has birthday this month */
  hasBirthday?: boolean;
  /** Actions to render (edit, message, call, etc.) */
  actions?: React.ReactNode;
  /** Additional class names */
  className?: string;
  /** Press handler */
  onPress?: () => void;
}

export const ClientCard = React.forwardRef<View, ClientCardProps>(
  (
    {
      name,
      avatar,
      since,
      totalAppointments,
      ltv,
      lastVisit,
      favoriteService,
      tags = [],
      hasBirthday = false,
      actions,
      variant = 'default',
      className,
      onPress,
      ...props
    },
    ref
  ) => {
    const formatCurrency = (value: number) => {
      return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(value);
    };

    return (
      <Pressable
        ref={ref as any}
        onPress={onPress}
        className={cn(cardVariants({ variant }), className)}
        accessibilityRole="button"
        accessibilityLabel={`Cliente ${name}`}
        {...props}
      >
        <View className="flex-row gap-3">
          <View className="relative">
            <Avatar
              size={variant === 'compact' ? 'default' : 'lg'}
              src={avatar}
            >
              {name.charAt(0).toUpperCase()}
            </Avatar>
            {hasBirthday && (
              <View className="absolute -bottom-1 -right-1">
                <View className="w-5 h-5 rounded-full bg-[#EC4899] flex-items-center justify-center border-2 border-white">
                  <Text className="text-[10px] text-white font-bold">🎂</Text>
                </View>
              </View>
            )}
          </View>

          <View className="flex-1 min-w-0 flex-col gap-1">
            <View className="flex-row items-start justify-between gap-2">
              <View className="flex-1 min-w-0 flex-col gap-0.5">
                <Text className="font-semibold text-[#111827] text-[14px] truncate">
                  {name}
                </Text>
                {since && (
                  <Text className="text-[#9CA3AF] text-[11px]">
                    Cliente desde {since}
                  </Text>
                )}
              </View>
              {ltv !== undefined && (
                <View className="flex-col items-end flex-shrink-0">
                  <Text className="font-bold text-[#111827] text-[14px]">
                    {formatCurrency(ltv)}
                  </Text>
                  <Text className="text-[#9CA3AF] text-[10px]">LTV</Text>
                </View>
              )}
            </View>

            <View className="flex-row flex-wrap gap-1.5">
              {totalAppointments !== undefined && (
                <Badge variant="default" size="sm">
                  {String(totalAppointments)} agendamentos
                </Badge>
              )}
              {lastVisit && (
                <Badge variant="default" size="sm">
                  Última: {lastVisit}
                </Badge>
              )}
              {favoriteService && (
                <Badge variant="default" size="sm">
                  ❤️ {favoriteService}
                </Badge>
              )}
              {tags.map((tag, index) => (
                <Badge
                  key={index}
                  variant={tag.variant === 'outline' ? 'secondary' : (tag.variant || 'default')}
                  size="sm"
                  className={tag.color ? `bg-[${tag.color}]` : undefined}
                >
                  {tag.label}
                </Badge>
              ))}
            </View>

            {actions && (
              <View className="mt-2 flex-row items-center gap-2">
                {actions}
              </View>
            )}
          </View>
        </View>
      </Pressable>
    );
  }
);

ClientCard.displayName = 'ClientCard';