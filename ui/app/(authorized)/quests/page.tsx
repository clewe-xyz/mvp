import quest1 from "@/images/quests/01.jpg";
import quest2 from "@/images/quests/02.jpg";
import quest3 from "@/images/quests/03.jpg";
import blockchain from "@/images/skills/blockchain.png";
import daos from "@/images/skills/daos.png";
import finance from "@/images/skills/finance.png";
import token from "@/images/skills/tokens.png";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

export default function Quests() {
  return (
    <main className={styles.main}>
      <div className={styles.quest}>
        <div className={styles.bgImageWrapper}>
          <Image
            className={styles.questImage}
            src={quest1}
            alt="Finance fundamentals"
          />
        </div>
        <div className={styles.questAbout}>
          <h3>Finance fundamentals</h3>
          <p>Dscription of this quest</p>
          <div className={styles.skills}>
            <div className={styles.singleSkill}>
              <Image
                className={styles.skillIcon}
                src={finance}
                alt="Finance skill"
                width="32"
              />
              Finance
            </div>
            <div className={styles.singleSkill}>
              <Image
                className={styles.skillIcon}
                src={token}
                alt="Tokens skill"
                width="32"
              />
              Cpypto basics
            </div>
          </div>
        </div>
        <div className={styles.questActions}>
          <Link
            href="/quests/123/preparation"
            className={classNames(
              "button",
              "button-accent",
              styles.questActionButton
            )}
          >
            Start quest
          </Link>
        </div>
      </div>
      <div className={styles.quest}>
        <div className={styles.bgImageWrapper}>
          <Image
            className={styles.questImage}
            src={quest2}
            alt="Blockchain basics"
          />
        </div>
        <div className={styles.questAbout}>
          <h3>Blockchain basics</h3>
          <p>Dscription of this quest</p>
          <div className={styles.skills}>
            <div className={styles.singleSkill}>
              <Image
                className={styles.skillIcon}
                src={blockchain}
                alt="Finance skill"
                width="32"
              />
              Blockchain
            </div>
          </div>
        </div>
        <div className={styles.questActions}>
          <Link
            href="#"
            className={classNames(
              "button",
              "button-accent",
              styles.questActionButton
            )}
          >
            Start quest
          </Link>
        </div>
      </div>
      <div className={styles.quest}>
        <div className={styles.bgImageWrapper}>
          <Image
            className={styles.questImage}
            src={quest3}
            alt="Blockchain basics"
          />
        </div>
        <div className={styles.questAbout}>
          <h3>DAOs</h3>
          <p>Dscription of this quest</p>
          <div className={styles.skills}>
            <div className={styles.singleSkill}>
              <Image
                className={styles.skillIcon}
                src={daos}
                alt="Finance skill"
                width="32"
              />
              DAO
            </div>
            <div className={styles.singleSkill}>
              <Image
                className={styles.skillIcon}
                src={finance}
                alt="Tokens skill"
                width="32"
              />
              Finance basics
            </div>
          </div>
        </div>
        <div className={styles.questActions}>
          <Link
            href="#"
            className={classNames(
              "button",
              "button-accent",
              styles.questActionButton
            )}
          >
            Start quest
          </Link>
        </div>
      </div>
    </main>
  );
}
