import { Stack, StackProps } from "@chakra-ui/layout";
import Footer from "./footer";
import Header from "./header";

const Layout = ({ children, ...props }: StackProps) => {
  return (
    <>
      <Header />
      <Stack px={[4, 8, 8, 16]} {...props} pb={24}>
        <Stack alignItems="center">{children}</Stack>
      </Stack>
      <Footer />
    </>
  );
};

export default Layout;
