import { Button } from "@chakra-ui/button";
import { useRouter } from "next/router";
import { FiPlus } from "react-icons/fi";

const CreateFunding = () => {
  const router = useRouter();
  return (
    <Button
      rounded="lg"
      shadow="lg"
      leftIcon={<FiPlus />}
      colorScheme="blue"
      textDecoration="none"
      onClick={() => router.push("/funding/create")}
    >
      Create funding
    </Button>
  );
};

export default CreateFunding;
