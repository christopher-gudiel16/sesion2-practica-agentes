export interface UserName {
  title: string;
  first: string;
  last: string;
}

export interface UserLocation {
  street: { number: number; name: string };
  city: string;
  state: string;
  country: string;
  postcode: string;
}

export interface UserDob {
  date: string;
  age: number;
}

export interface UserPicture {
  large: string;
  medium: string;
  thumbnail: string;
}

export interface User {
  name: UserName;
  email: string;
  phone: string;
  cell: string;
  dob: UserDob;
  location: UserLocation;
  picture: UserPicture;
}

export interface UserApiResponse {
  results: User[];
}
