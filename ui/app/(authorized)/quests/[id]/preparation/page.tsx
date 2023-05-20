"use client";

import "@splidejs/react-splide/css/core";
import "./materials-slider.css";
import styles from "./page.module.css";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import classNames from "classnames";
import Link from "next/link";

export default function SingleQuestPreparation() {
  return (
    <main className={styles.preparation}>
      <section className={styles.materialsContainer}>
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
              innovation. An internet that siphons power away from big
              corporations, and instead places you at the helm of your data.
            </p>
          </SplideSlide>
          <SplideSlide className={styles.materialsSlide}>
            <p>
              You have to start all over since the platform owns your data and
              profits from it. Whereas with Web3, you can choose to take your
              data and money to another platform whenever you want as you aren’t
              anchored down. The database and platform become the equivalent of
              a global utility, accessible and open to anyone for any purpose.
            </p>
            <p>
              In this new web, regular websites or applications are referred to
              as dapps (decentralized apps), typically with a “Connect Wallet”
              button that acts as a sign-in. These are usually open and free for
              all to use, regardless of where you are located or what industry
              you hail from.
            </p>
          </SplideSlide>
        </Splide>
      </section>
      <section className={styles.actionsContainer}>
        <Link
          href="/quests/123/quiz"
          className={classNames("button", "button-accent")}
        >
          Start quiz
        </Link>
      </section>
    </main>
  );
}
