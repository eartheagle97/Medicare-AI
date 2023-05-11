import React from 'react'
import moment from 'moment'

function InnerPaitentProfile({ patientData }) {

    console.log(patientData)
    const DataArray = ['Fullname', 'gender', 'Address', 'Mobilenumber', 'date_of_birth', 'Emergency_name', 'Emergency_number']

    const DisDOB = (date) => {
        return moment(date).format("Do MMMM yyyy")
    }

    return (
        <div className="card mb-5 mb-xl-10" id="kt_profile_details_view">
            <div className="card-header cursor-pointer">
                <div className="card-title m-0">
                    <h3 className="fw-bolder m-0">Profile</h3>
                </div>
            </div>
            <div className="card-body p-9">
                <div className="row mb-7">
                    <label className="col-lg-4 fw-bolder">Fullname</label>
                    <div className="col-lg-8">
                        <span className="fw-bold fs-6 text-dark">{patientData?.Fullname}</span>
                    </div>
                </div>
                <div className="row mb-7">
                    <label className="col-lg-4 fw-bolder">Gender</label>
                    <div className="col-lg-8">
                        <span className="fw-bold fs-6 text-dark">{patientData?.gender}</span>
                    </div>
                </div>
                <div className="row mb-7">
                    <label className="col-lg-4 fw-bolder">Address</label>
                    <div className="col-lg-8">
                        <span className="fw-bold fs-6 text-dark">{patientData?.Address}</span>
                    </div>
                </div>
                <div className="row mb-7">
                    <label className="col-lg-4 fw-bolder">Mobile Number</label>
                    <div className="col-lg-8">
                        <span className="fw-bold fs-6 text-dark">{patientData?.Mobilenumber}</span>
                    </div>
                </div>
                <div className="row mb-7">
                    <label className="col-lg-4 fw-bolder">Date of Birth</label>
                    <div className="col-lg-8">
                        <span className="fw-bold fs-6 text-dark">{moment(patientData?.date_of_birth).format("Do MMMM yyyy")}</span>
                    </div>
                </div>
                <div className="row mb-7">
                    <label className="col-lg-4 fw-bolder">Emergency Contact Name</label>
                    <div className="col-lg-8">
                        <span className="fw-bold fs-6 text-dark">{patientData?.Emergency_name}</span>
                    </div>
                </div>
                <div className="row mb-7">
                    <label className="col-lg-4 fw-bolder">Emergency Contact Number</label>
                    <div className="col-lg-8">
                        <span className="fw-bold fs-6 text-dark">{patientData?.Emergency_number}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InnerPaitentProfile