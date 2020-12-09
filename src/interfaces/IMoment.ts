import IUser from './IUser';
import ILike from './ILike';

interface IMoment {
  moment_id: number;
  created_at: string;
  title: string;
  description: string;
  selected_file: string;
  user: IUser;
  likes: ILike[];
}

export default IMoment;
