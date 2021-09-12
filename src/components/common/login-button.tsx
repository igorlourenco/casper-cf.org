import { useEthers } from "@usedapp/core";
import { Button } from "@chakra-ui/button";
import { useRouter } from "next/router";

const LoginButton = () => {
  const { activateBrowserWallet } = useEthers();
  const router = useRouter();

  const login = async () => {
    await activateBrowserWallet();
    router.push("/funding/create");
  };
  return (
    <Button
      shadow="lg"
      fontSize="sm"
      textTransform="uppercase"
      fontFamily="Goldman"
      fontWeight="semibold"
      variant="outline"
      colorScheme="blue"
      onClick={login}
    >
      Login to start funding
    </Button>
  );
};

export default LoginButton;
