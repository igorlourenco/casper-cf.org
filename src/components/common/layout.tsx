import { Stack, StackProps } from "@chakra-ui/layout";
import Footer from "./footer";
import Header from "./header";

const Layout = ({ children, ...props }: StackProps) => {
  return (
    <>
      <Stack py="2" px="8" {...props}>
        <Header />
        <Stack alignItems="center">{children}</Stack>
      </Stack>
      <Footer />
    </>
  );
};

export default Layout;
