export default interface Funding {
  _id: string;
  name: string;
  description: string;
  category: string;
  hostedOn: string;
  twitter: string;
  discord: string;
  site: string;
  recipientAddress: string;
  amountNeeded: string;
  active: boolean;
  owner: string;
  slug: string;
  registeredAt: string;
}
