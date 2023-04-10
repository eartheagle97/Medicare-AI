import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../../assets/images/logo/logo.png'

function Menu(props) {



    return (
        <div id="kt_aside" className="aside aside-light aside-hoverable" data-kt-drawer="true" data-kt-drawer-name="aside" data-kt-drawer-activate="{default: true, lg: false}" data-kt-drawer-overlay="true" data-kt-drawer-width="{default:'200px', '300px': '250px'}" data-kt-drawer-direction="start" data-kt-drawer-toggle="#kt_aside_mobile_toggle">
            {/* <!--begin::Brand--> */}
            <div className="aside-logo flex-column-auto" id="kt_aside_logo">
                {/* <!--begin::Logo--> */}
                <a href="../../demo1/dist/index.html">
                    <img alt="Logo" src={Logo} className="h-40px logo" />
                </a>
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
                            <Link className="menu-link" to='/Profile'>
                                <span className="menu-icon">
                                    {/* <!--begin::Svg Icon | path: icons/duotune/general/gen014.svg--> */}
                                    <span className="svg-icon svg-icon-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <path d="M6.28548 15.0861C7.34369 13.1814 9.35142 12 11.5304 12H12.4696C14.6486 12 16.6563 13.1814 17.7145 15.0861L19.3493 18.0287C20.0899 19.3618 19.1259 21 17.601 21H6.39903C4.87406 21 3.91012 19.3618 4.65071 18.0287L6.28548 15.0861Z" fill="currentColor"></path>
                                            <rect opacity="0.3" x="8" y="3" width="8" height="8" rx="4" fill="currentColor"></rect>
                                        </svg>
                                    </span>
                                    {/* <!--end::Svg Icon--> */}
                                </span>
                                <span className={`menu-title ${props.title === 'Profile' ? 'active' : ''}`}>Profile</span>
                            </Link>
                        </div>

                        <div className="menu-item">
                            <Link className="menu-link" to='/MedicalRecord'>
                                <span className="menu-icon">
                                    {/* <!--begin::Svg Icon | path: icons/duotune/general/gen014.svg--> */}
                                    <span className="svg-icon svg-icon-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <path d="M6.28548 15.0861C7.34369 13.1814 9.35142 12 11.5304 12H12.4696C14.6486 12 16.6563 13.1814 17.7145 15.0861L19.3493 18.0287C20.0899 19.3618 19.1259 21 17.601 21H6.39903C4.87406 21 3.91012 19.3618 4.65071 18.0287L6.28548 15.0861Z" fill="currentColor"></path>
                                            <rect opacity="0.3" x="8" y="3" width="8" height="8" rx="4" fill="currentColor"></rect>
                                        </svg>
                                    </span>
                                    {/* <!--end::Svg Icon--> */}
                                </span>
                                <span className={`menu-title ${props.title === 'Medical Records' ? 'active' : ''}`}>Medical Records</span>
                            </Link>
                        </div>

                        <div className="menu-item">
                            <div className="menu-content pt-8 pb-2">
                                <span className="menu-section text-muted text-uppercase fs-8 ls-1">Doctor</span>
                            </div>
                        </div>

                        <div className="menu-item">
                            <Link className="menu-link" to='/DoctorDirectory'>
                                <span className='menu-icon'>
                                    <span className="svg-icon svg-icon-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <path d="M13 5.91517C15.8 6.41517 18 8.81519 18 11.8152C18 12.5152 17.9 13.2152 17.6 13.9152L20.1 15.3152C20.6 15.6152 21.4 15.4152 21.6 14.8152C21.9 13.9152 22.1 12.9152 22.1 11.8152C22.1 7.01519 18.8 3.11521 14.3 2.01521C13.7 1.91521 13.1 2.31521 13.1 3.01521V5.91517H13Z" fill="currentColor"></path>
                                            <path opacity="0.3" d="M19.1 17.0152C19.7 17.3152 19.8 18.1152 19.3 18.5152C17.5 20.5152 14.9 21.7152 12 21.7152C9.1 21.7152 6.50001 20.5152 4.70001 18.5152C4.30001 18.0152 4.39999 17.3152 4.89999 17.0152L7.39999 15.6152C8.49999 16.9152 10.2 17.8152 12 17.8152C13.8 17.8152 15.5 17.0152 16.6 15.6152L19.1 17.0152ZM6.39999 13.9151C6.19999 13.2151 6 12.5152 6 11.8152C6 8.81517 8.2 6.41515 11 5.91515V3.01519C11 2.41519 10.4 1.91519 9.79999 2.01519C5.29999 3.01519 2 7.01517 2 11.8152C2 12.8152 2.2 13.8152 2.5 14.8152C2.7 15.4152 3.4 15.7152 4 15.3152L6.39999 13.9151Z" fill="currentColor"></path>
                                        </svg>
                                    </span>
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
                            <Link className="menu-link" to='/CheckSymptoms'>
                                <span className='menu-icon'>
                                    <span className="svg-icon svg-icon-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <path d="M13 5.91517C15.8 6.41517 18 8.81519 18 11.8152C18 12.5152 17.9 13.2152 17.6 13.9152L20.1 15.3152C20.6 15.6152 21.4 15.4152 21.6 14.8152C21.9 13.9152 22.1 12.9152 22.1 11.8152C22.1 7.01519 18.8 3.11521 14.3 2.01521C13.7 1.91521 13.1 2.31521 13.1 3.01521V5.91517H13Z" fill="currentColor"></path>
                                            <path opacity="0.3" d="M19.1 17.0152C19.7 17.3152 19.8 18.1152 19.3 18.5152C17.5 20.5152 14.9 21.7152 12 21.7152C9.1 21.7152 6.50001 20.5152 4.70001 18.5152C4.30001 18.0152 4.39999 17.3152 4.89999 17.0152L7.39999 15.6152C8.49999 16.9152 10.2 17.8152 12 17.8152C13.8 17.8152 15.5 17.0152 16.6 15.6152L19.1 17.0152ZM6.39999 13.9151C6.19999 13.2151 6 12.5152 6 11.8152C6 8.81517 8.2 6.41515 11 5.91515V3.01519C11 2.41519 10.4 1.91519 9.79999 2.01519C5.29999 3.01519 2 7.01517 2 11.8152C2 12.8152 2.2 13.8152 2.5 14.8152C2.7 15.4152 3.4 15.7152 4 15.3152L6.39999 13.9151Z" fill="currentColor"></path>
                                        </svg>
                                    </span>
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
            <div className="aside-footer flex-column-auto pt-5 pb-7 px-5" id="kt_aside_footer">
                <a href="../../demo1/dist/documentation/getting-started.html" className="btn btn-custom btn-primary w-100" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-dismiss-="click" title="200+ in-house components and 3rd-party plugins">
                    <span className="btn-label">Docs &amp; Components</span>
                    {/* <!--begin::Svg Icon | path: icons/duotune/general/gen005.svg--> */}
                    <span className="svg-icon btn-icon svg-icon-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path opacity="0.3" d="M19 22H5C4.4 22 4 21.6 4 21V3C4 2.4 4.4 2 5 2H14L20 8V21C20 21.6 19.6 22 19 22ZM12.5 18C12.5 17.4 12.6 17.5 12 17.5H8.5C7.9 17.5 8 17.4 8 18C8 18.6 7.9 18.5 8.5 18.5L12 18C12.6 18 12.5 18.6 12.5 18ZM16.5 13C16.5 12.4 16.6 12.5 16 12.5H8.5C7.9 12.5 8 12.4 8 13C8 13.6 7.9 13.5 8.5 13.5H15.5C16.1 13.5 16.5 13.6 16.5 13ZM12.5 8C12.5 7.4 12.6 7.5 12 7.5H8C7.4 7.5 7.5 7.4 7.5 8C7.5 8.6 7.4 8.5 8 8.5H12C12.6 8.5 12.5 8.6 12.5 8Z" fill="currentColor" />
                            <rect x="7" y="17" width="6" height="2" rx="1" fill="currentColor" />
                            <rect x="7" y="12" width="10" height="2" rx="1" fill="currentColor" />
                            <rect x="7" y="7" width="6" height="2" rx="1" fill="currentColor" />
                            <path d="M15 8H20L14 2V7C14 7.6 14.4 8 15 8Z" fill="currentColor" />
                        </svg>
                    </span>
                    {/* <!--end::Svg Icon--> */}
                </a>
            </div>
            {/* <!--end::Footer--> */}
        </div>
    )
}

export default Menu