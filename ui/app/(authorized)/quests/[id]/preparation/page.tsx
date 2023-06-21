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

type SearchParams = {
  demo?: string;
};

export default async function SingleQuestPreparation({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: SearchParams;
}) {
  const quest = await getQuest(params.id);
  return (
    <main className={styles.preparation}>
      <section className={styles.materialsContainer}>
        <PreparationSlider questTag={quest.tag} />
      </section>
      <section className={styles.actionsContainer}>
        <Link
          href={{
            pathname: `/quests/${params.id}/quiz`,
            query: { demo: searchParams.demo },
          }}
          className={classNames("button", "button-accent")}
        >
          Start quiz
        </Link>
      </section>
    </main>
  );
}
