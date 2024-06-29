import PropTypes from 'prop-types'
import { Card } from 'antd';

const { Meta } = Card;

const CustomCard = ({ songData, handleCardClick }) => (
  <Card
    onClick={() => handleCardClick(songData)}
    hoverable
    style={{
      width: 240,
    }}
    cover={<img alt="example" src="https://cdn.pixabay.com/photo/2023/02/16/03/43/music-player-7792956_1280.jpg" />}
  >
    <Meta title={songData?.title || 'title'} description={`${songData?.genre || 'Genre'} - ${songData?.album_name || 'album'}`} />
  </Card>

);

CustomCard.propTypes = {
  songData: PropTypes.object,
  handleCardClick: PropTypes.func
}

export default CustomCard;
