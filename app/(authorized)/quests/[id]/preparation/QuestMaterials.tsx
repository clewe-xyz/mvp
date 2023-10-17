import { SplideSlide } from "@splidejs/react-splide";
import Image from "next/image";
import styles from "./page.module.css";
import blockchain_1 from "./media/blockchain/blockchain1.jpeg";
import blockchain_2 from "./media/blockchain/blockchain2.png";
import blockchain_3 from "./media/blockchain/blockchain3.jpeg";
import dex_1 from "./media/dex/dex1.jpeg";
import dex_2 from "./media/dex/dex2.png";
import dex_3 from "./media/dex/dex3.jpeg";
import wallet_1 from "./media/wallet/wallet1.png";
import wallet_2 from "./media/wallet/wallet2.jpeg";

type Props = {
  tag: string;
  className?: string;
};

export function QuestMaterials({ className, tag }: Props) {
  if (tag === "blockchain") {
    return (
      <>
        <SplideSlide className={className}>
          <p>
            Blockchain: The Future of Transactions (Even for Space Pirates!)
          </p>
          <div className={styles.mediaContainer}>
            <Image src={blockchain_1} alt="Blockchain" />
          </div>
          <p>Read time: 1 minute 45 seconds</p>
        </SplideSlide>
        <SplideSlide className={className}>
          <p>
            Blockchain is a technology that allows for secure, transparent, and
            tamper-proof transactions. It&apos;s the underlying technology
            behind cryptocurrencies, but it has many other potential
            applications.
          </p>
          <p>
            Imagine you are a space pirate. You have just plundered a treasure
            ship full of gold coins. How do you get your booty back to your home
            planet without anyone stealing it?
          </p>
          <div className={styles.mediaContainer}>
            <Image src={blockchain_2} alt="Blockchain" />
          </div>
        </SplideSlide>
        <SplideSlide className={className}>
          <p>
            With blockchain, you could create a digital record of your treasure
            and store it on a decentralized network of computers. This record
            would be tamper-proof, so no one could change it without you
            knowing.
          </p>
          <p>
            You could then share this record with your fellow space pirates, who
            could verify its authenticity using cryptography. This would allow
            you to trade your treasure or use it to purchase goods and services
            without having to worry about being scammed.
          </p>
          <p>
            What do you call a blockchain that&apos;s always late? A blockhead.
          </p>
          <div className={styles.mediaContainer}>
            <Image src={blockchain_3} alt="Blockchain" />
          </div>
        </SplideSlide>
        <SplideSlide className={className}>
          <p>
            Blockchain is a powerful technology with the potential to
            revolutionize many industries. It&apos;s especially exciting for
            space pirates, who need a way to securely store and trade their
            booty.
          </p>
          <p>
            So next time you&apos;re sailing the seven seas, be sure to keep an
            eye out for blockchain-powered treasure chests. They could be the
            future of space piracy!
          </p>
        </SplideSlide>
      </>
    );
  }
  if (tag === "dex") {
    return (
      <>
        <SplideSlide className={className}>
          <p>DEX: A Space Pirate&apos;s Guide to Decentralized Trading</p>
          <div className={styles.mediaContainer}>
            <Image src={dex_1} alt="DEX" />
          </div>
          <p>Read time: 1 minute 45 seconds</p>
        </SplideSlide>
        <SplideSlide className={className}>
          <p>
            Ahoy, space pirates! Are you tired of paying high fees to
            centralized exchanges to trade your crypto? Look no further than
            DEXs, or decentralized exchanges!
          </p>
          <p>
            DEXs are peer-to-peer exchanges that allow you to trade crypto
            directly with other users, without having to go through a third
            party. This means that you can save money on fees and have more
            control over your trades.
          </p>
          <p>
            But DEXs can be a bit tricky to use, especially for new space
            pirates. That&apos;s why I&apos;m here to give you a gamified guide
            to DEXs!
          </p>
          <div className={styles.mediaContainer}>
            <Image src={dex_2} alt="DEX" />
          </div>
        </SplideSlide>
        <SplideSlide className={className}>
          <h3>What is a DEX?</h3>
          <p>
            A DEX is like a digital black market for cryptocurrencies. It&apos;s
            a place where you can buy and sell crypto directly with other users,
            without having to go through a centralized exchange.
          </p>
        </SplideSlide>
        <SplideSlide className={className}>
          <h3>How do DEXs work?</h3>
          <p>
            DEXs use smart contracts to facilitate trades. Smart contracts are
            self-executing contracts that are stored on a blockchain. When you
            make a trade on a DEX, the smart contract will automatically execute
            the trade when certain conditions are met.
          </p>
        </SplideSlide>
        <SplideSlide className={className}>
          <h3>What are the advantages of using a DEX?</h3>
          <p>There are several advantages to using a DEX, including:</p>
          <ul>
            <li>
              Lower fees: DEXs typically have lower fees than centralized
              exchanges.
            </li>
            <li>More control: DEXs give you more control over your trades.</li>
            <li>
              Security: DEXs are more secure than centralized exchanges, as they
              are not vulnerable to hacks.
            </li>
          </ul>
        </SplideSlide>
        <SplideSlide className={className}>
          <h3>What are the disadvantages of using a DEX?</h3>
          <p>There are also a few disadvantages to using a DEX, including:</p>
          <ul>
            <li>
              Complexity: DEXs can be more complex to use than centralized
              exchanges.
            </li>
            <li>
              Liquidity: DEXs may not have as much liquidity as centralized
              exchanges.
            </li>
            <li>
              Scams: DEXs are more susceptible to scams than centralized
              exchanges.
            </li>
          </ul>
          <div className={styles.mediaContainer}>
            <Image src={dex_3} alt="DEX" />
          </div>
        </SplideSlide>
        <SplideSlide className={className}>
          <p>
            What do you call a DEX that&apos;s always illiquid?{" "}
            <em>A ghost town.</em>
          </p>
          <p>
            What do you call a DEX that&apos;s full of scammers?{" "}
            <em>A pirate ship.</em>
          </p>
        </SplideSlide>
        <SplideSlide className={className}>
          <p>
            Bonus tip: If you&apos;re a space pirate who&apos;s new to DEXs, I
            recommend starting with a simple DEX like Uniswap. Uniswap is one of
            the most popular DEXs, and it&apos;s relatively easy to use.
          </p>
        </SplideSlide>
      </>
    );
  }

  if (tag === "crypto-wallets") {
    return (
      <>
        <SplideSlide className={className}>
          <p>Crypto Wallets: A Gamified Guide for Space Pirates!</p>
          <div className={styles.mediaContainer}>
            <Image src={wallet_1} alt="Crypto wallets" />
          </div>
          <p>Read time: 1 minute 45 seconds</p>
        </SplideSlide>
        <SplideSlide className={className}>
          <p>
            Ahoy, space pirates! Have you ever wondered how to keep your crypto
            safe and secure? Look no further than crypto wallets!
          </p>
        </SplideSlide>
        <SplideSlide className={className}>
          <p>
            Crypto wallets are like digital treasure chests for your
            cryptocurrencies. They store your crypto safely and securely, and
            they make it easy to send and receive crypto.
          </p>
        </SplideSlide>
        <SplideSlide className={className}>
          <p>
            There are many different types of crypto wallets available, but they
            all work in the same basic way. They use cryptography to generate a
            unique public address and private key. The public address is like
            your bank account number, and the private key is like your PIN
            number.
          </p>
        </SplideSlide>
        <SplideSlide className={className}>
          <p>
            To send crypto to someone, you need to know their public address. To
            receive crypto, you need to give them your public address. To spend
            crypto, you need to use your private key.
          </p>
        </SplideSlide>
        <SplideSlide className={className}>
          <p>
            Imagine a magic treasure chest. This treasure chest can only be
            opened by you, and it can only be opened with your special magic
            key.
          </p>
          <p>
            Inside the treasure chest, you can store all of your
            cryptocurrencies. No one can steal your crypto from the treasure
            chest, unless they have your magic key.
          </p>
        </SplideSlide>
        <SplideSlide className={className}>
          <p>
            Your crypto wallet is like the magic treasure chest. It stores your
            crypto safely and securely, and it can only be opened by you.
          </p>
          <div className={styles.mediaContainer}>
            <Image src={wallet_2} alt="Crypto wallets" />
          </div>
        </SplideSlide>
        <SplideSlide className={className}>
          <h3>What do you call a crypto wallet that never loses your money?</h3>
          <p>A myth.</p>
        </SplideSlide>
        <SplideSlide className={className}>
          <h3>Why was the crypto wallet always the life of the party?</h3>
          <p>
            Because it had all the keys to success... and the private ones too!
          </p>
        </SplideSlide>
        <SplideSlide className={className}>
          <p>
            Crypto wallets are an essential tool for any space pirate who wants
            to keep their crypto safe and secure. So be sure to get a crypto
            wallet today!
          </p>
        </SplideSlide>
      </>
    );
  }

  return null;
}
