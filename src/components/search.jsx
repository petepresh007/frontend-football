import axios from "axios";
import { football, url } from "../server";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../components/constext";
import { FaArrowLeft, FaSearch, FaServer } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import {motion} from "framer-motion"

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
        <motion.div className="general-search"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
        >
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
                            <motion.div className="flex-search"
                                initial={{ opacity: 0, y: -50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1 }}
                            >
                                <p onClick={() => {
                                    navigate(`/news/${data.id}`)
                                    toggleHeader()
                                }}>{data.title}</p>
                                <img src={`${url}/upload/${data.file[0].filename}`} alt="image" />
                            </motion.div>

                        </div>
                    ))
                }
            </div>
        </motion.div>
    )
}