import React, { useContext, useEffect, useState } from 'react'
import Logo from '../assets/images/logo/logo-fav.png'
import axios from 'axios'
import { useNavigate, Link } from "react-router-dom"
import { UserContext } from './Context/Context'

function Login() {
	
	const Navigate = useNavigate()
	const {setUser} = useContext(UserContext)
    const [ userLoginData, setUserLoginData] = useState({
        Email:"",
        password:""
    })
	const [rememberMe, setRememberMe] = useState(false);

    const handleChange = e => {
        const { name, value } = e.target
        setUserLoginData({
            ...userLoginData,
            [name]: value
        })
    }

	useEffect(() => {
		const loginToken = localStorage.getItem("UserRole")
		if(loginToken === "Doctor"){
			Navigate('Doctor/Profile')
		} else if (loginToken === 'Patient') {
			Navigate('Patient/Profile')
		}
	})

    const loginsubmit = () => {
        axios.post("http://localhost:9002/Login", userLoginData)
        .then(res => {
			setUser(res.data.user_info)
			if(rememberMe){
				localStorage.setItem("Token", res.data.token)
				localStorage.setItem("UserID", res.data.user_info._id)
				localStorage.setItem("UserRole", res.data.user_info.role)
			}
            alert(res.data.message)
			if(res.data.user_info.role === 'Patient') {
				Navigate('Patient/Profile')
			} else if (res.data.user_info.role === 'Doctor') {
				Navigate('Doctor/Profile')
			}
        })
    }

	return (
		<div className="d-flex flex-column flex-root bg-image-login">
			<div className="d-flex flex-column flex-column-fluid bgi-position-y-bottom position-x-center bgi-no-repeat bgi-size-contain bgi-attachment-fixed">
				<div className="d-flex flex-center flex-column flex-column-fluid p-10 pb-lg-20" >
					<img alt="Logo" src={Logo} className="h-75px mt-9 mb-8" />
					<div className="w-lg-500px bg-body rounded shadow-sm p-10 p-lg-15 mx-auto">
						<form className="form w-100" noValidate="novalidate"  id="kt_sign_in_form">
							<div className="text-center mb-10">
								<h1 className="text-dark mb-3">Sign In to AI Based Medicare</h1>
								<div className="text-gray-400 fw-bold fs-4">New Here?
									<Link to='/Signup' className="link-primary fw-bolder"> Create an Account</Link></div>
							</div>
							<div className="fv-row mb-10">
								<label className="form-label fs-6 fw-bolder text-dark">Email</label>
								<input className="form-control form-control-lg form-control-solid" type="text" name="Email" value={userLoginData.Email} onChange={handleChange} placeholder='Email' autoComplete="off" required />
							</div>
							<div className="fv-row mb-10">
								<div className="d-flex flex-stack mb-2">
									<label className="form-label fw-bolder text-dark fs-6 mb-0">Password</label>
									<p className="link-primary fs-6 fw-bolder">Forgot Password ?</p>
								</div>
								<input className="form-control form-control-lg form-control-solid" type="password" name="password" value={userLoginData.password} onChange={handleChange}  placeholder='Password' autoComplete="off" required />
							</div>
							<div className="fv-row mb-5">
								<input type="checkbox" checked={rememberMe} onChange={() => setRememberMe(!rememberMe)}/>
									<label className="form-label fw-bolder text-dark fs-6 mx-5">Remember Me</label>
							</div>
							<div className="text-center">
								<button type="button" id="kt_sign_in_submit" onClick={loginsubmit} className="btn btn-lg btn-primary w-100 mb-5">
									<span className="indicator-label">Login</span>
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Login