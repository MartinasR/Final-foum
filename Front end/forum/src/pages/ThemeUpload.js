import React, {useEffect, useRef, useState} from 'react';
import {useNavigate} from "react-router";
import ErrorModal from "../components/errorModal";

const ThemeUpload = ({user, setUser}) => {
    const navigate = useNavigate()
    const [warning, setWarning] = useState()
    const [modal, setModal] = useState(false)
    const [message, setMessage] = useState('')
    const refs = {
        title: useRef(),
    }

    const [user1, setUser1] = useState()

    async function findUser() {
        const email = user.email
        const options = {
            method: "Post",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({email})
        }

        const res = await fetch('http://localhost:4000/findUser', options)
        const data = await res.json().catch(e => {
            console.log(e)
        })
        setUser(data.user)
        setUser1(data.user)
    }

    useEffect(() => {
        findUser()
    }, [])


    async function upload() {
        if (refs.title.current.value.length < 1) {
            return setWarning("pavadinias per trumpas")
        }
        const theme = {
            title: refs.title.current.value,
            email: user1.email,
            themesCreated: user1.themesCreated
        }
        const options = {
            method: "Post",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({theme})
        }

        const res = await fetch('http://localhost:4000/upload', options)
        const data = await res.json().catch(e => {
            console.log(e)
        })
        if (data.success) {
            setUser(data.oldDocument)
            navigate('/')
        } else {
            setModal(true)
            setMessage(data.message)
        }
    }

    return (
        <div className='vh-100 d-flex flex-column justify-content-center align-items-center'>
            <div className="uploadCard shadow d-flex flex-column align-items-center w50">
                <h2 className='mb-5'>Temos kūrimas</h2>
                <input ref={refs.title} type="text" id='title' placeholder='Temos pavadinimas'/>
                <div onClick={upload} className='imageUploadBtn'>Sukurti</div>
                {warning && <div style={{color: 'red', marginTop: '20px'}}>{warning}</div>}
            </div>
            {modal && <ErrorModal text={message} setModal={setModal}/>}
        </div>
    );
};

export default ThemeUpload;
