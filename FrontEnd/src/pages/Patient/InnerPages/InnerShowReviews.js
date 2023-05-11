import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

function InnerShowReviews(props) {
    return (
        <div>
           {
            Array.from(({length: parseInt(props.rating)}), (e,i) => 
                <FontAwesomeIcon key={i} icon={faStar} size="xl" style={{ color: "#f9d027", }} />)
           }
           {
            Array.from(({length: (5 - props.rating)}), (e,i) => 
                <FontAwesomeIcon key={i} icon={faStar} size="xl" style={{ color: "#f0f0f0" }} />)
           }
        </div>
    )
}

export default InnerShowReviews