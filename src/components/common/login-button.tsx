import { useEthers } from "@usedapp/core";
import { ButtonProps } from "@chakra-ui/button";
import { useRouter } from "next/router";
import CasperButton from "./casper-button";
import { logEvent } from "firebase/analytics";
import { analytics } from "../../utils/firebase";

const LoginButton = (props: ButtonProps) => {
  const { activateBrowserWallet } = useEthers();
  const router = useRouter();

  const login = async () => {
    await activateBrowserWallet();
    logEvent(analytics, "user_logged_in");
    router.push("/fundraising/create");
  };
  return (
    <CasperButton onClick={login} {...props}>
      {props.children}
    </CasperButton>
  );
};

export default LoginButton;
