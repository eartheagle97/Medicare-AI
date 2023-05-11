import React from 'react'
import MainMenu from './MainMenu'
import Header from './Header'
import Breadcrumb from './Breadcrumb'
import Footer from './Footer'
import Profile from './Profile'

function Dashboard() {
  return (
    <div className="d-flex flex-column flex-root">
      <div className="page d-flex flex-row flex-column-fluid">
        <MainMenu title={'Profile'} />
        <div className="wrapper d-flex flex-column flex-row-fluid" id="kt_wrapper">
          <Header />
          <div className="content d-flex flex-column flex-column-fluid" id="kt_content">
            <Breadcrumb title={'Profile'} />
            {/* Inner Page Starts */}
            <Profile />
            {/* Inner Page Ends */}
          </div>
          <Footer />
        </div>
      </div>
    </div>
  )
}

export default Dashboard