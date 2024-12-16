import { extendTheme } from 'native-base';

export const theme = extendTheme({
    components: {
      Button: {
        variants: {
          rounded: ({ colorScheme }: any) => {
            return {
              bg: `${colorScheme}.900`,
              rounded: 'full',
              colorScheme:'rose'
            };
          },
        },
        defaultProps: {
          colorScheme: 'primary',
        },
      },
    },
    colors: {
      // Add new color
      primary: {
        50: '#eff6ff',
        100: '#dbeafe',
        200: '#bfdbfe',
        300: '#93c5fd',
        400: '#60a5fa',
        500: '#3b82f6',
        600: '#2563eb',
        700: '#1d4ed8',
        800: '#1e40af',
        900: '#1e3a8a',
      },
      // Redefinig only one shade, rest of the color will remain same.
      amber: {
        400: '#fb7185',
      },
    },
    config: {
      // Changing initialColorMode to 'dark'
      useSystemColorMode: true,
      initialColorMode: 'light',
    },
  });

  // 2. Get the type of the theme
type CustomThemeType = typeof theme;

// 3. Extend the internal NativeBase Theme
declare module 'native-base' {
  interface ICustomTheme extends CustomThemeType {}
}