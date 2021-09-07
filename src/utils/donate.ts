import { ethers } from "ethers";
import Web3Modal from "web3modal";
import Donate from "../contracts/donate.json";

export async function sendDonation(donation: number, recipient: string) {
  const web3Modal = new Web3Modal();
  const connection = await web3Modal.connect();
  const provider = new ethers.providers.Web3Provider(connection);
  const signer = provider.getSigner();

  let contract = new ethers.Contract(
    "0xd621820b5EE9426Eda9c761C654FbdA7e64A618A",
    Donate,
    signer
  );

  const data = await contract
    .donate(recipient, {
      value: (donation * 1e18).toString(),
    })
    .then((transaction) => {
      return { transaction, error: null };
    })
    .catch((error) => {
      return { transaction: null, error: error?.data?.message };
    });

  return data;
}
