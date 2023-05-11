import axios from "axios";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import '../../assets/css/style.bundle.css'
import FadeIn from 'react-fade-in';
import { SlideDown } from 'react-slidedown';
import 'react-slidedown/lib/slidedown.css';


const data = [
    { label: "Abdominal pain", value: 'Abdominal pain' },
    { label: "Acid regurgitation", value: 'Acid regurgitation' },
    { label: "Anemia", value: 'Anemia' },
    { label: "Back or pelvic pain", value: 'Back or pelvic pain' },
    { label: "Blackheads", value: 'Blackheads' },
    { label: "Bloating", value: 'Bloating' },
    { label: "Blood in mucus coughed", value: 'Blood in mucus coughed' },
    { label: "Blood in the stool", value: 'Blood in the stool' },
    { label: "Blood in the urine", value: 'Blood in the urine' },
    { label: "Bluish skin coloration", value: 'Bluish skin coloration' },
    { label: "Body aches", value: 'Body aches' },
    { label: "Bone pain", value: 'Bone pain' },
    { label: "changes in voice", value: 'changes in voice' },
    { label: "Chest pain", value: 'Chest pain' },
    { label: "Chest tightness or pain", value: 'Chest tightness or pain' },
    { label: "Chills", value: 'Chills' },
    { label: "Chronic cough", value: 'Chronic cough' },
    { label: "Cognitive impairment", value: 'Cognitive impairment' },
    { label: "Confusion", value: 'Confusion' },
    { label: "Confusion with time and place", value: 'Confusion with time and place' },
    { label: "Constipation", value: 'Constipation' },
    { label: "Cough", value: 'Cough' },
    { label: "Coughing up blood ", value: 'Coughing up blood ' },
    { label: "cramping", value: 'cramping' },
    { label: "Cyanosis", value: 'Cyanosis' },
    { label: "Cysts", value: 'Cysts' },
    { label: "Decreased urine output", value: 'Decreased urine output' },
    { label: "Depression and anxiety", value: 'Depression and anxiety' },
    { label: "Diarrhea", value: 'Diarrhea' },
    { label: "Difficulty breathing", value: 'Difficulty breathing' },
    { label: "Difficulty speaking", value: 'Difficulty speaking' },
    { label: "Difficulty swallowing", value: 'Difficulty swallowing' },
    { label: "Difficulty urinating", value: 'Difficulty urinating' },
    { label: "Difficulty walking or balancing", value: 'Difficulty walking or balancing' },
    { label: "Dizziness", value: 'Dizziness' },
    { label: "Double vision", value: 'Double vision' },
    { label: "Dry cough", value: 'Dry cough' },
    { label: "Dry, cracked skin that may bleed", value: 'Dry, cracked skin that may bleed' },
    { label: "Easy bruising and bleeding", value: 'Easy bruising and bleeding' },
    { label: "Elevated cholesterol levels", value: 'Elevated cholesterol levels' },
    { label: "Erectile dysfunction", value: 'Erectile dysfunction' },
    { label: "Fainting", value: 'Fainting' },
    { label: "Fatigue", value: 'Fatigue' },
    { label: "Fever", value: 'Fever' },
    { label: "Fluid accumulation in the legs", value: 'Fluid accumulation in the legs' },
    { label: "Foamy urine", value: 'Foamy urine' },
    { label: "forgetfulness", value: 'forgetfulness' },
    { label: "Frequent respiratory infections", value: 'Frequent respiratory infections' },
    { label: "Frequent urination", value: 'Frequent urination' },
    { label: "Gas", value: 'Gas' },
    { label: "Headache", value: 'Headache' },
    { label: "Heart palpitations", value: 'Heart palpitations' },
    { label: "Heartburn", value: 'Heartburn' },
    { label: "High blood pressure", value: 'High blood pressure' },
    { label: "High fever", value: 'High fever' },
    { label: "Impaired balance", value: 'Impaired balance' },
    { label: "Increased susceptibility to infections", value: 'Increased susceptibility to infections' },
    { label: "Irregular heartbeat", value: 'Irregular heartbeat' },
    { label: "Itching or burning", value: 'Itching or burning' },
    { label: "Itchy skin", value: 'Itchy skin' },
    { label: "Jaundice", value: 'Jaundice' },
    { label: "Joint pain", value: 'Joint pain' },
    { label: "Loss of appetite", value: 'Loss of appetite' },
    { label: "Loss of consciousness", value: 'Loss of consciousness' },
    { label: "Low-grade fever", value: 'Low-grade fever' },
    { label: "memory loss", value: 'memory loss' },
    { label: "Misplacing items", value: 'Misplacing items' },
    { label: "Mucus in the stool", value: 'Mucus in the stool' },
    { label: "Muscle aches", value: 'Muscle aches' },
    { label: "Muscle jerking", value: 'Muscle jerking' },
    { label: "Muscle weakness", value: 'Muscle weakness' },
    { label: "Nausea", value: 'Nausea' },
    { label: "Night sweats", value: 'Night sweats' },
    { label: "Nosebleeds", value: 'Nosebleeds' },
    { label: "Numbness", value: 'Numbness' },
    { label: "Pain in the lower abdomen", value: 'Pain in the lower abdomen' },
    { label: "Pain or burning during urination", value: 'Pain or burning during urination' },
    { label: "Pain or discomfort in the pelvic area", value: 'Pain or discomfort in the pelvic area' },
    { label: "Painful or frequent urination", value: 'Painful or frequent urination' },
    { label: "Painful urination", value: 'Painful urination' },
    { label: "Palpitations", value: 'Palpitations' },
    { label: "Persistent cough", value: 'Persistent cough' },
    { label: "Pimples", value: 'Pimples' },
    { label: "Postural instability", value: 'Postural instability' },
    { label: "Pulsating pain", value: 'Pulsating pain' },
    { label: "Racing heartbeat", value: 'Racing heartbeat' },
    { label: "Rapid breathing", value: 'Rapid breathing' },
    { label: "Rectal bleeding", value: 'Rectal bleeding' },
    { label: "Rectal pain and bleeding", value: 'Rectal pain and bleeding' },
    { label: "Red, inflamed patches of skin covered with thick, silvery scales", value: 'Red, inflamed patches of skin covered with thick, silvery scales' },
    { label: "Reduced appetite", value: 'Reduced appetite' },
    { label: "Runny nose", value: 'Runny nose' },
    { label: "Seizures", value: 'Seizures' },
    { label: "Severe headaches", value: 'Severe headaches' },
    { label: "Severe pain in the back", value: 'Severe pain in the back' },
    { label: "Shortness of breath", value: 'Shortness of breath' },
    { label: "Skin rash with itchy", value: 'Skin rash with itchy' },
    { label: "Skin rashes", value: 'Skin rashes' },
    { label: "Slow heartbeat", value: 'Slow heartbeat' },
    { label: "Slowness of movement", value: 'Slowness of movement' },
    { label: "Sneezing", value: 'Sneezing' },
    { label: "Sore throat", value: 'Sore throat' },
    { label: "Stiffness in the muscles", value: 'Stiffness in the muscles' },
    { label: "strong-smelling urine", value: 'strong-smelling urine' },
    { label: "Stuffy nose", value: 'Stuffy nose ' },
    { label: "Sudden confusion", value: 'Sudden confusion' },
    { label: "Sudden difficulty seeing", value: 'Sudden difficulty seeing' },
    { label: "Sudden numbness", value: 'Sudden numbness' },
    { label: "Sudden severe headache ", value: 'Sudden severe headache ' },
    { label: "Sudden trouble walking", value: 'Sudden trouble walking' },
    { label: "Sweating", value: 'Sweating' },
    { label: "Sweating and shaking chills", value: 'Sweating and shaking chills' },
    { label: "Sweats", value: 'Sweats' },
    { label: "Swelling in the abdomen", value: 'Swelling in the abdomen' },
    { label: "Swelling in the legs, ankles, and feet", value: 'Swelling in the legs, ankles, and feet' },
    { label: "Swollen and stiff joints", value: 'Swollen and stiff joints' },
    { label: "Swollen lymph nodes", value: 'Swollen lymph nodes' },
    { label: "Temporary confusion or memory loss", value: 'Temporary confusion or memory loss' },
    { label: "Thickened, pitted or ridged nails", value: 'Thickened, pitted or ridged nails' },
    { label: "Tonsils", value: 'Tonsils' },
    { label: "Tremors", value: 'Tremors ' },
    { label: "Trouble speaking", value: 'Trouble speaking' },
    { label: "Urgency to defecate", value: 'Urgency to defecate' },
    { label: "Urgency to urinate", value: 'Urgency to urinate' },
    { label: "Urinary incontinence", value: 'Urinary incontinence' },
    { label: "Urinary tract infections", value: 'Urinary tract infections' },
    { label: "Vision problems", value: 'Vision problems' },
    { label: "Visual disturbances, such as flashing lights or zigzag lines", value: 'Visual disturbances, such as flashing lights or zigzag lines' },
    { label: "Vomiting", value: 'Vomiting' },
    { label: "Weak or interrupted urine flow", value: 'Weak or interrupted urine flow' },
    { label: "Weakness", value: 'Weakness' },
    { label: "Weight gain", value: 'Weight gain' },
    { label: "Weight loss", value: 'Weight loss' },
    { label: "Wheezing", value: 'Wheezing' },
    { label: "Whiteheads", value: 'Whiteheads' },
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
    // const SympArray = []
    // const SelectArray = APIData?.data.map(item => SympArray.push([...item.symptoms]))
    // console.log("SympArray",SympArray)
    // const finalArray = [...new Set(SympArray.flat(Infinity))]
    // console.log("FinalArray", finalArray)


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