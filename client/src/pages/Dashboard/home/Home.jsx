import { useCallback, useContext, useEffect, useState } from 'react';
import { fetchMusicsList } from '../../../api/apiClient';
import CustomPagination from '../../../components/layout/Pagination';
import CustomCard from '../../../components/shared/Card';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../store/AuthContext';

const Home = () => {
  const [musicData, setMusicData] = useState([])
  const navigate = useNavigate()
  const { artist } = useContext(AuthContext)
  const handleNavigation = useCallback((e) => navigate(`/dashboard/songs/${e.id}`), [navigate])

  const [meta, setMeta] = useState({
    offset: 1,
    limit: 100,
    total: musicData.length
  })

  useEffect(() => {
    fetchMusicsList(artist ? {
      artistId: artist.id
    } : {}).then((res) => {
      setMusicData(res.data.data)
      setMeta(res.data.meta)
    })
  }, [artist])

  return (
    <>
      <div className=" flex items-center justify-start">
        <div className="flex flex-wrap justify-start gap-6">
          {
            musicData.length > 0 && musicData.map(itm => <CustomCard key={itm.id}
              songData={itm}
              handleCardClick={handleNavigation}
            />
            )
          }
        </div>
      </div>
      <CustomPagination showSizeChanger={false} defaultCurrent={meta.offset === 0 ? 1 : meta.offset} total={meta.total} />
    </>
  )
};

export default Home;
