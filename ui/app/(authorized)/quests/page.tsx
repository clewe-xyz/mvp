import { authorizedRequest } from "@/app/api/authorizedRequest";
import { SkillType } from "../skill";
import Quest from "./Quest";
import styles from "./page.module.css";

type Quest = {
  id: number;
  name: string;
  description: string;
  tag: string;
  skills: SkillType[];
  is_completed: boolean;
};

async function getAllQuests() {
  const quests = await authorizedRequest("quests/my/list/quests");
  return (await quests.json()) as Promise<Quest[]>;
}

export default async function Quests() {
  const quests = await getAllQuests();
  return (
    <main className={styles.main}>
      {quests.map((quest) => (
        <Quest
          key={quest.id}
          id={quest.id}
          name={quest.name}
          description={quest.description}
          tag={quest.tag}
          isCompleted={quest.is_completed}
          skills={quest.skills}
        />
      ))}
    </main>
  );
}
