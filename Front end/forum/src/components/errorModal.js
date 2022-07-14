import React from 'react';
import {Button, CloseButton} from "react-bootstrap";


const ErrorModal = ({text, setModal}) => {

    function closeModal() {
        document.body.style.overflow = 'visible';
        setModal(false);
    }

    return (
        <div className='modalWindow d-flex justify-content-center align-items-center'>
            <div className='modalCard shadow d-flex flex-column align-items-center justify-content-center'>
                <h2 style={{color: 'black', margin: '20px 0', textAlign: 'center'}}>{text}</h2>
                <Button onClick={closeModal} className='modalCardBtn btn-outline-dark'>Supratau</Button>
                <CloseButton className='CloseButton' onClick={closeModal}/>
            </div>
        </div>
    );
};

export default ErrorModal;