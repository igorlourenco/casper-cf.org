import { useRouter } from "next/router";
import { FiPlus } from "react-icons/fi";
import CasperButton from "../common/casper-button";

const CreateFunding = () => {
  const router = useRouter();
  return (
    <CasperButton
      leftIcon={<FiPlus />}
      onClick={() => router.push("/funding/create")}
    >
      Create new
    </CasperButton>
  );
};

export default CreateFunding;
