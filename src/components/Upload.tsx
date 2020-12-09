import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import { AuthStateContext } from '../contexts/AuthProvider';
import Button from './Button';
import TextField from './TextField';
import TextArea from './TextArea';
import UploadSchema from '../utils/UploadSchema';
import axios from '../api/axios';

const Upload = (): JSX.Element => {
  const { username } = useContext(AuthStateContext);

  const [fileBlob, setFileBlob] = useState(null);

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      selected_file: '',
    },
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema: UploadSchema,
    onSubmit: ({ title, description }, { resetForm }) => {
      const reader = new FileReader();
      reader.readAsDataURL(fileBlob);
      reader.onloadend = async () => {
        try {
          await axios.post('/moments', {
            title,
            description,
            selected_file: reader.result,
          });
        } catch (err) {
          console.log(err.response.data.errors);
        }
      };
      resetForm();
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      onReset={formik.handleReset}
      autoComplete='off'
      className='flex flex-col w-72 absolute right-0 top-32'
    >
      <h2 className='text-xl text-center font-semibold'>
        <span className='text-light-blue-500'>Share</span> your moment
      </h2>
      <TextField
        id='username_upload'
        name='username'
        type='text'
        disabled
        value={username}
        className='mt-4 mb-2'
      />
      <TextField
        id='title'
        name='title'
        type='text'
        value={formik.values.title}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.errors.title}
        className='mt-2 mb-2'
      />
      <TextArea
        id='description'
        name='description'
        type='textarea'
        rows='10'
        value={formik.values.description}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.errors.description}
        className='mt-2 mb-2'
      />
      <label htmlFor='selected-file' className='text-xs text-gray-500 mb-1'>
        Add an image
      </label>
      <input
        type='file'
        accept='image/*'
        id='selected-file'
        name='selected-file'
        onChange={e => {
          setFileBlob(e.target.files[0]);
          formik.setFieldValue('selected_file', e.target.value);
        }}
      />
      <small className='text-red-500'>{formik.errors.selected_file}</small>
      <Button
        type='submit'
        disabled={formik.isSubmitting}
        className='my-2 bg-light-blue-500'
      >
        Add
      </Button>
      <Button
        type='reset'
        disabled={formik.isSubmitting}
        className='mb-2 bg-red-500'
      >
        Clear
      </Button>
    </form>
  );
};

export default Upload;
