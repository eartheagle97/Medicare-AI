import { useState } from 'react'
import '../assets/css/style.bundle.css'
import Logo from '../assets/images/logo/logo-fav.png'
import axios from 'axios'
import { useNavigate, Link } from "react-router-dom"

function Signup() {

	const Navigate = useNavigate()

	const [userSignupData, setUserSignData] = useState({
		Fullname: "",
		Email: "",
		Mobilenumber: "",
		role: "",
		password: "",
		reEnterPassword: ""
	})

	const handleChange = e => {
		const { name, value } = e.target
		setUserSignData({
			...userSignupData,
			[name]: value
		})
	}

	const Signup = () => {
		const { Fullname, Email, Mobilenumber, role, password, reEnterPassword } = userSignupData
		if (Fullname && Email && Mobilenumber && role && password && (password === reEnterPassword)) {
			axios.post("http://localhost:9002/Signup", userSignupData)
				.then(res => {
					alert(res.data.message)
					Navigate("/")
				})
		} else {
			alert("invlid input")
		}
	}

	return (

		<div className="d-flex flex-column flex-root bg-image">
			<div className="d-flex flex-column flex-column-fluid bgi-position-y-bottom position-x-center bgi-no-repeat bgi-size-contain bgi-attachment-fixed">
				<div className="d-flex flex-center flex-column flex-column-fluid p-10 pb-lg-20">
					<img alt="Logo" src={Logo} className="h-75px mt-9 mb-8" />
					<div className="w-lg-600px bg-body rounded shadow-sm p-10 p-lg-15 mx-auto">
						<form className="form w-100" noValidate="novalidate" id="kt_sign_up_form">
							<div className="mb-10 text-center">
								<h1 className="text-dark mb-3">Create an Account</h1>
								<div className="text-gray-400 fw-bold fs-4">Already have an account?
									<Link to='/' className="link-primary fw-bolder"> Sign in here</Link></div>
							</div>

							

							<div className="row fv-row mb-7">
								<label className="form-label fw-bolder text-dark fs-6">Full Name</label>
								<input className="form-control form-control-solid" type="text" placeholder="First Name, Last Name" name="Fullname" value={userSignupData.Fullname} onChange={handleChange} autoComplete="off" />
							</div>
							<div className="fv-row mb-7">
								<label className="form-label fw-bolder text-dark fs-6">Email</label>
								<input className="form-control form-control-solid" type="email" placeholder="example@example.com" name="Email" value={userSignupData.Email} onChange={handleChange} autoComplete="off" />
							</div>
							<div className="fv-row mb-7">
								<label className="form-label fw-bolder text-dark fs-6">Mobile Number</label>
								<input className="form-control form-control-solid" type="text" placeholder="123-456-7890" name="Mobilenumber" value={userSignupData.Mobilenumber} onChange={handleChange} autoComplete="off" />
							</div>
							<div className="fv-row">
								<div className="form-check form-check-custom form-check-solid">
									<label className="form-label fw-bolder text-dark fs-6 me-10">Are you a Doctor or Patient?</label>
									<input className="form-check-input" type="radio" name='role' value="Doctor" onChange={handleChange} />
									<label className="form-check-label fs-6 m-5">
										Doctor
									</label>
									<input className="form-check-input" type="radio" name='role' value="Patient" onChange={handleChange} />
									<label className="form-check-label fs-6 m-5">
										Patient
									</label>
								</div>
							</div>
							<div className="mb-10 fv-row" data-kt-password-meter="true">
								<div className="mb-1">
									<label className="form-label fw-bolder text-dark fs-6">Password</label>
									<div className="position-relative mb-3">
										<input className="form-control form-control-solid" id="password" type="password" placeholder="" name="password" value={userSignupData.password}  onChange={handleChange} autoComplete="off" />
									</div>
								</div>
							</div>
							<div className="fv-row mb-5">
								<label className="form-label fw-bolder text-dark fs-6">Confirm Password</label>
								<input className="form-control form-control-solid" type="password" placeholder="" name="reEnterPassword" value={userSignupData.reEnterPassword} onChange={handleChange} autoComplete="off" />
							</div>
							
							<div className="fv-row mb-10">
								<label className="form-check form-check-custom form-check-solid form-check-inline">
									<input className="form-check-input" type="checkbox" name="toc" value="1" />
									<span className="form-check-label fw-bold text-gray-700 fs-6">I Agree
										<a href="0" className="ms-1 link-primary">Terms and conditions</a>.</span>
								</label>
							</div>
							<div className="text-center">
								<button type="button" id="kt_sign_up_submit" className="btn btn-lg btn-primary w-100 mb-5">
									<span className="indicator-label" onClick={Signup}>Signup</span>
									<span className="indicator-progress">Please wait...
										<span className="spinner-border spinner-border-sm align-middle ms-2"></span></span>
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Signup