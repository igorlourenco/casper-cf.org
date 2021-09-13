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
    baseStyle: {},
    defaultProps: {
      focusBorderColor: "blue.500",
    },
  },
  Select: {
    baseStyle: { shadow: "md" },
    defaultProps: {
      focusBorderColor: "blue.500",
    },
  },
  Textarea: {
    baseStyle: { shadow: "md" },
    defaultProps: {
      focusBorderColor: "blue.500",
    },
  },
  Heading: {
    baseStyle: {
      fontFamily: "'Goldman', sans-serif",
      // letterSpacing: "wider",
    },
  },
  FormLabel: {
    baseStyle: {
      fontWeight: "semibold",
    },
  },
};

const styles = {
  global: {
    body: {
      fontFamily: "'Nunito', sans-serif",
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
