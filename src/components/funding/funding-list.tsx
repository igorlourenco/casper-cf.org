import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import Funding from "../../types/funding";
import FundingPreview from "./funding-preview";

interface FundingListProps {
  fundings: Funding[];
}

const FundingList = ({ fundings }: FundingListProps) => {
  return (
    <Accordion allowToggle defaultIndex={[0]}>
      {fundings.map((funding) => (
        <FundingPreview {...funding} key={funding._id} />
      ))}
    </Accordion>
  );
};

export default FundingList;
