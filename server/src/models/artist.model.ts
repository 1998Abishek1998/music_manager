import { DB } from '../configs/db.config'
import { ArtistCreatePayload, ArtistUpdatePayload } from '../schemas/create-update.schema'
import { ArtistDb, Gender } from '../types/database.types'
import { newDate } from '../utils/date'
import { paginateResponse, PaginationFilter } from '../utils/pagination'

class ArtistModel {
  private static instance: ArtistModel
  static db: DB

  constructor(db: DB) {
    if (ArtistModel.instance) return ArtistModel.instance

    ArtistModel.db = db
    ArtistModel.instance = this
  }

  async fetchArtists(filter: FetchArtistFilter) {
    let query = ArtistModel.db.selectFrom('artists');

    if (filter.id) query = query.where('id', '=', filter.id);
    if (filter.ids) query = query.where('id', 'in', filter.ids);
    if (filter.name) query = query.where('name', '=', filter.name);
    if (filter.gender) query = query.where('gender', '=', filter.gender);
    if (filter.query) query = query.where('name', 'like', `%${filter.query}%`)

    const resQuery = query

    if (filter.limit) query = query.limit(filter.limit);
    if (filter.offset) query = query.offset(filter.offset);

    const [result, count] = await Promise.all([
      query.select([
        'id',
        'name',
        'dob',
        'first_release_year',
        'gender',
        'address',
        'created_at',
        'updated_at'
      ]).execute(),
      resQuery.select((eb) => eb.fn.count<number>('id').as('count')).executeTakeFirst()
    ])

    return paginateResponse(result, filter.offset ? Number(filter.offset) : 0, filter.limit ? Number(filter.limit) : 0, Number(count?.count));
  }

  createArtistByCsv(data: any[]) {
    return ArtistModel.db.insertInto('artists').values(data).execute()
  }

  async getArtistById(id: number) {
    return await ArtistModel.db.selectFrom('artists')
      .selectAll()
      .where('id', '=', id)
      .executeTakeFirst();
  }

  async updateArtist(id: number, data: ArtistUpdatePayload) {
    await ArtistModel.db.updateTable('artists')
      .set(data)
      .where('id', '=', id)
      .execute();
  }

  deleteArtist(id: number) {
    return ArtistModel.db.transaction().execute(async trx => {
      const artist = await trx.selectFrom('artists')
        .selectAll()
        .where('id', '=', id)
        .executeTakeFirst();

      if (artist) {
        await trx.deleteFrom('artists')
          .where('id', '=', id)
          .execute();

        await trx.deleteFrom('users').where('id', '=', artist?.user_id).execute()
      }
    })
  }

}

interface FetchArtistFilter extends PaginationFilter {
  id?: number;
  ids?: number[];
  name?: string;
  gender?: Gender;
  firstReleaseYear?: string;
}

export default ArtistModel
