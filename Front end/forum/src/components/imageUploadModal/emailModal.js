import React, {useRef, useState} from 'react';
import './style.css';
import {Button, CloseButton} from "react-bootstrap";


const EmailModal = ({setModal, user, findUser}) => {
    const [loading, setLoading] = useState(false)
    const emailRef = useRef()

    const changeEmail = async () => {
        setLoading(true)
        const newEmail = emailRef.current.value
        const body = {
            newEmail,
            oldEmail: user.email
        }
        const options = {
            method: "Post",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(body)
        }

        const res = await fetch('http://localhost:4000/changeEmail', options)
        const data = await res.json().catch(e => {
            console.log(e)
        })
        if (data.success) {
            findUser()
            setLoading(false)
            setModal(false)
        }
    }

    function closeModal() {
        document.body.style.overflow = 'visible';
        setModal(false);
    }

    return (
        <div className='modalWindow d-flex justify-content-center align-items-center'>
            {!loading ? <div className='modalCard shadow d-flex flex-column align-items-center justify-content-center'>
                <h4 style={{marginBottom: "50px"}}>Įveskite naują el. pašto adresą</h4>
                <input ref={emailRef} type="text" placeholder='el. paštas'/>
                <Button onClick={() => changeEmail()} className='modalCardBtn btn-outline-dark'>Pakeisti</Button>
                <CloseButton className='CloseButton' onClick={closeModal}/>
            </div> : <div className="loader">
                <div className="inner one"/>
                <div className="inner two"/>
                <div className="inner three"/>
            </div>}

        </div>
    );
};

export default EmailModal;