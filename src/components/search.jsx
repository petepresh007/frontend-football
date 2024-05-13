import axios from "axios";
import { football, url } from "../server";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../components/constext";
import { FaArrowLeft, FaSearch, FaServer } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

export const Search = () => {
    const [news, setNews] = useState("");
    const [searchQuery, setSearchQury] = useState("");
    const { setShowHeader } = useContext(UserContext);
    const toggleHeader = () => setShowHeader(previous => !previous);
    const navigate = useNavigate();


    async function search() {
        try {
            const { data } = await axios.get(`${football}/search/?query=${encodeURIComponent(searchQuery)}`);
            setNews(data);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        search()
    }, []);

    return (
        <div className="general-search">
            <FaArrowLeft className='bk-arr-btn' onClick={() => {
                window.history.back()
                toggleHeader()
            }} />
            <div className="general-search-center">
                <form action="" onChange={search}>
                    <input
                        type="text"
                        placeholder="search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQury(e.target.value)}
                    />
                </form>
                <FaSearch className="general-search-icon" />
            </div>
            <div className="general-search-details">
                {
                    news && news.map((data) => (
                        <div className="general-search-details-center">
                            <div className="flex-search">
                                <p onClick={() => {
                                    navigate(`/news/${data.id}`)
                                    toggleHeader()
                                }}>{data.title}</p>
                                <img src={`${url}/upload/${data.file[0].filename}`} alt="image" />
                            </div>

                        </div>
                    ))
                }
            </div>
        </div>
    )
}