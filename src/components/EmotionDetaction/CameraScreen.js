import React from 'react';
import Webcam from 'react-webcam';

export default function CameraScreen({ setCapturedImage }) {
  const webcamRef = React.useRef(null);

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: 'user',
  };

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
  }, [webcamRef]);

  return (
    <div className="camera-screen">
      <div className="webcam-wrapper">
        <div className="webcam">
          <Webcam
            audio={false}
            height={720}
            width={720}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
            style={{
              width: 720,
              height: 320,
              boxShadow: '0px 0px 11px 0px #505050',
              borderRadius: 20,
              background: '#181818',
            }}
          />
          <i className="fa fa-circle camera-indicator" aria-hidden="true" />
          <button onClick={capture} className="shutter-btn">
            <i className="fa fa-camera" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
