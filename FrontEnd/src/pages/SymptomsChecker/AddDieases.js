import React, { useState } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '../../assets/css/style.bundle.css'
import axios from 'axios';


function AddDieases() {
    const [diseases, setDiseases] = useState({
        dname: "",
        symp: "",
        symptoms: []
    })

    const onTitleChange = e => {
        const { name, value } = e.target
        setDiseases({
            ...diseases,
            [name]: value
        })
        console.log("Before Clickeddd", diseases)
    }
    const onAddSymptoms = () => {
        if (diseases.symp) {
            diseases.symptoms.push(diseases.symp)
        }
        diseases.symp = ""
        console.log("After Clickedddd", diseases)
        const getvalue = document.getElementById("floatingInputSymptoms");
        if (getvalue.value !== "") {
            getvalue.value = ""
        }
    }


    const onSubmit = () => {
        
        axios.post("http://localhost:9002/AddDieases", diseases)
            .then(res => {
                alert(res.data.message)
                window.location.reload()
            })

    }

    return (
        <div className='container'>
            <div className="form-floating mb-7 mt-10">
                <input type="text" className="form-control" name='dname' id="floatingInput" onChange={onTitleChange} placeholder="Ex. Common Cold" />
                <label htmlFor="floatingInput">Name of Diseases</label>
            </div>
            <p>Symptoms = {diseases.symptoms.map((data, idx) => {
               return <li key={idx}>{data}</li>
            })}</p>
            <div className="form-floating mb-7 mt-10">
                <input type="text" className="form-control" name='symp' id="floatingInputSymptoms" onChange={onTitleChange} placeholder="Ex. Fever" />
                <label htmlFor="floatingInput">Add Symptoms</label>
                <button onClick={onAddSymptoms} className="btn btn-primary mt-5">Add</button>
            </div>
            <CKEditor
                name='description'
                editor={ClassicEditor}
                data=""
                onReady={editor => {
                    // You can store the "editor" and use when it is needed.
                    console.log('Editor is ready to use!', editor);
                }}
                onChange={(event, editor) => {
                    const data = editor.getData();
                    setDiseases({
                        ...diseases,
                        description: data
                    })
                    console.log(diseases);
                }}
                onBlur={(event, editor) => {
                    console.log('Blur.', editor);
                }}
                onFocus={(event, editor) => {
                    console.log('Focus.', editor);
                }}
            />
            <button type="button" onClick={onSubmit} className="btn btn-primary mt-5">Submit</button>
        </div>
    )
}

export default AddDieases