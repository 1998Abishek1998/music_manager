import { UserDb } from '../types/database.types'
import { paginateResponse, PaginationFilter } from '../utils/pagination'
import { ArtistCreatePayload, UserCreatePayload, UserUpdatePayload } from '../schemas/create-update.schema'
import { newDate } from '../utils/date'
import { DB } from '../configs/db.config'
import { hashPassword, verifyPassword } from '../utils/hash'
import { handleDBError } from '../utils/handle-db.error'

class UserModel {
  private static instance: UserModel
  static db: DB

  constructor(db: DB) {
    if (UserModel.instance) return UserModel.instance

    UserModel.db = db
    UserModel.instance = this
  }

  async validateUser(key: LoginKey, keyVal: string, password: string) {
    const user = await UserModel.db.selectFrom('users')
      .selectAll()
      .where(key, '=', keyVal)
      .where('status', '=', Status.ACTIVE)
      .executeTakeFirst();

    if (user && await verifyPassword(user.password, password)) {
      return user
    }
    return null;
  }

  async fetchUsers(filter: FetchUserFiler) {
    let query = UserModel.db.selectFrom('users')

    if (filter.id) query = query.where('id', '=', filter.id)
    if (filter.ids) query = query.where('id', 'in', filter.ids)
    if (filter.status) query = query.where('status', '=', filter.status)

    const resQuery = query

    if (filter.limit) query = query.limit(filter.limit);
    if (filter.offset) query = query.offset(filter.offset);

    const [result, count] = await Promise.all([
      query.select([
        'address',
        'created_at',
        'dob',
        'email',
        'first_name',
        'last_name',
        'id',
        'gender',
        'status',
        'phone',
        'role_id',
        'updated_at'
      ]).execute(),
      resQuery.select((eb) => eb.fn.count<number>('id').as('count')).executeTakeFirst()
    ])

    return paginateResponse(result, filter.offset ? Number(filter.offset) : 0, filter.limit ? Number(filter.limit) : 0, Number(count?.count))
  }

  async createUsers(payload: UserCreatePayload, artist?: ArtistCreatePayload) {
    const hashPas = await hashPassword(payload.password)
    const date = newDate()

    return UserModel.db.transaction().execute(async tx => {
      const ids = await tx.insertInto('users').values({
        address: payload.address,
        role_id: payload.role_id,
        last_name: payload.last_name,
        first_name: payload.first_name,
        dob: payload.dob,
        email: payload.email,
        password: hashPas,
        phone: payload.phone,
        gender: payload.gender,
        status: payload.status,
        created_at: date,
        updated_at: date,
      }).returning('id').execute()

      console.log(artist, ids)
      if (payload.role_id === Role.ARTIST && artist && ids[0].id) {
        await tx.insertInto('artists').values({
          name: artist.name,
          gender: artist.gender,
          user_id: Number(ids[0].id),
          dob: artist.dob,
          address: artist.address,
          first_release_year: artist.first_release_year,
          created_at: date,
          updated_at: date,
        }).execute()
      }
    }).catch(handleDBError)
  }

  updateUsers(payload: UserUpdatePayload, id: number) {
    return UserModel.db.updateTable('users')
      .set(payload)
      .where('id', '=', id)
      .execute()
  }

  fetchArtistByUser(id: number) {
    return UserModel.db.selectFrom('artists')
      .where('user_id', '=', id)
      .selectAll()
      .executeTakeFirst()
  }

  deleteUser(id: number) {
    return UserModel.db.transaction().execute(async trx => {
      const artist = await trx.selectFrom('artists').where('user_id', '=', id).select('id').executeTakeFirst()
      if (artist) await trx.deleteFrom('artists').where('id', '=', artist.id).execute()

      await trx.deleteFrom('users')
        .where('id', '=', id)
        .execute();
    })

  }

}

export interface FetchUserFiler extends PaginationFilter {
  id?: number
  ids?: number[]
  status?: Status
}

export enum LoginKey {
  EMAIL = 'email',
  PHONE = 'phone',
}

export enum Status {
  ACTIVE = 'active',
  INACTIVE = 'inactive'
}

export type SimpleUser = Omit<UserDb, 'password'>;

export enum Role {
  ARTIST = 3,
  ARTIST_MANAGER = 2,
  SUPER_ADMIN = 1,
}

export default UserModel
