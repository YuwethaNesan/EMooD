import React, { useState } from 'react';
import './index.css';
import CameraScreen from './CameraScreen';
import LoadingScreen from './LoadingScreen';
import SongsScreem from './SongsScreem';

export default function EmotionDetection({
  token,
  searchSongs,
  audioControl,
  pauseSong,
  resumeSong,
}) {
  const [visibleScreen, setVisibleScreen] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [emotion, setEmotion] = useState({
    type: undefined,
    percentage: 0,
  });

  const handleToggleModal = () => {
    setVisibleScreen(!visibleScreen);
    setCapturedImage(null);
    setLoading(false);
    setEmotion({ type: undefined, percentage: 0 });
  };

  const handleCaptureImage = async (img) => {
    try {
      setCapturedImage(img);
      setLoading(true);

      const formData = new FormData();
      const base64Response = await fetch(img);
      const blob = await base64Response.blob();
      formData.append('image', blob);

      const response = await fetch('http://127.0.0.1:5000/imageToEmotion', {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        const data = await response.json();
        await searchSongs(`Feel ${data[0]} tamil songs`, token);
        setEmotion({ type: data[0], percentage: data[1] });
        setLoading(false);
      } else {
        throw new Error('Something went wrong');
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      alert('Something went wrong');
    }
  };

  if (visibleScreen) {
    return (
      <div>
        {isLoading && <LoadingScreen />}

        <div className="emotion-screen-wrapper">
          <button className="screen-close-btn" onClick={handleToggleModal}>
            <i className="fa fa-close" aria-hidden="true" />
          </button>

          {emotion.type ? (
            <SongsScreem
              resumeSong={resumeSong}
              pauseSong={pauseSong}
              audioControl={audioControl}
              {...emotion}
            />
          ) : capturedImage ? (
            <div className="capturedImage">
              <img src={capturedImage} />
            </div>
          ) : (
            <CameraScreen setCapturedImage={handleCaptureImage} />
          )}
        </div>
      </div>
    );
  }

  return (
    <div>
      <button className="camera-btn" onClick={handleToggleModal}>
        <i className="fa fa-camera" aria-hidden="true" />
      </button>
    </div>
  );
}
