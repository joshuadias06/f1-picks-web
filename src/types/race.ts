export type Race = {
  raceName: string;
  date: string;
  time?: string;
  round?: string;

  Circuit: {
    circuitName: string;
    Location: {
      lat: string;
      long: string;
      locality: string;
      country: string;
    };
  };

  FirstPractice?: {
    date: string;
    time: string;
  };

  SecondPractice?: {
    date: string;
    time: string;
  };

  ThirdPractice?: {
    date: string;
    time: string;
  };

  Qualifying?: {
    date: string;
    time: string;
  };
};
