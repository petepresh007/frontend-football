import { useState, useEffect } from "react";
import { beturl, url } from "../server";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FaArrowLeft, FaSearch } from "react-icons/fa";


export const BetSingle = () => {
    const [bet, setBet] = useState("");
    const { id } = useParams()

    async function getAll() {
        try {
            const { data } = await axios.get(`${beturl}/get`);
            //console.log(data);
            setBet(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAll();
    }, []);

    const selectedBet = bet && bet.find(data => data.id.toString() === id)
    console.log(selectedBet)

    if (!selectedBet) {
        return <div>
            nothing found...
        </div>
    }

    return (
        <div className="bet-single-one">
            <FaArrowLeft className="FN" onClick={() => window.history.back()} />
            <div className="bet-single-one-center">
                <h1>{selectedBet.title}</h1>
                <img src={`${url}/upload/${selectedBet.file}`} alt="image" />
                <p>{selectedBet.tips}</p>
            </div>

        </div>
    )
}