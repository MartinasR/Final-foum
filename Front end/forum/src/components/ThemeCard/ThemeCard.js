import React, {useEffect, useState} from 'react';
import './style.css'
import {useNavigate} from "react-router";

const ThemeCard = ({item, setFavorites, favorites, remove, user}) => {
    const navigate = useNavigate()
    const date = new Date(item.timestamp)
    const [deleteBtn, setDeleteBtn] = useState(null)

    function addToFavorites() {
        if (!favorites.includes(item._id)) {
            setFavorites([...favorites, item._id])
        } else {
            console.log('already exists')
        }
    }

    useEffect(() => {
        if (window.location.pathname !== '/profile') {
            if (window.location.pathname === '/favorites') {
                return setDeleteBtn(<div onClick={() => remove(item._id)} className='addToFavoritesBtn'><img
                    src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fpngimg.com%2Fuploads%2Fminus%2Fminus_PNG64.png&f=1&nofb=1"
                    alt=""/></div>)
            } else setDeleteBtn(null)
            if (favorites.includes(item._id)) {
                return setDeleteBtn(<div onClick={() => remove(item._id)} className='addToFavoritesBtn'><img
                    src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fpngimg.com%2Fuploads%2Fminus%2Fminus_PNG64.png&f=1&nofb=1"
                    alt=""/></div>)
            } else setDeleteBtn(null)
        }
    }, [favorites, item._id, remove])

    return (
        <div className='d-flex w-100 productCard justify-content-between'>
            <div onClick={() => navigate(`/singleTheme/${item._id}`)}
                 className='justify-content-between productCardInside w-100 d-flex'>
                <div style={{color: '#333333', fontWeight: '600'}} className='themeWidth'>{item.title}</div>
                <div className=' w-sm-100'>{item.email}</div>
                <div className=' answerWidth'>{item.answers}</div>
                <div className=' w-sm-100'>{date.toLocaleDateString('lt-LT')} {date.toLocaleTimeString('lt-LT')}</div>
                {item.lastAnswer === '-' ? <div className=' w-sm-100'/> :
                    <div className=' w-sm-100'>{item.lastAnswer}</div>}
            </div>
            {user && user.email === item.email && item.notification && <div><img style={{width: '19px'}}
                                                                                 src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn2.iconfinder.com%2Fdata%2Ficons%2Fshopping-e-commerce-2-1%2F32%2FNotification-Alarm-Bell-Notify-512.png&f=1&nofb=1"
                                                                                 alt=""/></div>}

            {window.location.pathname !== '/favorites' && window.location.pathname !== '/profile' && !favorites.includes(item._id) ?
                <div onClick={() => addToFavorites()} className='addToFavoritesBtn'>
                    <img
                        src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn2.iconfinder.com%2Fdata%2Ficons%2Fcolor-svg-vector-icons-part-2%2F512%2Ffavourites_favorites_folder-512.png&f=1&nofb=1"
                        alt="add to favs"/>
                </div> : null}
            {deleteBtn}
        </div>
    );
};

export default ThemeCard;
