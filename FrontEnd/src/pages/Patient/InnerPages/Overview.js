import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import moment from "moment"
import { UserContext } from '../../Context/Context'
import InnerProfileHeader from './InnerProfileHeader'


function Overview() {

    const [userData, setUserData] = useState()
    const { user } = useContext(UserContext)
    const [profileStatus, setProfileStatus] = useState(false)
    
    const [profileData, setProfileData] = useState({
        patient_id: user?._id,
        Fullname: user?.Fullname,
        date_of_birth: '',
        gender: '',
        Address: '',
        Mobilenumber: user?.Mobilenumber,
        Email: user?.Email,
        Emergency_name: '',
        Emergency_number: '',
    })

    function axiosReq(reqHeader, profileData) {
        switch (reqHeader) {
            case 'POST':
                return (axios.post("http://localhost:9002/addPatientProfile", profileData)
                    .then(res => {
                        alert(res.data.message)
                    }))
            case 'PUT':
                return (axios.put("http://localhost:9002/updatePatientProfile", profileData)
                    .then(res => {
                        alert(res.data.message)
                    }))
            default:
                return alert('Error while making axios request');
        }

    }

    const addPatientProfile = () => {
        const { patient_id, Fullname, date_of_birth, gender, Address, Mobilenumber, Email, Emergency_name, Emergency_number } = profileData
        if (Fullname && date_of_birth && gender && Address && Mobilenumber && Email && Emergency_name && Emergency_number) {
            setProfileStatus(!profileStatus)
            userData ? axiosReq('PUT', profileData) : axiosReq('POST', profileData)
        } else {
            alert("Invalid Input")
        }
    }

    useEffect(() => {
        axios.get('http://localhost:9002/GetPatientProfile')
            .then(response => {
                const userProfileData = response.data
                setUserData(userProfileData)
                userProfileData ? setProfileData(userProfileData) : setProfileData(profileData)
            }).catch(err => console.log("Error while fetching data"))
    }, []);

    const handleChange = e => {
        const { name, value } = e.target
        setProfileData({
            ...profileData,
            [name]: value
        })
        // console.log(profileData)
    }

    const editprofile = () => {
        setProfileStatus(!profileStatus)
    }
    

    return (
        <div className="post d-flex flex-column-fluid" id="kt_post">
            {/* <!--begin::Container--> */}
            <div id="kt_content_container" className="container-xxl">
                {/* <!--begin::Navbar--> */}
                <InnerProfileHeader profileData={profileData} active='Overview' />
                {/* <!--end::Navbar--> */}
                {/* <!--begin::details View--> */}
                <div className="card mb-5 mb-xl-10" id="kt_profile_details_view">
                    <div className="card-header cursor-pointer">

                        <div className="card-title m-0">
                            <h3 className="fw-bolder m-0">Profile</h3>
                        </div>
                        {
                            profileStatus ? '' : <button className="btn btn-primary align-self-center" onClick={editprofile}>Edit </button>
                        }

                    </div>

                    <div className="card-body p-9">
                        {
                            !profileData.Address ? <div className="row alert alert-danger">
                                <div className="d-flex flex-column">
                                    <h6 className="mb-0 text-dark">Your Profile is Incomplete.</h6>
                                    {/* <span>Please Add Information</span> */}
                                </div>
                            </div> : ''
                        }
                        <div className="row mb-7">
                            <label className="col-lg-4 fw-bolder">Fullname</label>
                            <div className="col-lg-8">
                                {
                                    profileStatus ? <input type="text" name="Fullname" value={profileData.Fullname} onChange={handleChange} className="form-control form-control-lg form-control-solid" placeholder='First Name, Last Name' /> : <span className="fw-bold fs-6 text-dark">{userData?.Fullname}</span>
                                }
                            </div>
                        </div>
                        <div className="row mb-7">
                            <label className="col-lg-4 fw-bolder">Date of Birth</label>
                            <div className="col-lg-8 fv-row">
                                {
                                    profileStatus ? <input type="date" name="date_of_birth" value={moment(profileData.date_of_birth).format("yyyy-MM-DD")} onChange={handleChange} className="form-control form-control-lg form-control-solid" placeholder='mm/dd/yyyy' /> : <span className="fw-bold fs-6 text-dark">{moment.utc(userData?.date_of_birth).format("Do MMMM yyyy")}</span>
                                }
                            </div>
                        </div>
                        <div className="row mb-7">
                            <label className="col-lg-4 fw-bolder">Gender <i className="fas fa-exclamation-circle ms-1 fs-7" data-bs-toggle="tooltip" title="Country of origination"></i>
                            </label>
                            <div className="col-lg-8">
                                {
                                    profileStatus ? <div className="form-check form-check-custom form-check-solid">
                                        <input className="form-check-input" type="radio" name="gender" value="Male" checked={profileData.gender === "Male"} onChange={handleChange} id="flexRadioDefault" />
                                        <label className="form-check-label mx-5" htmlFor="flexRadioDefault">
                                            Male
                                        </label>
                                        <input className="form-check-input" type="radio" name="gender" value="Female" checked={profileData.gender === "Female"} onChange={handleChange} id="flexRadioDefault" />
                                        <label className="form-check-label mx-5" htmlFor="flexRadioDefault">
                                            Female
                                        </label>
                                        <input className="form-check-input" type="radio" name="gender" value="Other" checked={profileData.gender === "Other"} onChange={handleChange} id="flexRadioDefault" />
                                        <label className="form-check-label mx-5" htmlFor="flexRadioDefault">
                                            Other
                                        </label>
                                    </div> : <span className="fw-bold fs-6 text-dark">{userData?.gender}</span>
                                }
                            </div>
                        </div>
                        <div className="row mb-7">
                            <label className="col-lg-4 fw-bolder">Address</label>
                            <div className="col-lg-8">
                                {
                                    profileStatus ? <input type="text" name="Address" value={profileData.Address} onChange={handleChange} className="form-control form-control-lg form-control-solid" placeholder='Street Name, Apt, State, City, Pincode' /> : <span className="fw-bold fs-6 text-dark">{userData?.Address}</span>
                                }
                            </div>
                        </div>
                        <div className="row mb-7">
                            <label className="col-lg-4 fw-bolder">Mobile Number <i className="fas fa-exclamation-circle ms-1 fs-7" data-bs-toggle="tooltip" title="Phone number must be active"></i>
                            </label>
                            <div className="col-lg-8 d-flex align-items-center">
                                {
                                    profileStatus ? <input type="text" name="Mobilenumber" value={profileData.Mobilenumber} onChange={handleChange} className="form-control form-control-lg form-control-solid" placeholder='+1xxx-xxx-xxxx' /> : <span className="fw-bold fs-6 text-dark">{userData?.Mobilenumber}</span>
                                }
                            </div>
                        </div>
                        <div className="row mb-7">
                            <label className="col-lg-4 fw-bolder">Emergency Contact Name</label>
                            <div className="col-lg-8">
                                {
                                    profileStatus ? <input type="text" name="Emergency_name" value={profileData.Emergency_name} onChange={handleChange} className="form-control form-control-lg form-control-solid" placeholder='Ex. John' /> : <span className="fw-bold fs-6 text-dark">{userData?.Emergency_name}</span>
                                }
                            </div>
                        </div>
                        <div className="row mb-7">
                            <label className="col-lg-4 fw-bolder">Emergency Contact Number</label>
                            <div className="col-lg-8">
                                {
                                    profileStatus ? <input type="text" name="Emergency_number" value={profileData.Emergency_number} onChange={handleChange} className="form-control form-control-lg form-control-solid" placeholder='+1xxx-xxx-xxxx' /> : <span className="fw-bold fs-6 text-dark">{userData?.Emergency_number}</span>
                                }
                            </div>
                        </div>
                        {
                            profileStatus ? <div className="card-footer d-flex justify-content-end py-6 px-9">
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

export default Overview