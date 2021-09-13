import { useEthers } from "@usedapp/core";
import { Button, ButtonProps } from "@chakra-ui/button";
import { useRouter } from "next/router";
import CasperButton from "./casper-button";

const LoginButton = (props: ButtonProps) => {
  const { activateBrowserWallet } = useEthers();
  const router = useRouter();

  const login = async () => {
    await activateBrowserWallet();
    router.push("/funding/create");
  };
  return (
    <CasperButton onClick={login} {...props}>
      {props.children}
    </CasperButton>
  );
};

export default LoginButton;
