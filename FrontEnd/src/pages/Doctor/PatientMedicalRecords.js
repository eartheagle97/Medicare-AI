import React from 'react'
import MainMenu from './MainMenu'
import Footer from './Footer'
import Breadcrumb from './Breadcrumb'
import Header from './Header'
import InnerPatientDetails from './InnerPages/InnerPatientDetails'
import InnerPatientMedicalRecords from './InnerPages/InnerPatientMedicalRecords'

function PatientMedicalRecords() {
  return (
    <div className="d-flex flex-column flex-root">
            <div className="page d-flex flex-row flex-column-fluid">
                <MainMenu title={'MedicalRecords'} />
                <div className="wrapper d-flex flex-column flex-row-fluid" id="kt_wrapper">
                    <Header />
                    <div className="content d-flex flex-column flex-column-fluid" id="kt_content">
                        <Breadcrumb title={'Medical Records'} />
                        <InnerPatientMedicalRecords />
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
  )
}

export default PatientMedicalRecords