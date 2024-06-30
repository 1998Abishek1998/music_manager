import { Request, Response } from 'express';
import { LoginKey, Role } from '../models/users.model';
import { isValidEmail, isValidPhoneNumber } from '../utils/validators';
import { BadRequestError, ValidationFailedError } from '../utils/error';
import instanceConfig from '../configs/instance.config';
import { generateToken } from '../utils/jwt';
import { ArtistCreatePayload, UserCreatePayload } from '../schemas/create-update.schema';

export const LoginUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const { users } = instanceConfig

  console.log('User Login started.');

  let key: LoginKey;
  if (isValidEmail(username)) {
    key = LoginKey.EMAIL;
  } else if (isValidPhoneNumber(username)) {
    key = LoginKey.PHONE;
  } else throw new BadRequestError('invalid key')

  const user = await users.validateUser(key, username, password);
  if (!user) {
    throw new ValidationFailedError('login failed', {
      'username': ['invalid credentials'],
      'password': ['invalid credentials'],
    });
  }

  let artist = null

  if (user.role_id === 3) {
    artist = await users.fetchArtistByUser(user.id || 0)
  }

  const token = generateToken({ userId: user.id ? user.id : 0 }, user.role_id);
  res.json({
    message: `Welcome ${user.first_name}`,
    token,
    data: {
      userId: user.id,
      roleId: user.role_id,
      fullName: user.first_name + ' ' + user.last_name,
      email: user.email,
      gender: user.gender,
      phone: user.phone,
      createdAt: user.created_at,
      artist: artist
    }
  })
}

export const RegisterUser = async (req: Request, res: Response) => {
  const { users } = instanceConfig
  const body: UserCreatePayload = req.body

  let artist = undefined
  if (body.role_id === Role.ARTIST) artist = {
    dob: body.dob,
    address: body.address,
    name: body.first_name.trim() + ' ' + body.last_name.trim(),
    first_release_year: body.dob,
    gender: body.gender
  } as ArtistCreatePayload
  await users.createUsers(body, artist)

  res.json({ message: 'Sucessfully created user, Please Login to Continue.' })
}
