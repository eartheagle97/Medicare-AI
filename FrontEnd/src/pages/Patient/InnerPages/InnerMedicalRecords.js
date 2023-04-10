import React from 'react'
import ProfilePicture from '../../../assets/images/usersprofile/300-1.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileImage } from '@fortawesome/free-solid-svg-icons'

function InnerMedicalRecords() {
    return (
        <div className="post d-flex flex-column-fluid" id="kt_post">
            {/* <!--begin::Container--> */}
            <div id="kt_content_container" className="container-xxl">

                <div className="card">
                    {/* <!--begin::Card head--> */}
                    <div className="card-header card-header-stretch">
                        {/* <!--begin::Title--> */}
                        <div className="card-title d-flex align-items-center">
                            <i className="ki-duotone ki-calendar-8 fs-1 text-primary me-3 lh-0"><span className="path1"></span><span className="path2"></span><span className="path3"></span><span className="path4"></span><span className="path5"></span><span className="path6"></span></i>

                            <h3 className="fw-bold m-0 text-gray-800">Jan 23, 2023</h3>
                        </div>
                        {/* <!--end::Title--> */}

                    </div>
                    {/* <!--end::Card head--> */}

                    {/* <!--begin::Card body--> */}
                    <div className="card-body">
                        {/* <!--begin::Tab Content--> */}
                        <div className="tab-content">
                            {/* <!--begin::Tab panel--> */}
                            <div id="kt_activity_today" className="card-body p-0 tab-pane fade active show" role="tabpanel" aria-labelledby="kt_activity_today_tab">
                                {/* <!--begin::Timeline--> */}
                                <div className="timeline">
                                    {/* <!--begin::Timeline item--> */}
                                    <div className="timeline-item">
                                        {/* <!--begin::Timeline line--> */}
                                        <div className="timeline-line w-40px"></div>
                                        {/* <!--end::Timeline line--> */}

                                        {/* <!--begin::Timeline icon--> */}
                                        <div className="timeline-icon symbol symbol-circle symbol-40px">
                                            <div className="symbol-label bg-light">
                                                <i className="ki-duotone ki-pencil fs-2 text-gray-500"><span className="path1"></span><span className="path2"></span></i>        </div>
                                        </div>
                                        {/* <!--end::Timeline icon--> */}

                                        {/* <!--begin::Timeline content--> */}
                                        <div className="timeline-content mb-10 mt-n1">
                                            {/* <!--begin::Timeline heading--> */}
                                            <div className="pe-3 mb-5">
                                                {/* <!--begin::Title--> */}
                                                <div className='d-flex align-items-center mt-1 fs-6'>
                                                    <div className="symbol symbol-circle symbol-25px" data-bs-toggle="tooltip" data-bs-boundary="window" data-bs-placement="top" aria-label="Marcus Dotson" data-bs-original-title="Marcus Dotson" data-kt-initialized="1">
                                                        <img className='me-5' src={ProfilePicture} alt="img" />
                                                    </div>
                                                    <div className="fs-5 fw-semibold mb-2">Kairav Patel (Physiotherapy)  </div>
                                                </div>

                                                <div className="text-muted me-2 fs-7 mt-3"> Created on Tuesday, March 14, 2023 at 4:23 PM</div>
                                                {/* <!--end::Title--> */}
                                            </div>
                                            {/* <!--end::Timeline heading--> */}

                                            {/* <!--begin::Timeline details--> */}
                                            <div className="overflow-auto pb-5">
                                                <div className="align-items-center border border-dashed border-gray-300 rounded min-w-700px p-7">
                                                    <h4>Title</h4>
                                                    <p>Description</p>
                                                </div>
                                            </div>
                                            {/* <!--end::Timeline details--> */}

                                            {/* <!--begin::Timeline details--> */}
                                            <div className="overflow-auto pb-5">
                                                <div className="d-flex align-items-center border border-dashed border-gray-300 rounded min-w-700px p-5">
                                                    {/* <!--begin::Item--> */}
                                                    <div className="d-flex flex-aligns-center pe-10 pe-lg-20">
                                                        <FontAwesomeIcon icon={faFileImage} size='4x' className='w-30px me-3 align-middle'/>
                                                            <div className="ms-1 fw-semibold">
                                                                <a href="#" className="fs-6 text-hover-primary fw-bold">Finance KPI App Documentation is Here</a>
                                                                <div className="text-gray-400">1.9mb</div>
                                                            </div>
                                                    </div>
                                                    {/* <!--end::Item--> */}
                                                </div>
                                            </div>
                                            {/* <!--end::Timeline details--> */}
                                        </div>
                                        {/* <!--end::Timeline content--> */}
                                    </div>
                                    {/* <!--end::Timeline item--> */}
                                </div>
                                {/* <!--end::Timeline--> */}
                            </div>
                            {/* <!--end::Tab panel--> */}

                            {/* <!--end::Tab panel--> */}
                        </div>
                        {/* <!--end::Tab Content--> */}
                    </div>
                    {/* <!--end::Card body--> */}
                </div>
            </div>
        </div>
    )
}

export default InnerMedicalRecords