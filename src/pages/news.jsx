import {useParams} from "react-router-dom";
import {useState, useEffect, useContext} from "react";
import axios from "axios";
import {football, url} from "../server";
import {FaArrowLeft} from "react-icons/fa";
import {UserContext} from "../components/constext";

export const News = () =>{
    const {id} = useParams();
    const [news, setNews] = useState("");
    const { showHeader, setShowHeader } = useContext(UserContext);
    const toggleHeader = () => setShowHeader(previous => !previous);
    


    const allNews = async () => {
        try {
            const { data } = await axios.get(`${football}/allfootball`);
            setNews(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        allNews()
    }, [])

    const selectedNews = news && news.find(data => data.id.toString() === id);
    if(!selectedNews){
        return <div>
            No item was found..
        </div>
    }

    return(
        <div className="selected-news">
            <FaArrowLeft className="btn-bck" onClick={()=>{
                window.history.back();
                //toggleHeader()
            }}/>
            <div className="selected-news-center">
                <div className="h-n">
                    <h3>{selectedNews.title}</h3>
                    <div className="selected-news-images">
                        {
                            selectedNews.file.map((data, index) => (
                                <img src={`${url}/upload/${data.filename}`} alt="images" key={index} />
                            ))
                        }
                    </div>
                    <p>{selectedNews.news}</p>
                </div> 
            </div>
        </div>
    )
}