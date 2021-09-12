import { Box, Flex, Stack, Text, Image, Heading } from "@chakra-ui/react";
import Header from "../components/common/header";
import Footer from "../components/common/footer";

const Index = () => {
  return (
    <Box bgGradient="linear(to-bl, white, blue.50)">
      <Header />
      <Stack px="16">
        <Flex
          alignItems="center"
          justifyContent="space-between"
          flexDir={["column", "column", "row", "row"]}
        >
          <Stack w={["100%", "100%", "50%", "50%"]}>
            <Heading size="2xl">
              Casper{" "}
              <Heading as="span" size="lg">
                Community Funding
              </Heading>
            </Heading>

            <Text>
              If you're building on blockchain, ask for community support to
              your project and
            </Text>
          </Stack>
          <Flex w={["100%", "100%", "50%", "50%"]}>
            <Image src="/images/community.svg" w="100%" alt="community" />
          </Flex>
        </Flex>
      </Stack>
      <Footer />
    </Box>
  );
};

export default Index;
