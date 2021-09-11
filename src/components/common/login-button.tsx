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
      variant="outline"
      colorScheme="blue"
      onClick={login}
    >
      Start funding now
    </Button>
  );
};

export default LoginButton;
