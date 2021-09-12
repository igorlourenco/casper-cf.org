import { Stack, StackProps } from "@chakra-ui/layout";
import Footer from "./footer";
import Header from "./header";

const Layout = ({ children, ...props }: StackProps) => {
  return (
    <>
      <Header />
      <Stack px="16" {...props}>
        <Stack alignItems="center">{children}</Stack>
      </Stack>
      <Footer />
    </>
  );
};

export default Layout;
