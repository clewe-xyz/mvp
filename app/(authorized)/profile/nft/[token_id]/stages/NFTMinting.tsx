import { SkillReward } from "@/app/(authorized)/skill";
import newTabIcon from "@/images/newtab.svg";
import skillsHeroBG from "@/images/skills/skills-hero-bg.png";
import contractABI from "@/smart-contract/abi.json";
import { AsyncButton } from "@/ui-kit/buttons";
import { ProgressLine } from "@/ui-kit/progress-line";
import { useToasts } from "@/ui-kit/toasts";
import classNames from "classnames";
import { toPng } from "html-to-image";
import { DateTime } from "luxon";
import Image from "next/image";
import { NFTStorage } from "nft.storage";
import { useEffect, useRef, useState } from "react";
import { UserProfile } from "../../../types";
import { initWeb3 } from "../../initWeb3";
import styles from "./profileToImage.module.css";

type Props = {
  user: UserProfile;
  skills: SkillReward[];
  tokenId: string;
  onMint: (metadata: TransactionMetadata) => void;
};

export type TransactionMetadata = {
  transactionHash: string;
  tokenId?: string;
};

export default function NFTMinting({ user, skills, tokenId, onMint }: Props) {
  const [isInitialized, initialize] = useState(false);
  const [preview, setPreview] = useState<string | undefined>(undefined);

  const levelMaximumExp = user.exp_to_next_level + user.level_accumulated_exp;
  const profileRoot = useRef<HTMLDivElement>(null);
  const NFTActionsContainer = useRef<HTMLDivElement>(null);

  const { displayErrorToast } = useToasts();

  useEffect(() => {
    if (typeof window !== "undefined") {
      initialize(true);
    }
  }, []);

  useEffect(() => {
    convertProfileToImage();
  }, []);

  const convertProfileToImage = () => {
    if (profileRoot.current === null || NFTActionsContainer.current === null) {
      return Promise.resolve(undefined);
    }
    return toPng(profileRoot.current, {
      pixelRatio: 1,
      width: 400,
      canvasWidth: 400,
    })
      .then(setPreview)
      .catch((error) =>
        displayErrorToast(`Error while creating image from node: ${error}`)
      );
  };

  const previewNFTImage = () => {
    const newTab = window.open();
    newTab?.document.write(
      '<html><body style="margin: 0;"><img src="' +
        preview +
        '" alt="Your NFT image"></body></html>'
    );
  };

  return (
    <>
      {preview ? (
        <>
          <p>Preview how you NFT will look like after update.</p>
          <p>
            We will provide you a link to a blockchain transaction and NFT
            preview on the OpenSea
          </p>
          <p>Also, an NFT reference will be available in your profile</p>
        </>
      ) : (
        <p>Preview how you NFT will look like by generating an image</p>
      )}
      <div className={styles.NFTActionsContainer} ref={NFTActionsContainer}>
        {preview ? (
          isInitialized ? (
            <>
              <button
                className={styles.previewNFTBtn}
                type="button"
                onClick={previewNFTImage}
              >
                Preview NFT image&nbsp;
                <Image src={newTabIcon} alt="New tab" width={24} />
              </button>
              <AsyncButton
                className={classNames("button-accent", styles.mintNFTBtn)}
                asyncAction={() =>
                  updateNFT(preview, {
                    walletAddress: user.wallet_address,
                    tokenId,
                    name: "The captured progress made on the CleWe platform",
                    description:
                      "This is an NFT that shows and makes your educational progress visible to others",
                    attributes: [
                      {
                        trait_type: "Level",
                        value: user.level_id,
                        max_value: 10,
                      },
                      {
                        trait_type: "Experience",
                        value: user.level_accumulated_exp,
                        max_value: levelMaximumExp,
                      },
                      {
                        trait_type: "Last update",
                        display_type: "date",
                        value: DateTime.now().toSeconds(),
                      },
                      ...skills.map((skill) => ({
                        trait_type: skill.topic,
                        value: skill.point,
                      })),
                    ],
                  })
                    .then(onMint)
                    .catch((error) => displayErrorToast(error.message))
                }
              >
                Update NFT
              </AsyncButton>
            </>
          ) : (
            <>
              <AsyncButton
                className={classNames("button-accent", styles.mintNFTBtn)}
                asyncAction={() =>
                  updateNFT(preview, {
                    walletAddress: user.wallet_address,
                    tokenId,
                    name: "The captured progress made on the CleWe platform",
                    description:
                      "This is an NFT that shows and makes your educational progress visible to others",
                    attributes: [
                      {
                        trait_type: "Level",
                        value: user.level_id,
                        max_value: 10,
                      },
                      {
                        trait_type: "Experience",
                        value: user.level_accumulated_exp,
                        max_value: levelMaximumExp,
                      },
                      {
                        trait_type: "Last update",
                        display_type: "date",
                        value: DateTime.now().toSeconds(),
                      },
                      ...skills.map((skill) => ({
                        trait_type: skill.topic,
                        value: skill.point,
                      })),
                    ],
                  })
                    .then(onMint)
                    .catch((error) => displayErrorToast(error.message))
                }
              >
                Update NFT
              </AsyncButton>
              <Image src={preview} alt="Your NFT image" />
            </>
          )
        ) : (
          <AsyncButton
            className="button-accent"
            asyncAction={convertProfileToImage}
          >
            Generate NFT image
          </AsyncButton>
        )}
      </div>
      {/* Profile stats layout, which serves as source for image generation */}
      <div className={styles.profileSourceContainer}>
        <div className={styles.profile} ref={profileRoot}>
          <section className={styles.levelStatsSection}>
            <header>
              <span className={styles.logo}>CleWe</span>
            </header>
            <h3 className={styles.nickName}>{user.nickname}</h3>
            <div>
              <div className={styles.levelContainer}>
                <h5 className={styles.level}>Level: {user.level_id}</h5>
                <span className={styles.addedExperience}>
                  XP to next level: {user.exp_to_next_level}
                </span>
              </div>
              <div className={styles.levelProgress}>
                <ProgressLine
                  currentProgress={user.level_accumulated_exp}
                  totalProgress={levelMaximumExp}
                />
              </div>
            </div>
          </section>
          <section className={styles.skillsSection}>
            <Image
              alt="Skills"
              src={skillsHeroBG}
              quality={100}
              fill
              sizes="100vw"
              style={{
                objectFit: "cover",
                filter: `opacity(20%)`,
              }}
            />
            <h4 className={styles.skillsTitle}>Skills</h4>
            <div className={styles.skillsSummaryContainer}>
              {skills.length > 0 ? (
                skills.map((skill) => (
                  <div key={skill.tag} className={styles.skillRow}>
                    <span className={styles.skillDatapoint}>{skill.topic}</span>
                    <span className={styles.skillDatapoint}>
                      {skill.point}
                      <span className={styles.skillMeasure}>pts</span>
                    </span>
                  </div>
                ))
              ) : (
                <div>No Skills for now</div>
              )}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

type Attribute = {
  display_type?: string;
  trait_type: string;
  value: number | string;
  max_value?: number;
};

type TokenMetadata = {
  name: string;
  description: string;
  attributes?: Attribute[];
};

type Config = {
  walletAddress?: string;
  tokenId: string;
} & TokenMetadata;

const NFTStorageClient = new NFTStorage({
  token: process.env.NEXT_PUBLIC_NFT_STORAGE_API_KEY as string,
});

async function updateNFT(
  imageBase64Data: string,
  { walletAddress, tokenId, ...tokenMetadata }: Config
) {
  if (!walletAddress) {
    throw new Error(
      "Wallet address must be defined to mint NFT. Please, connect a Metamask and try once more"
    );
  }
  const metadata = await uploadToIPFS(imageBase64Data, tokenMetadata);
  const web3 = await initWeb3();
  const smartContract = new web3.eth.Contract(
    contractABI,
    process.env.NEXT_PUBLIC_SMART_CONTRACT_ADDRESS
  );

  const mintReceipt = await smartContract.methods
    // @ts-ignore
    .updateMetadata(Number(tokenId), metadata.url)
    .send({
      from: walletAddress,
    });
  return {
    ...mintReceipt,
    tokenId,
  };
}

async function uploadToIPFS(imageBase64Data: string, config: TokenMetadata) {
  const file = await convertBase64ToPNG(
    imageBase64Data,
    "CleWe-progress-nft.png"
  );
  return await NFTStorageClient.store({
    image: file,
    name: config.name,
    description: config.description,
  });
}

async function convertBase64ToPNG(
  imageBase64Data: string,
  name: string
): Promise<File> {
  const response = await fetch(imageBase64Data);
  const arrayBuffer = await response.blob();
  return new File([arrayBuffer], name, { type: "image/png" });
}
