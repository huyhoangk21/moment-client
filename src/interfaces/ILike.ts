import IUser from './IUser';
import IMoment from './IMoment';

interface ILike {
  like_id: number;
  user: IUser;
  moment: IMoment;
  created_at: string;
}

export default ILike;
