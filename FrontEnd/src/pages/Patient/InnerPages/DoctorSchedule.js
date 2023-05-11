import React from 'react'
import moment from 'moment'

function DoctorSchedule(props) {

    const convert = (time) => {
        return time ? moment(time, ["HH:mm"]).format("hh:mm A") : ''
    }
    return (
        <div className="row mb-2">
            <label className="col-lg-2 fw-bolder text-capitalize">{props.day}</label>
            <div className="col-lg-10">
                {
                    props.operationshours[props.day]?.dayoff ? <span className="fw-bold fs-6 text-dark" >CLOSED</span> : <span className="fw-bold fs-6 text-dark" >{convert(props.operationshours[props.day]?.starttime)} TO {convert(props.operationshours[props.day]?.endtime)}</span>
                }
            </div>
        </div>
    )
}

export default DoctorSchedule