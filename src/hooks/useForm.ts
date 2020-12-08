import { type } from 'os';
import { ChangeEvent, useState } from 'react';

type Values = {
  username: string;
  email: string;
  password: string;
  repeatPassword: string;
};

const useForm = (INTIAL_VALUES: Partial<Values>) => {
  const [values, setValues] = useState<Partial<Values>>(INTIAL_VALUES);

  const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const resetValues = (): void => {
    setValues(INTIAL_VALUES);
  };

  return [values, resetValues, onChange] as const;
};

export default useForm;
