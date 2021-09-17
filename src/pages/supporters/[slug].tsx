import { useEffect, useState } from "react";
import { GetStaticProps, GetStaticPaths } from "next";
import { useRouter } from "next/router";
import { findFundingBySlug, getFunding } from "../../database/funding";
import { default as IFunding } from "../../types/funding";
import { Flex, Box, Heading } from "@chakra-ui/layout";
import Layout from "../../components/common/layout";
import { Table, Td, Tr, Tbody, Thead, Th } from "@chakra-ui/react";
import { getDonators } from "../../utils/donate";
import { format } from "date-fns";
import { analytics } from "../../utils/firebase";
import { logEvent } from "@firebase/analytics";

const Supporters = ({ funding }: { funding: IFunding }) => {
  const router = useRouter();

  const [donations, setDonations] = useState([]);
  const [funded, setFunded] = useState(0);

  useEffect(() => {
    async function fetchData() {
      logEvent(analytics, "supporters_viewed");
      const projectId = funding?._id.toString().replaceAll('"', "");

      const { donations, donated } = await getDonators(projectId);
      setDonations(donations);
      setFunded(donated);
    }
    fetchData();
  }, [funding?._id]);

  if (router.isFallback) return <div>Loading...</div>;

  return (
    <Layout>
      <Box w="100%" mt={8} minH="90vh">
        <Flex justifyContent="space-between" alignItems="center" mb={16}>
          <Heading mt={8} size="md">
            Donations
          </Heading>
          <Heading mt={8} size="md">
            Total: {funded} FTM
          </Heading>
        </Flex>
        {donations.length > 0 ? (
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
        ) : (
          <Heading>No donations yet</Heading>
        )}
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

export default Supporters;
