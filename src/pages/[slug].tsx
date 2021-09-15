import { useEffect, useState } from "react";
import { GetStaticProps, GetStaticPaths } from "next";
import { useRouter } from "next/router";
import { findFundingBySlug, getFunding } from "../database/funding";
import { default as IFunding } from "../types/funding";
import { Text, Flex, Box, Stack, Heading, Badge } from "@chakra-ui/layout";
import Layout from "../components/common/layout";
import { Image } from "@chakra-ui/image";
import { Input } from "@chakra-ui/input";
import {
  Link,
  useToast,
  useColorModeValue,
  Table,
  Td,
  Tr,
  Tbody,
  Thead,
  Th,
} from "@chakra-ui/react";
import { FaTwitter, FaDiscord, FaGlobe } from "react-icons/fa";
import { getDonators, sendDonation } from "../utils/donate";
import CasperButton from "../components/common/casper-button";
import { format } from "date-fns";

const Funding = ({ funding }: { funding: IFunding }) => {
  const router = useRouter();
  const toast = useToast();

  console.log(funding);

  const [donations, setDonations] = useState([]);
  const [funded, setFunded] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const projectId = funding?._id.toString().replaceAll('"', "");

      const { donations, donated } = await getDonators(projectId);
      setDonations(donations);
      setFunded(donated);
    }
    fetchData();
  }, [funding?._id]);

  const [amount, setAmount] = useState<string | null>(null);

  if (router.isFallback) return <div>Loading...</div>;

  const donate = async () => {
    if (!amount) return;
    const data = await sendDonation(Number(amount), funding.owner, funding._id);

    if (data.error) {
      toast({
        title: "Oops, something went wrong.",
        description: data.error,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Layout>
      <Box w="100%" mt={8}>
        <Flex
          alignItems="flex-start"
          gridGap={8}
          flexDir={["column", "column", "row", "row"]}
        >
          <Image
            borderRadius="lg"
            shadow="lg"
            src={
              `https://ipfs.io/ipfs/${funding.profilePhotoHash}` ||
              "https://via.placeholder.com/450"
            }
            w={["100%", "100%", "450px", "450px"]}
            h={["100%", "100%", "450px", "450px"]}
          />
          <Stack spacing={8} w="full">
            <Stack>
              <Heading>{funding.name}</Heading>
              <Text
                color={useColorModeValue("gray.600", "gray.100")}
                fontWeight="medium"
              >
                {funding.description}
              </Text>
              <Flex gridGap={3}>
                <Badge fontSize="sm" colorScheme="blue">
                  {funding.category}
                </Badge>
                <Badge fontSize="sm" colorScheme="blue">
                  {funding.hostedOn}
                </Badge>
              </Flex>
            </Stack>
            <Flex
              mt={8}
              justifyContent="space-between"
              alignItems="center"
              w="auto"
              flexDir={["column", "column", "row", "row"]}
            >
              <Flex
                flexDir="column"
                gridGap={3}
                w={["full", "full", "50%", "50%"]}
              >
                {funding.twitter && (
                  <Flex alignItems="center" gridGap={2}>
                    <FaTwitter color="#1DA1F2" />
                    <Text
                      color="gray.500"
                      textDecoration="underline"
                      cursor="pointer"
                      fontWeight="semibold"
                      onClick={() =>
                        window.open(
                          `https://twitter.com/${funding.twitter}`,
                          "_blank"
                        )
                      }
                      isExternal
                    >
                      Follow us
                    </Text>
                  </Flex>
                )}
                {funding.discord && (
                  <Flex alignItems="center" gridGap={2}>
                    <FaDiscord color="#5865F2" />
                    <Text
                      color="gray.500"
                      textDecoration="underline"
                      cursor="pointer"
                      fontWeight="semibold"
                      onClick={() => window.open(funding.discord, "_blank")}
                      isExternal
                    >
                      Join our community
                    </Text>
                  </Flex>
                )}
                {funding.site && (
                  <Flex alignItems="center" gridGap={2}>
                    <FaGlobe color="gray.600" />
                    <Text
                      color="gray.500"
                      textDecoration="underline"
                      cursor="pointer"
                      fontWeight="semibold"
                      onClick={() => window.open(funding.site, "_blank")}
                      isExternal
                    >
                      Visit our website
                    </Text>
                  </Flex>
                )}
              </Flex>
              <Stack w={["full", "full", "50%", "50%"]}>
                <Text fontFamily="Goldman" fontSize="xl" fontWeight="medium">
                  Funded{" "}
                  <Text as="span" fontWeight="bold">
                    {new Intl.NumberFormat("en-IN").format(funded)}/
                    {new Intl.NumberFormat("en-IN").format(
                      Number(funding.amountNeeded)
                    )}
                  </Text>{" "}
                  FTM
                </Text>
                <Input
                  shadow="md"
                  onChange={(e: any) => setAmount(e.target.value)}
                  placeholder="How many FTM do you want to send?"
                />
                <CasperButton isDisabled={!amount} onClick={donate}>
                  donate
                </CasperButton>
              </Stack>
            </Flex>
            <Stack>
              <Heading mt={8} size="md">
                Donations
              </Heading>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>From</Th>
                    <Th>Amount</Th>
                    <Th>Date/Time</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {donations &&
                    donations.length > 0 &&
                    donations.map((donation) => (
                      <Tr>
                        <Td>{donation.contributor}</Td>
                        <Td>{donation.valueDonated} FTM</Td>
                        <Td>{format(donation.sentAt, "MM/dd/yy HH:mm")}</Td>
                      </Tr>
                    ))}
                </Tbody>
              </Table>
            </Stack>
          </Stack>
        </Flex>
      </Box>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { funding } = await findFundingBySlug(context.params.slug.toString());

  return {
    props: {
      funding,
    },
    revalidate: 1,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { fundings } = await getFunding();
  const paths = fundings.map((funding: IFunding) => ({
    params: { slug: funding.slug },
  }));

  return {
    paths,
    fallback: true,
  };
};

export default Funding;
