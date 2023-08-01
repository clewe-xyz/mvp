"use client";

import { SkillReward } from "@/app/(authorized)/skill";
import lightning from "@/images/lightning-bolt.svg";
import newTabIcon from "@/images/newtab.svg";
import { AsyncButton } from "@/ui-kit/buttons";
import { ProgressLine } from "@/ui-kit/progress-line";
import { useToasts } from "@/ui-kit/toasts";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css/core";
import classNames from "classnames";
import { DateTime } from "luxon";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { UserNFTMetadata, UserProfile } from "../../../types";
import { checkBSCConnection, connectToBCS } from "../../BSCConnection";
import {
  connectMetaMaskWallet,
  getActiveMetaMaskAccount,
} from "../../connectCryptoWallet";
import NFTMinting, { TransactionMetadata } from "./NFTMinting";
import styles from "./styles.module.css";

type Props = {
  user: UserProfile;
  skills: SkillReward[];
};

export default function CreationStages({ user, skills }: Props) {
  const [progress, setProgress] = useState(0); // from 0 to 100
  const [walletAddress, setWalletAddress] = useState<string | null>();
  const [isConnectedToChain, markAsConnectedToChain] = useState<boolean>();
  const progressStep = calculateProgressStep({
    walletConnected: Boolean(walletAddress),
    chainConnected: Boolean(isConnectedToChain),
  });
  const [newNFT, setNFT] = useState<UserNFTMetadata>();
  const splide = useRef<Splide>(null);

  const { displayErrorToast } = useToasts();

  useEffect(() => {
    getActiveMetaMaskAccount()
      .then(setWalletAddress)
      .catch((error) => displayErrorToast(error.message));
  }, []);

  useEffect(() => {
    checkBSCConnection()
      .then(markAsConnectedToChain)
      .catch((error) => displayErrorToast(error.message));
  }, []);

  const performConditionalNavigation = (splide: any) => {
    let skippedStepsAmount = 0;
    if (walletAddress) {
      skippedStepsAmount += 1;
    }
    if (isConnectedToChain) {
      skippedStepsAmount += 1;
    }
    if (skippedStepsAmount > 0) {
      splide.go(skippedStepsAmount);
    }
  };

  const goToNextQuestionOrFinish = () => {
    if (progress === 100) {
      // Finish the process
      return null;
    }
    splide.current?.go(">");
    // Normalize decimal value, to simplify calculation of a last question
    const updatedProgress = Math.min(Math.ceil(progress + progressStep), 100);
    setProgress(updatedProgress);
  };

  const updateWalletAddress = (walletAddress?: string) =>
    fetch("/api/users/me", {
      method: "PATCH",
      body: JSON.stringify(walletAddress),
    }).then(() => setWalletAddress(walletAddress));

  const updateNFTs = (nftMetadata: TransactionMetadata) =>
    fetch("/api/users/me/nft", {
      method: "PATCH",
      body: JSON.stringify({
        nfts: [
          {
            tx_hash: nftMetadata.transactionHash,
            token_id: nftMetadata.tokenId ?? "",
            from_address: walletAddress,
            updated_at: {
              time: DateTime.now().toISO(),
              zone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            },
          },
        ],
      }),
    }).then(() =>
      setNFT({
        tx_hash: nftMetadata.transactionHash,
        token_id: nftMetadata.tokenId ?? "",
        updated_at: {
          time: DateTime.now().toISO() as string,
          zone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        },
      })
    );

  const isLoading =
    walletAddress === undefined || isConnectedToChain === undefined;

  if (isLoading) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.progress}>
        <ProgressLine currentProgress={progress} />
      </div>
      <Splide
        className={styles.slider}
        options={{
          perPage: 1,
          perMove: 1,
          arrows: false,
          pagination: false,
          drag: false,
          width: "100%",
        }}
        tag="div"
        ref={splide}
        onReady={performConditionalNavigation}
      >
        <SplideSlide className={styles.singleSlide}>
          <p>We need to associate your upcoming NFT with a crypto wallet.</p>
          <p>For now, only MetaMask is supported</p>
          <div className={styles.actionsContainer}>
            <AsyncButton
              className="button-accent"
              asyncAction={() =>
                connectMetaMaskWallet()
                  .then(updateWalletAddress)
                  .then(goToNextQuestionOrFinish)
                  .catch((error) => displayErrorToast(error.message))
              }
            >
              Connect a MetaMask wallet
            </AsyncButton>
          </div>
        </SplideSlide>
        <SplideSlide className={styles.singleSlide}>
          <p>For today we operate only on BNB Smart Chain (BSC)</p>
          <p>Seems like your account is connected to different chain.</p>
          <p>To proceed, we need to switch to BSC</p>
          <div className={styles.actionsContainer}>
            <AsyncButton
              className="button-accent"
              asyncAction={() =>
                connectToBCS()
                  .then(() => markAsConnectedToChain(true))
                  .then(goToNextQuestionOrFinish)
                  .catch((error) => displayErrorToast(error.message))
              }
            >
              Yes, switch to BSC
            </AsyncButton>
          </div>
        </SplideSlide>
        <SplideSlide className={styles.singleSlide}>
          <NFTMinting
            user={{
              ...user,
              wallet_address: walletAddress ?? undefined,
            }}
            skills={skills}
            onMint={(transactionMetadata) => {
              updateNFTs(transactionMetadata)
                .then(goToNextQuestionOrFinish)
                .catch((error) => displayErrorToast(error.message));
            }}
          />
        </SplideSlide>
        <SplideSlide className={styles.singleSlide}>
          <h3>
            Congratulations&nbsp;
            <Image src={lightning} alt="Lightnight icon" height={40} />
          </h3>
          <div className={styles.actionsContainer}>
            <div>
              <Link
                href={`${process.env.NEXT_PUBLIC_OPENSEA_GATEWAY}/${process.env.NEXT_PUBLIC_SMART_CONTRACT_ADDRESS}/${newNFT?.token_id}`}
                target="_blank"
                className="link"
              >
                NFT on OpenSea&nbsp;
                <Image src={newTabIcon} alt="New tab" width={24} />
              </Link>
            </div>
            <div>
              <Link
                href={`${process.env.NEXT_PUBLIC_BSC_GATEWAY}/${newNFT?.tx_hash}`}
                target="_blank"
                className="link"
              >
                Transaction details on BNB Chain&nbsp;
                <Image src={newTabIcon} alt="New tab" width={24} />
              </Link>
            </div>
            <Link
              className={classNames("button", "button-accent")}
              href="/profile"
            >
              Go to profile
            </Link>
          </div>
        </SplideSlide>
      </Splide>
    </div>
  );
}

function calculateProgressStep({
  walletConnected,
  chainConnected,
}: {
  walletConnected: boolean;
  chainConnected: boolean;
}) {
  const MAX_STEPS = 3;
  let steps = MAX_STEPS;
  if (walletConnected) {
    steps -= 1;
  }
  if (chainConnected) {
    steps -= 1;
  }
  return Number((100 / steps).toFixed(1));
}
