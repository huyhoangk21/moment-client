import React, { Fragment, useState } from 'react';
import Header from '../components/Header';
import Upload from '../components/Upload';
import MomentCard from '../components/MomentCard';
import useFetch from '../hooks/useFetch';

const colors = [
  'text-light-blue-500',
  'text-pink-500',
  'text-yellow-500',
  'text-purple-500',
  'text-green-500',
];

const Home = (): JSX.Element => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [moments] = useFetch(searchTerm);

  return (
    <Fragment>
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className='relative mx-60'>
        <div className='flex flex-row flex-wrap absolute top-32 w-4/6 items-start'>
          {moments.map((moment, idx) => (
            <MomentCard
              key={moment.moment_id}
              {...moment}
              color={colors[idx % colors.length]}
            />
          ))}
        </div>
        <Upload />
      </div>
    </Fragment>
  );
};

export default Home;
