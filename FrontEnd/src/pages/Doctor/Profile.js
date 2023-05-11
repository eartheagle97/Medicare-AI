import React from 'react'
import MainMenu from './MainMenu'
import Overview from './InnerPages/Overview'
import Footer from './Footer'
import Breadcrumb from './Breadcrumb'
import Header from './Header'

function Profile() {
	return (
		<div className="d-flex flex-column flex-root">
			<div className="page d-flex flex-row flex-column-fluid">
				<MainMenu title={'Profile'} />
				<div className="wrapper d-flex flex-column flex-row-fluid" id="kt_wrapper">
					<Header />
					<div className="content d-flex flex-column flex-column-fluid" id="kt_content">
						<Breadcrumb title={'Profile'} />
						<Overview />
					</div>
					<Footer />
				</div>
			</div>
		</div>
	)
}

export default Profile