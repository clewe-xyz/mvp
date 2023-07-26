"use client";

import newTabIcon from "@/images/newtab.svg";
import profileNFTPreview from "@/images/nft/image-equilibrium.jpg";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css/core";
import classNames from "classnames";
import { DateTime } from "luxon";
import Image from "next/image";
import Link from "next/link";
import { UserNFTMetadata } from "../types";
import "./nft-slider.css";
import styles from "./nft.module.css";

type Props = {
  nfts: UserNFTMetadata[];
};

export function NFTSlider({ nfts }: Props) {
  return (
    <Splide
      options={{
        perPage: 1,
        perMove: 1,
        arrows: false,
        pagination: true,
        gap: "15px",
        width: "100%",
      }}
      tag="div"
    >
      {nfts.map((nft) => (
        <SplideSlide key={nft.tx_hash} className={classNames(styles.nftSlide)}>
          <div className={styles.nftImage}>
            <span className={styles.statusBadgeContainer}>
              <Image alt="Profile NFT" src={profileNFTPreview} />
            </span>
          </div>
          <div className={styles.nftText}>
            <div className={styles.nftDescription}>
              <Link
                href={`${process.env.NEXT_PUBLIC_OPENSEA_GATEWAY}/${process.env.NEXT_PUBLIC_SMART_CONTRACT_ADDRESS}/${nft.token_id}`}
                target="_blank"
                className="link"
              >
                NFT on OpenSea&nbsp;
                <Image src={newTabIcon} alt="New tab" width={16} />
              </Link>
            </div>
            <div className={styles.nftDescription}>
              <Link
                href={`${process.env.NEXT_PUBLIC_BSC_GATEWAY}/${nft.tx_hash}`}
                target="_blank"
                className="link"
              >
                Transaction details on BNB Chain&nbsp;
                <Image src={newTabIcon} alt="New tab" width={16} />
              </Link>
            </div>
          </div>
          <div className={styles.nftActions}>
            <Link
              href="/profile/create-nft"
              className={classNames("button", "button-accent")}
            >
              Update NFT
            </Link>
            <div className={styles.nftUpdateDate}>
              Last update:{" "}
              {DateTime.fromISO(nft.updated_at.time, {
                zone: nft.updated_at.zone,
                locale: "en-US",
              }).toLocaleString(DateTime.DATE_FULL)}
            </div>
          </div>
        </SplideSlide>
      ))}
    </Splide>
  );
}
