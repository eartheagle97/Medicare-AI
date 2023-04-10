import Header from './Header'
import Footer from './Footer'
import Menu from './Menu'
import Breadcrumb from './Breadcrumb'
import InnerInsuranceDetails from './InnerPages/InnerInsuranceDetails'

function InsuranceDetails() {

	return (
		<div className="d-flex flex-column flex-root">
			<div className="page d-flex flex-row flex-column-fluid">
				<Menu title={'Insurance Details'} />
				<div className="wrapper d-flex flex-column flex-row-fluid" id="kt_wrapper">
					<Header />
					<div className="content d-flex flex-column flex-column-fluid" id="kt_content">
						<Breadcrumb  title={'Insurance Details'}/>
						<InnerInsuranceDetails />
					</div>
					<Footer />
				</div>
			</div>
		</div>
	)
}

export default InsuranceDetails