import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import './ContentModal.css';
import axios from 'axios';
import { img_500, unavailable } from '../config/config';
import { Button } from '@material-ui/core';
import YouTubeIcon from "@material-ui/icons/YouTube";
import Carousel from '../Carousel/Carousel'

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        width: "90%",
        height: "80%",
        backgroundColor: "#39445a",
        border: "1px solid #282c34",
        borderRadius: 10,
        color: "white",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(1, 1, 3),
    },
}));

export default function ContentModal({ children, media_type, id }) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [data, setData] = React.useState();
    const [video, setVideo] = React.useState();

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const fetchAPI = async () => {
        const { data } = await axios.get(
            `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
        )
        setData(data);
    }

    const fetchVideo = async () => {
        const { data } = await axios.get(
            `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
        );

        setVideo(data.results[0]?.key);
    };

    useEffect(() => {
        fetchAPI()
        fetchVideo()
        // eslint-disable-next-line
    }, [])

    return (
        <>
            <div className="media" onClick={handleOpen} style={{cursor: 'pointer'}} color='inherit'>
                {children}
            </div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    {
                        data && (
                            <div className={classes.paper}>
                                <div className='ContentModal'>
                                    <img
                                        src={data.poster_path ? `${img_500}/${data.poster_path}` : unavailable}
                                        alt={data.name || data.title}
                                        className='ContentModal__portrait'
                                    />

                                    <img
                                        src={data.backdrop_path ? `${img_500}/${data.backdrop_path}` : unavailable}
                                        alt={data.name || data.title}
                                        className='ContentModal__landscape'
                                    />

                                    <div className='ContentModal__about'>
                                        <span className='ContentModal__title'>
                                            {data.name || data.title} (
                                            {(
                                                data.first_air_date ||
                                                data.release_date ||
                                                "----"
                                            ).substring(0, 4)}
                                            )
                                        </span>

                                        {
                                            data.tagline && (
                                                <i className='tagline'>{data.tagline}</i>
                                            )
                                        }

                                        <span className='ContentModal__description'>
                                            {data.overview}
                                        </span>

                                        <div >
                                            <Carousel id={id} media_type={media_type}/>
                                        </div>

                                        <Button
                                            variant="contained"
                                            startIcon={<YouTubeIcon />}
                                            color="secondary"
                                            target="__blank"
                                            href={`https://www.youtube.com/watch?v=${video}`}>
                                            Watch the Trailer
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </Fade>
            </Modal>
        </>
    );
}
