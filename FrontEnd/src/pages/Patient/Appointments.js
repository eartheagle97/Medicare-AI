import Header from './Header'
import Footer from './Footer'
import Menu from './Menu'
import Breadcrumb from './Breadcrumb'
import InnerAppointments from './InnerPages/InnerAppointments'


function Appointments() {
  return (
    <div className="d-flex flex-column flex-root">
			<div className="page d-flex flex-row flex-column-fluid">
				<Menu title={'Appointments'} />
				<div className="wrapper d-flex flex-column flex-row-fluid" id="kt_wrapper">
					<Header />
					<div className="content d-flex flex-column flex-column-fluid" id="kt_content">
						<Breadcrumb  title={'Appointments'}/>
                        <InnerAppointments />
					</div>
					<Footer />
				</div>
			</div>
		</div>
  )
}

export default Appointments