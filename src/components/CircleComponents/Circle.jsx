import React from 'react'
import './Circle.scss'
import { images } from '../../constants'

const Circle = () => {
    return (
        <div className="rectangle__components">
            <img src={images.Rectangle2} alt="Rectangle" />
            <img src={images.Rectangle3} alt="Rectangle" />
        </div>
    )
}

export default Circle