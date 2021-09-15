import { ButtonProps } from "@chakra-ui/button";
import { useRouter } from "next/router";
import { FiPlus } from "react-icons/fi";
import CasperButton from "../common/casper-button";

const CreateFunding = (props: ButtonProps) => {
  const router = useRouter();
  return (
    <CasperButton
      leftIcon={<FiPlus />}
      onClick={() => router.push("/fundraising/create")}
    >
      {props.children}
    </CasperButton>
  );
};

export default CreateFunding;
