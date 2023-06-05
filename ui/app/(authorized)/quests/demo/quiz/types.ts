import { SkillReward } from "@/app/(authorized)/skill";

export type Quiz = {
  id: string;
  title: string;
  questions: QuizQuestion[];
};

export type QuizQuestion = {
  id: string;
  type: QuestionType;
  question: string;
  answers: QuestionAnswers;
  experience_rewad: number;
  skills_reward: SkillReward[];
};

export type QuestionAnswers = {
  true_answers: string | string[];
  fake_answers: string[] | null;
};

export type QuestionType = "multiple-options" | "single-option" | "opened-text";
