"use client";

import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css/core";
import "./achievements-slider.css";
import styles from "./achievements.module.css";
import expogenImage from "@/images/achievements/expogen.jpg";
import skillgenImage from "@/images/achievements/skillgen.jpg";
import feedbacked from "@/images/achievements/feedbacked.jpg";

import Image from "next/image";
import classNames from "classnames";

export function AchievementsSlider() {
  return (
    <Splide
      className={styles.achievement}
      options={{
        perPage: 1,
        perMove: 1,
        arrows: false,
        pagination: true,
        gap: "15px",
        width: "100%",
      }}
      tag="div"
    >
      <SplideSlide
        className={classNames(styles.achievementsSlide, {
          [styles.locked]: false,
        })}
      >
        <div className={styles.achievementImage}>
          <span className={styles.statusBadgeContainer}>
            <span className={styles.statusBadge}>Unlocked</span>
            <Image alt="Expogen" src={expogenImage} />
          </span>
        </div>
        <div className={styles.achievementText}>
          <h5 className={styles.achievementsTitle}>ExpoGen</h5>
          <div className={styles.achievementsDescription}>
            Earn more than 100 XP in one day
          </div>
        </div>
      </SplideSlide>
      <SplideSlide
        className={classNames(styles.achievementsSlide, {
          [styles.locked]: true,
        })}
      >
        <div className={styles.achievementImage}>
          <span className={styles.statusBadgeContainer}>
            <span className={styles.statusBadge}>Locked</span>
            <Image alt="Skillgen" src={skillgenImage} />
          </span>
        </div>
        <div className={styles.achievementText}>
          <h5 className={styles.achievementsTitle}>Finance SkillGen</h5>
          <div className={styles.achievementsDescription}>
            Earn more than 10 points on the &ldquo;Finance fundamentals&rdquo;
            skill in one day
          </div>
        </div>
      </SplideSlide>
      <SplideSlide
        className={classNames(styles.achievementsSlide, {
          [styles.locked]: true,
        })}
      >
        <div className={styles.achievementImage}>
          <span className={styles.statusBadgeContainer}>
            <span className={styles.statusBadge}>Locked</span>
            <Image alt="Feedbacked" src={feedbacked} />
          </span>
        </div>
        <div className={styles.achievementText}>
          <h5 className={styles.achievementsTitle}>Feedbacked</h5>
          <div className={styles.achievementsDescription}>
            Leave feedback about CleWe by taking the survey
          </div>
        </div>
        <div className={styles.achievementActions}>
          <button className={classNames("button", "button-accent")}>
            Take the survey
          </button>
        </div>
      </SplideSlide>
    </Splide>
  );
}
