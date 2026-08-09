import type { Sport } from "../types/sport";

import footballImage from "../assets/images/footballSportCard.png";
import cyclingImage from "../assets/images/cyclingSportCard.png";
import hikingImage from "../assets/images/hikingSportCard.png";
import swimmingImage from "../assets/images/swimmingSportCard.png";

export const sports: Sport[] = [
  {
    id: 1,
    name: "Football",
    image: footballImage,
  },

  {
    id: 2,
    name: "Cycling",
    image: cyclingImage,
  },

  {
    id: 3,
    name: "Hiking",
    image: hikingImage,
  },

  {
    id: 4,
    name: "Swimming",
    image: swimmingImage,
  },
];