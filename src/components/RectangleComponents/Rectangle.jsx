import React from 'react'
import { images } from '../../constants'
import './Rectangle.scss'

const Rectangle = () => {
    return (
        <div className="circle__components">
            <img src={images.Ellipse1} alt="Ellipse" />
            <img src={images.Ellipse2} alt="Ellipse" />
        </div>
    )
}

export default Rectangle