import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { UserContext } from '../../Context/Context'
import ProfilePicture from '../../../assets/images/usersprofile/300-1.jpg'
import { Link } from 'react-router-dom'
import InnerProfileHeader from './InnerProfileHeader'

function InnerInsuranceDetails() {

    const { user } = useContext(UserContext)
    // console.log(user)
    const [userData, setUserData] = useState()
    const [editStatus, setEditStatus] = useState(false)
    const [InsuranceData, setInsuranceData] = useState({
        CompanyName: '',
        PolicyNumber: '',
    })

    function axiosReq(reqHeader, InsuranceData) {
        switch (reqHeader) {
            case 'POST':
                return (axios.post("http://localhost:9002/addInsuranceData", InsuranceData)
                    .then(res => {
                        alert(res.data.message)
                    }))
            case 'PUT':
                return (axios.put("http://localhost:9002/updateInsuranceData", InsuranceData)
                    .then(res => {
                        alert(res.data.message)
                    }))
            default:
                return alert('Error while making axios request');
        }

    }

    const addPatientProfile = () => {
        const { patient_id, CompanyName, PolicyNumber } = InsuranceData
        if (CompanyName, PolicyNumber) {
            setEditStatus(!editStatus)
            userData ? axiosReq('PUT', InsuranceData) : axiosReq('POST', InsuranceData)
        } else {
            alert("Invalid Input")
        }
    }

    useEffect(() => {
        axios.get('http://localhost:9002/GetInsuranceData')
            .then(response => {
                const userInsuranceData = response.data
                setUserData(userInsuranceData)
                userInsuranceData ? setInsuranceData(userInsuranceData) : setInsuranceData(InsuranceData)
            }).catch(err => console.log("Error while fetching data"))
    }, []);

    const handleChange = e => {
        const { name, value } = e.target
        setInsuranceData({
            patient_id: user?._id,
            ...InsuranceData,
            [name]: value
        })
    }

    const editprofile = () => {
        setEditStatus(!editStatus)
    }

    return (
        <div className="post d-flex flex-column-fluid" id="kt_post">
            {/* <!--begin::Container--> */}
            <div id="kt_content_container" className="container-xxl">
                {/* <!--begin::Navbar--> */}
                <InnerProfileHeader active='Insurance' />
                {/* <!--end::Navbar--> */}
                {/* <!--begin::details View--> */}
                <div className="card mb-5 mb-xl-10" id="kt_profile_details_view">
                    <div className="card-header cursor-pointer">

                        <div className="card-title m-0">
                            <h3 className="fw-bolder m-0">Profile</h3>
                        </div>
                        {
                            editStatus ? '' : <button className="btn btn-primary align-self-center" onClick={editprofile}>Edit </button>
                        }

                    </div>

                    <div className="card-body p-9">
                        {
                            !InsuranceData.PolicyNumber ? <div className="row alert alert-danger">
                                <div className="d-flex flex-column">
                                    <h6 className="mb-0 text-dark">Your Profile is Incomplete.</h6>
                                    {/* <span>Please Add Information</span> */}
                                </div>
                            </div> : ''
                        }
                        <div className="row mb-7">
                            <label className="col-lg-4 fw-bolder">Insurance Company Name</label>
                            <div className="col-lg-8">
                                {
                                    editStatus ? <input type="text" name="CompanyName" value={InsuranceData.CompanyName} onChange={handleChange} className="form-control form-control-lg form-control-solid" placeholder='First Name, Last Name' /> : <span className="fw-bold fs-6 text-dark">{InsuranceData?.CompanyName}</span>
                                }
                            </div>
                        </div>
                        <div className="row mb-7">
                            <label className="col-lg-4 fw-bolder">Insurance Policy Number</label>
                            <div className="col-lg-8">
                                {
                                    editStatus ? <input type="text" name="PolicyNumber" value={InsuranceData.PolicyNumber} onChange={handleChange} className="form-control form-control-lg form-control-solid" placeholder='First Name, Last Name' /> : <span className="fw-bold fs-6 text-dark">{InsuranceData?.PolicyNumber}</span>
                                }
                            </div>
                        </div>
                        {
                            editStatus ? <div className="card-footer d-flex justify-content-end py-6 px-9">
                                <button type="reset" className="btn btn-light btn-active-light-primary me-2" onClick={editprofile} >Discard</button>
                                <button type="submit" className="btn btn-primary" onClick={addPatientProfile} id="kt_account_profile_details_submit">Save Changes</button>
                            </div> : ''
                        }
                    </div>
                </div>
                {/* <!--end::details View--> */}
            </div>
            {/* <!--end::Container--> */}
        </div>
    )
}

export default InnerInsuranceDetails