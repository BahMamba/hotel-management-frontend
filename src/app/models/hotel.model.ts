import { User } from './user.model'; 

export interface Hotel {
  id?: number; 
  name: string;
  address: string;
  city: string;
  description?: string; 
  adminUser?: User; 
}

export interface Page<T> {
  _embedded: {
    hotelList: T[];
  };
  page: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  };
}

