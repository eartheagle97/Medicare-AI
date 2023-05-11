import React from 'react'
import Header from './Header'
import Footer from './Footer'
import MainMenu from './MainMenu'
import Breadcrumb from './Breadcrumb'
import CheckSystem from '../SymptomsChecker/SymptomsChecker'

function DaCheckSymptoms() {
	return (
		<div className="d-flex flex-column flex-root">
			<div className="page d-flex flex-row flex-column-fluid">
				<MainMenu title={'Symptoms Checker'}/>
				<div className="wrapper d-flex flex-column flex-row-fluid" id="kt_wrapper">
					<Header />
					<div className="content d-flex flex-column flex-column-fluid" id="kt_content" style={{ minHeight: '696.61px'}}>
						<Breadcrumb  title={'Symptoms Checker'}/>
						<CheckSystem />
					</div>
					<Footer />
				</div>
			</div>
		</div>
	)
}

export default DaCheckSymptoms