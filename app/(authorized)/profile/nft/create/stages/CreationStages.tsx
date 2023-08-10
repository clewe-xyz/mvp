"use client";

import { SkillReward } from "@/app/(authorized)/skill";
import lightning from "@/images/lightning-bolt.svg";
import newTabIcon from "@/images/newtab.svg";
import { AsyncButton } from "@/ui-kit/buttons";
import { ProgressLine } from "@/ui-kit/progress-line";
import { useToasts } from "@/ui-kit/toasts";
import { useConnect, useSDK } from "@metamask/sdk-react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css/core";
import classNames from "classnames";
import { DateTime } from "luxon";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { UserNFTMetadata, UserProfile } from "../../../types";
import { connectToBCS } from "../../BSCConnection";
import NFTMinting, { TransactionMetadata } from "./NFTMinting";
import styles from "./styles.module.css";

type Props = {
  user: UserProfile;
  skills: SkillReward[];
};

export default function CreationStages({ user, skills }: Props) {
  const { provider } = useSDK();

  const cleanupWagmiSession = (acc: string[]) => {
    if ((acc as string[]).length === 0 && typeof window !== "undefined") {
      window.localStorage.removeItem("providerType");
      window.localStorage.removeItem("wagmi.store");
      window.localStorage.removeItem("wagmi.wallet");
      window.localStorage.removeItem("wagmi.connected");
    }
  };

  useEffect(() => {
    provider?.on("accountsChanged", (acc: unknown) => {
      cleanupWagmiSession(acc as string[]);
    });

    return () => {
      provider?.removeListener("accountsChanged", cleanupWagmiSession);
    };
  }, [provider]);

  const isLoading =
    provider?.selectedAddress === undefined || provider?.chainId === undefined;

  if (isLoading) {
    return null;
  }

  return <StagesSlides user={user} skills={skills} />;
}

type StagesSlidesProps = Props & {
  walletAddress: string | null;
  chainId: string | null;
};

function StagesSlides({ user, skills }: Props) {
  // Stages content calculation need to be performed once during initialization
  // After wallet/chain being connected, keep setps the same to prevent unexpected slides skippage
  const { provider } = useSDK();
  const [initialWalletAddress] = useState<string | null>(
    provider?.selectedAddress ?? null
  );
  const [initialChainId] = useState<string | null>(provider?.chainId ?? null);
  const [progress, setProgress] = useState(0); // from 0 to 100
  const [newNFT, setNFT] = useState<UserNFTMetadata>();
  const splide = useRef<Splide>(null);
  const { displayErrorToast } = useToasts();
  const { connectAsync } = useConnect();

  const goToNextQuestionOrFinish = () => {
    if (progress === 100) {
      // Finish the process
      return null;
    }
    splide.current?.go(">");
    const progressStep = calculateProgressStep({
      walletConnected: Boolean(initialWalletAddress),
      chainConnected: isBSCChainConnected(initialChainId),
    });
    // Normalize decimal value, to simplify calculation of a last question
    const updatedProgress = Math.min(Math.ceil(progress + progressStep), 100);
    setProgress(updatedProgress);
  };

  const isBSCChainConnected = (chainId: string | null) => {
    return chainId
      ? parseInt(chainId, 16).toString() === process.env.NEXT_PUBLIC_BSC_NET_ID
      : false;
  };

  const updateNFTs = (nftMetadata: TransactionMetadata) =>
    fetch("/api/users/me/nft", {
      method: "PATCH",
      body: JSON.stringify({
        nfts: [
          {
            tx_hash: nftMetadata.transactionHash,
            token_id: nftMetadata.tokenId ?? "",
            from_address: provider?.selectedAddress,
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

  const basicStages = [
    !initialWalletAddress ? (
      <>
        <p>We need to associate your upcoming NFT with a crypto wallet.</p>
        <p>For now, only MetaMask is supported</p>
        <div className={styles.actionsContainer}>
          <AsyncButton
            className="button-accent"
            asyncAction={() =>
              connectAsync()
                .then(goToNextQuestionOrFinish)
                .catch((error) => displayErrorToast(error.message))
            }
          >
            Connect a MetaMask wallet
          </AsyncButton>
        </div>
      </>
    ) : null,
    !isBSCChainConnected(initialChainId) ? (
      <>
        <p>For today we operate only on BNB Smart Chain (BSC)</p>
        {/* There could be a case when it turns out a user was connected to expected chain
            after wallet connection.
            Design trade-off: display message that everything is ok and he can proceed
        */}
        {isBSCChainConnected(provider?.chainId ?? null) ? (
          <>
            <p>Seems like your account is connected to the right chain.</p>
            <p>You can proceed to the NFT minting stage</p>
            <div className={styles.actionsContainer}>
              <button
                className={classNames("button", "button-accent")}
                type="button"
                onClick={goToNextQuestionOrFinish}
              >
                Proceed
              </button>
            </div>
          </>
        ) : (
          <>
            <p>Seems like your account is connected to different chain.</p>
            <p>To proceed, we need to switch to BSC</p>
            <div className={styles.actionsContainer}>
              <AsyncButton
                className="button-accent"
                asyncAction={() =>
                  connectToBCS(provider)
                    .then(goToNextQuestionOrFinish)
                    .catch((error) => displayErrorToast(error.message))
                }
              >
                Yes, switch to BSC
              </AsyncButton>
            </div>
          </>
        )}
      </>
    ) : null,
    <NFTMinting
      key="nft-mint"
      user={{
        ...user,
        wallet_address: provider?.selectedAddress ?? undefined,
      }}
      skills={skills}
      onMint={(transactionMetadata) => {
        updateNFTs(transactionMetadata)
          .then(goToNextQuestionOrFinish)
          .catch((error) => displayErrorToast(error.message));
      }}
    />,
    <>
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
        <Link className={classNames("button", "button-accent")} href="/profile">
          Go to profile
        </Link>
      </div>
    </>,
  ];

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
      >
        {basicStages
          .filter((stage) => stage !== null)
          .map((stage, idx) => (
            <SplideSlide
              key={`nft-stage-${idx}`}
              className={styles.singleSlide}
            >
              {stage}
            </SplideSlide>
          ))}
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
