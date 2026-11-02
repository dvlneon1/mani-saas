import React from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const containerVariants = cva('flex-row gap-2', {
  variants: {
    scrollable: {
      true: '',
      false: 'flex-wrap',
    },
  },
  defaultVariants: {
    scrollable: true,
  },
});

const chipVariants = cva(
  'flex-row items-center gap-1.5 px-3 py-1.5 rounded-full border transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-white border-[#E5E7EB]',
        active: 'bg-[#8B5CF6] border-[#8B5CF6]',
        completed: 'bg-[#10B981] border-[#10B981]',
        outline: 'bg-transparent border-[#8B5CF6]',
      },
      size: {
        sm: 'text-[11px]',
        md: 'text-[13px]',
        lg: 'text-[14px]',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export type PhaseType = 'atendimento' | 'finalizacao' | 'pagamento' | 'agendado' | 'concluido' | 'cancelado';

export interface PhaseChip {
  id: PhaseType;
  label: string;
  icon?: string;
  count?: number;
}

export interface PhaseChipsProps {
  /** Phase chips */
  phases: PhaseChip[];
  /** Active phase */
  activePhase?: PhaseType;
  /** Phase press handler */
  onPhasePress?: (phaseId: PhaseType) => void;
  /** Show counts */
  showCounts?: boolean;
  /** Scrollable horizontal list */
  scrollable?: boolean;
  /** Chip size */
  size?: 'sm' | 'md' | 'lg';
  /** Additional class names */
  className?: string;
}

const PHASE_CONFIG: Record<PhaseType, { color: string; bg: string; variant: 'default' | 'active' | 'completed' | 'outline' }> = {
  agendado: { color: '#8B5CF6', bg: '#F5F3FF', variant: 'default' },
  atendimento: { color: '#8B5CF6', bg: '#F5F3FF', variant: 'active' },
  finalizacao: { color: '#EC4899', bg: '#FDF2F8', variant: 'active' },
  pagamento: { color: '#10B981', bg: '#F0FDF4', variant: 'active' },
  concluido: { color: '#10B981', bg: '#F0FDF4', variant: 'completed' },
  cancelado: { color: '#EF4444', bg: '#FEF2F2', variant: 'outline' },
};

export const PhaseChips = React.forwardRef<React.ElementRef<typeof ScrollView>, PhaseChipsProps>(
  (
    {
      phases,
      activePhase,
      onPhasePress,
      showCounts = true,
      scrollable = true,
      size = 'md',
      className,
    },
    ref
  ) => {
    const getVariant = (phaseId: PhaseType, isActive: boolean) => {
      const config = PHASE_CONFIG[phaseId];
      if (isActive) return config.variant;
      if (phaseId === 'concluido') return 'completed';
      if (phaseId === 'cancelado') return 'outline';
      return 'default';
    };

    return (
      <ScrollView
        ref={ref}
        horizontal={scrollable}
        className={cn(containerVariants({ scrollable }), className)}
        contentContainerStyle={{
          paddingHorizontal: scrollable ? 4 : 0,
          paddingVertical: 2,
          gap: 2,
        }}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        {phases.map((phase) => {
          const config = PHASE_CONFIG[phase.id];
          const isActive = phase.id === activePhase;
          const variant = getVariant(phase.id, isActive);

          return (
            <Pressable
              key={phase.id}
              onPress={() => onPhasePress?.(phase.id)}
              className={cn(chipVariants({ variant, size }), 'flex-shrink-0')}
              accessibilityRole="button"
              accessibilityState={{ selected: isActive }}
              accessibilityLabel={`${phase.label}${phase.count !== undefined ? `, ${phase.count} itens` : ''}`}
            >
              {phase.icon && (
                <Text className="text-[14px]">{phase.icon}</Text>
              )}
              <Text className={cn(
                'font-medium',
                isActive || variant === 'active' || variant === 'completed' ? 'text-white' : variant === 'outline' ? config.color : 'text-[#111827]'
              )}>
                {phase.label}
              </Text>
              {showCounts && phase.count !== undefined && (
                <View
                  className={cn(
                    'w-5 h-5 rounded-full flex-items-center justify-center text-[10px] font-bold',
                    isActive || variant === 'active' || variant === 'completed'
                      ? 'bg-white/20 text-white'
                      : 'bg-[#F3F4F6] text-[#4B5563]'
                  )}
                >
                  {phase.count}
                </View>
              )}
            </Pressable>
          );
        })}
      </ScrollView>
    );
  }
);

PhaseChips.displayName = 'PhaseChips';