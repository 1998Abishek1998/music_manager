import { Form } from 'antd';
import { useErrorNotify } from '../../../hooks/useError';
import { useSuccessNotify } from '../../../hooks/useSuccess';
import { useCallback, useEffect, useMemo, useState } from 'react';
import PlainButton from '../../../components/forms/Button';
import CustomModal from '../../../components/shared/CustomModal';
import CustomTable from '../../../components/shared/CustomTable';
import { deleteArtist, fetchArtistsCsv, fetchArtistsList, register, updateArtist } from '../../../api/apiClient';
import RegisterForm from '../../Auth/RegisterForm';
import {
  EditOutlined,
  DeleteOutlined,
  EyeFilled
} from '@ant-design/icons';
import EditArtistForm from './EditArtistForm';
import { useNavigate } from 'react-router-dom';
import useCanAccess from '../../../hooks/useCanAccess';

const Artists = () => {

  const successNotify = useSuccessNotify();
  const errorNotify = useErrorNotify();
  const navigate = useNavigate()
  const canAccess = useCanAccess()

  const [createForm] = Form.useForm();
  const [updateForm] = Form.useForm()

  const [callAgain, setCallAgain] = useState(false)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModelOpen, setIsDeleteModelOpen] = useState(false);
  const [seledtedData, setSelectedData] = useState(null)

  const toggleDeleteModal = useCallback(() => setIsDeleteModelOpen(!isDeleteModelOpen), [isDeleteModelOpen])
  const showModal = useCallback(() => setIsCreateModalOpen(true), []);

  const downloadCsv = () => {
    fetchArtistsCsv().then((data) => {
      console.log(data)
      const blob = new Blob([data], { type: 'text/csv' });
      const a = document.createElement('a');
      a.style.display = 'none';
      document.body.appendChild(a);

      const url = window.URL.createObjectURL(blob);
      a.href = url;
      a.download = 'data.csv';

      a.click();
      window.URL.revokeObjectURL(url);

    })
  }

  const handleCancel = useCallback(() => {
    createForm.resetFields();
    setIsCreateModalOpen(false);
  }, [createForm])

  const handleUpdateModalCancel = useCallback(() => {
    updateForm.resetFields();
    setIsUpdateModalOpen(false);
  }, [updateForm])

  const handleDeleteButtonClick = useCallback((row) => {
    setSelectedData(row)
    toggleDeleteModal()
  }, [toggleDeleteModal])


  const handleEditButtonClick = useCallback((row) => {
    updateForm.setFieldsValue({
      'name': row.name,
      'address': row.address,
      'gender': row.gender,
      'firstReleaseDate': row.release_date
    })
    setSelectedData(row)
    setIsUpdateModalOpen(true)
  }, [updateForm])

  const handleArtistOpen = useCallback((row) => {
    navigate(`/dashboard/artists/${row.name.split(' ')[0]}`, { state: row.id })
  }, [navigate])

  useEffect(() => {
    if (!canAccess(1, 2)) navigate('/dashboard/home')
  }, [navigate, canAccess])

  const columns = useMemo(() => [
    {
      title: 'Name',
      dataIndex: 'name',
      width: '20%',
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      render: (gender) => gender === 'm' ? 'Male' : gender === 'f' ? 'Female' : 'Others',
      width: '20%',
    },
    {
      title: 'First Release Year',
      dataIndex: 'first_release_year',
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
    {
      title: 'Created Date',
      dataIndex: 'created_at',
    },
    {
      title: 'Date Of Birth',
      dataIndex: 'dob',
    },
    {
      title: 'Actions',
      width: '15%',
      render: (row) => {
        return (
          <div className='flex justify-between items-center'>
            <PlainButton size="sm" onClick={() => handleArtistOpen(row)}>
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
  ], [handleArtistOpen, handleDeleteButtonClick, handleEditButtonClick])


  const onCreateFinish = useCallback((values) => {
    register({
      first_name: values.firstName,
      last_name: values.lastName,
      email: values.email,
      password: values.password,
      phone: values.phone,
      dob: values.dateOfBirth.format('YYYY-MM-DD'),
      role_id: 3,
      artist_release_date: values.firstReleaseYear.format('YYYY-MM-DD'),
      status: "active",
      gender: values.gender,
      address: values.address,
    })
      .then(() => {
        successNotify({
          description: ' Created new user.'
        })
        createForm.resetFields();
        handleCancel()
        setCallAgain(!callAgain)
      })
      .catch(err => {
        errorNotify({
          description: err.message,
          error: err
        })
      })
  }, [callAgain, createForm, errorNotify, handleCancel, successNotify]);


  const onUpdateFinish = useCallback((values) => {
    updateArtist({
      name: values.name,
      gender: values.gender,
      first_release_year: values.firstReleaseYear,
      address: values.address,
    }, seledtedData.id)
      .then(() => {
        successNotify({
          description: `Updated user ${values.name}`
        })
        setSelectedData(null)
        updateForm.resetFields();
        setCallAgain(!callAgain)
        handleUpdateModalCancel()
      })
      .catch(err => {
        errorNotify({
          description: err.message,
          error: err
        })
      })
  }, [callAgain, updateForm, errorNotify, handleUpdateModalCancel, seledtedData, successNotify]);

  const handleCreateOk = useCallback(() => {
    createForm
      .validateFields()
      .then((values) => {
        onCreateFinish(values)
      }).catch((err) => console.log('Vaidation', err))
  }, [createForm, onCreateFinish]);

  const handleUpdateOk = useCallback(() => {
    updateForm
      .validateFields()
      .then((values) => {
        onUpdateFinish(values)
      }).catch((err) => console.log('Vaidation', err))
  }, [onUpdateFinish, updateForm]);

  const handleDeleteOk = useCallback(() => {
    deleteArtist(seledtedData.id).then(() => {
      setCallAgain(!callAgain)
      toggleDeleteModal()
    }).catch(err => {
      errorNotify({
        description: err.message,
        error: err
      })
    })
  }, [callAgain, errorNotify, seledtedData, toggleDeleteModal])


  return (
    <>
      <div className='flex justify-end m-2 gap-2'>
        {
          canAccess(2) &&
          <PlainButton onClick={() => downloadCsv()}> Download Csv</PlainButton>
        }
        <PlainButton onClick={showModal}> Add Artist</PlainButton>
      </div>
      <CustomModal
        title='Create Artist'
        isOpen={isCreateModalOpen}
        handleOk={handleCreateOk}
        handleCancel={handleCancel}
      >
        <RegisterForm form={createForm} showButton={false} onFinish={onCreateFinish} showArtistReleaseDate />
      </CustomModal>
      <CustomModal
        title='Update Artist'
        isOpen={isUpdateModalOpen}
        handleOk={handleUpdateOk}
        handleCancel={handleUpdateModalCancel}
      >
        <EditArtistForm form={updateForm} onFinish={onUpdateFinish} />
      </CustomModal>
      <CustomModal
        title='Delete Artist'
        isOpen={isDeleteModelOpen}
        handleOk={handleDeleteOk}
        handleCancel={toggleDeleteModal}
      >
        Are You Sure you want to delete artist {seledtedData && <b>{seledtedData.name}</b>} ?
      </CustomModal>

      <CustomTable columns={columns} apiCall={fetchArtistsList} callAgain={callAgain} />
    </>
  );
};

export default Artists
