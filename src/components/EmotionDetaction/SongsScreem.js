import React from 'react';
import SongList from '../SongList/index';

export default function SongsScreem({
  type,
  percentage,
  resumeSong,
  pauseSong,
  audioControl,
}) {
  return (
    <div className="emotion-detection-result-screen">
      <h1>
        Your face emotion looks like {type} with {percentage * 100}% confidence
      </h1>

      <h2 style={{ textAlign: 'center' }}>
        I suggesting some songs for your mood...
      </h2>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <SongList
          resumeSong={resumeSong}
          pauseSong={pauseSong}
          audioControl={audioControl}
        />
      </div>
    </div>
  );
}
