import React, { useEffect, useState } from 'react'
import axios from 'axios'
import defaultprofilepicture from '../../../assets/images/usersprofile/default_profile_picture.jpg'
import { Link } from 'react-router-dom'
import InnerShowReviews from './InnerShowReviews'

function InnerDoctorDirectory() {

  const [DoctorData, setDoctorData] = useState()

  useEffect(() => {
    axios.get('/GetAllDoctorProfile')
      .then(response => {
        setDoctorData(response.data)
      }).catch(err => console.log("Error while fetching data"))
  }, [])
  console.log(DoctorData)
  return (
    <div className="post d-flex flex-column-fluid" id="kt_post">
      <div id="kt_content_container" className="container-xxl">
        <form action="#">
          <div className="card mb-7">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="position-relative w-md-400px me-md-2">
                  <span className="svg-icon svg-icon-3 svg-icon-gray-500 position-absolute top-50 translate-middle ms-6">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <rect opacity="0.5" x="17.0365" y="15.1223" width="8.15546" height="2" rx="1" transform="rotate(45 17.0365 15.1223)" fill="currentColor" />
                      <path d="M11 19C6.55556 19 3 15.4444 3 11C3 6.55556 6.55556 3 11 3C15.4444 3 19 6.55556 19 11C19 15.4444 15.4444 19 11 19ZM11 5C7.53333 5 5 7.53333 5 11C5 14.4667 7.53333 17 11 17C14.4667 17 17 14.4667 17 11C17 7.53333 14.4667 5 11 5Z" fill="currentColor" />
                    </svg>
                  </span>
                  <input type="text" className="form-control form-control-solid ps-10" name="search" value="" placeholder="Search" />
                </div>
                <div className="d-flex align-items-center">
                  <button type="submit" className="btn btn-primary me-5">Search</button>
                  <a id="kt_horizontal_search_advanced_link" className="btn btn-link" data-bs-toggle="collapse" href="#kt_advanced_search_form">Advanced Search</a>
                </div>
              </div>
              <div className="collapse" id="kt_advanced_search_form">
                <div className="separator separator-dashed mt-9 mb-6"></div>
                <div className="row g-8 mb-8">
                  <div className="col-xxl-7">
                    <label className="fs-6 form-label fw-bolder text-dark">Tags</label>
                    <input type="text" className="form-control form-control form-control-solid" name="tags" value="products, users, events" />
                  </div>
                  <div className="col-xxl-5">
                    <div className="row g-8">
                      <div className="col-lg-6">
                        <label className="fs-6 form-label fw-bolder text-dark">Team Type</label>
                        <select className="form-select form-select-solid" data-control="select2" data-placeholder="In Progress" data-hide-search="true">
                          <option value=""></option>
                          <option value="1">Not started</option>
                          <option value="2" selected="selected">In Progress</option>
                          <option value="3">Done</option>
                        </select>
                      </div>
                      <div className="col-lg-6">
                        <label className="fs-6 form-label fw-bolder text-dark">Select Group</label>
                        <div className="nav-group nav-group-fluid">
                          <label>
                            <input type="radio" className="btn-check" name="type" value="has" checked="checked" />
                            <span className="btn btn-sm btn-color-muted btn-active btn-active-primary fw-bolder px-4">All</span>
                          </label>
                          <label>
                            <input type="radio" className="btn-check" name="type" value="users" />
                            <span className="btn btn-sm btn-color-muted btn-active btn-active-primary fw-bolder px-4">Users</span>
                          </label>
                          <label>
                            <input type="radio" className="btn-check" name="type" value="orders" />
                            <span className="btn btn-sm btn-color-muted btn-active btn-active-primary fw-bolder px-4">Orders</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row g-8">
                  <div className="col-xxl-7">
                    <div className="row g-8">
                      <div className="col-lg-4">
                        <label className="fs-6 form-label fw-bolder text-dark">Min. Amount</label>
                        <div className="position-relative" data-kt-dialer="true" data-kt-dialer-min="1000" data-kt-dialer-max="50000" data-kt-dialer-step="1000" data-kt-dialer-prefix="$" data-kt-dialer-decimals="2">
                          <button type="button" className="btn btn-icon btn-active-color-gray-700 position-absolute translate-middle-y top-50 start-0" data-kt-dialer-control="decrease">
                            <span className="svg-icon svg-icon-1">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <rect opacity="0.3" x="2" y="2" width="20" height="20" rx="10" fill="currentColor" />
                                <rect x="6.01041" y="10.9247" width="12" height="2" rx="1" fill="currentColor" />
                              </svg>
                            </span>
                          </button>
                          <input type="text" className="form-control form-control-solid border-0 ps-12" data-kt-dialer-control="input" placeholder="Amount" name="manageBudget" readonly="readonly" value="$50" />
                          <button type="button" className="btn btn-icon btn-active-color-gray-700 position-absolute translate-middle-y top-50 end-0" data-kt-dialer-control="increase">
                            <span className="svg-icon svg-icon-1">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <rect opacity="0.3" x="2" y="2" width="20" height="20" rx="10" fill="currentColor" />
                                <rect x="10.8891" y="17.8033" width="12" height="2" rx="1" transform="rotate(-90 10.8891 17.8033)" fill="currentColor" />
                                <rect x="6.01041" y="10.9247" width="12" height="2" rx="1" fill="currentColor" />
                              </svg>
                            </span>
                          </button>
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <label className="fs-6 form-label fw-bolder text-dark">Max. Amount</label>
                        <div className="position-relative" data-kt-dialer="true" data-kt-dialer-min="1000" data-kt-dialer-max="50000" data-kt-dialer-step="1000" data-kt-dialer-prefix="$" data-kt-dialer-decimals="2">
                          <button type="button" className="btn btn-icon btn-active-color-gray-700 position-absolute translate-middle-y top-50 start-0" data-kt-dialer-control="decrease">
                            <span className="svg-icon svg-icon-1">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <rect opacity="0.3" x="2" y="2" width="20" height="20" rx="10" fill="currentColor" />
                                <rect x="6.01041" y="10.9247" width="12" height="2" rx="1" fill="currentColor" />
                              </svg>
                            </span>
                          </button>
                          <input type="text" className="form-control form-control-solid border-0 ps-12" data-kt-dialer-control="input" placeholder="Amount" name="manageBudget" readonly="readonly" value="$100" />
                          <button type="button" className="btn btn-icon btn-active-color-gray-700 position-absolute translate-middle-y top-50 end-0" data-kt-dialer-control="increase">
                            <span className="svg-icon svg-icon-1">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <rect opacity="0.3" x="2" y="2" width="20" height="20" rx="10" fill="currentColor" />
                                <rect x="10.8891" y="17.8033" width="12" height="2" rx="1" transform="rotate(-90 10.8891 17.8033)" fill="currentColor" />
                                <rect x="6.01041" y="10.9247" width="12" height="2" rx="1" fill="currentColor" />
                              </svg>
                            </span>
                          </button>
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <label className="fs-6 form-label fw-bolder text-dark">Team Size</label>
                        <input type="text" className="form-control form-control form-control-solid" name="city" />
                      </div>
                    </div>
                  </div>
                  <div className="col-xxl-5">
                    <div className="row g-8">
                      <div className="col-lg-6">
                        <label className="fs-6 form-label fw-bolder text-dark">Category</label>
                        <select className="form-select form-select-solid" data-control="select2" data-placeholder="In Progress" data-hide-search="true">
                          <option value=""></option>
                          <option value="1">Not started</option>
                          <option value="2" selected="selected">Select</option>
                          <option value="3">Done</option>
                        </select>
                      </div>
                      <div className="col-lg-6">
                        <label className="fs-6 form-label fw-bolder text-dark">Status</label>
                        <div className="form-check form-switch form-check-custom form-check-solid mt-1">
                          <input className="form-check-input" type="checkbox" value="" id="flexSwitchChecked" checked="checked" />
                          <label className="form-check-label" htmlFor="flexSwitchChecked">Active</label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
        <div className="d-flex flex-wrap flex-stack pb-7">
          <div className="d-flex flex-wrap align-items-center my-1">
            <h3 className="fw-bolder me-5 my-1">57 Items Found
              <span className="text-gray-400 fs-6"> by Recent Updates ↓</span></h3>
          </div>
          <div className="d-flex flex-wrap my-1">
            <ul className="nav nav-pills me-6 mb-2 mb-sm-0">
              <li className="nav-item m-0">
                <a className="btn btn-sm btn-icon btn-light btn-color-muted btn-active-primary me-3 active" data-bs-toggle="tab" href="#kt_project_users_card_pane">
                  <span className="svg-icon svg-icon-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24">
                      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                        <rect x="5" y="5" width="5" height="5" rx="1" fill="currentColor" />
                        <rect x="14" y="5" width="5" height="5" rx="1" fill="currentColor" opacity="0.3" />
                        <rect x="5" y="14" width="5" height="5" rx="1" fill="currentColor" opacity="0.3" />
                        <rect x="14" y="14" width="5" height="5" rx="1" fill="currentColor" opacity="0.3" />
                      </g>
                    </svg>
                  </span>
                </a>
              </li>
              <li className="nav-item m-0">
                <a className="btn btn-sm btn-icon btn-light btn-color-muted btn-active-primary" data-bs-toggle="tab" href="#kt_project_users_table_pane">
                  <span className="svg-icon svg-icon-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M21 7H3C2.4 7 2 6.6 2 6V4C2 3.4 2.4 3 3 3H21C21.6 3 22 3.4 22 4V6C22 6.6 21.6 7 21 7Z" fill="currentColor" />
                      <path opacity="0.3" d="M21 14H3C2.4 14 2 13.6 2 13V11C2 10.4 2.4 10 3 10H21C21.6 10 22 10.4 22 11V13C22 13.6 21.6 14 21 14ZM22 20V18C22 17.4 21.6 17 21 17H3C2.4 17 2 17.4 2 18V20C2 20.6 2.4 21 3 21H21C21.6 21 22 20.6 22 20Z" fill="currentColor" />
                    </svg>
                  </span>
                </a>
              </li>
            </ul>
            <div className="d-flex my-0">
              <select name="status" data-control="select2" data-hide-search="true" data-placeholder="Filter" className="form-select form-select-sm border-body bg-body w-150px me-5">
                <option value="1">Recently Updated</option>
                <option value="2">Last Month</option>
                <option value="3">Last Quarter</option>
                <option value="4">Last Year</option>
              </select>
              <select name="status" data-control="select2" data-hide-search="true" data-placeholder="Export" className="form-select form-select-sm border-body bg-body w-100px">
                <option value="1">Excel</option>
                <option value="1">PDF</option>
                <option value="2">Print</option>
              </select>
            </div>
          </div>
        </div>
        <div className="tab-content">
          <div id="kt_project_users_card_pane" className="tab-pane fade show active">
            <div className="row g-6 g-xl-9">
              {
                DoctorData ? DoctorData.map((doctor) =>
                  <div className="col-md-6 col-xxl-4" key={doctor._id}>
                    <div className="card">
                      <div className="card-body d-flex flex-center flex-column pt-12 p-9">
                        <div className="symbol symbol-65px symbol-circle mb-5">
                          {doctor?.profilephoto ? <img className='object-fit-cover' src={"https://medicare-ai-backend.onrender.com/media/" + doctor?.profilephoto} alt="image" /> : <img src={defaultprofilepicture} alt="image" />}
                          <div className="bg-success position-absolute border border-4 border-white h-15px w-15px rounded-circle translate-middle start-100 top-100 ms-n3 mt-n3"></div>
                        </div>
                        <div className="fs-4 text-gray-800 text-hover-primary fw-bolder mb-2 text-capitalize">{doctor?.Fullname}</div>
                        <div className="fw-bold text-gray-400 mb-1">{doctor?.Specialist}</div>
                        <div className="fw-bold text-gray-400">{doctor?.Address}</div>
                        <div className="rating mt-6 mb-6">
                          <InnerShowReviews rating={DoctorData.rating ? DoctorData.rating : 0} />
                        </div>
                        <div className="d-flex flex-center flex-wrap">
                          <Link to={`/Patient/BookAppointment/${doctor.doctor_id}`} className="btn btn-sm btn-primary me-3">Get Appointment</Link>
                          <a href={`tel:${doctor?.Mobilenumber}`} className="btn btn-sm btn-outline btn-outline-dashed btn-outline-success btn-active-light-success me-3">Call Now</a>
                          <a href={`mailto:${doctor?.Email}`} className="btn btn-sm btn-outline btn-outline-dashed btn-outline-warning btn-active-light-warning me-3">Email Us</a>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : ''
              }
            </div>
            <div className="d-flex flex-stack flex-wrap pt-10">
              <div className="fs-6 fw-bold text-gray-700">Showing 1 to 10 of 50 entries</div>
              <ul className="pagination">
                <li className="page-item previous">
                  <a href="#" className="page-link">
                    <i className="previous"></i>
                  </a>
                </li>
                <li className="page-item active">
                  <a href="#" className="page-link">1</a>
                </li>
                <li className="page-item">
                  <a href="#" className="page-link">2</a>
                </li>
                <li className="page-item">
                  <a href="#" className="page-link">3</a>
                </li>
                <li className="page-item">
                  <a href="#" className="page-link">4</a>
                </li>
                <li className="page-item">
                  <a href="#" className="page-link">5</a>
                </li>
                <li className="page-item">
                  <a href="#" className="page-link">6</a>
                </li>
                <li className="page-item next">
                  <a href="#" className="page-link">
                    <i className="next"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InnerDoctorDirectory