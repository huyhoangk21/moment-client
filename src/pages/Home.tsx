import React, { Fragment } from 'react';
import Header from '../components/Header';
import Upload from '../components/Upload';

const Home = (): JSX.Element => {
  return (
    <Fragment>
      <Header />
      <div className='relative mx-60'>
        <Upload />
      </div>
    </Fragment>
  );
};

export default Home;
