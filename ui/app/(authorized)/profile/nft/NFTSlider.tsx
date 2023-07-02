"use client";

import newTabIcon from "@/images/newtab.svg";
import profileNFTPreview from "@/images/nft/image-equilibrium.jpg";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css/core";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import "./nft-slider.css";
import styles from "./nft.module.css";

export function NFTSlider() {
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
      <SplideSlide className={classNames(styles.nftSlide)}>
        <div className={styles.nftImage}>
          <span className={styles.statusBadgeContainer}>
            <Image alt="Profile NFT" src={profileNFTPreview} />
          </span>
        </div>
        <div className={styles.nftText}>
          <div className={styles.nftDescription}>
            <Link href={""} target="_blank" className="link">
              NFT on OpenSea&nbsp;
              <Image src={newTabIcon} alt="New tab" width={16} />
            </Link>
          </div>
          <div className={styles.nftDescription}>
            <Link href={""} target="_blank" className="link">
              Transaction details on BNB Chain&nbsp;
              <Image src={newTabIcon} alt="New tab" width={16} />
            </Link>
          </div>
        </div>
        <div className={styles.nftActions}>
          <button
            type="button"
            className={classNames("button", "button-accent")}
          >
            Update NFT
          </button>
          <div className={styles.nftUpdateDate}>Last update: July 5, 2023</div>
        </div>
      </SplideSlide>
    </Splide>
  );
}
