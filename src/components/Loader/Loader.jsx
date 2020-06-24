import React from 'react';

const Loader = () => (
  <div className="boxes">
    <div className="box">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
    <div className="box">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
    <div className="box">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
    <div className="box">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
);

const MapLoader = () => (
  <div className="loader__container">
    <div className="loader__center">
      <Loader />
    </div>
    <div className="loader__center">
      <span>Hang on, we're fetching your activities!</span>
    </div>
  </div>
);

export default MapLoader;
