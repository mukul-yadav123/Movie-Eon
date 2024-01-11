import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useState,useEffect } from 'react';
import { img_500, unavailable, unavailableLandscape } from '../../config/Config';
import { YouTube } from '@mui/icons-material';
import './ContentModal.css'
import Carousel from '../Carousel/Carousel';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "90%",
  height: '80%',
  bgcolor: '#39445a',
  border: '1px solid #282c34',
  color: 'white',
  borderRadius: 10,
  boxShadow: 24,
  p: 4,
};

export default function ContentModal({children,media_type, id}) {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState([]);
  const [video, setVideo] = useState([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const fetchData = async () => {
    try{

      const {data} = await axios.get(`https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);
      setContent(data);
    }
    catch(err)
    {
      console.log(err.message);
    }
  }
  const fetchVideo = async() => {
    try{

      const {data} = await axios.get(`https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);
      //console.log(data);
      setVideo(data.results[0]?.key);
    }
    catch(err)
    {
      console.log(err.message)
    }
}

useEffect(() => {
    fetchData();
    fetchVideo();
    // eslint-disable-next-line
},[]);

  return (
    <div>
      <div onClick={handleOpen} className='media'> {children} </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
      {
      content && (<Box sx={style}>
        <div className='ContentModal'>
        <img alt={content.name || content.title} className='ContentModal_potrait' src={content.poster_path ? `${img_500}/${content.poster_path}`: unavailable}/>
        <img alt={content.name || content.title} className='ContentModal_landscape' src={content.backdrop_path ? `${img_500}/${content.backdrop_path}`: unavailableLandscape}/>
        <div className="ContentModal_about">
        <span className="ContentModal_title">
          {content.name || content.title} (
            {
              (
                content.first_air_date || content.release_date || "-----"
              ).substring(0,4)
            }
          )
        </span>
        {
          content.tagline && (<i className='tagline'>{content.tagline}</i>)
        }
        <span className="ContentModal_description">{content.overview}</span>
        <div>
        <Carousel media_type={media_type} id={id}/>
        </div>
        <Button variant='contained' startIcon={<YouTube/>}
         color='secondary' target='_blank'
         href={`https://www.youtube.com/watch?v=${video}`}>
          Watch the Trailer
        </Button>
        </div>
        </div>
      </Box>
      )}
        </Fade>
      </Modal>
    </div>
  );
}