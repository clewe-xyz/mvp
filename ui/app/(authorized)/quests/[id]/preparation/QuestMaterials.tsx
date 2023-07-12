import { SplideSlide } from "@splidejs/react-splide";
import styles from "./page.module.css";

type Props = {
  tag: string;
  className?: string;
};

export function QuestMaterials({ className, tag }: Props) {
  if (tag === "blockchain") {
    return (
      <>
        <SplideSlide className={className}>
          Blockchain is a special kind of computer program that helps people
          keep track of important information like money or contracts.
        </SplideSlide>
        <SplideSlide className={className}>
          It's like a big notebook that lots of people can write in, but nobody
          can erase or change what's already written.
        </SplideSlide>
        <SplideSlide className={className}>
          Every time someone writes something new in the blockchain notebook,
          everyone else gets a copy to check that everything is correct.
        </SplideSlide>
        <SplideSlide className={className}>
          This means that even if one person tries to cheat, the other people
          can catch them and stop them from doing anything bad.
        </SplideSlide>
        <SplideSlide className={className}>
          Originally, blockchain was used for something called Bitcoin, which is
          like a special kind of money that only exists on the internet.
        </SplideSlide>
        <SplideSlide className={className}>
          But now, people are using it for lots of other things too, like
          keeping track of who owns a piece of land or making sure that a
          product was made in a safe and ethical way.
        </SplideSlide>
        <SplideSlide className={className}>
          By using blockchain, we can make sure that things are fair and honest,
          and that bad people can't get away with doing bad things.
        </SplideSlide>
        <SplideSlide className={className}>
          It's like having a big group of friends who always keep an eye on each
          other to make sure nobody is doing anything wrong.
        </SplideSlide>
        <SplideSlide className={className}>
          In short, blockchain is a powerful tool that helps us keep track of
          important information and keep things fair for everyone.
        </SplideSlide>
        <SplideSlide>
          <p>
            Watch this 1-minute video to learn more about blockchain technology!
          </p>
          <iframe
            className={styles.materialsSlideVideo}
            src="https://www.youtube.com/embed/sTFZras-1Lo"
            title="What is Blockchain"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </SplideSlide>
      </>
    );
  }
  if (tag === "dex") {
    return (
      <>
        <SplideSlide className={className}>
          Decentralized exchanges, or dexes, are virtual markets where people
          can trade digital currencies directly. There is no need for a
          middleman such as a bank or a company. This makes transactions more
          secure, private, transparent, and trustworthy since there is no
          personal information given or trust in a third party. Transactions are
          recorded on a blockchain.
        </SplideSlide>
        <SplideSlide className={className}>
          Dexes are open-source, making them more democratic and decentralized.
          Anyone can use and access the software. This means that everyone has
          an equal opportunity to participate and contribute to the network.
        </SplideSlide>
        <SplideSlide className={className}>
          To learn more about dexes and how they can help you trade digital
          currencies securely and privately, check them out. Always stay curious
          and have fun in the world of crypto and web3!
        </SplideSlide>
        <SplideSlide className={className}>
          <p>Watch this 7-minute video to learn more on DEX topic!</p>
          <iframe
            className={styles.materialsSlideVideo}
            src="https://www.youtube.com/embed/2tTVJL4bpTU"
            title="What is DEX"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </SplideSlide>
      </>
    );
  }

  if (tag === "wallets") {
    return (
      <>
        <SplideSlide className={className}>
          In the world of web3, there's a magical wallet called a Web3 wallet!
          It's like a secret hiding place for your digital money, also known as
          cryptocurrencies.
        </SplideSlide>
        <SplideSlide className={className}>
          Using your Web3 wallet, like Metamask, you can buy all sorts of cool
          things in web3. It's like having a treasure chest full of magical
          coins!
        </SplideSlide>
        <SplideSlide className={className}>
          To keep your Web3 wallet safe, create a secret code that only you
          know. It's like a magic spell that protects your digital money.
        </SplideSlide>
        <SplideSlide className={className}>
          With your Web3 wallet and digital money, you can buy things in web3.
          It's like using a magic wand to make things happen!
        </SplideSlide>
        <SplideSlide className={className}>
          In short, Web3 wallets are special wallets used to buy things in the
          magical world of web3. They're like a secret treasure chest full of
          magical coins that you can use to buy all sorts of cool things!
        </SplideSlide>
        <SplideSlide className={className}>
          <p>
            If you want to learn more about wallets, watch this 2-minute video!
          </p>
          <iframe
            className={styles.materialsSlideVideo}
            src="https://www.youtube.com/embed/XMnghGaSH4Y"
            title="What is WEB3 wallet"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </SplideSlide>
      </>
    );
  }

  return null;
}
