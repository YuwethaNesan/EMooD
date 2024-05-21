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
        Your face emotion looks like {type} with {Number(percentage).toFixed(2)}% confidence
      </h1>

      <h2 style={{ textAlign: 'center' }}>
        Please find the playlist that I suggest for you based on your current mood...
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

