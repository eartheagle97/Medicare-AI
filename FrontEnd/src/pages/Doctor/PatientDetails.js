import React from 'react'
import MainMenu from './MainMenu'
import Footer from './Footer'
import Breadcrumb from './Breadcrumb'
import Header from './Header'
import InnerPatientDetails from './InnerPages/InnerPatientDetails'

function PatientDetails() {
    return (
        <div className="d-flex flex-column flex-root">
            <div className="page d-flex flex-row flex-column-fluid">
                <MainMenu title={'Patient Profile'} />
                <div className="wrapper d-flex flex-column flex-row-fluid" id="kt_wrapper">
                    <Header />
                    <div className="content d-flex flex-column flex-column-fluid" id="kt_content">
                        <Breadcrumb title={'Patient Profile'} />
                        <InnerPatientDetails />
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    )
}

export default PatientDetails