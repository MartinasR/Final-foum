import React, {useEffect, useState} from 'react';
import ThemeCard from "../components/ThemeCard/ThemeCard";
import AnswerComp from "../components/AnswerComp/AnswerComp";
import ImageUploadModal from "../components/imageUploadModal/imageUploadModal";
import {useNavigate} from "react-router";
import EmailModal from "../components/imageUploadModal/emailModal";
import Pagination from "../components/Pagination/Pagination";

const ProfilePage = ({user}) => {
    const [user1, setUser] = useState()
    const [myThemes, setMyThemes] = useState([])
    const [myAnswers, setMyAnswers] = useState([])
    const [trigger, setTrigger] = useState(false)
    const [regTime, setRegTime] = useState()
    const [modal, setModal] = useState()
    const [emailModal, setEmailModal] = useState(false)
    const navigate = useNavigate()
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage] = useState(10)
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = myAnswers.slice(indexOfFirstPost, indexOfLastPost)
    const paginate = (x) => {
        setCurrentPage(x)
        getUserAnswers()
    }
    useEffect(() => {
        if (user === null) {
            return navigate('/')
        }
        if (user) {
            setRegTime(new Date(user.regTimestamp))
        }
        findUser()
        getUserThemes()
    }, [user])


    async function getUserThemes() {
        const res = await fetch('http://localhost:4000/getUserThemes/' + user.email)
        const data = await res.json().catch(e => {
            console.log(e)
        })
        setMyThemes(data.allThemes)
    }

    async function getUserAnswers() {
        const res = await fetch('http://localhost:4000/getUserAnswers/' + user.email)
        const data = await res.json().catch(e => {
            console.log(e)
        })
        if (data.success) {
            setMyAnswers(data.allAnswers)
            setTrigger(true)
        }
    }

    function myAnswersBtn() {
        getUserAnswers()
    }

    let mappedAnswers;
    if (myAnswers.length > 0) {
        mappedAnswers = currentPosts.map((x, i) =>
            <AnswerComp key={i} x={x}/>
        )
    }

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
    }

    const mappedProducts = myThemes.map((x, i) => <ThemeCard user={user} key={i} item={x}/>)
    return (
        <div className='container'>
            {user1 && <div className="userCard column shadow d-flex justify-content-around">
                <div className=' w-m-100 text-center column align-items-center d-flex'>
                    <img src={user1.profileImage} alt=""/>
                    <div className='d-flex flex-column justify-content-between padding w-100 h-100 '>
                        <div className='w-auto text-start'>
                            <div style={{marginBottom: '10px'}}>Vartotojo el. pašto adresas: <span
                                style={{fontWeight: '600'}}>{user1.email}</span></div>
                            <div style={{marginBottom: '10px'}}>Registruotas nuo: <span
                                style={{fontWeight: '600'}}>{regTime.toLocaleDateString("lt-LT")} {regTime.toLocaleTimeString("lt-LT")}</span>
                            </div>
                            <div style={{marginBottom: '10px'}}>Sukūrė temų: <span
                                style={{fontWeight: '600'}}>{user1.themesCreated}</span></div>
                            <div style={{marginBottom: '10px'}}>Parašė atsakymų: <span
                                style={{fontWeight: '600'}}>{user1.answers}</span></div>
                        </div>
                        <div className='d-flex column w-100 justify-content-between'>
                            <div onClick={() => setTrigger(false)}
                                 className='updateButton m-10'>Mano sukurtos temos
                            </div>
                            <div onClick={() => myAnswersBtn()}
                                 className='updateButton m-10'>Mano parasyti atsakymai
                            </div>
                        </div>
                    </div>
                </div>
                <div className='d-flex btn-w25 flex-column justify-content-between'>
                    <div onClick={() => setModal(true)} className='updateButton'>Pakeisti profilio nuotrauką</div>
                    <div onClick={() => setEmailModal(true)} className='updateButton'>Pakeisti el. pašto adresą</div>
                    <div onClick={() => navigate('/productUpload')} className='updateButton'>Kurti naują temą</div>
                </div>
            </div>}
            {!trigger ?
                <div className='d-flex flex-column shadow mb-5 align-items-center'>
                    <h1 className='mt-5 mb-5'>Mano sukurtos temos</h1>
                    <div style={{backgroundColor: '#808080'}} className='cardTop justify-content-between display-no'>
                        <div className='themeWidth'>Tema:</div>
                        <div className='w-sm-100'>Sukūrė:</div>
                        <div className='answerWidth'>Atsakymai:</div>
                        <div className='w-sm-100'>Sukurimo data:</div>
                        <div style={{marginRight: "20px"}} className='w-sm-100'>Paskutinis atsakymas nuo:</div>
                    </div>
                    {myThemes.length < 1 ?
                        <div className='mt-5 d-flex justify-content-center align-items-center mb-5'>nėra sukurtų
                            temų</div> : <div className='w-100 shadow'>{mappedProducts}</div>}
                </div> : <div>{myAnswers.length < 1 ?
                    <div className='mt-5 d-flex justify-content-center align-items-center mb-5'>nėra parasytu
                        atsakymu</div> : <div className='w-100 mb-5 shadow d-flex flex-column align-items-center'>
                        <h1 className='mt-5 mb-5'>Mano parašyti atsakymai</h1>
                        <div className='w-100 mb-0'>{mappedAnswers}</div>
                    </div>}
                    <div style={{position: 'relative', top: '-40px', left: '0'}}>
                        {myAnswers.length > postsPerPage &&
                        <Pagination paginate={paginate} postsPerPage={postsPerPage} totalPosts={myAnswers.length}/>}
                    </div>
                </div>}
            {modal && <ImageUploadModal findUser={findUser} user={user} setModal={setModal}/>}
            {emailModal && <EmailModal findUser={findUser} user={user} setModal={setEmailModal}/>}
        </div>
    );
};

export default ProfilePage;
