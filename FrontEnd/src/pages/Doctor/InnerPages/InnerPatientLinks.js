import React from 'react'
import {Link, useParams} from 'react-router-dom'

function InnerPatientLinks(props) {

    const { id } = useParams()

    return (
        <ul className="nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bolder">
            <li className="nav-item mt-2">
                <Link className={`nav-link text-active-primary ms-0 me-10 py-5 ${props.active === 'Patient Profile' ? 'active' : ''}`} to={`/Doctor/${id}/PatientDetails`}>Patient Profile</Link>
            </li>
            <li className="nav-item mt-2">
                <Link className={`nav-link text-active-primary ms-0 me-10 py-5 ${props.active === 'MedicalRecords' ? 'active' : ''}`} to={`/Doctor/${id}/MedicalRecords`}>Medical Records</Link>
            </li>
        </ul>
    )
}

export default InnerPatientLinks