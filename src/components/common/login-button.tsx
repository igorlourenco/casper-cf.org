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
      borderRadius="xl"
      variant="outline"
      colorScheme="blue"
      onClick={login}
    >
      Start funding here
    </Button>
  );
};

export default LoginButton;
