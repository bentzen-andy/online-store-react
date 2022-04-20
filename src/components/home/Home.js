import React from 'react';
import FeatureIcons from './FeatureIcons';
import css from './Home.module.css';

const Home = () => {
  return (
    <div className={css['home']}>
      <FeatureIcons />
    </div>
  );
};

export default Home;
