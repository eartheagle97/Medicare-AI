import React, { useEffect, useState, useContext } from 'react'
import InnerProfileHeader from './InnerProfileHeader'
import axios from 'axios'
import { UserContext } from '../../Context/Context'
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import moment from 'moment';


function InnerAvailability() {
    const { user } = useContext(UserContext)
    const [editStatus, setEditStatus] = useState(false)
    const [profileData, setProfileData] = useState()
    const [disDocAvail, setDisDocAvail] = useState()
    const [mondaydayoff, setmondaydayoff] = useState(false)
    const [tuesdaydayoff, settuesdaydayoff] = useState(false)
    const [wednesdaydayoff, setwednesdaydayoff] = useState(false)
    const [thursdaydayoff, setthursdaydayoff] = useState(false)
    const [fridaydayoff, setfridaydayoff] = useState(false)
    const [saturdaydayoff, setsaturdaydayoff] = useState(false)
    const [sundaydayoff, setsundaydayoff] = useState(false)
    const [doctorAvailability, setDoctorAvailability] = useState({
        doctor_id: user?._id,
        monday: {
            starttime: '',
            endtime: '',
            dayoff: mondaydayoff
        },
        tuesday: {
            starttime: '',
            endtime: '',
            dayoff: tuesdaydayoff
        },
        wednesday: {
            starttime: '',
            endtime: '',
            dayoff: wednesdaydayoff
        },
        thursday: {
            starttime: '',
            endtime: '',
            dayoff: thursdaydayoff
        },
        friday: {
            starttime: '',
            endtime: '',
            dayoff: fridaydayoff
        },
        saturday: {
            starttime: '',
            endtime: '',
            dayoff: saturdaydayoff
        },
        sunday: {
            starttime: '',
            endtime: '',
            dayoff: sundaydayoff
        }
    })

    console.log(doctorAvailability.doctor_id)

    const format = 'HH:mm';

    const handlemondaystarttime = (e) => {
        setDoctorAvailability({
            ...doctorAvailability,
            monday: {
                ...doctorAvailability.monday,
                starttime: e.format(format)
            }
        })
    }
    const handlemondayendtime = (e) => {
        setDoctorAvailability({
            ...doctorAvailability,
            monday: {
                ...doctorAvailability.monday,
                endtime: e.format(format)
            }
        })
    }
    const dayoffmonday = (e) => {
        if (mondaydayoff) {
            setmondaydayoff(!mondaydayoff)
            setDoctorAvailability({
                ...doctorAvailability,
                monday: {
                    starttime: disDocAvail?.monday.starttime,
                    endtime: disDocAvail?.monday.endtime,
                    dayoff: !mondaydayoff
                }
            })
        } else {
            setmondaydayoff(!mondaydayoff)
            setDoctorAvailability({
                ...doctorAvailability,
                monday: {
                    starttime: '',
                    endtime: '',
                    dayoff: !mondaydayoff
                }
            })
        }
    }


    const handletuesdaystarttime = (e) => {
        setDoctorAvailability({
            ...doctorAvailability,
            tuesday: {
                ...doctorAvailability.tuesday,
                starttime: e.format(format)
            }
        })
    }
    const handletuesdayendtime = (e) => {
        setDoctorAvailability({
            ...doctorAvailability,
            tuesday: {
                ...doctorAvailability.tuesday,
                endtime: e.format(format)
            }
        })
    }
    const dayofftuesday = (e) => {
        if (tuesdaydayoff) {
            settuesdaydayoff(!tuesdaydayoff)
            setDoctorAvailability({
                ...doctorAvailability,
                tuesday: {
                    starttime: disDocAvail?.tuesday.starttime,
                    endtime: disDocAvail?.tuesday.endtime,
                    dayoff: !tuesdaydayoff
                }
            })
        } else {
            settuesdaydayoff(!tuesdaydayoff)
            setDoctorAvailability({
                ...doctorAvailability,
                tuesday: {
                    starttime: '',
                    endtime: '',
                    dayoff: !tuesdaydayoff
                }
            })
        }
    }

    const handlewednesdaystarttime = (e) => {
        setDoctorAvailability({
            ...doctorAvailability,
            wednesday: {
                ...doctorAvailability.wednesday,
                starttime: e.format(format)
            }
        })
    }
    const handlewednesdayendtime = (e) => {
        setDoctorAvailability({
            ...doctorAvailability,
            wednesday: {
                ...doctorAvailability.wednesday,
                endtime: e.format(format)
            }
        })
    }
    const dayoffwednesday = (e) => {
        if (wednesdaydayoff) {
            setwednesdaydayoff(!wednesdaydayoff)
            setDoctorAvailability({
                ...doctorAvailability,
                wednesday: {
                    starttime: disDocAvail?.wednesday.starttime,
                    endtime: disDocAvail?.wednesday.endtime,
                    dayoff: !wednesdaydayoff
                }
            })
        } else {
            setwednesdaydayoff(!wednesdaydayoff)
            setDoctorAvailability({
                ...doctorAvailability,
                wednesday: {
                    starttime: '',
                    endtime: '',
                    dayoff: !wednesdaydayoff
                }
            })
        }
    }

    const handlethursdaystarttime = (e) => {
        setDoctorAvailability({
            ...doctorAvailability,
            thursday: {
                ...doctorAvailability.thursday,
                starttime: e.format(format)
            }
        })
    }
    const handlethursdayendtime = (e) => {
        setDoctorAvailability({
            ...doctorAvailability,
            thursday: {
                ...doctorAvailability.thursday,
                endtime: e.format(format)
            }
        })
    }
    const dayoffthursday = (e) => {
        if (thursdaydayoff) {
            setthursdaydayoff(!thursdaydayoff)
            setDoctorAvailability({
                ...doctorAvailability,
                thursday: {
                    starttime: disDocAvail?.thursday.starttime,
                    endtime: disDocAvail?.thursday.endtime,
                    dayoff: !thursdaydayoff
                }
            })
        } else {
            setthursdaydayoff(!thursdaydayoff)
            setDoctorAvailability({
                ...doctorAvailability,
                thursday: {
                    starttime: '',
                    endtime: '',
                    dayoff: !thursdaydayoff
                }
            })
        }
    }

    const handlefridaystarttime = (e) => {
        setDoctorAvailability({
            ...doctorAvailability,
            friday: {
                ...doctorAvailability.friday,
                starttime: e.format(format)
            }
        })
    }
    const handlefridayendtime = (e) => {
        setDoctorAvailability({
            ...doctorAvailability,
            friday: {
                ...doctorAvailability.friday,
                endtime: e.format(format)
            }
        })
    }
    const dayofffriday = (e) => {
        if (fridaydayoff) {
            setfridaydayoff(!fridaydayoff)
            setDoctorAvailability({
                ...doctorAvailability,
                friday: {
                    starttime: disDocAvail?.friday.starttime,
                    endtime: disDocAvail?.friday.endtime,
                    dayoff: !fridaydayoff
                }
            })
        } else {
            setfridaydayoff(!fridaydayoff)
            setDoctorAvailability({
                ...doctorAvailability,
                friday: {
                    starttime: '',
                    endtime: '',
                    dayoff: !fridaydayoff
                }
            })
        }
    }

    const handlesaturdaystarttime = (e) => {
        setDoctorAvailability({
            ...doctorAvailability,
            saturday: {
                ...doctorAvailability.saturday,
                starttime: e.format(format)
            }
        })
    }
    const handlesaturdayendtime = (e) => {
        setDoctorAvailability({
            ...doctorAvailability,
            saturday: {
                ...doctorAvailability.saturday,
                endtime: e.format(format)
            }
        })
    }
    const dayoffsaturday = (e) => {
        if (saturdaydayoff) {
            setsaturdaydayoff(!saturdaydayoff)
            setDoctorAvailability({
                ...doctorAvailability,
                saturday: {
                    starttime: disDocAvail?.saturday.starttime,
                    endtime: disDocAvail?.saturday.endtime,
                    dayoff: !saturdaydayoff
                }
            })
        } else {
            setsaturdaydayoff(!saturdaydayoff)
            setDoctorAvailability({
                ...doctorAvailability,
                saturday: {
                    starttime: '',
                    endtime: '',
                    dayoff: !saturdaydayoff
                }
            })
        }
    }

    const handlesundaystarttime = (e) => {
        setDoctorAvailability({
            ...doctorAvailability,
            sunday: {
                ...doctorAvailability.sunday,
                starttime: e.format(format)
            }
        })
    }
    const handlesundayendtime = (e) => {
        setDoctorAvailability({
            ...doctorAvailability,
            sunday: {
                ...doctorAvailability.sunday,
                endtime: e.format(format)
            }
        })
    }
    const dayoffsunday = (e) => {
        if (sundaydayoff) {
            setsundaydayoff(!sundaydayoff)
            setDoctorAvailability({
                ...doctorAvailability,
                sunday: {
                    starttime: disDocAvail?.sunday.starttime,
                    endtime: disDocAvail?.sunday.endtime,
                    dayoff: !sundaydayoff
                }
            })
        } else {
            setsundaydayoff(!sundaydayoff)
            setDoctorAvailability({
                ...doctorAvailability,
                sunday: {
                    starttime: '',
                    endtime: '',
                    dayoff: !sundaydayoff
                }
            })
        }
    }
    // console.log(doctorAvailability)

    useEffect(() => {
        axios.get('/GetDoctorProfile')
            .then(response => {
                setProfileData(response.data)
            }).catch(err => console.log("Error while fetching data"))
        axios.get('/GetdoctorAvailability')
            .then(response => {
                response.data ? setDoctorAvailability(response.data) : setDoctorAvailability(doctorAvailability)
                setDisDocAvail(response.data)
                response.data.monday.dayoff ? setmondaydayoff(response.data.monday.dayoff) : setmondaydayoff(mondaydayoff)
                response.data.tuesday.dayoff ? settuesdaydayoff(response.data.tuesday.dayoff) : settuesdaydayoff(tuesdaydayoff)
                response.data.wednesday.dayoff ? setwednesdaydayoff(response.data.wednesday.dayoff) : setwednesdaydayoff(wednesdaydayoff)
                response.data.thursday.dayoff ? setthursdaydayoff(response.data.thursday.dayoff) : setthursdaydayoff(thursdaydayoff)
                response.data.friday.dayoff ? setfridaydayoff(response.data.friday.dayoff) : setfridaydayoff(fridaydayoff)
                response.data.saturday.dayoff ? setsaturdaydayoff(response.data.saturday.dayoff) : setsaturdaydayoff(saturdaydayoff)
                response.data.sunday.dayoff ? setsundaydayoff(response.data.sunday.dayoff) : setsundaydayoff(sundaydayoff)
            }).catch(err => console.log("Error while fetching data"))
    }, []);

    const editprofile = () => {
        setEditStatus(!editStatus)
    }

    function axiosReq(reqHeader, doctorAvailability) {
        switch (reqHeader) {
            case 'POST':
                return (axios.post("/adddoctorAvailability", doctorAvailability)
                    .then(res => {
                        alert(res.data.message)
                        window.location.reload();
                    }))
            case 'PUT':
                return (axios.put("/updatedoctorAvailability", doctorAvailability)
                    .then(res => {
                        alert(res.data.message)
                        window.location.reload();
                    }))
            default:
                return alert('Error while making axios request');
        }

    }

    const adddoctorAvailability = () => {
        console.log("While Submit", doctorAvailability.monday)
        disDocAvail ? axiosReq('PUT', doctorAvailability) : axiosReq('POST', doctorAvailability)
    }

    const convert = (time) => {
        return time ? moment(time, ["HH:mm"]).format("hh:mm A") : ''
    }

    const defaultTime = (time) => {
        return time ? moment(time, "HH:mm") : null
    }

    const showTime = (time) => {
        return <p>{convert(time.starttime)}  - {convert(time.endtime)}</p>
    }



    return (<div className="post d-flex flex-column-fluid" id="kt_post">
        <div id="kt_content_container" className="container-xxl">
            <InnerProfileHeader profileData={profileData} active='Availability' />
            <div className="card mb-5 mb-xl-10" id="kt_profile_details_view">
                <div className="card-header cursor-pointer">
                    <div className="card-title m-0">
                        <h3 className="fw-bolder m-0">Operation Hours</h3>
                    </div>
                    {
                        editStatus ? '' : <button className="btn btn-primary align-self-center" onClick={editprofile}>Edit </button>
                    }

                </div>

                <div className="card-body p-9">
                    {/* {
                        !profileData.Address ? <div className="row alert alert-danger">
                            <div className="d-flex flex-column">
                                <h6 className="mb-0 text-dark">Your Profile is Incomplete.</h6>
                            </div>
                        </div> : ''
                    } */}
                    <div className="row mb-7">
                        <label className="col-lg-4 fw-bolder">Monday</label>
                        <div className="col-lg-8">
                            {
                                editStatus ?
                                    <div className='d-flex mt-3'>
                                        <TimePicker disabled={mondaydayoff} defaultValue={defaultTime(doctorAvailability.monday.starttime)} onChange={handlemondaystarttime} format="HH:mm" showSecond={false} minuteStep={30} />

                                        <p className='mx-5'>TO</p>

                                        <TimePicker  disabled={mondaydayoff} value={defaultTime(doctorAvailability.monday.endtime)} onChange={handlemondayendtime} format="HH:mm" showSecond={false} minuteStep={30} />
                                        <input type="checkbox" checked={mondaydayoff} className='mx-5' onChange={dayoffmonday} />
                                    </div>
                                    :  !mondaydayoff ? <span className="fw-bold fs-6 text-dark" >{(doctorAvailability?.monday?.starttime) }  TO  { doctorAvailability?.monday?.endtime}</span> : 'Closed'
                            }
                        </div>
                    </div>
                    <div className="row mb-7">
                        <label className="col-lg-4 fw-bolder">Tuesday</label>
                        <div className="col-lg-8">
                            {
                                editStatus ?
                                    <div className='d-flex mt-3'>
                                        <TimePicker disabled={tuesdaydayoff} defaultValue={defaultTime(doctorAvailability.tuesday.starttime)} onChange={handletuesdaystarttime} format="HH:mm" showSecond={false} minuteStep={30} />
                                        <p className='mx-5'>TO</p>
                                        <TimePicker disabled={tuesdaydayoff} defaultValue={defaultTime(doctorAvailability.tuesday.endtime)} onChange={handletuesdayendtime} format="HH:mm" showSecond={false} minuteStep={30} />
                                        <input type="checkbox" checked={tuesdaydayoff} className='mx-5' onChange={dayofftuesday} />
                                    </div>
                                    : !tuesdaydayoff ? <span className="fw-bold fs-6 text-dark" >{(doctorAvailability?.tuesday?.starttime)}  TO  { doctorAvailability?.tuesday?.endtime}</span> : 'Closed'
                            }
                        </div>
                    </div>
                    <div className="row mb-7">
                        <label className="col-lg-4 fw-bolder">wednesday</label>
                        <div className="col-lg-8">
                            {
                                editStatus ?
                                    <div className='d-flex mt-3'>
                                        <TimePicker disabled={wednesdaydayoff} defaultValue={defaultTime(doctorAvailability.wednesday.starttime)} onChange={handlewednesdaystarttime} format="HH:mm" showSecond={false} minuteStep={30} />
                                        <p className='mx-5'>TO</p>
                                        <TimePicker disabled={wednesdaydayoff} defaultValue={defaultTime(doctorAvailability.wednesday.endtime)}onChange={handlewednesdayendtime} format="HH:mm" showSecond={false} minuteStep={30} />
                                        <input type="checkbox" checked={wednesdaydayoff} className='mx-5' onChange={dayoffwednesday} />
                                    </div>
                                    : !wednesdaydayoff ? <span className="fw-bold fs-6 text-dark" >{(doctorAvailability?.wednesday?.starttime) }  TO  { doctorAvailability?.wednesday?.endtime}</span> : 'Closed'
                            }
                        </div>
                    </div>
                    <div className="row mb-7">
                        <label className="col-lg-4 fw-bolder">thursday</label>
                        <div className="col-lg-8">
                            {
                                editStatus ?
                                    <div className='d-flex mt-3'>
                                        <TimePicker disabled={thursdaydayoff} defaultValue={defaultTime(doctorAvailability.thursday.starttime)} onChange={handlethursdaystarttime} format="HH:mm" showSecond={false} minuteStep={30} />
                                        <p className='mx-5'>TO</p>
                                        <TimePicker disabled={thursdaydayoff} defaultValue={defaultTime(doctorAvailability.thursday.endtime)} onChange={handlethursdayendtime} format="HH:mm" showSecond={false} minuteStep={30} />
                                        <input type="checkbox" checked={thursdaydayoff} className='mx-5' onChange={dayoffthursday} />
                                    </div>
                                    : !thursdaydayoff ? <span className="fw-bold fs-6 text-dark" >{(doctorAvailability?.thursday?.starttime) }  TO  { doctorAvailability?.thursday?.endtime}</span> : 'Closed'
                            }
                        </div>
                    </div>
                    <div className="row mb-7">
                        <label className="col-lg-4 fw-bolder">Friday</label>
                        <div className="col-lg-8">
                            {
                                editStatus ?
                                    <div className='d-flex mt-3'>
                                        <TimePicker disabled={fridaydayoff} defaultValue={defaultTime(doctorAvailability.friday.starttime)} onChange={handlefridaystarttime} format="HH:mm" showSecond={false} minuteStep={30} />
                                        <p className='mx-5'>TO</p>
                                        <TimePicker disabled={fridaydayoff} defaultValue={defaultTime(doctorAvailability.friday.endtime)} onChange={handlefridayendtime} format="HH:mm" showSecond={false} minuteStep={30} />
                                        <input type="checkbox" checked={fridaydayoff} className='mx-5' onChange={dayofffriday} />
                                    </div>
                                    : !fridaydayoff ? <span className="fw-bold fs-6 text-dark" >{(doctorAvailability?.friday?.starttime) }  TO  { doctorAvailability?.friday?.endtime}</span> : 'Closed'
                            }
                        </div>
                    </div>
                    <div className="row mb-7">
                        <label className="col-lg-4 fw-bolder">Saturday</label>
                        <div className="col-lg-8">
                            {
                                editStatus ?
                                    <div className='d-flex mt-3'>
                                        <TimePicker disabled={saturdaydayoff} defaultValue={defaultTime(doctorAvailability.saturday.starttime)} onChange={handlesaturdaystarttime} format="HH:mm" showSecond={false} minuteStep={30} />
                                        <p className='mx-5'>TO</p>
                                        <TimePicker disabled={saturdaydayoff} defaultValue={defaultTime(doctorAvailability.saturday.endtime)}onChange={handlesaturdayendtime} format="HH:mm" showSecond={false} minuteStep={30} />
                                        <input type="checkbox" checked={saturdaydayoff} className='mx-5' onChange={dayoffsaturday} />
                                    </div>
                                    : !saturdaydayoff ? <span className="fw-bold fs-6 text-dark" >{(doctorAvailability?.saturday?.starttime) }  TO  { doctorAvailability?.saturday?.endtime}</span> : 'Closed'
                            }
                        </div>
                    </div>
                    <div className="row mb-7">
                        <label className="col-lg-4 fw-bolder">Sunday</label>
                        <div className="col-lg-8">
                            {
                                editStatus ?
                                    <div className='d-flex mt-3'>
                                        <TimePicker disabled={sundaydayoff} defaultValue={defaultTime(doctorAvailability.sunday.starttime)} onChange={handlesundaystarttime} format="HH:mm" showSecond={false} minuteStep={30} />
                                        <p className='mx-5'>TO</p>
                                        <TimePicker disabled={sundaydayoff} defaultValue={defaultTime(doctorAvailability.sunday.endtime)} onChange={handlesundayendtime} format="HH:mm" showSecond={false} minuteStep={30} />
                                        <input type="checkbox" checked={sundaydayoff} className='mx-5' onChange={dayoffsunday} />
                                    </div>
                                    : !sundaydayoff ? <span className="fw-bold fs-6 text-dark" >{(doctorAvailability?.sunday?.starttime) }  TO  { doctorAvailability?.sunday?.endtime}</span> : 'Closed'
                            }
                        </div>
                    </div>
                    {
                        editStatus ? <div className="card-footer d-flex justify-content-end py-6 px-9">
                            <button type="reset" className="btn btn-light btn-active-light-primary me-2" onClick={editprofile} >Discard</button>
                            <button type="submit" className="btn btn-primary" onClick={adddoctorAvailability} id="kt_account_profile_details_submit">Save Changes</button>
                        </div> : ''
                    }
                </div>
            </div>
        </div>
    </div>
    )
}

export default InnerAvailability