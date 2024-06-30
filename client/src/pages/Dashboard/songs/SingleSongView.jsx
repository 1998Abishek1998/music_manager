import { useCallback, useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { fetchSingleMusic } from '../../../api/apiClient'
import { Card, Col, List, Row, Typography } from 'antd'
import MusicUploader from './MusicUploader';
import MusicPlayer from './MusicPlayer';
import { AuthContext } from '../../../store/AuthContext';
const { Title, Text } = Typography;

const cardStyle = {
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
};

const titleStyle = {
  marginBottom: '20px',
  textAlign: 'center',
  fontWeight: 'bold'
};

const containerStyle = {
  padding: '40px',
  backgroundColor: '#f0f2f5',
  minHeight: 'calc(100vh - 200px)'
};

const SingleSongView = () => {
  const location = useLocation()
  const [data, setData] = useState(null)
  const [reload, setReload] = useState(false)
  const { userId, roleId } = useContext(AuthContext)
  const [playerError, setPlayerError] = useState(null)

  const setErr = useCallback((err) => setPlayerError(err), [])
  const setRel = useCallback((rel) => setReload(rel), [])

  const navigate = useNavigate()

  useEffect(() => {
    fetchSingleMusic(location.pathname.split('/')[3]).then((res) => {
      if (roleId === 3 && userId !== res.data.artist.user_id) navigate('/dashboard/songs')
      setData(res.data)
    })
  }, [location, navigate, reload, roleId, userId])

  const renderListItem = (label, value) => (
    <List.Item>
      <Text strong>{label}: </Text>
      <Text>{value}</Text>
    </List.Item>
  );
  return (
    <>
      {
        data ?
          <div style={containerStyle}>
            <Title level={2} style={titleStyle}>{data.artist.name}`s  Music</Title>
            <Row gutter={[16, 16]}>
              <Col xs={24} md={12}>
                <Card title="Music Information" bordered={false} style={cardStyle}>
                  <List>
                    {renderListItem("Title", data.music.title)}
                    {renderListItem("Album Name", data.music.album_name)}
                    {renderListItem("Genre", data.music.genre)}
                    {renderListItem("Created At", data.music.created_at)}
                    {renderListItem("Updated At", data.music.updated_at)}
                  </List>
                  {
                    data.music.public_id && !playerError ?
                      <MusicPlayer publicId={data.music.public_id} title={data.music.title} id={Number(location.pathname.split('/')[3])} setPlayerError={setErr} /> :
                      <MusicUploader id={Number(location.pathname.split('/')[3])} setReload={setRel} reload={reload} />
                  }
                </Card>
              </Col>
              <Col xs={24} md={12}>
                <Card title="Artist Information" bordered={false} style={cardStyle}>
                  <List>
                    {renderListItem("Name", data.artist.name)}
                    {renderListItem("Date of Birth", new Date(data.artist.dob).toLocaleDateString())}
                    {renderListItem("First Release Year", data.artist.first_release_year)}
                    {renderListItem("Gender", data.artist.gender === 'f' ? "Female" : data.artist.gender === 'm' ? "Male" : "Others")}
                    {renderListItem("Address", data.artist.address)}
                    {renderListItem("Created At", data.artist.created_at)}
                    {renderListItem("Updated At", data.artist.updated_at)}
                  </List>
                </Card>
              </Col>
            </Row>
          </div> :
          <></>
      }
    </>
  )

}

export default SingleSongView
