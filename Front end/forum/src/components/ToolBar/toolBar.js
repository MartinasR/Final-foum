import React from 'react';
import {useNavigate} from "react-router";
import './style.css'
import {
    BoxArrowInLeft,
    BoxArrowInRight,
    BoxArrowRight, HeartFill,
    HouseFill,
    PersonBoundingBox,
    PlusSquare, StarFill
} from 'react-bootstrap-icons';

const ToolBar = ({user, setUser, favorites}) => {
    const navigate = useNavigate()
    async function logOut () {
        setUser(null)
        navigate('/')
    }
    return (
        <div className='toolbar shadow d-flex justify-content-between'>
            <div className='button' onClick={()=> navigate('/')}>Pagrindinis <HouseFill style={{marginBottom: '5px'}} /></div>
            {!user ? <div className='d-flex'>
                <div className='button' onClick={()=> navigate('/login')}>Prisijungti <BoxArrowInRight style={{marginBottom: '4px'}} /></div>
                <div className='button' onClick={()=> navigate('/register')}>Registracija <BoxArrowInLeft style={{marginBottom: '4px'}} /></div>
                {favorites.length > 0 ? <div className='button' onClick={() => navigate('/favorites')}>Favoritai <StarFill style={{marginBottom: '4px'}}/> {favorites.length} </div> : null}
            </div>: <div className='d-flex'>
                <div className='button' onClick={() => navigate(('/productUpload'))}>Kurti naują temą <PlusSquare style={{marginBottom: '4px'}} /></div>
                <div className='button' onClick={() => navigate(('/profile'))}>Profilis <PersonBoundingBox style={{marginBottom: '4px'}} /></div>
                <div className='button' onClick={() => logOut()}>Atsijungti <BoxArrowRight style={{marginBottom: '4px'}} /></div>
                {favorites.length > 0 ? <div className='button' onClick={() => navigate('/favorites')}>Favoritai <StarFill style={{marginBottom: '4px'}}/> {favorites.length} </div> : null}
            </div>}

        </div>
    );
};

export default ToolBar;
