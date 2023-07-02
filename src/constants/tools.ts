import { ITour } from "../models/ITour";

export function clamp(num: number, min: number, max: number) {
  return num <= min ? min : num >= max ? max : num;
}
export const calculateStars = (feedback: ITour["feedback"]) => {
  let count = 0;
  for (let i = 0; i < feedback.length; i++) {
    count += feedback[i].stars;
  }
  return clamp(Math.ceil(count / feedback.length), 0, 5);
};
