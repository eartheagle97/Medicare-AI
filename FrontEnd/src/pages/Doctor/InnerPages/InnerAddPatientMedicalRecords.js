import React, { useContext, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useParams } from 'react-router-dom';
import { UserContext } from '../../Context/Context';
import axios from 'axios';
import moment from 'moment';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

function InnerAddPatientMedicalRecords() {
    const { id } = useParams()
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [doctorProfile, SetDoctorProfile] = useState('')
    const [medicalRecords, SetMedicalRecords] = useState({
        doctor_id: '',
        doctor_name: '',
        doctor_spec: '',
        patient_id: id,
        date: moment().toDate(),
        disease_name: '',
        description: '',
        Files: [],
    })

    useEffect(() => {
        axios.get("/GetDoctorProfile")
            .then(res => {
                SetDoctorProfile(res.data)
            })
        
    }, [])

    const handleFileChange = (e) => {
        const selectedFiles = e.target.files;
        const formData = new FormData();

        for (let i = 0; i < selectedFiles.length; i++) {
            formData.append('photos', selectedFiles[i]);
        }

        axios
            .post("/AddPatientFiles", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((response) => {
                SetMedicalRecords({ ...medicalRecords, Files: response.data });
            })
            .catch("Something went Wronggggggg");
    };

    const handleChange = (e) => {
        const { name, value } = e.target
        SetMedicalRecords({
            ...medicalRecords,
            [name]: value,
            doctor_id: doctorProfile?._id,
            doctor_name: doctorProfile?.Fullname,
            doctor_spec: doctorProfile?.Specialist,
        })
    }

    const handleSubmit = () => {
        axios.post("/AddMedicalRecords", medicalRecords)
            .then(res => {
                alert(res.data.message)
                window.location.reload()
            })
    }

    


    return (
        <>
            <button className="btn btn-primary align-self-center" onClick={handleShow}>Add Record </button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Medical Records</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="mb-10">
                        <label htmlFor="exampleFormControlInput1" className="required form-label">Disease Name</label>
                        <input type="email" name='disease_name' onChange={handleChange} className="form-control form-control-solid" placeholder="Ex. Disease Name" />
                    </div>
                    <div className="mb-10">
                        <label htmlFor="exampleFormControlInput1" className="required form-label">Treatment Description</label>
                        <CKEditor
                            name='description'
                            editor={ClassicEditor}
                            data=""
                            onChange={(event, editor) => {
                                const data = editor.getData();
                                SetMedicalRecords({
                                    ...medicalRecords,
                                    description: data
                                })
                            }}
                        />
                    </div>
                    <div className='mb-10'>
                        <form className="form" action="#" method="post">
                            <div className="form-group row">
                                <label className="col-lg-2 col-form-label text-lg-right">Upload Files:</label>

                                <div className="col-lg-10">
                                    <div className="dropzone dropzone-queue mb-2" id="kt_dropzonejs_example_2">
                                        <div className="dropzone-panel mb-lg-0 mb-2">
                                            <input type='file' className="form-control" onChange={handleFileChange} multiple />
                                            <a className="dropzone-remove-all btn btn-sm btn-light-primary" style={{ display: 'none' }}>Remove All</a>
                                        </div>
                                    </div>
                                    <span className="form-text text-muted">Max file size is 5 MB and max number of files is 10.</span>
                                </div>
                            </div>
                        </form>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default InnerAddPatientMedicalRecords