import { useCallback, useEffect, useMemo, useState } from 'react';
import CustomTable from '../../../components/shared/CustomTable'
import { deleteUser, fetchUsersList, register, updateUser } from '../../../api/apiClient';
import PlainButton from '../../../components/forms/Button'
import CustomModal from '../../../components/shared/CustomModal';
import RegisterForm from '../../Auth/RegisterForm'
import { useSuccessNotify } from '../../../hooks/useSuccess';
import { useErrorNotify } from '../../../hooks/useError';
import { Form } from 'antd';
import {
  EditOutlined,
  DeleteOutlined
} from '@ant-design/icons';
import EditUserForm from './EditUserForm';
import useCanAccess from '../../../hooks/useCanAccess';
import { useNavigate } from 'react-router-dom';

const Users = () => {

  const successNotify = useSuccessNotify();
  const errorNotify = useErrorNotify();
  const canAccess = useCanAccess()
  const navigate = useNavigate()

  const [createForm] = Form.useForm();
  const [updateForm] = Form.useForm()

  const [callAgain, setCallAgain] = useState(false)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModelOpen, setIsDeleteModelOpen] = useState(false);
  const [seledtedData, setSelectedData] = useState(null)

  const toggleDeleteModal = useCallback(() => setIsDeleteModelOpen(!isDeleteModelOpen), [isDeleteModelOpen])
  const showModal = useCallback(() => setIsCreateModalOpen(true), []);

  const handleCancel = useCallback(() => {
    createForm.resetFields();
    setIsCreateModalOpen(false);
  }, [createForm])

  const handleUpdateModalCancel = useCallback(() => {
    updateForm.resetFields();
    setIsUpdateModalOpen(false);
  }, [updateForm])

  const handleEditButtonClick = useCallback((row) => {
    updateForm.setFieldsValue({
      'firstName': row.first_name,
      'lastName': row.last_name,
      'email': row.email,
      'address': row.address,
      'gender': row.gender,
      'phone': row.phone,
      'dob': row.dob
    })
    setSelectedData(row)
    setIsUpdateModalOpen(true)
  }, [updateForm])

  const handleDeleteButtonClick = useCallback((row) => {
    setSelectedData(row)
    toggleDeleteModal()
  }, [toggleDeleteModal])

  const columns = useMemo(() => [
    {
      title: 'Name',
      render: (name) => `${name.first_name} ${name.last_name}`,
      width: '10%',
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      render: (gender) => gender === 'm' ? 'Male' : gender === 'f' ? 'Female' : 'Others',
      width: '10%',
    },
    {
      title: 'Email',
      dataIndex: 'email',
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
      title: 'Role',
      dataIndex: 'role_id',
      render: (role_id) => role_id === 1 ? 'Super Admin' : role_id === 2 ? 'Artist Manager' : 'Artist',
    },
    {
      title: 'Actions',
      width: '10%',
      render: (row) => {
        return (
          <div className='flex justify-between items-center'>
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
  ], [handleDeleteButtonClick, handleEditButtonClick])

  const onCreateFinish = useCallback((values) => {

    register({
      first_name: values.firstName,
      last_name: values.lastName,
      email: values.email,
      password: values.password,
      phone: values.phone,
      dob: values.dateOfBirth.format('YYYY-MM-DD'),
      role_id: values.role_id,
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
    updateUser({
      first_name: values.firstName,
      last_name: values.lastName,
      email: values.email,
      password: values.password,
      phone: values.phone,
      dob: values.dateOfBirth.format('YYYY-MM-DD'),
      gender: values.gender,
      address: values.address,
    }, seledtedData.id)
      .then(() => {
        successNotify({
          description: `Updated user ${values.firstName}`
        })
        setSelectedData(null)
        updateForm.resetFields();
        handleUpdateModalCancel()
        setCallAgain(!callAgain)
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
    deleteUser(seledtedData.id).then(() => {
      setCallAgain(!callAgain)
      toggleDeleteModal()
    }).catch(err => {
      errorNotify({
        description: err.message,
        error: err
      })
    })
  }, [callAgain, errorNotify, seledtedData, toggleDeleteModal])


  useEffect(() => {
    if (!canAccess(1, 2)) navigate('/dashboard/home')
  }, [navigate, canAccess])

  return (
    <>
      <div className='flex justify-end m-2'>
        <PlainButton onClick={showModal}>+ Add User</PlainButton>
      </div>
      <CustomModal
        title='Create User'
        isOpen={isCreateModalOpen}
        handleOk={handleCreateOk}
        handleCancel={handleCancel}
      >
        <RegisterForm form={createForm} showButton={false} onFinish={onCreateFinish} showRole showArtistReleaseDate />
      </CustomModal>
      <CustomModal
        title='Update User'
        isOpen={isUpdateModalOpen}
        handleOk={handleUpdateOk}
        handleCancel={handleUpdateModalCancel}
      >
        <EditUserForm form={updateForm} showButton={false} onFinish={onUpdateFinish} />
      </CustomModal>
      <CustomModal
        title='Delete User'
        isOpen={isDeleteModelOpen}
        handleOk={handleDeleteOk}
        handleCancel={toggleDeleteModal}
      >
        Are You Sure you want to delete user {seledtedData && <><b>{seledtedData.first_name} {seledtedData.last_name}</b> with email <b>{seledtedData.email}</b></>} ?
      </CustomModal>

      <CustomTable columns={columns} apiCall={fetchUsersList} callAgain={callAgain} />
    </>
  );
};
export default Users;
