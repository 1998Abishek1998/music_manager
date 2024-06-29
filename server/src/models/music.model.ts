import { DB } from '../configs/db.config';
import { MusicCreatePayload, MusicUpdatePayload } from '../schemas/create-update.schema';
import { Genre } from '../types/database.types';
import { newDate } from '../utils/date';
import { paginateResponse, PaginationFilter } from '../utils/pagination';

class MusicModel {
  private static instance: MusicModel;
  static db: DB;

  constructor(db: DB) {
    if (MusicModel.instance) return MusicModel.instance;

    MusicModel.db = db;
    MusicModel.instance = this;
  }


  async fetchMusics(filter: FetchMusicFilter) {
    let query = MusicModel.db.selectFrom('musics as m')
      .leftJoin('artists as a', 'a.id', 'm.artist_id');

    if (filter.id) query = query.where('m.id', '=', filter.id);
    if (filter.ids) query = query.where('m.id', 'in', filter.ids);
    if (filter.artistId) query = query.where('m.artist_id', '=', filter.artistId);
    if (filter.genre) query = query.where('m.genre', '=', filter.genre);

    const resQuery = query

    if (filter.limit) query = query.limit(filter.limit);
    if (filter.offset) query = query.offset(filter.offset);

    const [result, count] = await Promise.all([
      query.select([
        'm.id',
        'm.artist_id',
        'm.title',
        'm.album_name',
        'm.genre',
        'a.name',
        'm.created_at',
        'm.updated_at'
      ]).execute(),
      resQuery.select((eb) => eb.fn.count<number>('m.id').as('count')).executeTakeFirst()
    ])

    return paginateResponse(result, filter.offset ? Number(filter.offset) : 0, filter.limit ? Number(filter.limit) : 0, Number(count?.count));
  }

  async createMusic(data: MusicCreatePayload) {
    await MusicModel.db.insertInto('musics').values({
      ...data,
      created_at: newDate(),
      updated_at: newDate()
    })
      .execute();
  }

  async getMusicById(id: number) {
    return await MusicModel.db.selectFrom('musics').selectAll().where('id', '=', id).executeTakeFirst();
  }

  async updateMusic(id: number, data: MusicUpdatePayload) {
    await MusicModel.db.updateTable('musics')
      .set(data)
      .where('id', '=', +id)
      .execute();
  }

  async deleteMusic(id: number) {
    await MusicModel.db.deleteFrom('musics').where('id', '=', id).execute();
  }

  uploadSongSuccess(id: number, data: { public_id: string, secure_url: string }) {
    return MusicModel.db.updateTable('musics').set(data).where('id', '=', id).execute()
  }
}

interface FetchMusicFilter extends PaginationFilter {
  id?: number;
  ids?: number[];
  artistId?: number;
  genre?: Genre;
}


export default MusicModel;
