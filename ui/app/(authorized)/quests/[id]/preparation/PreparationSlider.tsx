"use client";

import "@splidejs/react-splide/css/core";
import "./materials-slider.css";
import styles from "./page.module.css";
import { Splide, SplideSlide } from "@splidejs/react-splide";

type Props = {
  questTag: string;
};

export default function PreparationSlider({ questTag }: Props) {
  // For the alpha version, preparation materials are hardcoded and resolved by quesiton `tag` field
  return (
    <Splide
      className={styles.materials}
      options={{
        perPage: 1,
        perMove: 1,
        arrows: false,
        pagination: true,
        width: "100%",
      }}
      tag="div"
    >
      <SplideSlide className={styles.materialsSlide}>
        <p>
          Web3 is an umbrella term for the vision of a better internet; an
          internet with an added identity, money, and social layer.
        </p>
        <p>
          An internet built upon open protocols that value transparency and
          innovation. An internet that siphons power away from big corporations,
          and instead places you at the helm of your data.
        </p>
      </SplideSlide>
      <SplideSlide className={styles.materialsSlide}>
        <p>
          You have to start all over since the platform owns your data and
          profits from it. Whereas with Web3, you can choose to take your data
          and money to another platform whenever you want as you aren’t anchored
          down. The database and platform become the equivalent of a global
          utility, accessible and open to anyone for any purpose.
        </p>
        <p>
          In this new web, regular websites or applications are referred to as
          dapps (decentralized apps), typically with a “Connect Wallet” button
          that acts as a sign-in. These are usually open and free for all to
          use, regardless of where you are located or what industry you hail
          from.
        </p>
        <p>
          You have to start all over since the platform owns your data and
          profits from it. Whereas with Web3, you can choose to take your data
          and money to another platform whenever you want as you aren’t anchored
          down. The database and platform become the equivalent of a global
          utility, accessible and open to anyone for any purpose.
        </p>
      </SplideSlide>
      <SplideSlide className={styles.materialsSlide}>
        <p>
          There’s a place for you somewhere. And if you don’t manage to find it,
          you can create one yourself. The movement behind Web3 represents a
          fundamental change in our world, freeing information and identity from
          borders, censorship, and single-source control.
        </p>
      </SplideSlide>
    </Splide>
  );
}