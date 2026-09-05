export interface Address {
  street: string;
  city: string;
  country: string;
  postalCode?: string;
}

export interface Amenity {
  amenityId: number;
  name: string;
  icon?: string;
}

export interface User {
  userId: string;
  email: string;
  username: string;
  roles: string[];
}

export interface AuthResponse {
  token: string;
  userId: string;
  email: string;
  username: string;
  roles: string[];
  expiresAt: string;
}

export interface BookableUnit {
  id: string;
  name: string;
  description: string;
  photos: string[];
  basePricePerNight: number;
  capacity: number;
  rules?: string;
  amenities?: Amenity[];
}

export interface Hotel {
  hotelId: string;
  name: string;
  description: string;
  address: Address;
  photos: string[];
  starRating: number;
  rooms?: Room[];
  providerId?: string;
}

export interface Room extends BookableUnit {
  hotelId?: string;
  riadId?: string;
  hostelId?: string;
}

export interface Dorm extends BookableUnit {
  hostelId: string;
}

export interface Hostel {
  hostelId: string;
  name: string;
  description: string;
  address: Address;
  photos: string[];
  dorms?: Dorm[];
  privateRooms?: Room[];
  providerId?: string;
}

export interface Riad {
  riadId: string;
  name: string;
  description: string;
  address: Address;
  photos: string[];
  rooms?: Room[];
  providerId?: string;
}

export interface StandaloneAccommodation extends BookableUnit {
  address: Address;
  status: number | string;
  providerId: string;
  type?: string;
}

export interface Appartement extends StandaloneAccommodation {
  floorNumber?: number;
}

export interface Villa extends StandaloneAccommodation {
  isDetached?: boolean;
}

export interface Cottage extends StandaloneAccommodation {
  hasFireplace?: boolean;
}

export interface Booking {
  bookingId: string;
  unitType: "accommodation" | "room" | "dorm";
  unitId: string;
  checkInDate: string;
  checkOutDate: string;
  numberOfGuests: number;
  totalPrice: number;
  status: string;
}
