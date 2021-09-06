import { Flex, Text } from "@chakra-ui/layout";
import Funding from "../../types/funding";
import { format } from "date-fns";
import { IconButton } from "@chakra-ui/button";
import { FiSettings } from "react-icons/fi";
import { useRouter } from "next/router";

const FundingPreview = ({ ...funding }: Funding) => {
  const router = useRouter();

  return (
    <Flex
      px={2}
      py={1}
      alignItems="center"
      justifyContent="space-between"
      borderBottomWidth="1px"
      borderBottomColor="gray.100"
      borderBottomStyle="solid"
    >
      <Text
        fontWeight="semibold"
        color={funding.active ? "gray.700" : "gray.400"}
      >
        {funding.name}
      </Text>
      <Flex alignItems="center" gridGap={3}>
        <Text
          fontWeight="medium"
          color={funding.active ? "gray.700" : "gray.400"}
        >
          {format(new Date(funding.registeredAt), "MM/dd/yyyy")}
        </Text>
        <IconButton
          aria-label="edit"
          onClick={() => router.push(`/funding/edit/${funding._id}`)}
          icon={<FiSettings size={18} />}
          colorScheme="purple"
          variant="ghost"
        />
      </Flex>
    </Flex>
  );
};

export default FundingPreview;
