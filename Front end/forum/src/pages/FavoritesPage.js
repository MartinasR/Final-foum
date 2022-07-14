import React, {useEffect, useState} from 'react';
import ThemeCard from "../components/ThemeCard/ThemeCard";
import {useNavigate} from "react-router";

const FavoritesPage = ({favorites, setFavorites}) => {
    const [favoritesItems, setFavoritesItems] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        if (favorites.length < 1) {
            navigate('/')
        }
        findFavorites()
    }, [favorites])

    async function findFavorites() {
        const options = {
            method: "Post",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({favorites})
        }

        const res = await fetch('http://localhost:4000/getFavorites', options)
        const data = await res.json().catch(e => {
            console.log(e)
        })
        if (data.success) {
            setFavoritesItems(data.favoritesAll)
        }
    }
    let mappedFavorites;
    if (favoritesItems.length > 0) {
        mappedFavorites = favoritesItems.map((x, i) => <ThemeCard remove={remove} key={i} item={x} />)
    }
    function remove(itemId) {
        const filtered = favorites.filter(item => item !== itemId);
        localStorage.setItem("Favorites", JSON.stringify(filtered));
        setFavorites(JSON.parse(localStorage.getItem('Favorites')))
    }

    return (
        <div className='container shadow p-0 d-flex flex-column align-items-center mb-5'>
            <h1 className='mt-5 mb-5'>Favoritai</h1>
            <div className='cardTop justify-content-between display-no' >
                <div className='themeWidth'>Tema:</div>
                <div className='w-sm-100'>Sukūrė:</div>
                <div className='answerWidth'>Atsakymai:</div>
                <div className='w-sm-100'>Sukurimo data:</div>
                <div style={{marginRight: "20px"}} className='w-sm-100'>Paskutinis atsakymas nuo:</div>
            </div>
            {mappedFavorites}
        </div>
    );
};

export default FavoritesPage;
