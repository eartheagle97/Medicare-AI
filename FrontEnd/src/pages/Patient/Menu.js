import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Logo from '../../assets/images/logo/logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faFileMedical, faCalendarCheck, faAddressBook, faHeartCircleCheck, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'

function Menu(props) {
    const Navigate = useNavigate()
    const menuIconSize = 'lg'

    const Logout = () => {
        localStorage.removeItem("Token")
        localStorage.removeItem("UserID")
        localStorage.removeItem("UserRole")
        alert("You are Successfully Sign Out!")
        Navigate('/')
    }
    return (
        <div id="kt_aside" className="aside aside-light aside-hoverable" data-kt-drawer="true" data-kt-drawer-name="aside" data-kt-drawer-activate="{default: true, lg: false}" data-kt-drawer-overlay="true" data-kt-drawer-width="{default:'200px', '300px': '250px'}" data-kt-drawer-direction="start" data-kt-drawer-toggle="#kt_aside_mobile_toggle">
            {/* <!--begin::Brand--> */}
            <div className="aside-logo flex-column-auto" id="kt_aside_logo">
                {/* <!--begin::Logo--> */}
                    <img alt="Logo" src={Logo} className="h-40px logo" />
                {/* <!--end::Logo--> */}
            </div>
            {/* <!--end::Brand--> */}
            {/* <!--begin::Aside menu--> */}
            <div className="aside-menu flex-column-fluid">
                {/* <!--begin::Aside Menu--> */}
                <div className="hover-scroll-overlay-y" id="kt_aside_menu_wrapper" data-kt-scroll="true" data-kt-scroll-activate="{default: false, lg: true}" data-kt-scroll-height="auto" data-kt-scroll-dependencies="#kt_aside_logo, #kt_aside_footer" data-kt-scroll-wrappers="#kt_aside_menu" data-kt-scroll-offset="0">
                    {/* <!--begin::Menu--> */}
                    <div className="menu menu-column menu-title-gray-800 menu-state-title-primary menu-state-icon-primary menu-state-bullet-primary menu-arrow-gray-500" id="#kt_aside_menu" data-kt-menu="true" data-kt-menu-expand="false">

                        <div className="menu-item">
                            <div className="menu-content pt-8 pb-2">
                                <span className="menu-section text-muted text-uppercase fs-8 ls-1">Dashboard</span>
                            </div>
                        </div>

                        <div className="menu-item">
                            <Link className="menu-link" to='/Patient/Profile'>
                                <span className="menu-icon">
                                    {/* <!--begin::Svg Icon | path: icons/duotune/general/gen014.svg--> */}
                                    <FontAwesomeIcon icon={faUser} size={menuIconSize} style={{ color: '#adb5bd' }} />
                                    {/* <!--end::Svg Icon--> */}
                                </span>
                                <span className={`menu-title ${props.title === 'Profile' ? 'active' : ''}`}>Profile</span>
                            </Link>
                        </div>

                        <div className="menu-item">
                            <Link className="menu-link" to='/Patient/MedicalRecord'>
                                <span className="menu-icon">
                                    {/* <!--begin::Svg Icon | path: icons/duotune/general/gen014.svg--> */}
                                    <FontAwesomeIcon icon={faFileMedical} size={menuIconSize} style={{ color: '#adb5bd' }} />
                                    {/* <!--end::Svg Icon--> */}
                                </span>
                                <span className={`menu-title ${props.title === 'Medical Records' ? 'active' : ''}`}>Medical Records</span>
                            </Link>
                        </div>

                        <div className="menu-item">
                            <Link className="menu-link" to='/Patient/Appointments'>
                                <span className="menu-icon">
                                    {/* <!--begin::Svg Icon | path: icons/duotune/general/gen014.svg--> */}
                                    <FontAwesomeIcon icon={faCalendarCheck} size={menuIconSize} style={{ color: '#adb5bd' }} />
                                    {/* <!--end::Svg Icon--> */}
                                </span>
                                <span className={`menu-title ${props.title === 'Appointments' ? 'active' : ''}`}>Appointment</span>
                            </Link>
                        </div>

                        <div className="menu-item">
                            <div className="menu-content pt-8 pb-2">
                                <span className="menu-section text-muted text-uppercase fs-8 ls-1">Doctor</span>
                            </div>
                        </div>

                        <div className="menu-item">
                            <Link className="menu-link" to='/Patient/DoctorDirectory'>
                                <span className='menu-icon'>
                                    <FontAwesomeIcon icon={faAddressBook} size={menuIconSize} style={{ color: '#adb5bd' }} />
                                </span>
                                <span className={`menu-title ${props.title === 'Doctor Directory' ? 'active' : ''}`}>Doctor Directory</span>
                            </Link>
                        </div>

                        <div className="menu-item">
                            <div className="menu-content pt-8 pb-2">
                                <span className="menu-section text-muted text-uppercase fs-8 ls-1">Self Screening</span>
                            </div>
                        </div>

                        <div className="menu-item">
                            <Link className="menu-link" to='/Patient/CheckSymptoms'>
                                <span className='menu-icon'>
                                    <FontAwesomeIcon icon={faHeartCircleCheck} size={menuIconSize} style={{ color: '#adb5bd' }} />
                                </span>
                                <span className={`menu-title ${props.title === 'Symptoms Checker' ? 'active' : ''}`}>Symptoms Checker</span>
                            </Link>
                        </div>

                    </div>
                    {/* <!--end::Menu--> */}
                </div>
                {/* <!--end::Aside Menu--> */}
            </div>
            {/* <!--end::Aside menu--> */}
            {/* <!--begin::Footer--> */}
            <div onClick={Logout} className="aside-footer flex-column-auto pt-5 pb-7 px-5" id="kt_aside_footer">
                <p  className="btn btn-custom btn-primary w-100" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-dismiss-="click" title="200+ in-house components and 3rd-party plugins">
                    {/* <!--begin::Svg Icon | path: icons/duotune/general/gen005.svg--> */}
                    <FontAwesomeIcon icon={faRightFromBracket} className='me-3' />
                    {/* <!--end::Svg Icon--> */}
                    <span className="btn-label">Sign Out</span>
                </p>
            </div>
            {/* <!--end::Footer--> */}
        </div>
    )
}

export default Menu