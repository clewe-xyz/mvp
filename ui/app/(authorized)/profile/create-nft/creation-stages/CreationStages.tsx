"use client";

import { SkillReward } from "@/app/(authorized)/skill";
import lightning from "@/images/lightning-bolt.svg";
import newTabIcon from "@/images/newtab.svg";
import { AsyncButton } from "@/ui-kit/buttons";
import { ProgressLine } from "@/ui-kit/progress-line";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css/core";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { UserProfile } from "../../types";
import NFTMinting from "./NFTMinting";
import { connectMetaMaskWallet } from "./connectCryptoWallet";
import styles from "./styles.module.css";

type Props = {
  user: UserProfile;
  skills: SkillReward[];
};

export default function CreationStages({ user, skills }: Props) {
  const stages = [{ id: 11 }, { id: 35 }, { id: 90 }];
  const [quizProgress, setQuizProgress] = useState(0); // from 0 to 100
  const progressStep =
    stages.length > 1 ? Number((100 / (stages.length - 1)).toFixed(1)) : 100;
  const splide = useRef<Splide>(null);

  const goToNextQuestionOrFinish = () => {
    if (quizProgress === 100) {
      // Finish the process
      return null;
    }
    splide.current?.go(">");
    // Normalize decimal value, to simplify calculation of a last question
    const updatedQuizProgress = Math.min(
      Math.ceil(quizProgress + progressStep),
      100
    );
    setQuizProgress(updatedQuizProgress);
  };

  const updateWalletAddress = (walletAddress: string) =>
    fetch("/api/users/me", {
      method: "PATCH",
      body: JSON.stringify(walletAddress),
    });

  return (
    <div className={styles.container}>
      <div className={styles.progress}>
        <ProgressLine currentProgress={quizProgress} />
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
              }
            >
              Connect a MetaMask wallet
            </AsyncButton>
          </div>
        </SplideSlide>
        <SplideSlide className={styles.singleSlide}>
          <NFTMinting
            user={user}
            skills={skills}
            onMint={() => {
              // TODO: Update user with generated NFT data
              goToNextQuestionOrFinish();
            }}
          />
        </SplideSlide>
        <SplideSlide className={styles.singleSlide}>
          <h3>
            Congratulations{" "}
            <Image src={lightning} alt="Lightnight icon" height={40} />
          </h3>
          <div className={styles.actionsContainer}>
            <div>
              <Link href={""} target="_blank" className="link">
                NFT on OpenSea&nbsp;
                <Image src={newTabIcon} alt="New tab" width={24} />
              </Link>
            </div>
            <div>
              <Link href={""} target="_blank" className="link">
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
