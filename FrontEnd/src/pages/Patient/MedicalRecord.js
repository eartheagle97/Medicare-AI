import React from 'react'
import InnerMedicalRecords from './InnerPages/InnerMedicalRecords'
import Breadcrumb from './Breadcrumb'
import Header from './Header'
import Menu from './Menu'
import Footer from './Footer'

function MedicalRecord() {
    return (
        <div className="d-flex flex-column flex-root">
            <div className="page d-flex flex-row flex-column-fluid">
                <Menu title={'Medical Records'} />
                <div className="wrapper d-flex flex-column flex-row-fluid" id="kt_wrapper">
                    <Header />
                    <div className="content d-flex flex-column flex-column-fluid" id="kt_content">
                        <Breadcrumb title={'Medical Records'} />
                        <InnerMedicalRecords />
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    )
}

export default MedicalRecord