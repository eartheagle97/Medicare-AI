import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileImage } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'

function InnerMedicalRecords() {

    const [patientMedicalRecords, SetPatientMedicalRecords] = useState('')
    useEffect(() => {
        axios.get(`/GetMedicalRecords/`)
            .then(resData => {
                SetPatientMedicalRecords(resData.data)
            })
    }, [])

    return (
        <div className="post d-flex flex-column-fluid" id="kt_post">
            <div id="kt_content_container" className="container-xxl">
                <div className="card">
                    <div className="card-header card-header-stretch">
                        <div className="card-title d-flex align-items-center">
                            <h3 className="fw-bolder m-0">Medical Histroy</h3>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="tab-content">
                            <div id="kt_activity_today" className="card-body p-0 tab-pane fade active show" role="tabpanel" aria-labelledby="kt_activity_today_tab">
                                <div className="timeline">
                                    {patientMedicalRecords ? patientMedicalRecords.map((item, i) => (
                                        <div className="timeline-item" key={item._id}>
                                            <div className="timeline-line w-40px"></div>
                                            <div className="timeline-icon symbol symbol-circle symbol-40px">
                                                <div className="symbol-label bg-light">
                                                    <p>{i + 1}</p>
                                                </div>
                                            </div>

                                            <div className="timeline-content mb-10 mt-n1">
                                                <div className="pe-3 mb-5">
                                                    <div className='d-flex align-items-center mt-1 fs-6'>
                                                        <div className="symbol symbol-circle symbol-25px" data-bs-toggle="tooltip" data-bs-boundary="window" data-bs-placement="top" aria-label="Marcus Dotson" data-bs-original-title="Marcus Dotson" data-kt-initialized="1">
                                                            {/* <img className='me-5' src={ProfilePicture} alt="img" /> */}
                                                        </div>
                                                        <div className="fs-5 fw-semibold mb-2">{item.doctor_name} ({item.doctor_spec})  </div>
                                                    </div>

                                                    <div className="text-muted me-2 fs-7 mt-3"> Created on {item.date}</div>
                                                </div>
                                                <div className="overflow-auto pb-5">
                                                    <div className="align-items-center border border-dashed border-gray-300 rounded min-w-700px p-7">
                                                        <h4>{item.disease_name}</h4>
                                                        <div dangerouslySetInnerHTML={{ __html: item.description }}></div>
                                                    </div>
                                                </div>
                                                <div className="overflow-auto pb-5">
                                                    <div className="d-flex align-items-center border border-dashed border-gray-300 rounded min-w-700px p-5">
                                                        <div className="d-flex flex-aligns-center pe-10 pe-lg-20">
                                                            {
                                                                item.Files.map((file, i) => {
                                                                    return <div key={i} className='me-5'>
                                                                        <FontAwesomeIcon icon={faFileImage} size='4x' className='w-30px me-3 align-middle' />
                                                                        <div className="ms-1 fw-semibold">
                                                                            <a href={'https://medicare-ai-backend.onrender.com/' + file} className="fs-6 text-hover-primary fw-bold">{file.split('/').pop().split('-', 1) + '.' + file.split('.').pop()}</a>
                                                                        </div>
                                                                    </div>
                                                                })
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )) : ''}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InnerMedicalRecords