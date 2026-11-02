import React, { useRef, useState, useEffect } from 'react';
import { View, Text, Pressable, PanResponder, StyleSheet, Platform, ScrollView } from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const containerVariants = cva('rounded-xl bg-white border border-[#E5E7EB]', {
  variants: {
    variant: {
      default: 'p-4',
      compact: 'p-2',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export interface CalendarProps {
  /** Selected date (ISO string) */
  selectedDate?: string;
  /** Date change handler */
  onDateChange?: (date: string) => void;
  /** Array of dates with events */
  events?: Array<{
    date: string;
    count: number;
    color?: string;
  }>;
  /** Appointments for selected date */
  appointments?: Array<{
    id: string;
    time: string;
    duration: number;
    clientName: string;
    service: string;
    color?: string;
  }>;
  /** View mode */
  viewMode?: 'month' | 'week' | 'day';
  /** View mode change handler */
  onViewModeChange?: (mode: 'month' | 'week' | 'day') => void;
  /** Min date */
  minDate?: string;
  /** Max date */
  maxDate?: string;
  /** Locale */
  locale?: string;
  /** Show week numbers */
  showWeekNumbers?: boolean;
  /** First day of week (0 = Sunday) */
  firstDayOfWeek?: number;
  /** Additional class names */
  className?: string;
  /** Time slot height (day view) */
  timeSlotHeight?: number;
  /** Working hours start */
  workingHoursStart?: number;
  /** Working hours end */
  workingHoursEnd?: number;
}

const MONTHS_PT = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

const DAYS_PT = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

export const Calendar = React.forwardRef<React.ElementRef<typeof View>, CalendarProps>(
  (
    {
      selectedDate,
      onDateChange,
      events = [],
      appointments = [],
      viewMode = 'month',
      onViewModeChange,
      minDate,
      maxDate,
      locale = 'pt-BR',
      showWeekNumbers = false,
      firstDayOfWeek = 0,
      className,
      timeSlotHeight = 60,
      workingHoursStart = 8,
      workingHoursEnd = 20,
    },
    ref
  ) => {
    const [currentMonth, setCurrentMonth] = useState(selectedDate ? new Date(selectedDate) : new Date());
    const [currentWeek, setCurrentWeek] = useState(selectedDate ? new Date(selectedDate) : new Date());

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const getMonthDays = (date: Date) => {
      const year = date.getFullYear();
      const month = date.getMonth();
      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);
      const daysInMonth = lastDay.getDate();
      const startingDay = (firstDay.getDay() - firstDayOfWeek + 7) % 7;

      const days = [];
      const prevMonthLastDay = new Date(year, month, 0).getDate();

      for (let i = startingDay - 1; i >= 0; i--) {
        const day = prevMonthLastDay - i;
        const d = new Date(year, month - 1, day);
        days.push({ day, date: d, isCurrentMonth: false });
      }

      for (let i = 1; i <= daysInMonth; i++) {
        const d = new Date(year, month, i);
        days.push({ day: i, date: d, isCurrentMonth: true });
      }

      const remaining = (7 - (days.length % 7)) % 7;
      for (let i = 1; i <= remaining; i++) {
        const d = new Date(year, month + 1, i);
        days.push({ day: i, date: d, isCurrentMonth: false });
      }

      return days;
    };

    const getWeekDays = (date: Date) => {
      const day = date.getDay();
      const diff = (day - firstDayOfWeek + 7) % 7;
      const monday = new Date(date);
      monday.setDate(date.getDate() - diff);
      monday.setHours(0, 0, 0, 0);

      const days = [];
      for (let i = 0; i < 7; i++) {
        const d = new Date(monday);
        d.setDate(monday.getDate() + i);
        days.push(d);
      }
      return days;
    };

    const formatDateKey = (date: Date) => date.toISOString().split('T')[0];

    const hasEvent = (date: Date) => {
      const key = formatDateKey(date);
      return events.find(e => e.date === key);
    };

    const getAppointmentsForDate = (date: Date) => {
      const key = formatDateKey(date);
      return appointments.filter(a => formatDateKey(new Date(a.time)) === key);
    };

    const isSelected = (date: Date) => {
      if (!selectedDate) return false;
      return formatDateKey(date) === selectedDate;
    };

    const isToday = (date: Date) => formatDateKey(date) === formatDateKey(today);

    const isDisabled = (date: Date) => {
      if (minDate && date < new Date(minDate)) return true;
      if (maxDate && date > new Date(maxDate)) return true;
      return false;
    };

    const handleDayPress = (date: Date) => {
      if (isDisabled(date)) return;
      const key = formatDateKey(date);
      onDateChange?.(key);
      if (viewMode === 'month') {
        onViewModeChange?.('day');
      }
    };

    const navigateMonth = (delta: number) => {
      const newMonth = new Date(currentMonth);
      newMonth.setMonth(currentMonth.getMonth() + delta);
      setCurrentMonth(newMonth);
    };

    const navigateWeek = (delta: number) => {
      const newWeek = new Date(currentWeek);
      newWeek.setDate(currentWeek.getDate() + delta * 7);
      setCurrentWeek(newWeek);
    };

    const renderMonthView = () => {
      const days = getMonthDays(currentMonth);

      return (
        <View className={cn(containerVariants(), className)}>
          {/* Header */}
          <View className="flex-row items-center justify-between mb-4">
            <Pressable onPress={() => navigateMonth(-1)} className="p-2" accessibilityLabel="Mês anterior">
              <Text className="text-[20px]">‹</Text>
            </Pressable>
            <Text className="font-semibold text-[16px] text-[#111827]">
              {MONTHS_PT[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </Text>
            <Pressable onPress={() => navigateMonth(1)} className="p-2" accessibilityLabel="Próximo mês">
              <Text className="text-[20px]">›</Text>
            </Pressable>
          </View>

          {/* Weekdays */}
          <View className="flex-row mb-2">
            {showWeekNumbers && <View className="w-10 flex-items-center justify-center text-[11px] text-[#9CA3AF]">Sem</View>}
            {DAYS_PT.map((day, i) => (
              <View key={i} className="flex-1 flex-items-center justify-center py-2">
                <Text className="font-medium text-[11px] text-[#9CA3AF]">{day}</Text>
              </View>
            ))}
          </View>

          {/* Days grid */}
          <View className="flex-row flex-wrap">
            {days.map((item, index) => {
              const event = hasEvent(item.date);
              const isSel = isSelected(item.date);
              const isTod = isToday(item.date);
              const disabled = isDisabled(item.date);

              return (
                <Pressable
                  key={index}
                  onPress={() => handleDayPress(item.date)}
                  disabled={disabled || !item.isCurrentMonth}
                  className={cn(
                    'flex-1 aspect-[1/1] flex-items-center justify-center relative',
                    item.isCurrentMonth ? '' : 'opacity-40',
                    disabled && 'opacity-30',
                    isSel && 'bg-[#8B5CF6]',
                    isTod && !isSel && 'ring-2 ring-[#8B5CF6]',
                    event && !isSel && 'bg-[#F5F3FF]'
                  )}
                  style={{ borderRadius: 8 }}
                  accessibilityRole="button"
                  accessibilityLabel={`${item.day} de ${MONTHS_PT[currentMonth.getMonth()]}`}
                  accessibilityState={{ selected: isSel, disabled }}
                >
                  <Text className={cn(
                    'font-medium',
                    isSel ? 'text-white' : item.isCurrentMonth ? 'text-[#111827]' : 'text-[#9CA3AF]',
                    isTod && !isSel && 'font-bold'
                  )}>
                    {item.day}
                  </Text>
                  {event && (
                    <View
                      className="absolute bottom-1 flex-row gap-0.5"
                      style={{
                        left: 4,
                        right: 4,
                      }}
                    >
                      {[...Array(Math.min(event.count, 3))].map((_, i) => (
                        <View
                          key={i}
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: event.color || '#8B5CF6' }}
                        />
                      ))}
                    </View>
                  )}
                </Pressable>
              );
            })}
          </View>
        </View>
      );
    };

    const renderWeekView = () => {
      const days = getWeekDays(currentWeek);
      const startOfWeek = days[0];
      const endOfWeek = days[6];

      return (
        <View className={cn(containerVariants(), className)}>
          <View className="flex-row items-center justify-between mb-4">
            <Pressable onPress={() => navigateWeek(-1)} className="p-2" accessibilityLabel="Semana anterior">
              <Text className="text-[20px]">‹</Text>
            </Pressable>
            <Text className="font-semibold text-[16px] text-[#111827]">
              {startOfWeek.getDate()}–{endOfWeek.getDate()} {MONTHS_PT[endOfWeek.getMonth()]} {endOfWeek.getFullYear()}
            </Text>
            <Pressable onPress={() => navigateWeek(1)} className="p-2" accessibilityLabel="Próxima semana">
              <Text className="text-[20px]">›</Text>
            </Pressable>
          </View>

          <View className="flex-row">
            {showWeekNumbers && <View className="w-10" />}
            <View className="flex-1 flex-row">
              {days.map((day, i) => {
                const event = hasEvent(day);
                const isSel = isSelected(day);
                const isTod = isToday(day);

                return (
                  <Pressable
                    key={i}
                    onPress={() => handleDayPress(day)}
                    className={cn(
                      'flex-1 py-3 flex-items-center justify-center relative border-r border-[#E5E7EB]',
                      isSel && 'bg-[#8B5CF6]',
                      isTod && !isSel && 'bg-[#F5F3FF]'
                    )}
                    accessibilityRole="button"
                    accessibilityLabel={`${DAYS_PT[day.getDay()]} ${day.getDate()}`}
                    accessibilityState={{ selected: isSel }}
                  >
                    <View className="flex-col items-center gap-1">
                      <Text className={cn(
                        'font-medium text-[12px]',
                        isSel ? 'text-white' : isTod ? 'text-[#8B5CF6]' : 'text-[#9CA3AF]'
                      )}>
                        {DAYS_PT[day.getDay()]}
                      </Text>
                      <Text className={cn(
                        'font-semibold text-[16px]',
                        isSel ? 'text-white' : 'text-[#111827]'
                      )}>
                        {day.getDate()}
                      </Text>
                    </View>
                    {event && (
                      <View className="absolute bottom-2 flex-row gap-1">
                        {[...Array(Math.min(event.count, 3))].map((_, j) => (
                          <View
                            key={j}
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ backgroundColor: event.color || '#8B5CF6' }}
                          />
                        ))}
                      </View>
                    )}
                  </Pressable>
                );
              })}
            </View>
          </View>
        </View>
      );
    };

    const renderDayView = () => {
      const dayAppointments = getAppointmentsForDate(new Date(selectedDate || currentWeek));

      return (
        <View className={cn(containerVariants(), className, 'flex-1')}>
          <View className="flex-row items-center justify-between mb-4">
            <Pressable onPress={() => onViewModeChange?.('week')} className="p-2" accessibilityLabel="Ver semana">
              <Text className="text-[20px]">‹</Text>
            </Pressable>
            <Text className="font-semibold text-[16px] text-[#111827]">
              {selectedDate ? new Date(selectedDate).toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' }) : 'Selecione um dia'}
            </Text>
            <View className="w-8" />
          </View>

          <ScrollView
            contentContainerStyle={{ paddingBottom: 20 }}
            showsVerticalScrollIndicator={false}
          >
            {Array.from({ length: workingHoursEnd - workingHoursStart }).map((_, hourIndex) => {
              const hour = workingHoursStart + hourIndex;
              const hourAppointments = dayAppointments.filter(a => {
                const apptHour = parseInt(a.time.split(':')[0]);
                return apptHour === hour;
              });

              return (
                <View
                  key={hour}
                  className="flex-row min-h-[60px] border-b border-[#E5E7EB]"
                  style={{ height: timeSlotHeight }}
                >
                  <View className="w-16 flex-items-center justify-center pr-3 border-r border-[#E5E7EB]">
                    <Text className="text-[11px] text-[#9CA3AF] font-mono">
                      {hour.toString().padStart(2, '0')}:00
                    </Text>
                  </View>
                  <View className="flex-1 relative">
                    {hourAppointments.map((appt, i) => (
                      <View
                        key={appt.id}
                        className="absolute left-2 right-2 rounded-lg"
                        style={{
                          top: 2,
                          bottom: 2,
                          backgroundColor: appt.color || '#8B5CF6',
                          zIndex: i + 1,
                        }}
                      >
                        <Text className="p-2 text-white text-[11px] font-medium truncate">
                          {appt.time} {appt.clientName} – {appt.service}
                        </Text>
                      </View>
                    ))}
                  </View>
                </View>
              );
            })}
          </ScrollView>
        </View>
      );
    };

    return (
      <View ref={ref} className="flex-1">
        {viewMode === 'month' && renderMonthView()}
        {viewMode === 'week' && renderWeekView()}
        {viewMode === 'day' && renderDayView()}
      </View>
    );
  }
);

Calendar.displayName = 'Calendar';