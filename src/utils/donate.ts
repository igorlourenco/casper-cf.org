import { ethers } from "ethers";
import Web3Modal from "web3modal";
import Donate from "../contracts/donate.json";

export async function sendDonation(
  donation: number,
  recipient: string,
  projectId: string
) {
  const web3Modal = new Web3Modal();
  const connection = await web3Modal.connect();
  const provider = new ethers.providers.Web3Provider(connection);
  const signer = provider.getSigner();

  let contract = new ethers.Contract(
    process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    Donate,
    signer
  );

  const data = await contract
    .donate(recipient, projectId.toString().replaceAll('"', ""), {
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

export async function getDonators(projectId: string) {
  const web3Modal = new Web3Modal();
  const connection = await web3Modal.connect();
  const provider = new ethers.providers.Web3Provider(connection);
  const signer = provider.getSigner();

  let contract = new ethers.Contract(
    process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    Donate,
    signer
  );

  const data = await contract.callStatic
    .getContributorsbyProject(projectId)
    .then((transaction) => {
      return { transaction, error: null };
    })
    .catch((error) => {
      return { transaction: null, error: error?.data?.message };
    });

  const validItems = data.transaction.filter(
    (item) => item.receiver !== "0x0000000000000000000000000000000000000000"
  );

  let donated = 0;

  const donations = await Promise.all(
    validItems.map(async (i) => {
      const valueDonated = ethers.utils.formatUnits(
        i.amount.toString(),
        "ether"
      );

      const item = {
        valueDonated,
        contributor: i.contributor,
        receiver: i.receiver,
        sentAt: new Date(i.blockTimestamp * 1000),
        projectId: i.projectId,
      };
      donated += Number(i.amount) / 1e18;
      return item;
    })
  );
  return { donations, donated };
}
