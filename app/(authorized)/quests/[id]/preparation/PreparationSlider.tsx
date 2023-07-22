"use client";

import "@splidejs/react-splide/css/core";
import "./materials-slider.css";
import styles from "./page.module.css";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { QuestMaterials } from "./QuestMaterials";

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
      <QuestMaterials tag={questTag} className={styles.materialsSlide} />
    </Splide>
  );
}
