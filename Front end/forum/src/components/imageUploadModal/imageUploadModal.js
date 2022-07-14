import React, {useState} from 'react';
import './style.css';
import {CloseButton} from "react-bootstrap";


const ImageUploadModal = ({setModal, user, findUser}) => {
    const [previewSource, setPreviewSource] = useState('https://gladstoneentertainment.com/wp-content/uploads/2018/05/avatar-placeholder.gif')
    const [loading, setLoading] = useState(false)

    function previewFile(file) {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = async () => {
            setPreviewSource(reader.result)
        }
    }

    const handleFileInputChange = (e) => {
        const file = e.target.files[0]
        previewFile(file)

    }

    const uploadImage = async () => {
        setLoading(true)
        const theme = {
            image: previewSource,
            email: user.email
        }
        const options = {
            method: "Post",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(theme)
        }

        const res = await fetch('http://localhost:4000/uploadPicture', options)
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
            {!loading ? <div
                className='modalCard justify-content-between d-flex flex-column justify-content-center align-items-center'>
                {previewSource && <img src={previewSource} alt="preview"/>}
                <div className='d-flex w-100 h-25 flex-column'>
                    <label style={{marginTop: '10px'}}
                           className='updateButton w-100'
                           role='button'
                           htmlFor='ImageAdd'
                    >
                        Pasirinkti nuotrauką
                        <input
                            onChange={handleFileInputChange}
                            id='ImageAdd'
                            type='file'
                            multiple
                            accept='image/png, image/gif, image/jpeg'
                            style={{display: 'none'}}
                        />
                    </label>
                    <div style={{marginTop: '10px'}} onClick={uploadImage} className='updateButton w-100'>Ikelti
                        nuotrauka
                    </div>
                </div>

                <CloseButton className='CloseButton' onClick={closeModal}/>
            </div> : <div className="loader">
                <div className="inner one"/>
                <div className="inner two"/>
                <div className="inner three"/>
            </div>}

        </div>
    );
};

export default ImageUploadModal;
