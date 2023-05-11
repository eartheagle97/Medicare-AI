import React from 'react'
import InnerAvailability from './InnerPages/InnerAvailability'
import MainMenu from './MainMenu'
import Footer from './Footer'
import Breadcrumb from './Breadcrumb'
import Header from './Header'

function Availability() {
    return (
        <div className="d-flex flex-column flex-root">
            <div className="page d-flex flex-row flex-column-fluid">
                <MainMenu title={'Availability'} />
                <div className="wrapper d-flex flex-column flex-row-fluid" id="kt_wrapper">
                    <Header />
                    <div className="content d-flex flex-column flex-column-fluid" id="kt_content">
                        <Breadcrumb title={'Availability'} />
                        <InnerAvailability />
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    )
}

export default Availability