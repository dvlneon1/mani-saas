import React from 'react';
import { Text, TextProps } from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const iconVariants = cva('flex-items-center justify-center', {
  variants: {
    size: {
      xs: 'text-[12px]',
      sm: 'text-[16px]',
      md: 'text-[20px]',
      lg: 'text-[24px]',
      xl: 'text-[28px]',
      '2xl': 'text-[32px]',
    },
    weight: {
      light: 'font-light',
      normal: 'font-normal',
      medium: 'font-medium',
      bold: 'font-bold',
    },
  },
  defaultVariants: {
    size: 'md',
    weight: 'normal',
  },
});

export type IconName =
  // Navigation
  | 'chevron-left' | 'chevron-right' | 'chevron-up' | 'chevron-down'
  | 'arrow-left' | 'arrow-right' | 'arrow-up' | 'arrow-down'
  | 'menu' | 'close' | 'x' | 'more-horizontal' | 'more-vertical'
  // Actions
  | 'plus' | 'minus' | 'check' | 'x-circle' | 'edit' | 'trash' | 'trash-2'
  | 'copy' | 'share' | 'download' | 'upload' | 'refresh-cw' | 'rotate-cw'
  | 'save' | 'bookmark' | 'heart' | 'star' | 'flag' | 'bell' | 'bell-off'
  // Content
  | 'image' | 'video' | 'music' | 'file' | 'file-text' | 'folder' | 'folder-plus'
  | 'camera' | 'camera-off' | 'mic' | 'mic-off' | 'scan' | 'qr-code'
  // Communication
  | 'message-circle' | 'message-square' | 'mail' | 'send' | 'phone' | 'phone-call'
  | 'voicemail' | 'chat' | 'comment' | 'users' | 'user' | 'user-plus' | 'user-minus'
  | 'user-check' | 'user-x' | 'at-sign' | 'hash'
  // Time & Calendar
  | 'calendar' | 'calendar-plus' | 'calendar-minus' | 'calendar-x' | 'clock'
  | 'clock-1' | 'clock-2' | 'clock-3' | 'clock-4' | 'clock-5' | 'clock-6'
  | 'clock-7' | 'clock-8' | 'clock-9' | 'clock-10' | 'clock-11' | 'clock-12'
  // Finance
  | 'dollar-sign' | 'credit-card' | 'banknote' | 'coins' | 'receipt' | 'invoice'
  | 'shopping-bag' | 'shopping-cart' | 'tag' | 'tags' | 'gift'
  // Status
  | 'alert-circle' | 'alert-triangle' | 'check-circle' | 'check-circle-2'
  | 'x-circle' | 'info' | 'help-circle' | 'loader' | 'loader-2' | 'refresh-cw'
  | 'shield' | 'shield-check' | 'shield-x' | 'lock' | 'unlock' | 'key'
  // Settings
  | 'settings' | 'sliders' | 'toggle-left' | 'toggle-right' | 'wrench' | 'hammer'
  | 'cpu' | 'database' | 'server' | 'hard-drive' | 'monitor' | 'smartphone' | 'tablet'
  // Media
  | 'play' | 'pause' | 'stop' | 'skip-back' | 'skip-forward' | 'fast-forward' | 'rewind'
  | 'volume' | 'volume-x' | 'volume-1' | 'volume-2' | 'mic' | 'mic-off'
  // Layout
  | 'grid' | 'list' | 'columns' | 'rows' | 'sidebar' | 'layout' | 'maximize' | 'minimize'
  | 'fullscreen' | 'minimize-2' | 'crop' | 'move' | 'zoom-in' | 'zoom-out'
  // Arrows & Direction
  | 'corner-up-left' | 'corner-up-right' | 'corner-down-left' | 'corner-down-right'
  | 'expand' | 'contract' | 'external-link' | 'internal-link'
  // Shapes
  | 'circle' | 'square' | 'triangle' | 'hexagon' | 'diamond'
  // Weather
  | 'sun' | 'moon' | 'cloud' | 'cloud-rain' | 'cloud-snow' | 'cloud-lightning' | 'wind'
  // Other
  | 'home' | 'search' | 'filter' | 'sort-asc' | 'sort-desc' | 'eye' | 'eye-off'
  | 'scissors' | 'clipboard' | 'clipboard-check' | 'clipboard-list' | 'clipboard-x'
  | 'archive' | 'inbox' | 'outbox' | 'trash' | 'trash-2' | 'recycle'
  | 'link' | 'link-2' | 'unlink' | 'link-2' | 'anchor' | 'bookmark' | 'bookmark-minus'
  | 'bookmark-plus' | 'bookmark-x' | 'tag' | 'tags' | 'award' | 'trophy' | 'medal'
  | 'target' | 'zap' | 'sparkles' | 'sparkle' | 'magic-wand' | 'paintbrush' | 'palette'
  | 'droplet' | 'pill' | 'syringe' | 'thermometer' | 'heart-pulse' | 'stethoscope'
  | 'bone' | 'brain' | 'dna' | 'flask-conical' | 'flask-round' | 'test-tube' | 'test-tubes'
  | 'microscope' | 'telescope' | 'satellite' | 'rocket' | 'plane' | 'car' | 'bike'
  | 'bus' | 'train' | 'ship' | 'anchor' | 'map-pin' | 'map-pin-off' | 'navigation'
  | 'compass' | 'globe' | 'globe-2' | 'network' | 'wifi' | 'wifi-off' | 'bluetooth'
  | 'battery' | 'battery-charging' | 'battery-low' | 'plug' | 'plug-zap' | 'power' | 'power-off';

const ICON_MAP: Record<IconName, string> = {
  // Navigation
  'chevron-left': '‹',
  'chevron-right': '›',
  'chevron-up': '∧',
  'chevron-down': '∨',
  'arrow-left': '←',
  'arrow-right': '→',
  'arrow-up': '↑',
  'arrow-down': '↓',
  'menu': '≡',
  'close': '✕',
  'x': '✕',
  'more-horizontal': '⋯',
  'more-vertical': '⋮',
  // Actions
  'plus': '+',
  'minus': '−',
  'check': '✓',
  'edit': '✎',
  'trash': '🗑',
  'trash-2': '🗑',
  'copy': '📋',
  'share': '📤',
  'download': '⬇',
  'upload': '⬆',
  'refresh-cw': '⟳',
  'rotate-cw': '↻',
  'save': '💾',
  'bookmark': '🔖',
  'heart': '♥',
  'star': '★',
  'flag': '🚩',
  'bell': '🔔',
  'bell-off': '🔕',
  // Content
  'image': '🖼',
  'video': '🎥',
  'music': '🎵',
  'file': '📄',
  'file-text': '📝',
  'folder': '📁',
  'folder-plus': '📁+',
  'camera': '📷',
  'camera-off': '📷✕',
  'mic': '🎤',
  'mic-off': '🎤✕',
  'scan': '📷',
  'qr-code': '📱',
  // Communication
  'message-circle': '💬',
  'message-square': '💬',
  'mail': '✉',
  'send': '➤',
  'phone': '📞',
  'phone-call': '📞',
  'voicemail': '📧',
  'chat': '💬',
  'comment': '💬',
  'users': '👥',
  'user': '👤',
  'user-plus': '👤+',
  'user-minus': '👤−',
  'user-check': '👤✓',
  'user-x': '👤✕',
  'at-sign': '@',
  'hash': '#',
  // Time & Calendar
  'calendar': '📅',
  'calendar-plus': '📅+',
  'calendar-minus': '📅−',
  'calendar-x': '📅✕',
  'clock': '🕐',
  'clock-1': '🕐',
  'clock-2': '🕑',
  'clock-3': '🕒',
  'clock-4': '🕓',
  'clock-5': '🕔',
  'clock-6': '🕕',
  'clock-7': '🕖',
  'clock-8': '🕗',
  'clock-9': '🕘',
  'clock-10': '🕙',
  'clock-11': '🕚',
  'clock-12': '🕛',
  // Finance
  'dollar-sign': '$',
  'credit-card': '💳',
  'banknote': '💵',
  'coins': '💰',
  'receipt': '🧾',
  'invoice': '📋',
  'shopping-bag': '🛍',
  'shopping-cart': '🛒',
  'tag': '🏷',
  'tags': '🏷🏷',
  'gift': '🎁',
  // Status
  'alert-circle': '⚠',
  'alert-triangle': '⚠',
  'check-circle': '✓',
  'check-circle-2': '✓',
  'x-circle': '✕',
  'info': 'ℹ',
  'help-circle': '?',
  'loader': '⟳',
  'loader-2': '⟳',
  'shield': '🛡',
  'shield-check': '🛡✓',
  'shield-x': '🛡✕',
  'lock': '🔒',
  'unlock': '🔓',
  'key': '🔑',
  // Settings
  'settings': '⚙',
  'sliders': '☰',
  'toggle-left': '◐',
  'toggle-right': '◑',
  'wrench': '🔧',
  'hammer': '🔨',
  'cpu': '□',
  'database': '💾',
  'server': '🖥',
  'hard-drive': '💽',
  'monitor': '🖥',
  'smartphone': '📱',
  'tablet': '📱',
  // Media
  'play': '▶',
  'pause': '⏸',
  'stop': '⏹',
  'skip-back': '⏪',
  'skip-forward': '⏩',
  'fast-forward': '⏩',
  'rewind': '⏪',
  'volume': '🔊',
  'volume-x': '🔇',
  'volume-1': '🔈',
  'volume-2': '🔊',
  // Layout
  'grid': '⊞',
  'list': '☰',
  'columns': '⊞',
  'rows': '☰',
  'sidebar': '☰',
  'layout': '⊞',
  'maximize': '⛶',
  'minimize': '⛶',
  'fullscreen': '⛶',
  'minimize-2': '⛶',
  'crop': '⊞',
  'move': '✥',
  'zoom-in': '🔍+',
  'zoom-out': '🔍−',
  // Arrows
  'corner-up-left': '↖',
  'corner-up-right': '↗',
  'corner-down-left': '↙',
  'corner-down-right': '↘',
  'expand': '⛶',
  'contract': '⛶',
  'external-link': '↗',
  'internal-link': '↘',
  // Shapes
  'circle': '○',
  'square': '□',
  'triangle': '△',
  'hexagon': '⬡',
  'diamond': '◆',
  // Weather
  'sun': '☀',
  'moon': '🌙',
  'cloud': '☁',
  'cloud-rain': '🌧',
  'cloud-snow': '🌨',
  'cloud-lightning': '⛈',
  'wind': '💨',
  // Other
  'home': '🏠',
  'search': '🔍',
  'filter': '⛉',
  'sort-asc': '↑',
  'sort-desc': '↓',
  'eye': '👁',
  'eye-off': '👁✕',
  'scissors': '✂',
  'clipboard': '📋',
  'clipboard-check': '📋✓',
  'clipboard-list': '📋☰',
  'clipboard-x': '📋✕',
  'archive': '📦',
  'inbox': '📥',
  'outbox': '📤',
  'recycle': '♻',
  'link': '🔗',
  'link-2': '🔗',
  'unlink': '🔗✕',
  'anchor': '⚓',
  'bookmark-minus': '🔖−',
  'bookmark-plus': '🔖+',
  'bookmark-x': '🔖✕',
  'award': '🏆',
  'trophy': '🏆',
  'medal': '🥇',
  'target': '🎯',
  'zap': '⚡',
  'sparkles': '✨',
  'sparkle': '✨',
  'magic-wand': '🪄',
  'paintbrush': '🎨',
  'palette': '🎨',
  'droplet': '💧',
  'pill': '💊',
  'syringe': '💉',
  'thermometer': '🌡',
  'heart-pulse': '💓',
  'stethoscope': '🩺',
  'bone': '🦴',
  'brain': '🧠',
  'dna': '🧬',
  'flask-conical': '🧪',
  'flask-round': '🧪',
  'test-tube': '🧪',
  'test-tubes': '🧪🧪',
  'microscope': '🔬',
  'telescope': '🔭',
  'satellite': '🛰',
  'rocket': '🚀',
  'plane': '✈',
  'car': '🚗',
  'bike': '🚲',
  'bus': '🚌',
  'train': '🚂',
  'ship': '🚢',
  'map-pin': '📍',
  'map-pin-off': '📍✕',
  'navigation': '🧭',
  'compass': '🧭',
  'globe': '🌐',
  'globe-2': '🌐',
  'network': '🕸',
  'wifi': '📶',
  'wifi-off': '📶✕',
  'bluetooth': '🅑',
  'battery': '🔋',
  'battery-charging': '🔋⚡',
  'battery-low': '🔋',
  'plug': '🔌',
  'plug-zap': '🔌⚡',
  'power': '⏻',
  'power-off': '⏻',
};

export interface IconProps
  extends VariantProps<typeof iconVariants>,
    Omit<TextProps, 'children'> {
  /** Icon name from Lucide set */
  name: IconName;
  /** Icon color */
  color?: string;
  /** Additional class names */
  className?: string;
  /** Accessibility label */
  accessibilityLabel?: string;
}

export const Icon = React.forwardRef<React.ElementRef<typeof Text>, IconProps>(
  (
    {
      name,
      color = '#111827',
      size = 'md',
      weight = 'normal',
      className,
      accessibilityLabel,
      ...props
    },
    ref
  ) => {
    const glyph = ICON_MAP[name] || '?';

    return (
      <Text
        ref={ref}
        className={cn(iconVariants({ size, weight }), className)}
        style={{ color }}
        accessibilityRole="image"
        accessibilityLabel={accessibilityLabel || name}
        {...props}
      >
        {glyph}
      </Text>
    );
  }
);

Icon.displayName = 'Icon';