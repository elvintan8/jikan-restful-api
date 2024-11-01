import React from 'react'
import { useGlobalContext } from '../context/global'
import Popular from './Popular'
import styled from 'styled-components'
import Upcoming from './Upcoming'
import Airing from './Airing'

function Homepage() {

    const { handleSubmit, 
        search, 
        searchAnime,
        handleChange,
        getUpcomingAnime,
        getAiringAnime,
        getPopularAnime,
    } = useGlobalContext()

    const [rendered, setRendered] = React.useState('popular')

    const switchComponent = () => {
        switch(rendered){
            case 'popular':
                return <Popular rendered={rendered} />
            case 'airing':
                return <Airing rendered={rendered} />
            case 'upcoming':
                return <Upcoming rendered={rendered} />
            default:
                return <Popular rendered={rendered} />
        }
    }

    return (
        <HomepageStyled>
            <header>
                <div className="logo">
                    <h1>
                        {rendered === 'popular' ? 'Konichiwa Elvin' : 
                        rendered === 'airing' ? 'Airing Anime' : 'Upcoming Anime'}
                    </h1>
                </div>
                <div className="search-container">
                    <div className="filter-btn popular-filter">
                        <button className="blink" onClick={() => {
                            setRendered('popular')
                        }}>Popular<i className="fas fa-fire"></i></button>
                    </div>
                    <form action="" className="search-form" onSubmit={handleSubmit}>
                        <div className="input-control">
                            <input type="text" placeholder="Search Anime" value={search} onChange={handleChange} />
                            <button type="submit">Search</button>
                        </div>
                    </form>
                    <div className="filter-btn airing-filter">
                        <button className="blink" onClick={() => {
                            setRendered('airing')
                            getAiringAnime()
                        }}>Airing</button>
                    </div>
                    <div className="filter-btn upcoming-filter">
                        <button className="blink" onClick={() => {
                            setRendered('upcoming')
                            getUpcomingAnime()
                        }}>Upcoming</button>
                    </div>
                </div>
            </header>
            {switchComponent()}
        </HomepageStyled>
    )
}

const HomepageStyled = styled.div`
    background: linear-gradient(45deg, rgb(255, 0, 0), rgb(255, 165, 0), rgb(255, 255, 0), rgb(0, 255, 0), rgb(0, 0, 255), rgb(75, 0, 130), rgb(148, 0, 211));
    background-size: 300% 300%;
    animation: gradientAnimation 10s ease infinite;

    @keyframes gradientAnimation {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
    }

    header {
        padding: 2rem 5rem;
        width: 60%;
        margin: 0 auto;
        transition: all .4s ease-in-out;

        @media screen and (max-width: 1530px) {
            width: 95%;
        }

        .logo {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 2rem;

            h1 {
                color: black; /* Warna teks logo */
                font-family: 'Georgia', serif; /* Ganti dengan font elegan */
                font-size: 4rem; /* Ukuran font lebih besar untuk menonjol */
                letter-spacing: 2px; /* Spasi huruf untuk tampilan yang lebih halus */
                text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5); /* Tambahkan bayangan teks */
                animation: blink 1s infinite; /* Terapkan animasi kelap-kelip */
                text-transform: uppercase; /* Ubah teks menjadi huruf kapital */
            }
        }

        .search-container {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 1rem;

            button {
                display: flex;
                align-items: center;
                gap: .5rem;
                padding: .7rem 1.5rem;
                outline: none;
                border-radius: 30px;
                font-size: 1.2rem;
                background-color: #ff8000; /* Warna latar belakang tombol */
                cursor: pointer;
                transition: all .4s ease-in-out;
                font-family: inherit;
                border: 5px solid #ffffff; /* Ganti border menjadi putih */
                color: black; /* Mengubah warna teks tombol menjadi hitam */
                
                &:hover {
                    background-color: #ff9000; /* Warna latar belakang saat hover */
                }

                &.blink {
                    animation: blink-light 1s infinite alternate; /* Terapkan animasi kelap-kelip */
                }
            }

            form {
                position: relative;
                width: 100%;

                .input-control {
                    position: relative;
                    transition: all .4s ease-in-out;
                }

                .input-control input {
                    width: 100%;
                    padding: .7rem 1rem;
                    border: none;
                    outline: none;
                    border-radius: 30px;
                    font-size: 1.2rem;
                    background-color: rgba(255, 255, 255, 0.8); /* Warna latar belakang input */
                    border: 5px solid rgba(255, 255, 255, 0.5); /* Ganti dengan warna border lebih lembut */
                    transition: all .4s ease-in-out;

                    &::placeholder {
                        color: #999; /* Warna placeholder yang lembut */
                    }
                }

                .input-control button {
                    position: absolute;
                    right: 0;
                    top: 50%;
                    transform: translateY(-50%);
                }
            }
        }
    }

    /* Definisi animasi kelap-kelip */
    @keyframes blink {
        0%, 100% { opacity: 1; } /* Teks terlihat */
        50% { opacity: 0; } /* Teks tidak terlihat */
    }

    /* Definisi animasi kelap-kelip untuk tombol */
    @keyframes blink-light {
        0% { background-color: rgba(255, 128, 0, 0.8); color: black; } /* Warna asli dengan transparansi */
        100% { background-color: rgba(255, 255, 0, 0.8); color: black; } /* Warna kuning dengan transparansi */
    }
`

export default Homepage
