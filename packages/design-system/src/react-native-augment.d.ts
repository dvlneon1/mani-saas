import {
  ViewProps,
  TextInputProps,
  ScrollViewProps,
  PressableProps,
  ImageProps,
} from 'react-native';

declare module 'react-native' {
  interface ViewProps {
    className?: string;
  }
  interface TextInputProps {
    className?: string;
    secureTextEntry?: boolean;
    inputMode?: any;
    autoComplete?: any;
    editable?: boolean;
  }
  interface ScrollViewProps {
    className?: string;
    refreshing?: boolean;
  }
  interface PressableProps {
    className?: string;
    accessibilityHidden?: boolean;
  }
  interface ImageProps {
    className?: string;
  }
  interface ActivityIndicatorProps {
    className?: string;
  }
  interface SwitchProps {
    className?: string;
  }
}
