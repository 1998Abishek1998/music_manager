import ArtistModel from '../models/artist.model'
import MusicModel from '../models/music.model'
import UserModel from '../models/users.model'
import Attachments from '../utils/attachments'
import { db } from './db.config'

const InstanceConfig = () => {
  const attachment = new Attachments()
  const users = new UserModel(db)
  const artist = new ArtistModel(db)
  const music = new MusicModel(db)

  return {
    attachment,
    users,
    artist,
    music
  }
}


export default InstanceConfig()
