import React, { FormEvent } from 'react';
import useForm from '../hooks/useForm';
import axios from '../api/axios';

const Upload = (): JSX.Element => {
  const [
    { selected_file, title, description },
    resetValues,
    onChange,
  ] = useForm({ selected_file: '', title: '', description: '' });

  const onAddSnapshot = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    try {
      e.preventDefault();
      await axios.post('/snapshots', { selected_file, title, description });
      resetValues();
    } catch (err) {
      console.log(err.response.data.errors);
    }
  };

  return (
    <form onSubmit={onAddSnapshot}>
      <label htmlFor='title'>Title</label>
      <input
        id='title'
        type='text'
        name='title'
        value={title}
        onChange={onChange}
      />
      <label htmlFor='description'>Description</label>
      <input
        id='description'
        type='text'
        name='description'
        value={description}
        onChange={onChange}
      />
      <label htmlFor='selected_file'>Selected_file</label>
      <input
        id='selected_file'
        type='text'
        name='selected_file'
        value={selected_file}
        onChange={onChange}
      />
      <button type='submit'>Add snapshot</button>
    </form>
  );
};

export default Upload;
