import { IArtWork } from "./IArtWork";

export interface ITour {
  id: string;
  name: string;
  description: string;
  weekdays: number[];
  artworks: IArtWork[];
  feedback: {
    msg: string;
    stars: number;
  }[];
}
