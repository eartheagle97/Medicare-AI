import React, { useEffect, useState, useContext } from 'react'
import InnerProfileHeader from './InnerProfileHeader'
import { UserContext } from '../../Context/Context'
import moment from "moment"
import axios from 'axios'
import Autocomplete from "react-google-autocomplete";

function Overview() {
    const [userData, setUserData] = useState()
    const { user } = useContext(UserContext)
    const [profileStatus, setProfileStatus] = useState(false)
    const [profileData, setProfileData] = useState({
        doctor_id: user?._id,
        Fullname: user?.Fullname,
        date_of_birth: '',
        gender: '',
        Address: '',
        Mobilenumber: user?.Mobilenumber,
        Email: user?.Email,
        Medical_Qualification: '',
        Specialist: '',
        zoom_id: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setProfileData({
            ...profileData,
            [name]: value
        })
    }

    const handleAddressChange = (place) => {
        if(place) {
            setProfileData({
                ...profileData,
                Address: place.formatted_address,
            })
        }
    }

    useEffect(() => {
        axios.get('https://medicare-ai-backend.onrender.com/GetDoctorProfile')
            .then(response => {
                const userProfileData = response.data
                setUserData(userProfileData)
                userProfileData ? setProfileData(userProfileData) : setProfileData(profileData)
            }).catch(err => console.log("Error while fetching data"))
    }, []);

    function axiosReq(reqHeader, profileData) {
        switch (reqHeader) {
            case 'POST':
                return (axios.post("https://medicare-ai-backend.onrender.com/addDoctorProfile", profileData)
                    .then(res => {
                        alert(res.data.message)
                        window.location.reload();
                    }))
            case 'PUT':
                return (axios.put("https://medicare-ai-backend.onrender.com/updateDoctorProfile", profileData)
                    .then(res => {
                        alert(res.data.message)
                        window.location.reload();
                    }))
            default:
                return alert('Error while making axios request');
        }

    }

    const addDoctorProfile = () => {
        const { doctor_id, Fullname, date_of_birth, gender, Address, Mobilenumber, Email, Medical_Qualification, Specialist, zoom_id } = profileData
        if (Fullname && date_of_birth && gender && Address && Mobilenumber && Email && Medical_Qualification && Specialist && zoom_id) {
            setProfileStatus(!profileStatus)
            userData ? axiosReq('PUT', profileData) : axiosReq('POST', profileData)
        } else {
            alert("Invalid Input")
        }
    }

    const editprofile = () => {
        setProfileStatus(!profileStatus)
    }

    return (
        <div className="post d-flex flex-column-fluid" id="kt_post">
            <div id="kt_content_container" className="container-xxl">
                <InnerProfileHeader profileData={profileData} active='Overview' />
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
                                    profileStatus ? <Autocomplete
                                        value={profileData.Address}
                                        className="form-control form-control-lg form-control-solid"
                                        apiKey={'AIzaSyD3uKiEqzT_4oVbkCS_pEiUOVyMwaEmkVE'}
                                        options={{
                                            types: ['address'],
                                            componentRestrictions: { country: 'us' },
                                        }}
                                        onPlaceSelected={handleAddressChange}
                                        onChange={(e) => {
                                            setProfileData({
                                                ...profileData,
                                                Address: e.target.value,
                                            })
                                        }}
                                        placeholder="Enter your address"
                                    /> : <span className="fw-bold fs-6 text-dark">{userData?.Address}</span>
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
                            <label className="col-lg-4 fw-bolder">Medical Qualification</label>
                            <div className="col-lg-8">
                                {
                                    profileStatus ? <select value={profileData.Medical_Qualification} name="Medical_Qualification" onChange={handleChange} className='form-select form-select-solid'>
                                        <option></option>
                                        <option value="MBBS">Bachelor of Medicine, Bachelor of Surgery (MBBS)</option>
                                        <option value="BDS">Bachelor of Dental Surgery (BDS)</option>
                                        <option value="BHMS">Bachelor of Homeopathic Medicine and Surgery (BHMS)</option>
                                        <option value="BAMS">Bachelor of Ayurvedic Medicine and Surgery (BAMS)</option>
                                        <option value="BUMS">Bachelor of Unani Medicine and Surgery (BUMS)</option>
                                        <option value="BNYS">Bachelor of Naturopathy and Yogic Sciences (BNYS)</option>
                                        <option value="B.Pharm">Bachelor of Pharmacy (B.Pharm)</option>
                                        <option value="B.Sc. Nursing">Bachelor of Science in Nursing (B.Sc. Nursing)</option>
                                        <option value="BPT">Bachelor of Physiotherapy (BPT)</option>
                                        <option value="BOT">Bachelor of Occupational Therapy (BOT)</option>
                                        <option value="BMLT">Bachelor of Medical Laboratory Technology (BMLT)</option>
                                        <option value="B.Pharm Ayurveda">Bachelor of Ayurvedic Pharmacy (B.Pharm Ayurveda)</option>
                                        <option value="B.Sc. Biotechnology">Bachelor of Science in Biotechnology (B.Sc. Biotechnology)</option>
                                        <option value="B.Sc. Agriculture">Bachelor of Science in Agriculture (B.Sc. Agriculture)</option>
                                        <option value="B.V.Sc & AH">Bachelor of Veterinary Science and Animal Husbandry (B.V.Sc & AH)</option>
                                        <option value="MBBS + MD/MS/DNB">Doctor of Medicine/Master of Surgery/Diplomate of National Board (MBBS + MD/MS/DNB)</option>
                                        <option value="BDS + MDS">Master of Dental Surgery (BDS + MDS)</option>
                                        <option value="DM (Doctorate of Medicine)">Doctorate of Medicine (DM)</option>
                                        <option value="M.Ch (Master of Chirurgiae)">Master of Chirurgiae (M.Ch)</option>
                                        <option value="DNB (Diplomate of National Board)">Diplomate of National Board (DNB)</option>
                                        <option value="DNB Superspeciality">Superspeciality Diplomate of National Board (DNB Superspeciality)</option>
                                        <option value="M.Sc. Nursing">Master of Science in Nursing (M.Sc. Nursing)</option>
                                        <option value="MPH (Master of Public Health)">Master of Public Health (MPH)</option>
                                        <option value="MPT">Master of Physiotherapy (MPT)</option>
                                        <option value="MOT">Master of Occupational Therapy (MOT)</option>
                                        <option value="MMLT">Master of Medical Laboratory Technology (MMLT)</option>
                                        <option value="M.Pharm">Master of Pharmacy (M.Pharm)</option>
                                        <option value="MD Ayurveda">Doctor of Medicine in Ayurveda (MD Ayurveda)</option>
                                        <option value="M.Sc. Biotechnology">Master of Science in Biotechnology (M.Sc. Biotechnology)</option>
                                        <option value="M.Sc. Agriculture">Master of Science in Agriculture (M.Sc. Agriculture)</option>
                                        <option value="MVSc">Master of Veterinary Science (MVSc)</option>
                                        <option value="Ph.D">Doctor of Philosophy (Ph.D)</option>
                                    </select> : <span className="fw-bold fs-6 text-dark">{userData?.Medical_Qualification}</span>
                                }
                            </div>
                        </div>
                        <div className="row mb-7">
                            <label className="col-lg-4 fw-bolder">Specialist</label>
                            <div className="col-lg-8">
                                {
                                    profileStatus ? <select value={profileData?.Specialist} name="Specialist" onChange={handleChange} className="form-select form-select-solid">
                                        <option></option>
                                        <option value="Anesthesiologist">Anesthesiologist</option>
                                        <option value="Cardiologist">Cardiologist</option>
                                        <option value="Dermatologist">Dermatologist</option>
                                        <option value="Emergency Medicine Physician">Emergency Medicine Physician</option>
                                        <option value="Endocrinologist">Endocrinologist</option>
                                        <option value="Family Physician">Family Physician</option>
                                        <option value="Gastroenterologist">Gastroenterologist</option>
                                        <option value="Geriatrician">Geriatrician</option>
                                        <option value="Hematologist">Hematologist</option>
                                        <option value="Infectious Disease Specialist">Infectious Disease Specialist</option>
                                        <option value="Internist">Internist</option>
                                        <option value="Medical Geneticist">Medical Geneticist</option>
                                        <option value="Neonatologist">Neonatologist</option>
                                        <option value="Nephrologist">Nephrologist</option>
                                        <option value="Neurologist">Neurologist</option>
                                        <option value="Obstetrician/Gynecologist">Obstetrician/Gynecologist</option>
                                        <option value="Oncologist">Oncologist</option>
                                        <option value="Ophthalmologist">Ophthalmologist</option>
                                        <option value="Orthopedic Surgeon">Orthopedic Surgeon</option>
                                        <option value="Otolaryngologist (ENT)">Otolaryngologist (ENT)</option>
                                        <option value="Pathologist">Pathologist</option>
                                        <option value="Pediatrician">Pediatrician</option>
                                        <option value="Physiatrist">Physiatrist</option>
                                        <option value="Plastic Surgeon">Plastic Surgeon</option>
                                        <option value="Podiatrist">Podiatrist</option>
                                        <option value="Psychiatrist">Psychiatrist</option>
                                        <option value="Pulmonologist">Pulmonologist</option>
                                        <option value="Radiologist">Radiologist</option>
                                        <option value="Rheumatologist">Rheumatologist</option>
                                        <option value="Sports Medicine Physician">Sports Medicine Physician</option>
                                        <option value="Surgeon">Surgeon</option>
                                        <option value="Urologist">Urologist</option>
                                    </select> : <span className="fw-bold fs-6 text-dark">{userData?.Specialist}</span>
                                }
                            </div>
                        </div>
                        <div className="row mb-7">
                            <label className="col-lg-4 fw-bolder">Zoom ID</label>
                            <div className="col-lg-8">
                                {
                                    profileStatus ? <input type="text" name="zoom_id" value={profileData.zoom_id} onChange={handleChange} className="form-control form-control-lg form-control-solid" placeholder='10 or 11-digit number' /> : <span className="fw-bold fs-6 text-dark">{userData?.zoom_id}</span>
                                }
                            </div>
                        </div>
                        {
                            profileStatus ? <div className="card-footer d-flex justify-content-end py-6 px-9">
                                <button type="reset" className="btn btn-light btn-active-light-primary me-2" onClick={editprofile} >Discard</button>
                                <button type="submit" className="btn btn-primary" onClick={addDoctorProfile} id="kt_account_profile_details_submit">Save Changes</button>
                            </div> : ''
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Overview