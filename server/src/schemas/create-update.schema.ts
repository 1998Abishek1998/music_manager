import { Status } from '../models/users.model';
import { Gender, Genre } from '../types/database.types';
import { isValidEmail, isValidMobileNumber, isValidPassword } from '../utils/validators';
import z, { date } from '../utils/zod'

const RoleCreateSchema = z.object({
  role_name: z.string().max(50),
});

const UserCreateSchema = z.object({
  first_name: z.string().max(50),
  last_name: z.string().max(50),
  email: z.string().refine(isValidEmail),
  password: z.string().refine(isValidPassword),
  phone: z.string().refine(isValidMobileNumber),
  dob: date(),
  artist_release_date: date().optional(),
  role_id: z.number(),
  status: z.nativeEnum(Status),
  gender: z.nativeEnum(Gender),
  address: z.string().max(50),
}).refine(({ artist_release_date, role_id }) => {
  if (role_id === 3 && artist_release_date) return true;
  if (role_id !== 3) return true;
  else return false;
}, {
  message: 'Please provide artist release date if role_id is 3.',
  path: ['artist_release_date'],
});

const ArtistCreateSchema = z.object({
  name: z.string().max(50),
  dob: date(),
  first_release_year: date(),
  gender: z.nativeEnum(Gender),
  address: z.string().max(50),
});

const MusicCreateSchema = z.object({
  artist_id: z.number({ 'required_error': 'Please choose an artist' }),
  title: z.string().max(50),
  album_name: z.string().max(15),
  genre: z.nativeEnum(Genre),
});

type UserCreatePayload = z.infer<typeof UserCreateSchema>;
type ArtistCreatePayload = z.infer<typeof ArtistCreateSchema>;
type MusicCreatePayload = z.infer<typeof MusicCreateSchema>;
type RoleCreatePayload = z.infer<typeof RoleCreateSchema>;

const RoleUpdateSchema = RoleCreateSchema.partial();
const ArtistUpdateSchema = ArtistCreateSchema.partial();
const MusicUpdateSchema = MusicCreateSchema.partial();

const UserCreateSchemaInner = UserCreateSchema.innerType();
const UserUpdateSchema = UserCreateSchemaInner.omit({ password: true, role_id: true }).partial();


type UserUpdatePayload = z.infer<typeof UserUpdateSchema>;
type ArtistUpdatePayload = z.infer<typeof ArtistUpdateSchema>;
type MusicUpdatePayload = z.infer<typeof MusicUpdateSchema>;
type RoleUpdatePayload = z.infer<typeof RoleUpdateSchema>;


export {
  RoleUpdatePayload,
  MusicUpdatePayload,
  UserUpdatePayload,
  ArtistUpdatePayload,
  RoleCreatePayload,
  UserCreatePayload,
  ArtistCreatePayload,
  MusicCreatePayload,
  RoleCreateSchema,
  UserCreateSchema,
  MusicCreateSchema,
  ArtistCreateSchema,
  ArtistUpdateSchema,
  RoleUpdateSchema,
  UserUpdateSchema,
  MusicUpdateSchema
};
