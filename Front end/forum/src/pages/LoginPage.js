import React, {useRef, useState} from 'react';
import {Button} from "react-bootstrap";
import {useNavigate} from "react-router";

const LoginPage = ({setUser}) => {
    const navigate = useNavigate()
    const emailRef = useRef()
    const passwordOne = useRef()
    const [warning, setWarning] = useState()

    async function login() {
        const user = {
            email: emailRef.current.value,
            password: passwordOne.current.value,
        }
        const options = {
            method: "Post",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(user)
        }

        const res = await fetch('http://localhost:4000/login', options)
        const data = await res.json().catch(e => {
            console.log(e)
        })
        if (data.success) {
            setUser(data.user)
            navigate('/profile')
        } else setWarning(data.message)
    }
    return (
        <div className='home-page justify-content-center align-items-center d-flex'>
            <div className='login shadow d-flex flex-column align-items-center justify-content-center'>
                <h3>Prisijungti</h3>
                <input ref={emailRef} type="text" placeholder='el. paštas'/>
                <input ref={passwordOne} type="password" placeholder='slaptažodis'/>
                <Button onClick={login} className=' btn-outline-dark'>Prisijungti</Button>
                <div onClick={() => navigate('/register')} className='reg-btn'>Registruotis</div>
                {warning && <div style={{color: 'red', marginTop: '20px'}}>{warning}</div>}
            </div>
        </div>
    );
};

export default LoginPage;
