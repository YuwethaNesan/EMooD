import React from 'react';
import UserDetails from '../UserDetails';
import TrackSearch from '../TrackSearch';
import './Header.css';
import EmotionDetection from '../EmotionDetaction';

const Header = ({ pauseSong, resumeSong, audioControl }) => (
  <div className="header">
    <div className="search-camera-container">
      <TrackSearch />
      <EmotionDetection
        pauseSong={pauseSong}
        resumeSong={resumeSong}
        audioControl={audioControl}
      />
    </div>
    <UserDetails />
  </div>
);

export default Header;
