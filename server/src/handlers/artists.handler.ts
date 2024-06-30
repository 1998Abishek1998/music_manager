import { Request, Response } from 'express';
import instanceConfig from '../configs/instance.config';
import { BadRequestError } from '../utils/error';
import { formatDateOnly } from '../utils/date';
import { createObjectCsvStringifier } from 'csv-writer';
import csvParser from 'csv-parser';
import { Gender } from '../types/database.types';
import fs from 'fs';

export const fetchArtist = async (req: Request, res: Response) => {

  const artistId = parseInt(req.params.id);
  const { artist, music } = instanceConfig

  const artists = await artist.getArtistById(artistId);
  if (!artists) throw new BadRequestError('Artist not found');

  const query = req.query

  let musics: any[] = []
  let meta = {
    total: 0,
    limit: 0,
    offset: 0
  }
  if (query && query.getSongs && query.getSongs === 'true') {
    const songs = await music.fetchMusics({ artistId: artistId })
    musics = songs.data.map(itm => ({
      ...itm,
      created_at: formatDateOnly(itm.created_at),
      updated_at: formatDateOnly(itm.updated_at)
    }))
    meta = songs.meta
  }

  res.json({
    data: {
      artist: {
        ...artists,
        created_at: formatDateOnly(artists.created_at),
        updated_at: formatDateOnly(artists.updated_at)
      },
      musics: musics.length && musics || [],
      meta: meta
    }
  });
}

export const getArtistCsvData = async (req: Request, res: Response) => {

  const { artist } = instanceConfig

  const artists = await artist.fetchArtists({ ...req.query });
  const data = artists.data.map(itm => ({
    ...itm,
    gender: itm.gender === Gender.MALE ? "Male" : itm.gender === Gender.FEMALE ? "Female" : "Others",
    created_at: formatDateOnly(itm.created_at),
    updated_at: formatDateOnly(itm.updated_at),
    first_release_year: formatDateOnly(itm.first_release_year)
  }))

  const csvStringifier = createObjectCsvStringifier({
    header: [
      { id: 'id', title: 'id' },
      { id: 'name', title: 'name' },
      { id: 'dob', title: 'dob' },
      { id: 'gender', title: 'gender' },
      { id: 'first_release_year', title: 'first_release_year' },
      { id: 'address', title: 'address' },
      { id: 'created_at', title: 'created_At' },
      { id: 'updated_at', title: 'updated_At' },
    ]
  });

  const header = csvStringifier.getHeaderString();
  const records = csvStringifier.stringifyRecords(data);

  const csvContent = header + records;

  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename="data.csv"');

  res.send(csvContent);
}

export const uploadCsv = async (req: Request, res: Response) => {
  if (!req.file) throw new BadRequestError('File not found..')
  const results: any[] = [];
  try {

    fs.createReadStream(req.file.path)
      .pipe(csvParser())
      .on('data', (data: any) => results.push(data))
      .on('end', async () => {
        if (!req.file) return new BadRequestError('File not found.')
        fs.unlinkSync(req?.file.path);
        return res.status(200).json({ message: 'CSV file uploaded and processed successfully' });
      });
  } catch (error) {
    console.error('Error uploading CSV:', error);
    res.status(500).json({ message: 'Invalid details provided.' });
  }

  if (results.length > 0)
    await instanceConfig.artist.createArtistByCsv(results);
};


export const fetchArtistList = async (req: Request, res: Response) => {

  const { artist } = instanceConfig

  const artists = await artist.fetchArtists({ ...req.query });
  const data = artists.data.map(itm => ({
    ...itm,
    created_at: formatDateOnly(itm.created_at),
    updated_at: formatDateOnly(itm.updated_at)
  }))

  res.json({
    data: {
      data,
      meta: artists.meta
    },
    message: 'Success'
  });
}

export const updateArtist = async (req: Request, res: Response) => {

  const artistId = parseInt(req.params.id);
  const { artist } = instanceConfig
  await artist.updateArtist(artistId, req.body);
  res.status(201).json({
    message: 'Success'
  });

}


export const deleteArtist = async (req: Request, res: Response) => {

  const artistId = parseInt(req.params.id);
  const { artist } = instanceConfig

  await artist.deleteArtist(artistId);
  res.status(204).end();
}
