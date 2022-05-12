import '@mui/styles';
import { createTheme } from '@mui/material';
import { Theme } from '@mui/material/styles';

declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  // (remove this line if you don't have the rule enabled)
  type DefaultTheme = Theme;
}

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: '#008080',
    },
    secondary: {
      main: '#1C3B55',
    },
  },
  spacing: (value: number) => `${value * 4}px`,
});

export default defaultTheme;
