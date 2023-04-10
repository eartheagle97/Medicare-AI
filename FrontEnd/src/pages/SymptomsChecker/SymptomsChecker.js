import axios from "axios";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import '../../assets/css/style.bundle.css'
import FadeIn from 'react-fade-in';
import { SlideDown } from 'react-slidedown';
import 'react-slidedown/lib/slidedown.css';




const data = [
    { label: "Anemia", value: 'Anemia' },
    { label: "Bluish skin coloration", value: 'Bluish skin coloration' },
    { label: "Body aches", value: 'Body aches' },
    { label: "Chills", value: 'Chills' },
    { label: "Cough", value: 'Cough' },
    { label: "Diarrhea", value: 'Diarrhea' },
    { label: "Difficulty swallowing", value: 'Difficulty swallowing' },
    { label: "Fatigue", value: 'Fatigue' },
    { label: "Fever", value: 'Fever' },
    { label: "Fever (High Grade)", value: 'Fever (High Grade)' },
    { label: "Fever (Low Grade)", value: 'Fever (Low Grade)' },
    { label: "Headache", value: 'Headache' },
    { label: "Jaundice", value: 'Jaundice' },
    { label: "Loss of appetite", value: 'Loss of appetite' },
    { label: "Muscle aches", value: 'Muscle aches' },
    { label: "Nausea", value: 'Nausea' },
    { label: "Runny nose", value: 'Runny nose' },
    { label: "Seizures", value: 'Seizures' },
    { label: "Skin rash", value: 'Skin rash' },
    { label: "Sneezing", value: 'Sneezing' },
    { label: "Sore throat", value: 'Sore throat' },
    { label: "Stuffy nose", value: 'Stuffy nose' },
    { label: "Sweats", value: 'Sweats' },
    { label: "Vomiting", value: 'Vomiting' },
    { label: "Weakness", value: 'Weakness' }
];


function SymptomsChecker() {

    const [values, setValues] = useState([]);
    const [selectedValues, setSelectedValues] = useState([]);

    useEffect(() => {
        setValues(data);
    }, []);

    // const disValue = selectedValues.map((d) => <li key={d.value}>{d.value}</li>)

    const onOptionChange = (options) => {
        // Selected options...
        // console.log("options...", options);
        setSelectedValues(options)

        // const arrList = options.map(({ label, value }) => (value))
        // console.log(arrList)
    };

    const [APIData, setAPIData] = useState();
    useEffect(() => {
        axios.get('http://localhost:9002/GetDieases')
            .then(response => {
                setAPIData(response.data)
                // console.log(typeof(response.data))
            }).catch(err => console.log("Error while fetching data"))
    }, []);

    const [shownComments, setShownComments] = useState({});

    const toggleDescription = id => {
        setShownComments(prevShownComments => ({
            ...prevShownComments,
            [id]: !prevShownComments[id]
        }));
    }
    const prediction = {}
    const result = {}

    const [output, setOutput] = useState();
    const [resMax, setResMax] = useState();
    const [resMin, setResMin] = useState();



    const arrList = selectedValues.map(({ label, value }) => (value))
    console.log(Object.keys(arrList).length)
    const backendLogic = () => {
        if (Object.keys(arrList).length === 0) {
            alert('Please Select Your Symptoms.')
            setOutput('')
        } else {
            for (let i = 0; i < arrList.length; i++) {
                for (const j in APIData) {
                    for (const k in APIData[j]) {
                        if (typeof (APIData[j][k]) === 'object') {
                            for (const m in APIData[j][k]) {
                                var id = APIData[j][k]._id
                                var dname = APIData[j][k].dname
                                var description = APIData[j][k].description
                                if (typeof (APIData[j][k][m]) === 'object') {
                                    for (const n in APIData[j][k][m]) {
                                        if (arrList[i] === APIData[j][k][m][n]) {
                                            result[dname] ? result[dname]++ : result[dname] = 1
                                            prediction[dname] = {
                                                _id: id,
                                                diseasesname: dname,
                                                count: Math.floor((result[dname] * 100) / APIData[j][k][m].length),
                                                desc: description,
                                            }
                                        }
                                    }

                                }
                            }
                        }
                    }
                }
            }
            const temp = Object.entries(prediction).sort((a, b) => b[1].count - a[1].count)
            setOutput(temp)
            setResMax(temp[0][1].count)
            setResMin(temp[temp.length - 1][1].count)
        }
    }

    return (

        <div className="post d-flex flex-column-fluid" id="kt_post">
            {/* <!--begin::Container--> */}
            <div id="kt_content_container" className="container-xxl">
                <div className="card card-docs flex-row-fluid mb-2">
                    <div className="card-body fs-6 py-15 px-10 py-lg-15 px-lg-15 text-gray-700">
                        <div className="py-0">
                            <h1 className="anchor fw-bolder mb-5" id="overview">What are your symptoms?</h1>
                            <Select
                                closeMenuOnSelect={false}
                                value={selectedValues}
                                isMulti
                                options={values}
                                onChange={onOptionChange}
                                className="mb-5"
                            />
                            <button onClick={backendLogic} className="btn btn-primary btn-l btn-hover-scale">SUBMIT</button>
                            <FadeIn>
                                {
                                    output ? output.map((info =>
                                        <div className="row" key={info[0]}>
                                            <div className="col-md-12">
                                                <div className="card shadow-sm mt-10">
                                                    <div className="card-header">
                                                        <h1 className="card-title">{info[1].diseasesname}</h1>
                                                        <div className="card-toolbar">
                                                            <h5 className="me-10 mt-3">{info[1].count}% &nbsp;&nbsp;{info[1].count === resMax ? <span className="badge badge-danger">STRONG</span>
                                                                : info[1].count === resMin ? <span className="badge badge-success">FAIR</span> : <span className="badge badge-warning">MODERATE</span>}</h5>
                                                            <button type="button" onClick={() => toggleDescription(info[0])} className={`btn btn-sm ${shownComments[info[0]] ? "btn-danger" : "btn-success"}`}>
                                                                {shownComments[info[0]] ? 'Hide Description' : 'Show Description'}
                                                            </button>
                                                        </div>
                                                        <div className="d-flex flex-column w-100">
                                                            <div className="progress h-6px w-100">
                                                                <div className="progress-bar bg-primary" role="progressbar" style={{ width: `${info[1].count}%` }}></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <SlideDown className={'my-dropdown-slidedown'}>
                                                        {shownComments[info[0]] ? <div className="card-body" dangerouslySetInnerHTML={{ __html: info[1].desc }}></div> : null}
                                                    </SlideDown>
                                                </div>
                                            </div>
                                        </div>
                                    )) : ''
                                }
                            </FadeIn>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!--end::Container--> */}
        </div>
    )
}

export default SymptomsChecker