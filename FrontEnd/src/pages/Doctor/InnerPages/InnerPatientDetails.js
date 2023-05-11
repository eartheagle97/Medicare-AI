import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import InnerPatientLinks from './InnerPatientLinks';
import InnerPatientHeader from './InnerPatientHeader';
import InnerPaitentProfile from './InnerPaitentProfile';

function InnerPatientDetails(props) {
    const { id } = useParams()
    const [patientData, SetPatientData] = useState()
    useEffect(() => {
        axios.get(`/GetPatientDetails/${id}`)
            .then(response => {
                SetPatientData(response.data)
            }).catch(err => console.log("Error while fetching data"))
    }, []);
    return (
        <div className="post d-flex flex-column-fluid" id="kt_post">
            <div id="kt_content_container" className="container-xxl">
                <div className="card mb-5 mb-xl-10">
                    <div className="card-body pt-9 pb-0">
                        <InnerPatientHeader patientData={patientData} />
                        <InnerPatientLinks active={'Patient Profile'} />
                    </div>
                </div>
                <InnerPaitentProfile patientData={patientData}/>
            </div>
        </div >
    )
}

export default InnerPatientDetails