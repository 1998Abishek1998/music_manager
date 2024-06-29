import { Request, Response } from 'express';
import instanceConfig from '../configs/instance.config';
import { ArtistCreatePayload, UserCreatePayload, UserUpdatePayload } from '../schemas/create-update.schema';
import { hashPassword } from '../utils/hash';
import { Role } from '../models/users.model';

const { users } = instanceConfig
export const createUser = async (req: Request, res: Response) => {

  const body = req.body
  const hashedPass = await hashPassword(req.body.password)
  const newPayload: UserCreatePayload = {
    ...body,
    password: hashedPass
  }

  let artist = undefined
  if (body.role_id === Role.ARTIST) artist = {
    dob: body.dob,
    address: body.address,
    name: body.first_name.trim() + ' ' + body.last_name.trim(),
    first_release_year: body.dob,
    gender: body.gender
  } as ArtistCreatePayload

  await users.createUsers(newPayload, artist)

  res.json({ message: 'Sucessfully created user' })
}

export const fetchUser = async (req: Request, res: Response) => {

  const id = req.params
  const { data } = await users.fetchUsers({ id: +id, limit: 1 })

  res.json({ message: 'Sucessfully fetched user', data: data[0] })
}

export const fetchUsers = async (req: Request, res: Response) => {

  const data = await users.fetchUsers({ ...req.query })

  res.json({ message: 'Sucessfully fetched user', data })
}


export const updateUser = async (req: Request, res: Response) => {
  const body: UserUpdatePayload = req.body

  const { id } = req.params

  console.log(+id, body)
  await users.updateUsers(body, +id)

  res.json({ message: 'Sucessfully updated user' })
}


export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params

  await users.deleteUser(+id)

  res.json({ message: 'Successfully deleted user.' })
}
