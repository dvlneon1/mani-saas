import React from 'react';
import { View, Text, Pressable, Animated, Easing } from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const tabBarVariants = cva('flex-row bg-white border-t border-[#E5E7EB] h-[56px]', {
  variants: {
    variant: {
      default: '',
      floating: 'mx-4 mt-4 mb-2 rounded-full shadow-lg h-12',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

const tabItemVariants = cva('flex-1 flex-col items-center justify-center gap-1 py-2', {
  variants: {
    active: {
      true: '',
      false: '',
    },
  },
  defaultVariants: {
    active: false,
  },
});

export interface TabItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  activeIcon?: React.ReactNode;
  badge?: number;
  accessibilityLabel?: string;
}

export interface BottomTabBarProps {
  /** Tab items */
  tabs: TabItem[];
  /** Active tab ID */
  activeTab: string;
  /** Tab change handler */
  onTabChange: (tabId: string) => void;
  /** Variant */
  variant?: 'default' | 'floating';
  /** Show labels */
  showLabels?: boolean;
  /** Animation duration */
  animationDuration?: number;
  /** Additional class names */
  className?: string;
  /** Safe area bottom inset */
  safeAreaInset?: number;
}

export const BottomTabBar = React.forwardRef<React.ElementRef<typeof View>, BottomTabBarProps>(
  (
    {
      tabs,
      activeTab,
      onTabChange,
      variant = 'default',
      showLabels = true,
      animationDuration = 200,
      className,
      safeAreaInset = 0,
    },
    ref
  ) => {
    const activeIndex = tabs.findIndex(t => t.id === activeTab);

    return (
      <View
        ref={ref}
        className={cn(tabBarVariants({ variant }), className)}
        style={{
          paddingBottom: safeAreaInset,
        }}
        accessibilityRole="tablist"
        aria-label="Navegação principal"
      >
        {tabs.map((tab, index) => {
          const isActive = tab.id === activeTab;

          return (
            <Pressable
              key={tab.id}
              onPress={() => onTabChange(tab.id)}
              className={cn(tabItemVariants({ active: isActive }), 'relative')}
              accessibilityRole="tab"
              accessibilityState={{ selected: isActive }}
              accessibilityLabel={tab.accessibilityLabel || tab.label}
            >
              <View className="relative flex-col items-center gap-1">
                <View className="relative">
                  {isActive && tab.activeIcon ? (
                    tab.activeIcon
                  ) : (
                    tab.icon
                  )}
                  {tab.badge && tab.badge > 0 && (
                    <View
                      className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#EF4444] flex-items-center justify-center"
                    >
                      <Text className="text-white text-[10px] font-bold">
                        {tab.badge > 9 ? '9+' : tab.badge}
                      </Text>
                    </View>
                  )}
                </View>
                {showLabels && (
                  <Text
                    className={cn(
                      'font-medium',
                      isActive ? 'text-[#8B5CF6]' : 'text-[#9CA3AF]',
                      'text-[10px]'
                    )}
                  >
                    {tab.label}
                  </Text>
                )}
              </View>

              {/* Active indicator */}
              {isActive && variant === 'default' && (
                <View
                  className="absolute bottom-0 left-1/2 w-8 h-0.5 -translate-x-1/2 rounded-full"
                  style={{ backgroundColor: '#8B5CF6' }}
                />
              )}
            </Pressable>
          );
        })}

        {/* Floating variant active indicator animation */}
        {variant === 'floating' && (
          <Animated.View
            className="absolute top-0 left-0 h-full w-1/3 rounded-full"
            style={{
              backgroundColor: '#F5F3FF',
              transform: [
                {
                  translateX: (activeIndex * (100 / tabs.length) + '%') as any,
                },
              ] as any,
            }}
          />
        )}
      </View>
    );
  }
);

BottomTabBar.displayName = 'BottomTabBar';