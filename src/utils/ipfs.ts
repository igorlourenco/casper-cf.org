import { create as ipfsHttpClient } from "ipfs-http-client";
import { Options } from "ipfs-http-client/dist/src/types";

const client = ipfsHttpClient(
  <Options>process.env.NEXT_PUBLIC_INFURA_IPFS_API_URL
);

export async function uploadToIpfs(file: File) {
  try {
    const added = await client.add(file, {
      progress: (prog) => console.log(`received: ${prog}`),
    });
    const ipfsHash = added.path;
    return ipfsHash;
  } catch (error) {
    console.log("Error uploading file: ", error);
  }
}
