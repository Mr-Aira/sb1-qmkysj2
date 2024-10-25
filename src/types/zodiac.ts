export type ZodiacSign = {
  name: string;
  symbol: string;
  date: string;
  element: string;
  traits: string[];
  description: string;
  compatibility: string[];
  luckyNumbers: number[];
  color: string;
  birthstone: {
    name: string;
    image: string;
    description: string;
  };
  birthFlower: {
    name: string;
    image: string;
    description: string;
  };
  constellation: string;
};

export type UserBirthday = {
  day: number;
  month: number;
  year: number;
};