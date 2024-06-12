import {url, userUrl} from "../server";
import {useContext, useState, useEffect} from "react";
import {UserContext} from "../components/constext";
import axios from "axios";
import {Link} from "react-router-dom";

export const UserDashboard = () => {
    const { reguser, setReguser } = useContext(UserContext);
    const [user, setUser] = useState("");

    async function getUser(){
        try {
            const { data } = await axios.get(`${userUrl}/singleuser`);
            setUser(data);
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        getUser()
    }, [])
    return (
        <div className="user-dashboad">
            <section className="user-dashboard-center">
                <div className="image-orisiri">
                    <div className="dash-user-image">
                        {user && <img src={`${url}/upload/${user.file}`} alt="image" />}
                    </div>
                    <div className="user-dashboard-details">
                        <div className="wlc">
                            <span>
                                Welcome back
                            </span>
                            <span>
                                {user && user.username}
                            </span>
                        </div>
                        <div className="user-link">
                            <Link>Create News</Link>
                            <Link>Update</Link>
                            <Link>Logout</Link>
                        </div>

                        <div className="created-news-by-user">
                            <span>News</span>
                            <span>0</span>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}