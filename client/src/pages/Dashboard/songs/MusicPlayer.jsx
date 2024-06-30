import ReactAudioPlayer from 'react-audio-player';
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react';
import { imageStreamUrl } from '../../../api/apiClient';

const MusicPlayer = ({ id, title, publicId }) => {
  const [src, setSrc] = useState('');

  useEffect(() => {
    const fetchAudio = async () => {
      try {
        const blob = await imageStreamUrl(id, publicId);
        const audioUrl = URL.createObjectURL(blob);
        setSrc(audioUrl);
      } catch (error) {
        console.error('Error fetching audio:', error);
      }
    };

    fetchAudio();
  }, [id, publicId]);

  return (<>
    <div className='flex items-center justify-between'>
      <div className='font-bold'>
        Play Music {publicId} :
      </div>
      <ReactAudioPlayer
        src={src}
        controls
        title={title}
      />
    </div>
  </>
  );
};

MusicPlayer.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  publicId: PropTypes.string
}

export default MusicPlayer
