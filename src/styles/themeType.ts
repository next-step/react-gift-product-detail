import { theme } from './theme';

const ThemeType = {
  colors: theme.colors,
  typography: theme.typography,
  spacing: theme.typography.spacing,
};

export type ThemeType = typeof ThemeType;
