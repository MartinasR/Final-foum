import React, {useEffect, useState} from 'react';
import YouTube from "react-youtube";

const AnswerComp = ({x}) => {
    const [user, setUser] = useState()
    const [classname, setClassName] = useState('mb-0')
    const [image, setImage] = useState(null)
    const [youtube, setYoutube] = useState(null)
    const newDate = new Date(x.timestamp)
    const date = <div>{newDate.toLocaleDateString('lt-LT')} <b>{newDate.toLocaleTimeString('lt-LT')}</b></div>
    useEffect(() => {
        findUser()
        if (window.location.pathname === '/singleTheme/' + x.item) {
            setClassName('mb-100')
        }
        setYoutube(null)
        setImage(null)
        convertText(x.answer)
    }, [x]);


    function convertText(txtData) {
        const urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
        if (txtData.match(urlRegex)) {
            if (txtData.includes('youtube')) {
                const url = txtData.match(urlRegex)
                if (url) {
                    getId(url[0])
                }
            } else setImage(txtData.match(urlRegex))
        }
        return txtData;
    }

    function getId(url) {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        if (match && match[2].length === 11) {
            setYoutube(<YouTube opts={opts} className='mt-2'
                                videoId={match[2]}
            />)
        } else setYoutube(null)
    }


    async function findUser() {
        const email = x.sender
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

    const opts = {
        height: '195',
        width: '320',
    }

    return (
        <div className={`answerComp d-flex ${classname}`}>
            {user && <div className='userSide d-flex flex-column justify-content-center'>
                <img src={user.profileImage} alt="profile_picture"/>
                <div>{user.email}</div>
                <div>Sukūrė temų: {user.themesCreated}</div>
                <div>Parašė atsakymų: {user.answers}</div>
            </div>}
            {x && <div className="d-flex flex-column answerSide">
                <div className='dateLine' style={{backgroundColor: '#dadada'}}>{date}</div>
                <div className='comment'>
                    <div>{x.answer}</div>
                    {image && <img className='mt-2' src={image} alt=""/>}
                    {youtube && youtube}
                </div>

            </div>}
        </div>
    );
};

export default AnswerComp;
