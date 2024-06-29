import { Form } from 'antd';
import { useErrorNotify } from '../../../hooks/useError';
import { useSuccessNotify } from '../../../hooks/useSuccess';
import { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import PlainButton from '../../../components/forms/Button';
import CustomModal from '../../../components/shared/CustomModal';
import CustomTable from '../../../components/shared/CustomTable';
import { createSong, deleteMusic, fetchArtistsList, fetchMusicsList, updateMusic } from '../../../api/apiClient';
import CreateSongForm from './CreateSongForm';
import CustomSearch from '../../../components/forms/CustomSearch';
import {
  EditOutlined,
  DeleteOutlined,
  EyeFilled
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../store/AuthContext';

const Songs = () => {

  const successNotify = useSuccessNotify();
  const errorNotify = useErrorNotify();

  const { artist } = useContext(AuthContext)

  const [form] = Form.useForm();
  const [updateForm] = Form.useForm();
  const timerDebounceRef = useRef();

  const navigate = useNavigate()

  const [callAgain, setCallAgain] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [options, setOptions] = useState([])
  const [artistId, setArtistId] = useState(null)
  const [isDeleteModelOpen, setIsDeleteModelOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null)

  const createModalToggler = useCallback(() => {
    setIsModalOpen(!isModalOpen)
  }, [isModalOpen])

  const updateModalToggler = useCallback(() => {
    setIsUpdateModalOpen(!isUpdateModalOpen)
  }, [isUpdateModalOpen])

  const toggleDeleteModal = useCallback(() => setIsDeleteModelOpen(!isDeleteModelOpen), [isDeleteModelOpen])

  const handleDeleteButtonClick = useCallback((row) => {
    setSelectedData(row)
    toggleDeleteModal()
  }, [toggleDeleteModal])


  const handleEditButtonClick = useCallback((row) => {
    updateForm.setFieldsValue({
      'title': row.title,
      'album_name': row.album_name,
      'genre': row.genre,
    })
    setSelectedData(row)
    setIsUpdateModalOpen(true)
  }, [updateForm])

  const handleViewNavigation = useCallback((row) => {
    navigate(`/dashboard/songs/${row.id}`)
  }, [navigate])

  useEffect(() => {
    if (artist && artist.id) setArtistId(artist.id)
  }, [artist])

  const columns = useMemo(() => [
    {
      title: 'Title',
      dataIndex: 'title',
      width: '20%',
    },
    {
      title: 'Genre',
      dataIndex: 'genre',
      width: '20%',
    },
    {
      title: 'Album Name',
      dataIndex: 'album_name',
    },
    {
      title: 'Artist Name',
      dataIndex: 'name'
    },
    {
      title: 'Created Date',
      dataIndex: 'created_at',
    },
    {
      title: 'Actions',
      width: '15%',
      render: (row) => {
        return (
          <div className='flex justify-between items-center'>
            <PlainButton size="sm" onClick={() => handleViewNavigation(row)}>
              <EyeFilled />
            </PlainButton>
            <PlainButton size="sm" onClick={() => handleEditButtonClick(row)}>
              <EditOutlined />
            </PlainButton>
            <PlainButton size="sm" danger onClick={() => handleDeleteButtonClick(row)}>
              <DeleteOutlined />
            </PlainButton>
          </div>
        )
      }
    }
  ], [handleDeleteButtonClick, handleEditButtonClick, handleViewNavigation])

  const onFinish = useCallback((values) => {
    if (!artistId) errorNotify({ description: 'Please Select artist' })
    else {
      createSong({
        ...values,
        artist_id: artistId
      })
        .then(() => {
          successNotify({
            description: ' Created new user.'
          })
          form.resetFields();
          setCallAgain(!callAgain)
          setArtistId(null)
          createModalToggler()
        })
        .catch(err => {
          errorNotify({
            description: err.message,
            error: err
          })
        })
    }
  }, [artistId, callAgain, createModalToggler, errorNotify, form, successNotify]);

  const handleOk = useCallback(() => {
    form
      .validateFields()
      .then((values) => {
        onFinish(values)
      }).catch((err) => console.log('Vaidation', err))
  }, [form, onFinish]);

  const onUpdateFinish = useCallback((values) => {
    updateMusic({
      ...values,
      artist_id: selectedData.artist_id
    }, selectedData.id)
      .then(() => {
        successNotify({
          description: 'Update Song.'
        })
        form.resetFields();
        updateModalToggler()
        setCallAgain(!callAgain)
      })
      .catch(err => {
        errorNotify({
          description: err.message,
          error: err
        })
      })
  }, [selectedData, callAgain, updateModalToggler, errorNotify, form, successNotify]);

  const handleUpdateOk = useCallback(() => {
    updateForm
      .validateFields()
      .then((values) => {
        onUpdateFinish(values)
      }).catch((err) => console.log('Vaidation', err))
  }, [onUpdateFinish, updateForm]);

  const onSearchSelect = useCallback((e, data) => {
    setArtistId(data.key)
  }, [])

  const onHandleSearch = useCallback((e) => {
    if (e.length > 0) {
      if (timerDebounceRef.current) clearTimeout(timerDebounceRef.current);
      timerDebounceRef.current = setTimeout(() => {
        fetchArtistsList({ query: e })
          .then((result) => {
            if (result.data.data) {
              const itms = result.data.data.map(itm => ({
                label: itm.name,
                value: itm.name,
                key: itm.id
              }))
              setOptions(itms)
            }
            else setOptions([])
          })
          .catch(err => console.log(err))
      }, 500);
    }
  }, [])

  const handleDeleteOk = useCallback(() => {
    deleteMusic(selectedData.id).then(() => {
      setCallAgain(!callAgain)
      toggleDeleteModal()
      setSelectedData(null)
      successNotify({ message: 'Success', description: 'Deleted song success.' })
    }).catch(err => {
      errorNotify({
        description: err.message,
        error: err
      })
    })
  }, [callAgain, errorNotify, selectedData, successNotify, toggleDeleteModal])

  return (
    <>
      <div className='flex justify-end m-2'>
        <PlainButton onClick={createModalToggler}> Add Music</PlainButton>
      </div>
      <CustomModal
        title='Create Music'
        isOpen={isModalOpen}
        handleOk={handleOk}
        handleCancel={createModalToggler}
      >
        {
          !artist &&
          <div className='m-3 flex justify-end'>
            <CustomSearch
              onSelect={onSearchSelect}
              handleSearch={onHandleSearch}
              options={options}
              placeholder={'Search Artists by name'}
              size={'large'}
              style={{
                width: '100%'
              }}
            />
          </div>
        }
        <CreateSongForm form={form} onFinish={onFinish} />
      </CustomModal>
      <CustomModal
        title='Update Music'
        isOpen={isUpdateModalOpen}
        handleOk={handleUpdateOk}
        handleCancel={updateModalToggler}
      >
        <CreateSongForm form={updateForm} onFinish={onUpdateFinish} />
      </CustomModal>

      <CustomModal
        title='Delete Artist'
        isOpen={isDeleteModelOpen}
        handleOk={handleDeleteOk}
        handleCancel={toggleDeleteModal}
      >
        Are You Sure you want to delete song {selectedData && <><b>{selectedData.title}</b> of genre <b>{selectedData.genre}</b> </>} ?
      </CustomModal>

      <CustomTable columns={columns} apiCall={fetchMusicsList} callAgain={callAgain} params={artist ? { artistId: artist.id } : {}} />
    </>
  );
};

export default Songs
