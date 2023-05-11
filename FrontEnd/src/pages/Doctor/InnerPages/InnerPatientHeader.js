import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import defaultprofilepicture from '../../../assets/images/usersprofile/default_profile_picture.jpg'


function InnerPatientHeader(props) {
    
    return (
        <div className="d-flex flex-wrap flex-sm-nowrap mb-3">
            <div className="me-7 mb-4">
                <div className="symbol symbol-100px symbol-lg-160px symbol-fixed position-relative">
                    {props.patientData?.profilephoto ? <img className='object-fit-cover' src={"http://localhost:9002/media/" + props.patientData?.profilephoto} alt="image" /> : <img src={defaultprofilepicture} alt="image" />}
                    <div className="position-absolute translate-middle bottom-0 start-100 mb-6 bg-success rounded-circle border border-4 border-white h-20px w-20px"></div>
                </div>
            </div>
            <div className="flex-grow-1">
                <div className="d-flex justify-content-between align-items-start flex-wrap mb-2">
                    <div className="d-flex flex-column">
                        <div className="d-flex align-items-center mb-2">
                            <p className="text-gray-900 fs-2 fw-bolder me-1">{!!props.patientData && props.patientData.Fullname}</p>
                        </div>
                        <div className="d-flex flex-wrap fw-bold fs-6 mb-4 pe-2">
                            {props.patientData?.Address ? <p className="d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2">
                                <span className="svg-icon svg-icon-4 me-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path opacity="0.3" d="M18.0624 15.3453L13.1624 20.7453C12.5624 21.4453 11.5624 21.4453 10.9624 20.7453L6.06242 15.3453C4.56242 13.6453 3.76242 11.4453 4.06242 8.94534C4.56242 5.34534 7.46242 2.44534 11.0624 2.04534C15.8624 1.54534 19.9624 5.24534 19.9624 9.94534C20.0624 12.0453 19.2624 13.9453 18.0624 15.3453Z" fill="currentColor" />
                                        <path d="M12.0624 13.0453C13.7193 13.0453 15.0624 11.7022 15.0624 10.0453C15.0624 8.38849 13.7193 7.04535 12.0624 7.04535C10.4056 7.04535 9.06241 8.38849 9.06241 10.0453C9.06241 11.7022 10.4056 13.0453 12.0624 13.0453Z" fill="currentColor" />
                                    </svg>
                                </span>
                                {props.patientData?.Address}
                            </p> : ''}
                            <p className="d-flex align-items-center text-gray-400 mb-2">
                                <span className="svg-icon svg-icon-4 me-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path opacity="0.3" d="M21 19H3C2.4 19 2 18.6 2 18V6C2 5.4 2.4 5 3 5H21C21.6 5 22 5.4 22 6V18C22 18.6 21.6 19 21 19Z" fill="currentColor" />
                                        <path d="M21 5H2.99999C2.69999 5 2.49999 5.10005 2.29999 5.30005L11.2 13.3C11.7 13.7 12.4 13.7 12.8 13.3L21.7 5.30005C21.5 5.10005 21.3 5 21 5Z" fill="currentColor" />
                                    </svg>
                                </span>
                                {!!props.patientData && props.patientData.Email}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InnerPatientHeader