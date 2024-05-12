import axios from "axios";
import {football} from "../server";
import {useEffect, useState} from "react";

export const Search = () => {
    const [news, setNews] = useState("");
    const [searchQuery, setSearchQury] = useState("");


    async function search(){
        try {
            const { data } = await axios.get(`${football}/search/?query=${encodeURIComponent(searchQuery)}`);
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        search()
    }, []);

    return(
        <div>
            <div>
                <form action="" onChange={search}>
                    <input
                        type="text"
                        placeholder="search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQury(e.target.value)}
                    />
                </form>
            </div>
        </div>
    )
}