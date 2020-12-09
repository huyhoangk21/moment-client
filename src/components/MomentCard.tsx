import React, { useContext } from 'react';
import { FaHeart } from 'react-icons/fa';
import moment from 'moment';
import IMoment from '../interfaces/IMoment';
import { AuthStateContext } from '../contexts/AuthProvider';
import axios from '../api/axios';
import Button from './Button';

interface IMomentCardProps extends IMoment {
  key: number;
  color: string;
}

const MomentCard = ({
  moment_id,
  title,
  description,
  created_at,
  selected_file,
  user,
  likes,
  color,
}: IMomentCardProps) => {
  const { username } = useContext(AuthStateContext);

  const liked: boolean = likes
    .map(like => like.user.username)
    .includes(username);

  const likeUnlike = async () => {
    try {
      await axios.post(`/moments/${moment_id}/${liked ? 'unlike' : 'like'}`);
    } catch (err) {
      console.log(err.response.data.errors);
    }
  };

  const deleteMoment = async () => {
    try {
      await axios.delete(`/moments/${moment_id}`);
    } catch (err) {
      console.log(err.response.data.errors);
    }
  };

  return (
    <div className='w-72 mb-5 mr-7 shadow-2xl'>
      <img
        src={selected_file}
        alt={title}
        className='w-full h-48 object-cover'
      />
      <div className='p-5'>
        <div className={`flex justify-between ${color}`}>
          <p className='font-bold'>{user.username}</p>
          <p className='font-bold'>
            {moment(
              moment(created_at).format('MMMM Do YYYY, h:mm:ss a'),
              'MMMM Do YYYY, h:mm:ss a'
            ).fromNow()}
          </p>
        </div>
        <div className='my-5 text-center'>
          <h3 className='font-bold text-xl mb-4'>{title}</h3>
          <p>{description}</p>
        </div>
        <div className='flex justify-between'>
          <p
            className={`flex justify-center items-center text-2xl cursor-pointer ${
              liked ? color : 'text-gray-500'
            }`}
            onClick={likeUnlike}
          >
            <FaHeart className='mr-2 ' />
            {likes.length}
          </p>
          {username === user.username && (
            <Button className='bg-red-500' onClick={deleteMoment}>
              Delete
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MomentCard;
