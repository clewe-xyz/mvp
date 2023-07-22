import { SkillReward } from "@/app/(authorized)/skill";

export type Quiz = {
  id: number;
  name: string;
  description: string;
  tag: string;
  questions: QuizQuestion[];
};

export type QuizQuestion = {
  id: number;
  type: QuestionType;
  question: string;
  answers: string[] | null;
  experience_reward: number;
  skills: SkillReward[];
};

export type QuestionAnswers = string[] | null;

export type QuestionType = "Multiple-options" | "Single-option" | "Opened-text";
