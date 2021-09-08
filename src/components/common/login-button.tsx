import { useEthers } from "@usedapp/core";
import { Button } from "@chakra-ui/button";

const LoginButton = () => {
  const { activateBrowserWallet } = useEthers();

  return (
    <Button
      variant="outline"
      colorScheme="purple"
      onClick={() => {
        activateBrowserWallet();
      }}
    >
      Connect to Metamask
    </Button>
  );
};

export default LoginButton;
