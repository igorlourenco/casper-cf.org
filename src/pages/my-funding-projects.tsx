import { Box, Heading, Stack } from "@chakra-ui/layout";
import { Flex, Text } from "@chakra-ui/react";
import { useEthers } from "@usedapp/core";
import { useEffect, useState } from "react";
import Layout from "../components/common/layout";
import CreateFunding from "../components/funding/create-funding";
import FundingList from "../components/funding/funding-list";
import FundingPreview from "../components/funding/funding-preview";
import Funding from "../types/funding";

const MyFundings = () => {
  const { account } = useEthers();
  const [fundings, setFundings] = useState<Funding[]>([]);

  useEffect(() => {
    async function fetchData() {
      const url = new URL(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/funding/get-by-owner`
      );
      url.searchParams.append("owner", account);
      const response = await fetch(url.toString());
      const { fundings } = await response.json();
      setFundings(fundings);
    }

    if (account) {
      fetchData();
    }
  }, [account]);

  return (
    <Layout>
      <Box w="70%" mt={8}>
        <Flex alignItems="center" justifyContent="space-between">
          <Heading>Your funding projects</Heading>
          <CreateFunding />
        </Flex>
        {fundings.length > 0 ? (
          <Stack spacing={4} mt={8} shadow="lg" p="4">
            <FundingList fundings={fundings} />
          </Stack>
        ) : (
          <Text>No fundings yet</Text>
        )}
      </Box>
    </Layout>
  );
};

export default MyFundings;