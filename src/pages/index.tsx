import {
  Box,
  Flex,
  Stack,
  Text,
  Image,
  Heading,
  Container,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import Header from "../components/common/header";
import Footer from "../components/common/footer";
import LoginButton from "../components/common/login-button";

const Index = () => {
  return (
    <Box>
      <Header />
      <Container maxW={"5xl"}>
        <Stack
          textAlign={"center"}
          align={"center"}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 20, md: 28 }}
        >
          <Heading
            fontWeight={600}
            fontSize={{ base: "3xl", sm: "4xl", md: "6xl" }}
            lineHeight={"110%"}
          >
            Fundraising{" "}
            <Text as={"span"} color={useColorModeValue("blue.600", "blue.300")}>
              made easy
            </Text>
          </Heading>
          <Text color={"gray.500"} maxW={"3xl"}>
            Never miss a meeting. Never be late for one too. Keep track of your
            meetings and receive smart reminders in appropriate times. Read your
            smart “Daily Agenda” every morning.
          </Text>
          <Stack spacing={6} direction={"row"}>
            <LoginButton>Get started</LoginButton>
            <Button rounded="lg" px={6}>
              Learn more
            </Button>
          </Stack>
          <Flex w={"full"}>
            <Image
              src="/images/community.svg"
              height={{ sm: "24rem", lg: "28rem" }}
              mt={{ base: 12, sm: 16 }}
            />
          </Flex>
        </Stack>
      </Container>

      <Footer />
    </Box>
  );
};

export default Index;
