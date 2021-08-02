import React from 'react'
import './Card.css' 
import { img_300, unavailable } from '../config/config'
import ContentModal from '../ContentModal/ContentModal'

const Card = ({id, poster, title, date, media_type, vote_average}) => {
    return (
        <ContentModal media_type={media_type} id={id}>
            <img className='poster' src={poster ? `${img_300}/${poster}` : unavailable} alt={title}/>
            <b className="title">{title}</b>
            <span className="subTitle">{media_type === 'tv' ? 'TV' : 'Movie'}
                <span className="subTitle">{date}</span>
            </span>
        </ContentModal>
    )
}

export default Card
