import { useState } from "react";
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
import { sendDonation } from "../utils/donate";
import CasperButton from "../components/common/casper-button";

const Funding = ({ funding }: { funding: IFunding }) => {
  const router = useRouter();
  const toast = useToast();

  const [amount, setAmount] = useState<string | null>(null);

  if (router.isFallback) return <div>Loading...</div>;

  const donate = async () => {
    if (!amount) return;
    const data = await sendDonation(Number(amount), funding.owner);

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
    <Layout>
      <Box w="100%" mt={8}>
        <Flex alignItems="flex-start" gridGap={8}>
          <Image
            borderRadius="lg"
            shadow="lg"
            src={
              `https://ipfs.io/ipfs/${funding.profilePhotoHash}` ||
              "https://via.placeholder.com/450"
            }
            w="450px"
            h="450px"
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
            >
              <Flex flexDir="column" gridGap={3}>
                <Flex alignItems="center" gridGap={2}>
                  <FaTwitter color="#1DA1F2" />
                  <Link
                    color="gray.500"
                    fontWeight="semibold"
                    href={`https://twitter.com/${funding.twitter}`}
                    isExternal
                  >
                    Follow us
                  </Link>
                </Flex>
                <Flex alignItems="center" gridGap={2}>
                  <FaDiscord color="#5865F2" />
                  <Link
                    color="gray.500"
                    fontWeight="semibold"
                    href={funding.discord}
                    isExternal
                  >
                    Join our community
                  </Link>
                </Flex>
                <Flex alignItems="center" gridGap={2}>
                  <FaGlobe color="gray.600" />
                  <Link
                    color="gray.500"
                    fontWeight="semibold"
                    href={funding.site}
                    isExternal
                  >
                    Visit our website
                  </Link>
                </Flex>
              </Flex>
              <Stack w="50%">
                <Text fontFamily="Goldman" fontSize="xl" fontWeight="medium">
                  Funded{" "}
                  <Text as="span" fontWeight="bold">
                    {new Intl.NumberFormat("en-IN").format(1000)}/
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
                Last Donations
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
                  <Tr>
                    <Td>inches</Td>
                    <Td>millimetres (mm)</Td>
                    <Td isNumeric>25.4</Td>
                  </Tr>
                  <Tr>
                    <Td>feet</Td>
                    <Td>centimetres (cm)</Td>
                    <Td isNumeric>30.48</Td>
                  </Tr>
                  <Tr>
                    <Td>yards</Td>
                    <Td>metres (m)</Td>
                    <Td isNumeric>0.91444</Td>
                  </Tr>
                  <Tr>
                    <Td>yards</Td>
                    <Td>metres (m)</Td>
                    <Td isNumeric>0.91444</Td>
                  </Tr>
                  <Tr>
                    <Td>yards</Td>
                    <Td>metres (m)</Td>
                    <Td isNumeric>0.91444</Td>
                  </Tr>
                  <Tr>
                    <Td>yards</Td>
                    <Td>metres (m)</Td>
                    <Td isNumeric>0.91444</Td>
                  </Tr>
                  <Tr>
                    <Td>yards</Td>
                    <Td>metres (m)</Td>
                    <Td isNumeric>0.91444</Td>
                  </Tr>
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
