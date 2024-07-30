import { BlockchainNames } from 'helpers/supportedBlockchains';

export type IMessage = {
  raw: any;
  time: number;
  messageId: number;
  chainId: BlockchainNames;
  senderUrl?: string;
};
