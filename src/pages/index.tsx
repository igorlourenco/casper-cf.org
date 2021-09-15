import {
  Box,
  Flex,
  Stack,
  Text,
  Image,
  Heading,
  Container,
  Input,
  Button,
  useColorModeValue,
  useToast,
  Link,
  Badge,
} from "@chakra-ui/react";
import Header from "../components/common/header";
import Footer from "../components/common/footer";
import LoginButton from "../components/common/login-button";
import Marquee from "react-fast-marquee";
import { useEffect, useState } from "react";
import Funding from "../types/funding";
import CasperButton from "../components/common/casper-button";
import { sendDonation } from "../utils/donate";

const Index = () => {
  const toast = useToast();
  const [fundingProjects, setFundingProjects] = useState<Funding[] | null>(
    null
  );
  const [amount, setAmount] = useState<number | null>(null);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/funding/get-last");
      const { fundings } = await response.json();
      setFundingProjects(fundings);
      console.log("set");
    }
    fetchData();
  }, []);

  const donate = async (fundingOwner: string) => {
    if (!amount) return;
    const data = await sendDonation(Number(amount), fundingOwner);

    if (data.error) {
      toast({
        title: "Oops, something got wrong.",
        description: data.error,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

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
            Crypto-based fundraising{" "}
            <Text as={"span"} color={useColorModeValue("blue.600", "blue.300")}>
              made easy with Fantom
            </Text>
          </Heading>
          <Text color={"gray.500"} maxW={"3xl"}>
            Let people help your project. Create a fundraising and share it with
            your community so they can donate to Fantom ($FTM) and help your
            project grow.
          </Text>
          <Stack spacing={6} direction={"row"}>
            <LoginButton>Get started</LoginButton>
            <Button rounded="lg" px={6}>
              See projects
            </Button>
          </Stack>
        </Stack>
      </Container>
      {fundingProjects && (
        <Marquee
          speed={25}
          gradient={false}
          gradientWidth={0}
          pauseOnHover={true}
        >
          {fundingProjects.map((project) => (
            <Stack
              mx={4}
              spacing={3}
              shadow="lg"
              w="320px"
              h="100%"
              key={project._id}
              p={18}
            >
              <Image
                borderRadius="lg"
                shadow="lg"
                src={
                  `https://ipfs.io/ipfs/${project.profilePhotoHash}` ||
                  "https://via.placeholder.com/300"
                }
                h="300px"
              />
              <Heading size="md">{project.name}</Heading>
              <Text fontWeight="medium">
                {project.description.slice(0, 70)}...
              </Text>

              <Flex gridGap={3}>
                <Badge fontSize="sm" colorScheme="blue">
                  {project.category}
                </Badge>
                <Badge fontSize="sm" colorScheme="blue">
                  {project.hostedOn}
                </Badge>
              </Flex>

              <Link
                fontSize="sm"
                textDecoration="underline"
                href={`/${project.slug}`}
              >
                View more
              </Link>

              <Stack pt={3}>
                <Input
                  size="sm"
                  shadow="md"
                  onChange={(e: any) => setAmount(e.target.value)}
                  placeholder="How many FTM do you want to send?"
                />
                <CasperButton
                  size="sm"
                  isDisabled={!amount}
                  onClick={() => donate(project.owner)}
                >
                  donate
                </CasperButton>
              </Stack>
            </Stack>
          ))}
        </Marquee>
      )}
      <Footer />
    </Box>
  );
};

export default Index;
