import React, { useState, useContext, useEffect, Children } from 'react'
import { UserContext } from '../../Context/Context'
import DatePicker from "react-datepicker";
import { Link, useParams } from 'react-router-dom'
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment"
import TimePicker from 'rc-time-picker';
import defaultprofilepicture from '../../../assets/images/usersprofile/default_profile_picture.jpg'
import axios from 'axios';
import DoctorSchedule from './DoctorSchedule';


function InnerGetAppointment({ operationshours }) {
  const { id } = useParams()
  const { user } = useContext(UserContext)
  const [doctorData, setDoctorData] = useState()
  const [appointment, setAppointment] = useState({
    doctor_id: id,
    appointment_date: '',
    appointment_time: '',
    reason: '',
    appointment_status: 'Requested',
  })
  const today = moment().format("YYYY-MM-DD")
  const day = moment(appointment?.appointment_date).format("dddd").toLowerCase()
  const starthours = operationshours[day]?.starttime.slice(0, 2)
  const endhours = operationshours[day]?.endtime.slice(0, 2)
  const startmin = operationshours[day]?.starttime.slice(3, 5)
  const endmin = operationshours[day]?.endtime.slice(3, 5)


  console.log(doctorData)

  const disabledHours = () => {
    const disHours = []
    for (let i = 0; i <= 23; i++) {
      if (i < starthours || i > endhours) {
        disHours.push(i)
      }
    }
    return disHours
  }

  useEffect(() => {
    axios.get(`/GetDoctorProfile/${id}`)
      .then(response => {
        setDoctorData(response.data)
      }).catch(err => console.log("Error while fetching data"))
  }, []);

  const arrayofdays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']

  const generateOptions = (length, excludedOptions) => {
    const arr = [];
    for (let value = 0; value < length; value++) {
      if (excludedOptions.indexOf(value) < 0) {
        arr.push(value);
      }
    }
    return arr;
  }

  const disabledMinutes = (h) => {
    switch (h) {
      case parseInt(starthours):
        if (startmin === "00") {
          return generateOptions(60, [0, 30]);
        } else {
          return generateOptions(60, [30]);
        }
      case parseInt(endhours):
        if (endmin === "30") {
          return generateOptions(60, [0]);
        } else {
          return generateOptions(60, []);
        }
      default:
        return generateOptions(60, [0, 30]);
    }
  }
  // console.log(doctorData)
  const Scheduleappointment = () => {
    console.log(appointment)
    axios.post("/MakeAppointment", appointment)
      .then(res => {
        alert(res.data.message)
        window.location.reload();
      })
  }

  console.log(appointment)

  return (
    <div className="post d-flex flex-column-fluid" id="kt_post">
      <div id="kt_content_container" className="container-xxl">
        <div className="card">
          <div className="card-body ">
            <div className="d-flex flex-wrap flex-sm-nowrap mb-3">
              {/* <!--begin: Pic--> */}
              <div className="me-7 mb-4">
                <div className="symbol symbol-100px symbol-lg-160px symbol-fixed position-relative">
                  {doctorData?.profilephoto ? <img className='object-fit-cover' src={"https://medicare-ai-backend.onrender.com/media/" + doctorData?.profilephoto} alt="image" /> : <img src={defaultprofilepicture} alt="image" />}

                  <div className="position-absolute translate-middle bottom-0 start-100 mb-6 bg-success rounded-circle border border-4 border-white h-20px w-20px"></div>
                </div>
              </div>
              {/* <!--end::Pic--> */}
              {/* <!--begin::Info--> */}
              <div className="flex-grow-1">
                {/* <!--begin::Title--> */}
                <div className="d-flex justify-content-between align-items-start flex-wrap mb-2">
                  {/* <!--begin::User--> */}
                  <div className="d-flex flex-column">
                    {/* <!--begin::Name--> */}
                    <div className="d-flex align-items-center mb-0">
                      <p className="text-gray-900 fs-2 fw-bolder me-1">{!!doctorData && doctorData.Fullname} </p>
                      <p className="text-gray-600 fs-5 fw-bolder me-1">({!!doctorData && doctorData.Specialist}) </p>
                    </div>
                    {/* <!--end::Name--> */}
                    {/* <!--begin::Info--> */}
                    <div className="d-flex flex-wrap fw-bold fs-6 mb-4 pe-2">
                      <p className="d-flex align-items-center text-gray-400 me-5 mb-2">
                        {/* <!--begin::Svg Icon | path: icons/duotune/communication/com006.svg--> */}
                        <span className="svg-icon svg-icon-4 me-1">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path opacity="0.3" d="M22 12C22 17.5 17.5 22 12 22C6.5 22 2 17.5 2 12C2 6.5 6.5 2 12 2C17.5 2 22 6.5 22 12ZM12 7C10.3 7 9 8.3 9 10C9 11.7 10.3 13 12 13C13.7 13 15 11.7 15 10C15 8.3 13.7 7 12 7Z" fill="currentColor" />
                            <path d="M12 22C14.6 22 17 21 18.7 19.4C17.9 16.9 15.2 15 12 15C8.8 15 6.09999 16.9 5.29999 19.4C6.99999 21 9.4 22 12 22Z" fill="currentColor" />
                          </svg>
                        </span>
                        {!!doctorData && doctorData.gender}</p>
                      {doctorData?.Address ? <p className="d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2">
                        {/* <!--begin::Svg Icon | path: icons/duotune/general/gen018.svg--> */}
                        <span className="svg-icon svg-icon-4 me-1">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path opacity="0.3" d="M18.0624 15.3453L13.1624 20.7453C12.5624 21.4453 11.5624 21.4453 10.9624 20.7453L6.06242 15.3453C4.56242 13.6453 3.76242 11.4453 4.06242 8.94534C4.56242 5.34534 7.46242 2.44534 11.0624 2.04534C15.8624 1.54534 19.9624 5.24534 19.9624 9.94534C20.0624 12.0453 19.2624 13.9453 18.0624 15.3453Z" fill="currentColor" />
                            <path d="M12.0624 13.0453C13.7193 13.0453 15.0624 11.7022 15.0624 10.0453C15.0624 8.38849 13.7193 7.04535 12.0624 7.04535C10.4056 7.04535 9.06241 8.38849 9.06241 10.0453C9.06241 11.7022 10.4056 13.0453 12.0624 13.0453Z" fill="currentColor" />
                          </svg>
                        </span>
                        {doctorData?.Address}
                      </p> : ''}
                      <p className="d-flex align-items-center text-gray-400 mb-2">
                        {/* <!--begin::Svg Icon | path: icons/duotune/communication/com011.svg--> */}
                        <span className="svg-icon svg-icon-4 me-1">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path opacity="0.3" d="M21 19H3C2.4 19 2 18.6 2 18V6C2 5.4 2.4 5 3 5H21C21.6 5 22 5.4 22 6V18C22 18.6 21.6 19 21 19Z" fill="currentColor" />
                            <path d="M21 5H2.99999C2.69999 5 2.49999 5.10005 2.29999 5.30005L11.2 13.3C11.7 13.7 12.4 13.7 12.8 13.3L21.7 5.30005C21.5 5.10005 21.3 5 21 5Z" fill="currentColor" />
                          </svg>
                        </span>
                        {/* <!--end::Svg Icon--> */}{!!doctorData && doctorData.Email}</p>
                    </div>
                    {/* <!--end::Info--> */}
                  </div>
                  {/* <!--end::User--> */}
                </div>
                {/* <!--end::Title--> */}
              </div>
              {/* <!--end::Info--> */}
            </div>
            <div className='border-bottom mb-7 mt-7'></div>
            <div className="mb-5 mt-5">
              <h4 className='mb-5'>Operation Hours</h4>
              {
                arrayofdays.map((day, idx) => {
                  return <DoctorSchedule operationshours={operationshours} day={day} key={idx} />
                })
              }
            </div>
            <div className='border-bottom mb-7 mt-7'></div>
            <h4 className='mb-5'>Schedule an Appointment</h4>
            <div className='d-flex'>
              <div className="col-md-6 mb-3">
                <label htmlFor="" className="form-label">Date of Appointment</label>
                <input type="date" min={today} onChange={(e) => {
                  setAppointment({
                    ...appointment,
                    patient_id: user?._id,
                    patient_name: user?.Fullname,
                    patient_mobile: user?.Mobilenumber,
                    patient_Email: user?.Email,
                    appointment_date: e.target.value,
                    doctor_name: doctorData?.Fullname,
                    doctor_spec: doctorData?.Specialist,
                    zoom_id: doctorData?.zoom_id,
                  })
                }} className="form-control" />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="" className="form-label">Select Time</label>
                {
                  operationshours[day]?.dayoff ? <TimePicker className="form-control" disabled /> : <TimePicker use12Hours disabledHours={disabledHours} onChange={(value) => {
                    setAppointment({
                      ...appointment,
                      appointment_time: value.format("HH:mm")
                    })
                  }} disabledMinutes={disabledMinutes} className="form-control" format="hh:mm A" showSecond={false} minuteStep={30} />
                }
              </div>
            </div>
            <div className='col-md-12'>
              <label htmlFor="" className="form-label">Purpose for Appointment</label>
              <input type="text" className='form-control' onChange={(e) => {
                setAppointment({
                  ...appointment,
                  reason: e.target.value
                })
              }} />

              <button className='btn btn-primary mt-5' onClick={Scheduleappointment}>Schedule</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InnerGetAppointment