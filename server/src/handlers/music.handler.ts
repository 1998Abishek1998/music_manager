import { Request, Response } from 'express';
import instanceConfig from '../configs/instance.config';
import { BadRequestError } from '../utils/error';
import { formatDateOnly, newDate } from '../utils/date';
import cloudinaryConfig from '../configs/cloudinary.config';
import cloudinary from '../configs/cloudinary.config';

export const uploadMusicToCloudinary = async (req: Request, res: Response) => {


  if (!req.file) throw new BadRequestError('Please provide file')
  const fName = req.file.originalname.split('.')[0];

  const uploadAudio = await cloudinary.uploader.upload(req.file.path);

  res.status(200).json({ audioResponse: uploadAudio });
}

export const streamMusicFromCloudinary = async (req: Request, res: Response) => {
  try {
    const publicId = req.params.publicId;

    const streamUrl = cloudinaryConfig.url(publicId, {
      resource_type: 'video',
      secure: true
    });

    res.redirect(streamUrl);
  } catch (error) {
    console.error('Error streaming file to Cloudinary:', error);
    throw new BadRequestError(error)
  }
}

export const createMusic = async (req: Request, res: Response) => {
  instanceConfig.music.createMusic(req.body);
  res.status(201).json({
    message: 'Success'
  });
}


export const fetchMusicById = async (req: Request, res: Response) => {
  const musicId = parseInt(req.params.id);
  const music = await instanceConfig.music.getMusicById(musicId);

  if (!music) throw new BadRequestError('Music not found')
  const artist = await instanceConfig.artist.getArtistById(music.artist_id)
  if (!artist) throw new BadRequestError('Artist not found')

  res.json({
    data: {
      music: {
        ...music,
        created_at: formatDateOnly(music.created_at),
        updated_at: formatDateOnly(music.updated_at)
      },
      artist: {
        ...artist,
        created_at: formatDateOnly(artist.created_at),
        first_release_year: formatDateOnly(artist.first_release_year),
        updated_at: formatDateOnly(artist.updated_at),
      }
    },
    message: "Success"
  });
}

export const fetchMusicList = async (req: Request, res: Response) => {
  const music = await instanceConfig.music.fetchMusics({ ...req.query });

  const data = music.data.map(itm => ({
    ...itm,
    created_at: formatDateOnly(itm.created_at),
    updated_at: formatDateOnly(itm.updated_at)
  }))

  res.json({
    data: {
      data,
      meta: music.meta
    },
    message: 'Success'
  })
}

export const updateMusic = async (req: Request, res: Response) => {
  const musicId = parseInt(req.params.id);
  await instanceConfig.music.updateMusic(musicId, req.body);

  res.status(201).json({
    message: 'Success'
  });

}

export const deleteMusic = async (req: Request, res: Response) => {
  const musicId = parseInt(req.params.id);
  await instanceConfig.music.deleteMusic(musicId);
  res.status(200).json({ message: 'Success' });
}
