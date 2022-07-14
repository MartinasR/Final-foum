import React, {useEffect, useRef, useState} from 'react';
import './style.css'
import ErrorModal from "../errorModal";

const MessageInputComp = ({user, id, getAnswers, setUser, itemAnswers, getSingle}) => {
    const textRef = useRef()
    const email = user.email
    const [modal, setModal] = useState(false)
    const [message, setMessage] = useState('')
    useEffect(() => {
        findUser()
        getSingle()
        getAnswers()
    }, [])

    async function findUser() {
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
    }

    async function send() {
        const text = textRef.current.value
        const body = {
            text,
            email: user.email,
            item: id,
            answers: user.answers,
            itemAnswers: itemAnswers
        }
        const options = {
            method: "Post",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(body)
        }

        const res = await fetch('http://localhost:4000/sendAnswer', options)
        const data = await res.json().catch(e => {
            console.log(e)
        })
        if (data.success) {
            textRef.current.value = ''
            setUser(data.oldDocument)
            findUser()
            getSingle()
            getAnswers()
        } else {
            setModal(true)
            setMessage(data.message)
        }
    }

    return (
        <div className='messageInput d-flex'>
            <input ref={textRef} className='messageInp' placeholder='jūsų tekstas...' type="text"/>
            <div onClick={send} className='btn-send d-flex align-items-center justify-content-center'>Siųsti atsakymą
            </div>
            {modal && <ErrorModal text={message} setModal={setModal}/>}
        </div>
    );
};

export default MessageInputComp;
