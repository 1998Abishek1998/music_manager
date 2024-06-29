import { Status } from '../models/users.model';

export interface Database {
  roles: RoleDb
  users: UserDb
  artists: ArtistDb
  musics: MusicDb
}


export interface RoleDb {
  id: number;
  role_name: string;
}

export interface UserDb {
  id?: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone: string;
  status: Status
  dob: string;
  role_id: number;
  gender: Gender;
  address: string;
  created_at: string;
  updated_at: string;
}

export interface ArtistDb {
  id?: number;
  user_id: number
  name: string;
  dob: string;
  first_release_year: string;
  gender: Gender;
  address: string;
  created_at: string;
  updated_at: string;
}

export interface MusicDb {
  id?: number;
  artist_id: number;
  title: string;
  album_name: string;
  public_id?: string
  secure_url?: string
  genre: Genre;
  created_at: string;
  updated_at: string;
}

export enum Gender {
  MALE = 'm',
  FEMALE = 'f',
  OTHERS = 'o'
}

export enum Genre {
  RNB = 'rnb',
  COUNTRY = 'country',
  CLASSIC = 'classic',
  ROCK = 'rock',
  JAZZ = 'jazz'
}
