import { IArtWork } from "./IArtWork";

export interface ITour {
  id: number;
  name: string;
  description: string;
  weekdays: string;
  artworks: IArtWork[];
  feedbacks: {
    msg: string;
    stars: number;
  }[];
}
