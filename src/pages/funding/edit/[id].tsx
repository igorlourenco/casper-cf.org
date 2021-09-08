import { Text } from "@chakra-ui/layout";
import { useState, useEffect } from "react";
import Layout from "../../../components/common/layout";
import EditFundingForm from "../../../components/funding/edit-funding-form";
import Funding from "../../../types/funding";
import { useEthers } from "@usedapp/core";
import { useRouter } from "next/router";

const EditFunding = () => {
  const { account } = useEthers();
  const [funding, setFunding] = useState<Funding[]>([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      const url = new URL(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/funding/find-by-id`
      );
      url.searchParams.append("id", router.query.id.toString());
      const response = await fetch(url.toString());
      const { funding } = await response.json();
      setFunding(funding);
    }

    if (account) {
      fetchData();
    }
  }, [account]);
  return (
    <Layout>
      {funding ? <EditFundingForm {...funding} /> : <Text>Loading...</Text>}
    </Layout>
  );
};

export default EditFunding;
