import React, { useEffect, useRef, useState } from 'react'
import { motion, useAnimation } from 'framer-motion';

export default function App() {

  const [fKeyDown, setFKeyDown] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const videoRef = useRef();

  const titleControls = useAnimation();
  const titleControlsFullscreen = useAnimation();

  const videoControls = useAnimation();
  const videoControlsFullscreen = useAnimation();

  const bgControls = useAnimation();

  useEffect(() => {
    videoRef.current.currentTime = 15;
    videoRef.current.play();
  }, []);

  const handleFKeyDown = (e) => {
    if (e.repeat) return;
    if (e.key !== 'f') return;

    titleControls.start({
      scale: 0.95,
      y: 10,
      boxShadow: '0 2px 0 0 rgba(0, 0, 0, 1)',
      transition: {
        duration: 0.4,
        ease: 'circInOut'
      }
    });

    videoControls.start({
      scale: 0.9,
      transition: {
        duration: 0.4,
        ease: 'circInOut'
      }
    });

    videoControlsFullscreen.start({
      scale: 4.5,
      transition: {
        duration: 0.4,
        ease: 'backInOut'
      }
    });

    setFKeyDown(current => true);
  }

  const handleFKeyUp = async (e) => {
    if (e.repeat) return;
    if (e.key !== 'f') return;


    titleControls.start({
      scale: 1,
      y: 0,
      boxShadow: '0 10px 0 0 rgba(0, 0, 0, 1)',
      transition: {
        duration: 0.4,
        ease: 'backOut'
      }
    });

    // go fullscreen
    videoControls.start({
      scale: 4,
      transition: {
        duration: 0.4,
        ease: 'backOut'
      }
    });

    // exit fullscreen
    videoControlsFullscreen.start({
      scale: 1,
      transition: {
        duration: 0.2,
        ease: 'circOut'
      }
    });



    setFKeyDown(current => false);
    setFullscreen(current => !current);
  }

  useEffect(() => {
    document.body.addEventListener('keydown', handleFKeyDown);
    document.body.addEventListener('keyup', handleFKeyUp);

    return () => {
      document.body.removeEventListener('keydown', handleFKeyDown);
      document.body.removeEventListener('keyup', handleFKeyUp);
    }
  }, []);

  const goFullscreen = (elem) => {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    }
  }

  useEffect(() => {
    // if (fullscreen) {
    //   setTimeout(() => {
    //     goFullscreen(videoRef.current);
    //   });
    // }
    // else {
    //   document.exitFullscreen();
    // }
  }, [fullscreen]);


  return (
    <>
      <div className="title">
        <h1>
          Press <motion.p animate={titleControls} className='marker'>F</motion.p> to go Fullscreen 📽️
        </h1>
      </div>
      <motion.video
        src="http://upload.wikimedia.org/wikipedia/commons/7/79/Big_Buck_Bunny_small.ogv"
        controls
        muted
        autoPlay
        loop
        playsInline
        ref={videoRef}
        animate={fullscreen ? videoControlsFullscreen : videoControls}
        style={{ width: '100%' }}
      ></motion.video>
    </>
  )
}
