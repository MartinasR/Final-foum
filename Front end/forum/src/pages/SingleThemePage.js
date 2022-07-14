import React, {useEffect, useState} from 'react';
import {useParams} from "react-router";
import MessageInputComp from "../components/MessageInputComp/MessageInputComp";
import AnswerComp from "../components/AnswerComp/AnswerComp";
import Pagination from "../components/Pagination/Pagination";

const SingleThemePage = ({user, setUser}) => {
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage] = useState(10)
    const {id} = useParams()
    const [item, setItem] = useState()
    const [answers, setAnswers] = useState([])
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = answers.slice(indexOfFirstPost, indexOfLastPost)
    const paginate = (x) => {
        setCurrentPage(x)
        getAnswers()
    }

    useEffect(() => {
        getSingle()
        getAnswers()
    }, []);

    async function getSingle() {
        let email;
        if (user) {
            email = user.email
        } else email = null
        const body = {
            email: email
        }
        const options = {
            method: "Post",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(body)
        }
        const res = await fetch(`http://localhost:4000/getSingle/${id}`, options)
        const data = await res.json().catch(e => {
            console.log(e)
        })
        setItem(data.singleTheme)
    }

    async function getAnswers() {
        const res = await fetch(`http://localhost:4000/getAnswersById/${id}`)
        const data = await res.json().catch(e => {
            console.log(e)
        })
        setAnswers(data.answers)
    }

    const mappAnswers = currentPosts.map((x, i) => {
        return <AnswerComp key={i} x={x}/>
    })
    return (
        <>
            <div className='container  p-0 mt-5'>
                <div className='shadow'>
                    {item && <div className="cardTop d-flex">
                        <div className='w-50'>Tema: <span style={{fontWeight: '600'}}>{item.title}</span></div>
                        <div className='w-25'>Autorius: <span style={{fontWeight: '600'}}>{item.email}</span></div>
                        <div className='w-25'>Atsakymai: <span style={{fontWeight: '600'}}>{item.answers}</span></div>
                    </div>}
                    {answers && mappAnswers}
                </div>

                <div style={{position: 'relative', top: '-87px', left: '0'}}>
                    {answers.length > postsPerPage &&
                    <Pagination paginate={paginate} postsPerPage={postsPerPage} totalPosts={answers.length}/>}
                </div>
            </div>
            {user && item ? <MessageInputComp setUser={setUser} getSingle={getSingle} itemAnswers={item.answers}
                                              getAnswers={getAnswers} user={user} id={id}/> : null}
        </>
    );
};

export default SingleThemePage;
