import {useEffect, useState} from "react";
import {beturl, url} from "../server";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export const Bettips = () => {
    const [bet, setBet] = useState("");
    const navigate = useNavigate()

    async function getAll(){
        try {
            const {data} = await axios.get(`${beturl}/get?limit=12`);
           //console.log(data);
           setBet(data);
        } catch (error) {
            console.log(error);
        }
    } 

    useEffect(()=>{
        getAll();
    }, []);

    return (
        <div className="bet-grid"> 
            {
                bet && bet.map((data)=>(
                    <div key={data.id} className="bet-grid-center">
                        <img src={`${url}/upload/${data.file}`} alt="image" />
                        <p onClick={()=>navigate(`/bet/${data.id}`)}>{data.title}</p>
                    </div>
                ))
            }
        </div>
    )
}