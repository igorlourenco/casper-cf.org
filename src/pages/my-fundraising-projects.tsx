import { Box, Heading, Stack } from "@chakra-ui/layout";
import { Flex } from "@chakra-ui/react";
import { useEthers } from "@usedapp/core";
import { useEffect, useState } from "react";
import Layout from "../components/common/layout";
import CreateFunding from "../components/funding/create-funding";
import FundingList from "../components/funding/funding-list";
import Funding from "../types/funding";
import { logEvent } from "firebase/analytics";
import { analytics } from "../utils/firebase";

const MyFundings = () => {
  const { account } = useEthers();
  const [fundings, setFundings] = useState<Funding[]>([]);

  useEffect(() => {
    async function fetchData() {
      logEvent(analytics, "dashboard_visited");
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
      <Box w="70%" mt={16}>
        {fundings.length > 0 && (
          <Flex alignItems="center" justifyContent="space-between">
            <Heading>Your funding projects</Heading>
            <CreateFunding>Create new</CreateFunding>
          </Flex>
        )}
        <Stack minH="80vh">
          {fundings.length > 0 ? (
            <Stack spacing={4} mt={8} shadow="lg" p="4">
              <FundingList fundings={fundings} />
            </Stack>
          ) : (
            <Stack alignItems="center" mt={16}>
              <Heading size="lg">You have no fundraising projects yet</Heading>
              <CreateFunding>Create your first</CreateFunding>
            </Stack>
          )}
        </Stack>
      </Box>
    </Layout>
  );
};

export default MyFundings;
