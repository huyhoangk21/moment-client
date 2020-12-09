import * as yup from 'yup';

const UploadSchema = yup.object().shape({
  title: yup
    .string()
    .max(50, 'Title must be less than 50 characters')
    .required('Title is required'),
  description: yup
    .string()
    .max(500, 'Description must be less than 500 characters')
    .required('Description is required'),
  selected_file: yup.string().required('Image is required'),
});

export default UploadSchema;
