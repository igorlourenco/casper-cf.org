import { extendTheme } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";
import { Input } from "@chakra-ui/input";
const fonts = { mono: `'Menlo', monospace` };

const breakpoints = createBreakpoints({
  sm: "40em",
  md: "52em",
  lg: "64em",
  xl: "80em",
});

const components = {
  Input: {
    defaultProps: {
      focusBorderColor: "purple.500",
    },
  },
  Select: {
    defaultProps: {
      focusBorderColor: "purple.500",
    },
  },
  Textarea: {
    defaultProps: {
      focusBorderColor: "purple.500",
    },
  },
  Heading: {
    baseStyle: {
      fontFamily: "'IBM Plex Sans Arabic', sans-serif",
    },
  },
};

const styles = {
  global: {
    body: {
      fontFamily: "'IBM Plex Sans Arabic', sans-serif",
      color: "gray.700",
    },
  },
};

const theme = extendTheme({
  colors: {
    black: "#16161D",
  },
  components,
  styles,
  fonts,
  breakpoints,
});

export default theme;
