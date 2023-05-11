import Header from './Header'
import Footer from './Footer'
import Menu from './Menu'
import Breadcrumb from './Breadcrumb'
import InnerGetAppointment from './InnerPages/InnerGetAppointment'
import { useParams } from 'react-router-dom'


import React, { useEffect, useState } from 'react'
import axios from 'axios'

function BookAppointment() {

	const {id} = useParams()
	const [availability, setAvailability] = useState([])
	useEffect(() => {
		axios.get(`/DoctorAvailability/${id}`)
		.then(res => setAvailability(res.data))
	}, [])

	// console.log(availability)

  return (
	<div className="d-flex flex-column flex-root">
			  <div className="page d-flex flex-row flex-column-fluid">
				  <Menu title={'Doctor Directory'} />
				  <div className="wrapper d-flex flex-column flex-row-fluid" id="kt_wrapper">
					  <Header />
					  <div className="content d-flex flex-column flex-column-fluid" id="kt_content">
						  <Breadcrumb  title={'Doctor Directory'}/>
						  <InnerGetAppointment operationshours={availability} />
					  </div>
					  <Footer />
				  </div>
			  </div>
		  </div>
  )
}

export default BookAppointment