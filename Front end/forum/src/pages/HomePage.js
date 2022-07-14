import React, {useEffect, useState} from 'react';
import ThemeCard from "../components/ThemeCard/ThemeCard";

const HomePage = ({setFavorites, favorites}) => {
    const [allProds, setAllProds] = useState([])
    useEffect(async () => {
        getAllProducts()
        const data = localStorage.getItem('Favorites')
        if (data) {
            setFavorites(JSON.parse(data))
        }
    }, [])

    async function getAllProducts () {
        const res = await fetch('http://localhost:4000/getAllProducts')
        const data = await res.json().catch(e => {
            console.log(e)
        })
        if (data.success) {
            setAllProds(data.allProducts)
        }
    }

    function remove(itemId) {
        const filtered = favorites.filter(item => item !== itemId);
        localStorage.setItem("Favorites", JSON.stringify(filtered));
        setFavorites(JSON.parse(localStorage.getItem('Favorites')))
    }

    useEffect(() => {
        localStorage.setItem('Favorites', JSON.stringify(favorites))
    }, [favorites]);

    const mappedProducts = allProds.map((x, i) => <ThemeCard remove={remove} favorites={favorites} setFavorites={setFavorites} key={i} item={x} />)


    return (
        <div className='container p-0 flex-column mb-5 justify-content-center align-items-center d-flex'>
            <h1 className='mb-5 mt-5'>Pagrindinis</h1>
            <div className='cardTop shadow justify-content-between display-no' >
                <div className='themeWidth'>Tema:</div>
                <div className='w-sm-100'>Sukūrė:</div>
                <div className='answerWidth'>Atsakymai:</div>
                <div className='w-sm-100'>Sukurimo data:</div>
                <div style={{marginRight: "20px"}} className='w-sm-100'>Paskutinis atsakymas nuo:</div>
            </div>
            {allProds.length < 1 ? <div className='mt-5 d-flex justify-content-center align-items-center mb-5'>nėra sukurtų temų</div> : mappedProducts}
        </div>
    );
};

export default HomePage;
