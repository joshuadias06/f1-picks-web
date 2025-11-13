export type Race = {
    raceName: string;
    date: string;
    Circuit: {
      circuitName: string;
      Location: {
        country: string;
        locality: string;
      };
    };
  };
  