export type RaceSession = {
  date: string;
  time: string;
};

export type Race = {
  season: string;
  round: string;
  raceName: string;
  date: string;
  time?: string;

  Circuit: {
    circuitName: string;
    Location: {
      lat: string;
      long: string;
      locality: string;
      country: string;
    };
  };

  FirstPractice?: RaceSession;
  SecondPractice?: RaceSession;
  ThirdPractice?: RaceSession;

  Qualifying?: RaceSession;

  Sprint?: RaceSession;               // ← ADICIONADO
  SprintQualifying?: RaceSession;     // ← ADICIONADO
};
