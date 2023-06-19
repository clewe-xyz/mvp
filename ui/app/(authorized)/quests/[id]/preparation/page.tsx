import { unauthorizedRequest } from "@/app/api/unauthorizedRequest";
import classNames from "classnames";
import Link from "next/link";
import PreparationSlider from "./PreparationSlider";
import styles from "./page.module.css";

async function getQuest(id: string) {
  const quest = await unauthorizedRequest(`quests/${id}`);
  return await quest.json();
}

type Params = {
  id: string;
};

export default async function SingleQuestPreparation({
  params,
}: {
  params: Params;
}) {
  const quest = await getQuest(params.id);
  return (
    <main className={styles.preparation}>
      <section className={styles.materialsContainer}>
        <PreparationSlider questTag={quest.tag} />
      </section>
      <section className={styles.actionsContainer}>
        <Link
          href={`/quests/${params.id}/quiz`}
          className={classNames("button", "button-accent")}
        >
          Start quiz
        </Link>
      </section>
    </main>
  );
}
