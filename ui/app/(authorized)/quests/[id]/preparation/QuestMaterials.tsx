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
          <p>
            Blockchain is&nbsp;a&nbsp;special kind of&nbsp;computer program that
            helps people keep track of&nbsp;important information like money
            or&nbsp;contracts.
          </p>
        </SplideSlide>
        <SplideSlide className={className}>
          <p>
            It&rsquo;s like a&nbsp;big notebook that lots of&nbsp;people can
            write in, but nobody can erase or&nbsp;change what&rsquo;s already
            written.
          </p>
        </SplideSlide>
        <SplideSlide className={className}>
          <p>
            Every time someone writes something new in&nbsp;the blockchain
            notebook, everyone else gets a&nbsp;copy to&nbsp;check that
            everything is&nbsp;correct.
          </p>
        </SplideSlide>
        <SplideSlide className={className}>
          <p>
            This means that even if&nbsp;one person tries to&nbsp;cheat, the
            other people can catch them and stop them from doing anything bad.
          </p>
        </SplideSlide>
        <SplideSlide className={className}>
          <p>
            Originally, blockchain was used for something called Bitcoin, which
            is&nbsp;like a&nbsp;special kind of&nbsp;money that only exists
            on&nbsp;the internet.
          </p>
        </SplideSlide>
        <SplideSlide className={className}>
          <p>
            But now, people are using it&nbsp;for lots of&nbsp;other things too,
            like keeping track of&nbsp;who owns a&nbsp;piece of&nbsp;land
            or&nbsp;making sure that a&nbsp;product was made in&nbsp;a&nbsp;safe
            and ethical way.
          </p>
        </SplideSlide>
        <SplideSlide className={className}>
          <p>
            By&nbsp;using blockchain, we&nbsp;can make sure that things are fair
            and honest, and that bad people can&rsquo;t get away with doing bad
            things.
          </p>
        </SplideSlide>
        <SplideSlide className={className}>
          <p>
            It&rsquo;s like having a&nbsp;big group of&nbsp;friends who always
            keep an&nbsp;eye on&nbsp;each other to&nbsp;make sure nobody
            is&nbsp;doing anything wrong.
          </p>
        </SplideSlide>
        <SplideSlide className={className}>
          <p>
            In&nbsp;short, blockchain is&nbsp;a&nbsp;powerful tool that helps
            us&nbsp;keep track of&nbsp;important information and keep things
            fair for everyone.
          </p>
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
          <p>
            Decentralized exchanges, or&nbsp;dexes, are virtual markets where
            people can trade digital currencies directly. There
            is&nbsp;no&nbsp;need for a&nbsp;middleman such as&nbsp;a&nbsp;bank
            or&nbsp;a&nbsp;company. This makes transactions more secure,
            private, transparent, and trustworthy since there
            is&nbsp;no&nbsp;personal information given or&nbsp;trust
            in&nbsp;a&nbsp;third party. Transactions are recorded
            on&nbsp;a&nbsp;blockchain.
          </p>
        </SplideSlide>
        <SplideSlide className={className}>
          <p>
            Dexes are open-source, making them more democratic and
            decentralized. Anyone can use and access the software. This means
            that everyone has an&nbsp;equal opportunity to&nbsp;participate and
            contribute to&nbsp;the network.
          </p>
        </SplideSlide>
        <SplideSlide className={className}>
          <p>
            To&nbsp;learn more about dexes and how they can help you trade
            digital currencies securely and privately, check them out. Always
            stay curious and have fun in&nbsp;the world of&nbsp;crypto and web3!
          </p>
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
          <p>
            In&nbsp;the world of&nbsp;web3, there&rsquo;s a&nbsp;magical wallet
            called a&nbsp;Web3 wallet! It&rsquo;s like a&nbsp;secret hiding
            place for your digital money, also known as&nbsp;cryptocurrencies.
          </p>
        </SplideSlide>
        <SplideSlide className={className}>
          <p>
            Using your Web3 wallet, like Metamask, you can buy all sorts
            of&nbsp;cool things in&nbsp;web3. It&rsquo;s like having
            a&nbsp;treasure chest full of&nbsp;magical coins!
          </p>
        </SplideSlide>
        <SplideSlide className={className}>
          <p>
            To&nbsp;keep your Web3 wallet safe, create a&nbsp;secret code that
            only you know. It&rsquo;s like a&nbsp;magic spell that protects your
            digital money.
          </p>
        </SplideSlide>
        <SplideSlide className={className}>
          <p>
            With your Web3 wallet and digital money, you can buy things
            in&nbsp;web3. It&rsquo;s like using a&nbsp;magic wand to&nbsp;make
            things happen!
          </p>
        </SplideSlide>
        <SplideSlide className={className}>
          <p>
            In&nbsp;short, Web3 wallets are special wallets used to&nbsp;buy
            things in&nbsp;the magical world of&nbsp;web3. They&rsquo;re like
            a&nbsp;secret treasure chest full of&nbsp;magical coins that you can
            use to&nbsp;buy all sorts of&nbsp;cool things!
          </p>
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
