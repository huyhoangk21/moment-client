import ILike from './ILike';
import IMoment from './IMoment';

interface IUser {
  username: string;
  email: string;
  moments: IMoment[];
  likes: ILike[];
  created_at: string;
}

export default IUser;
