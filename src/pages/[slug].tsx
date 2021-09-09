import { useState } from "react";
import { GetStaticProps, GetStaticPaths } from "next";
import { useRouter } from "next/router";
import { findFundingBySlug, getFunding } from "../database/funding";
import { default as IFunding } from "../types/funding";
import { Text, Flex, Box, Stack, Heading, Badge } from "@chakra-ui/layout";
import Layout from "../components/common/layout";
import { Image } from "@chakra-ui/image";
import { Input } from "@chakra-ui/input";
import { Button } from "@chakra-ui/button";
import { Link, useToast } from "@chakra-ui/react";
import { FaTwitter, FaDiscord, FaGlobe } from "react-icons/fa";
import { sendDonation } from "../utils/donate";

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
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <Layout>
      <Box w="100%" mt={8}>
        <Flex alignItems="flex-start" gridGap={8}>
          <Image
            src={
              `https://ipfs.io/ipfs/${funding.profilePhotoHash}` ||
              "https://via.placeholder.com/500"
            }
            w="500px"
            h="500px"
          />
          <Stack spacing={8} w="full">
            <Stack>
              <Heading>{funding.name}</Heading>
              <Text color="gray.600" fontWeight="medium">
                {funding.description}
              </Text>
              <Flex gridGap={3}>
                <Badge fontSize="md" colorScheme="blue">
                  {funding.category}
                </Badge>
                <Badge fontSize="md" colorScheme="purple">
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
              <Stack>
                <Flex alignItems="center" gridGap={2}>
                  <FaTwitter color="#1DA1F2" />
                  <Link
                    color="gray.500"
                    fontWeight="semibold"
                    href={`https://twitter.com/${funding.twitter}`}
                    isExternal
                  >
                    {funding.twitter}
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
                    Discord Community
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
                    {funding.site}
                  </Link>
                </Flex>
              </Stack>
              <Stack>
                <Text fontSize="lg" fontWeight="medium">
                  Funded 1000/{funding.amountNeeded} FTM
                </Text>
                <Input
                  onChange={(e: any) => setAmount(e.target.value)}
                  placeholder="How many FTM do you want to send?"
                />
                <Button
                  isDisabled={!amount}
                  colorScheme="purple"
                  onClick={donate}
                >
                  Send funds
                </Button>
              </Stack>
            </Flex>
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
