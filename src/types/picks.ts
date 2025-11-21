export type Driver = {
  name: string;
  odd: number;
  avatar: string;
  team: string;
};

export type QualifyingSlots = {
  P1: Driver | null;
  P2: Driver | null;
  P3: Driver | null;
};

export type GPSlots = {
  GP1: Driver | null;
  GP2: Driver | null;
  GP3: Driver | null;
};

export type SprintSlots = {
  S1: Driver | null;
  S2: Driver | null;
  S3: Driver | null;
};
