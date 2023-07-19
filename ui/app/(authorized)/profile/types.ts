export type UserProfile = {
  nickname: string;
  wallet_address?: string;
  level_id: number;
  level_accumulated_exp: number;
  exp_to_next_level: number;
  nfts?: UserNFTMetadata[];
};

export type UserNFTMetadata = {
  tx_hash: string;
  tx_index: string;
  updated_at: {
    time: number;
    zone: string;
  };
};
