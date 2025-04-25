export interface Room {
    id: number;
    roomNumber: string;
    type: string;
    price: number;
    available: boolean;
    hotel: {
      id: number;
      name: string;
      address: string;
      city: string;
    };
  }