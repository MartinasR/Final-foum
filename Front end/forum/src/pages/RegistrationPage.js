import React, {useRef, useState} from 'react';
import {Button} from "react-bootstrap";
import {useNavigate} from "react-router";

const RegistrationPage = () => {
    const [warning, setWarning] = useState()
    const navigate = useNavigate()
    const emailRef = useRef()
    const passwordOne = useRef()
    const passwordTwo = useRef()

    const Registration = async () => {
        const user = {
            email: emailRef.current.value,
            passwordOne: passwordOne.current.value,
            passwordTwo: passwordTwo.current.value
        }
        const options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(user)
        }
        if (user.email.length < 0) {return setWarning('neteisingai ivesti duomenys')}
        if (user.passwordOne.length < 5) {return setWarning('neteisingai ivesti duomenys')}
        if (user.passwordTwo.length < 5) {return setWarning('neteisingai ivesti duomenys')}
        await fetch('http://localhost:4000/register', options)
            .then(res => res.json())
            .then(data => {
                if (!data.success) {
                   return setWarning(data.message)
                } else {
                    navigate('/login')
                }
            })
    }


    return (
        <div className='home-page flex-column justify-content-center align-items-center d-flex'>
            <div className='login shadow d-flex flex-column align-items-center justify-content-center'>
                <h3>Registracija</h3>
                <input ref={emailRef} type="text" placeholder='el. paštas'/>
                <input ref={passwordOne} type="password" placeholder='slaptažodis'/>
                <input ref={passwordTwo} type="password" placeholder='slaptažodžio patvirtinimas'/>
                <Button onClick={Registration} className=' btn-outline-dark'>Registruotis</Button>
                {warning && <div style={{color: 'red', marginTop: '25px'}}>{warning}</div>}
            </div>
        </div>
    );
};

export default RegistrationPage;
