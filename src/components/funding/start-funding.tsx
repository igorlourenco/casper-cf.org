import { Button } from "@chakra-ui/button";
import { useRouter } from "next/router";

const StartFunding = () => {
  const router = useRouter();
  return (
    <Button
      colorScheme="purple"
      textDecoration="none"
      onClick={() => router.push("/create-funding")}
    >
      Start funding
    </Button>
  );
};

export default StartFunding;
