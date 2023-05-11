import React from 'react'

function Breadcrumb(props) {
  return (
    <div className="toolbar" id="kt_toolbar">
            {/* <!--begin::Container--> */}
            <div id="kt_toolbar_container" className="container-fluid d-flex flex-stack">
                {/* <!--begin::Page title--> */}
                <div data-kt-swapper="true" data-kt-swapper-mode="prepend" data-kt-swapper-parent="{default: '#kt_content_container', 'lg': '#kt_toolbar_container'}" className="page-title d-flex align-items-center flex-wrap me-3 mb-5 mb-lg-0">
                    {/* <!--begin::Title--> */}
                    <h1 className="d-flex text-dark fw-bolder fs-3 align-items-center my-1">{props.title}</h1>
                    {/* <!--end::Title--> */}
                    {/* <!--begin::Separator--> */}
                    <span className="h-20px border-gray-300 border-start mx-4"></span>
                    {/* <!--end::Separator--> */}
                    {/* <!--begin::Breadcrumb--> */}
                    {/* <ul className="breadcrumb breadcrumb-separatorless fw-bold fs-7 my-1">
										<li className="breadcrumb-item text-muted">
											<a href="../../demo1/dist/index.html" className="text-muted text-hover-primary">Home</a>
										</li>
                    <li className="breadcrumb-item">
											<span className="bullet bg-gray-300 w-5px h-2px"></span>
										</li>
                    <li className="breadcrumb-item text-muted">Aside</li>
										<li className="breadcrumb-item">
											<span className="bullet bg-gray-300 w-5px h-2px"></span>
										</li>
										<li className="breadcrumb-item text-dark">Light Skin</li>
									</ul> */}
                    {/* <!--end::Breadcrumb--> */}
                </div>
            </div>
        </div>
  )
}

export default Breadcrumb