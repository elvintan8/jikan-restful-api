import React from 'react';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../context/global';
import styled from 'styled-components';
import Sidebar from './Sidebar';

function Popular({ rendered }) {
    const { popularAnime, isSearch, searchResults } = useGlobalContext();

    const conditionalRender = () => {
        let animeList = [];

        if (!isSearch && rendered === 'popular') {
            if (!popularAnime || popularAnime.length === 0) {
                return <p>No popular anime found.</p>;
            }
            animeList = popularAnime;
        } else {
            if (!searchResults || searchResults.length === 0) {
                return <p>No search results found.</p>;
            }
            animeList = searchResults;
        }

        return animeList.slice(0, 12).map((anime) => (
            <div className="anime-item" key={anime.mal_id}>
                <Link to={`/anime/${anime.mal_id}`}>
                    <img src={anime.images.jpg.large_image_url} alt={anime.title} />
                </Link>
                <div className="anime-info">
                    <h3>{anime.title}</h3>
                    <p>{anime.synopsis.slice(0, 100)}...</p>
                </div>
            </div>
        ));
    };

    return (
        <PopularStyled>
            <div className="background"></div>
            <div className="popular-anime">
                {conditionalRender()}
            </div>
            <Sidebar />
        </PopularStyled>
    );
}

const PopularStyled = styled.div`
    position: relative;
    overflow: hidden;

    .background {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #000; /* Fallback color */
        z-index: -1;

        /* 3D Hexagon Animation */
        &::before, &::after {
            content: '';
            position: absolute;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle, #80ff80 20%, transparent 20%) 50% 50%;
            animation: rotate 15s linear infinite;
            clip-path: polygon(
                50% 0%, 100% 25%, 100% 75%,
                50% 100%, 0% 75%, 0% 25%
            );
        }

        &::before {
            transform: rotate(0deg);
        }

        &::after {
            transform: rotate(60deg);
        }
    }

    .popular-anime {
        margin-top: 2rem;
        padding-top: 2rem;
        padding-bottom: 2rem;
        padding-left: 5rem;
        padding-right: 5rem; /* Padding kanan ditambahkan untuk keseimbangan */
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        grid-gap: 2rem;
        background-color: transparent; /* Make it transparent to see the background */
        
        .anime-item {
            border-radius: 7px;
            border: 5px solid #80ff80;
            display: flex;
            flex-direction: column;
            align-items: center; /* Center items */
            text-align: center; /* Center text */
            background-color: rgba(0, 0, 0, 0.5); /* Add background color for better visibility */
            padding: 1rem; /* Add padding for better spacing */
            transition: transform 0.3s; /* Add transition for hover effect */

            &:hover {
                transform: scale(1.05); /* Scale up on hover */
            }

            a {
                height: 300px; /* Set fixed height for images */
                width: 100%; /* Full width */
                border-radius: 5px;
                overflow: hidden; /* Hide overflow */
            }

            a img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                border-radius: 5px;
            }

            .anime-info {
                margin-top: 0.5rem; /* Spacing between image and text */
                color: white; /* Text color */
            }

            h3 {
                font-size: 1.2rem; /* Font size for title */
                margin: 0.5rem 0; /* Margin around title */
            }

            p {
                font-size: 0.9rem; /* Font size for synopsis */
                margin: 0; /* Remove margin */
            }
        }
    }

    @keyframes rotate {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
`;

export default Popular;
