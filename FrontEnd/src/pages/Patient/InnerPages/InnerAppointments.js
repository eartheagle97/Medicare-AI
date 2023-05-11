import React, { useEffect, useState } from 'react'
import axios from 'axios'
import moment from 'moment'

function InnerAppointments() {

    const [appointmentData, SetAppointmentData] = useState([])
    const [cancelApp, setCancelApp] = useState({})
    useEffect(() => {
        axios.get('/GetPatientAppointments')
            .then(res => {
                SetAppointmentData(res.data)
            })
    }, [])

    const AppCancel = () => {
        axios.put('/CancelApp', cancelApp)
            .then(res => {
                alert(res.data.message)
                window.location.reload()
            })
    }
    const today = moment().format("YYYY-MM-DD")
    const upcomingAppointments = appointmentData.filter(data => {
        let Appdate = data.appointment_date
        return Appdate >= today
    })

    const pastAppointments = appointmentData.filter(data => {
        let Appdate = data.appointment_date
        return Appdate < today
    })

    const UpAppList = upcomingAppointments.map((data, idx) => {
        if (data.appointment_status !== "Canceled") {
            return (<tr key={data._id}>
                <td>{idx + 1}</td>
                <td>{data.doctor_name} ({data.doctor_spec})</td>
                <td>{data.reason}</td>
                <td>{data.appointment_date} at {moment(data.appointment_time, ["HH:mm"]).format("hh:mm A")}</td>
                <td>{data.appointment_status}</td>
                <td>{data.zoom_id}</td>
                <td style={{ color: 'red' }}><button onClick={() => {
                    setCancelApp({
                        App_id: data._id,
                        appointment_status: 'Canceled'
                    })
                    AppCancel();
                }} className='btn btn-sm btn-danger'>Cancel</button></td>
            </tr>)
        }
    }
    )

    const PastAppList = pastAppointments.map((data, idx) => {
        if (data.appointment_status !== "Canceled") {
            return (<tr key={data._id}>
                <td>{idx + 1}</td>
                <td>{data.doctor_name} ({data.doctor_spec})</td>
                <td>{data.reason}</td>
                <td>{data.appointment_date} at {moment(data.appointment_time, ["HH:mm"]).format("hh:mm A")}</td>
                <td>{data.appointment_status}</td>
                <td>{data.zoom_id}</td>
                <td><button onClick={() => {
                    setCancelApp({
                        App_id: data._id,
                        appointment_status: 'Canceled'
                    })
                    AppCancel();
                }} className='btn btn-sm btn-danger'>Cancel</button></td>
            </tr>)
        }
    }
    )

    return (
        <div className="post d-flex flex-column-fluid" id="kt_post">
            <div id="kt_content_container" className="container-xxl">
                <div className="card mb-5 mb-xl-10">
                    <div className="card-body pt-9 pb-0">
                        <h4>Upcoming Appointments</h4>
                        <table id="kt_datatable_example_1" className="table table-striped table-row-bordered gy-5 gs-7">
                            <thead>
                                <tr className="fw-bold fs-6 text-gray-800">
                                    <th>#</th>
                                    <th>Doctor Name</th>
                                    <th>Purpose</th>
                                    <th>Date & Time</th>
                                    <th>Status</th>
                                    <th>Zoom Link</th>
                                </tr>
                            </thead>
                            <tbody>
                                {UpAppList}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="card mb-5 mb-xl-10">
                    <div className="card-body pt-9 pb-0">
                        <h4>Past Appointments</h4>
                        <table id="kt_datatable_example_1" className="table table-striped table-row-bordered gy-5 gs-7">
                            <thead>
                                <tr className="fw-bold fs-6 text-gray-800">
                                    <th>Name</th>
                                    <th>Position</th>
                                    <th>Office</th>
                                    <th>Age</th>
                                    <th>Start date</th>
                                    <th>Salary</th>
                                </tr>
                            </thead>
                            <tbody>
                                {PastAppList}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InnerAppointments