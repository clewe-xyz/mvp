import { authorizedRequest } from "@/app/api/authorizedRequest";
import { unauthorizedRequest } from "@/app/api/unauthorizedRequest";
import QuizFlow from "./QuizFlow";
import styles from "./page.module.css";
import { Quiz } from "./types";

async function getQuest(id: string): Promise<Quiz> {
  const quest = await unauthorizedRequest(`quests/${id}`);
  return quest.json();
}

async function getCurrentUser() {
  const user = await authorizedRequest("users/me");
  return user.json();
}

async function getLevelsInfo() {
  const levels = await unauthorizedRequest("levels");
  return levels.json();
}

type Params = {
  id: string;
};

export default async function SingleQuiz({ params }: { params: Params }) {
  const [quiz, user, levels] = await Promise.all([
    getQuest(params.id),
    getCurrentUser(),
    getLevelsInfo(),
  ]);
  return (
    <main className={styles.singleQuiz}>
      <QuizFlow
        questions={quiz.questions}
        user={{
          nickname: user.nickname,
          level: user.level_id,
          accumulatedExp: user.level_accumulated_exp,
          expToNextLevel: user.exp_to_next_level,
        }}
        allLevels={levels.map((lvl: any) => ({
          level: lvl.level_value,
          exp: lvl.total_exp,
        }))}
      />
    </main>
  );
}
