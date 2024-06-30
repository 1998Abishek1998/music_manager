import { useCallback, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { fetchSingleArtist } from '../../../api/apiClient'
import CustomCard from '../../../components/shared/Card'

const SingleArtistView = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const handleNavigation = useCallback((e) => navigate(`/dashboard/songs/${e.id}`), [navigate])

  const [musicData, setMusicData] = useState([])

  useEffect(() => {
    if (location.state) {
      fetchSingleArtist(location.state, { getSongs: true })
        .then((res) => {
          setMusicData(res.data.musics)
        })
    } else navigate('/dashboard/artists')
  }, [location, navigate])

  return (
    <>

      <div className=" flex items-center justify-start">
        <div className="flex flex-wrap justify-start gap-6">
          {
            musicData.length > 0 && musicData.map(itm => <CustomCard key={itm.id} songData={itm} handleCardClick={handleNavigation} />
            )
          }
        </div>
      </div>
    </>
  )
}

export default SingleArtistView
