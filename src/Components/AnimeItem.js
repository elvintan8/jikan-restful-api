import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import styled from 'styled-components'

function AnimeItem() {
    const {id} = useParams()

    //state
    const [anime, setAnime] = React.useState({})
    const [characters, setCharacters] = React.useState([])
    const [showMore, setShowMore] = React.useState(false)

    //destructure anime
    const {
        title, synopsis, 
        trailer,duration,aired, 
        season, images, rank, 
        score,scored_by, popularity, 
        status, rating, source } = anime

    //get anime based on id
    const getAnime = async (anime) => {
        const response = await fetch(`https://api.jikan.moe/v4/anime/${anime}`)
        const data = await response.json()
        setAnime(data.data)
    }

    //get characters
    const getCharacters = async (anime) => {
        const response = await fetch(`https://api.jikan.moe/v4/anime/${anime}/characters`)
        const data = await response.json()
        setCharacters(data.data)
        console.log(data.data)
    }


    //initial render
    useEffect(() => {
        getAnime(id)
        getCharacters(id)
    }, [])

    return (
        <AnimeItemStyled>
            <h1>{title}</h1>
            <div className="details">
                <div className="detail">
                    <div className="image">
                        <img src={images?.jpg.large_image_url} alt="" />
                    </div>
                    <div className="anime-details">
                        <p><span>Aired:</span><span>{aired?.string}</span></p>
                        <p><span>Rating:</span><span>{rating}</span></p>
                        <p><span>Rank:</span><span>{rank}</span></p>
                        <p><span>Score:</span><span>{score}</span></p>
                        <p><span>Scored By:</span><span>{scored_by}</span></p>
                        <p><span>Popularity:</span><span>{popularity}</span></p>
                        <p><span>Status:</span><span>{status}</span></p>
                        <p><span>Source:</span><span>{source}</span></p>
                        <p><span>Season:</span><span>{season}</span></p>
                        <p><span>Duration:</span><span>{duration}</span></p>
                    </div>
                </div>
                <p className="description">
                    {showMore ? synopsis : synopsis?.substring(0, 450) + '...'}
                    <button onClick={() => {
                        setShowMore(!showMore)
                    }}>{showMore ? 'Show Less': 'Read More'}</button>
                </p>
            </div>
            <h3 className="title">Trailer</h3>
            <div className="trailer-con">
                {trailer?.embed_url ? 
                    <iframe 
                        src={trailer?.embed_url} 
                        title="Inline Frame Example"
                        width="800"
                        height="450"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen>
                    </iframe> :
                    <h3>Trailer not available</h3>
                }
            </div>
                
        </AnimeItemStyled >
    )
}

const AnimeItemStyled = styled.div`
    padding: 3rem 18rem;
    background: linear-gradient(45deg, #A3C4F3, #C8E3D4, #F5D5CB, #EAD1DC);
    background-size: 300% 300%;
    animation: gradientAnimation 10s ease infinite;
    font-family: 'Poppins', sans-serif; /* Tambahkan font yang lebih modern */

    @keyframes gradientAnimation {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
    }

    h1 {
        display: inline-block;
        font-size: 2.5rem;
        margin-bottom: 1.5rem;
        cursor: pointer;
        background: linear-gradient(to right, #6FBF73, #A3C4F3);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        font-weight: 700;
        font-family: 'Georgia', serif; /* Tambahkan font serif untuk kesan elegan */
        transition: all .4s ease-in-out;
        &:hover {
            transform: skew(-3deg);
        }
    }

    .title {
        display: inline-block;
        margin: 3rem 0;
        font-size: 1.8rem;
        cursor: pointer;
        background: linear-gradient(to right, #6FBF73, #A3C4F3);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        font-weight: 600;
    }

    .description {
        margin-top: 2rem;
        color: #5A6A73; /* Warna kalem untuk teks */
        font-size: 1.1rem;
        line-height: 1.8rem;
        font-family: 'Roboto', sans-serif;
        button {
            background-color: transparent;
            border: none;
            outline: none;
            cursor: pointer;
            font-size: 1rem;
            color: #6FBF73;
            font-weight: 600;
            font-family: 'Poppins', sans-serif;
        }
    }

    .trailer-con {
        display: flex;
        justify-content: center;
        align-items: center;
        iframe {
            outline: none;
            border: 3px solid #d3dbe2;
            padding: 1rem;
            border-radius: 10px;
            background-color: #FFFFFF;
        }
    }

    .details {
        background-color: #F8F9FA;
        border-radius: 20px;
        padding: 2rem;
        border: 3px solid #d3dbe2;
        font-size: 1rem;
        .detail {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            img {
                border-radius: 7px;
            }
        }
        .anime-details {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            p {
                display: flex;
                gap: 1rem;
                color: #4a5568;
            }
            p span:first-child {
                font-weight: 600;
                color: #6FBF73;
                font-family: 'Poppins', sans-serif;
            }
        }
    }

    .characters {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        grid-gap: 2rem;
        background-color: #F8F9FA;
        padding: 2rem;
        border-radius: 20px;
        border: 3px solid #d3dbe2;
        .character {
            padding: .4rem .6rem;
            border-radius: 7px;
            background-color: #EDEDED;
            transition: all .4s ease-in-out;
            img {
                width: 100%;
            }
            h4 {
                padding: .5rem 0;
                color: #4a5568;
                font-family: 'Georgia', serif;
                font-weight: 600;
            }
            p {
                color: #6FBF73;
                font-family: 'Roboto', sans-serif;
                font-weight: 500;
            }
            &:hover {
                transform: translateY(-5px);
            }
        }
    }
`;



export default AnimeItem