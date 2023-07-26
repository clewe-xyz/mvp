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
  token_id: string;
  from_address?: string | null;
  updated_at: {
    time: string;
    zone: string;
  };
};
