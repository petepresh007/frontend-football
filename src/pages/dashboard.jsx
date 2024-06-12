import { useState, useEffect } from "react";
import { adminUrl, football, userUrl } from "../server";
import axios from "axios";
import { Link } from "react-router-dom";
import { AiFillEdit, AiOutlineUpload } from "react-icons/ai";
import { FaTrash, FaFile, FaWindowClose, FaClipboard } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


export const Dashboard = () => {
    const [admin, setAdmin] = useState("");
    const [news, setNews] = useState("");
    const [searchQuery, setSearchQury] = useState("");

    const [activated, setActivated] = useState("");
    const [notActivated, setNotActivated] = useState("");
    const [allusers, setAllUsers] = useState("");
    const navigate = useNavigate();

    const [showForm, setShowForm] = useState(false);
    const [title, setTitle] = useState("")
    const [newsUp, setNewsUp] = useState("")
    const [file, setFile] = useState("")
    const [category, setCategory] = useState("");
    const [formID, setFormID] = useState('');
    axios.defaults.withCredentials = true;
    const [width, setWidth] = useState(window.innerWidth);


    const toggleForm = (id) => {
        setShowForm(previous => !previous);
        setFormID(id);
    }


    const hideshowform = () => setShowForm(previous => !previous);

    const allNews = async () => {
        try {
            const { data } = await axios.get(`${football}/allfootball`);
            setNews(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        allNews();
    }, [])

    const getAdmin = async () => {
        try {
            const { data } = await axios.get(`${adminUrl}/persistlogin`)
            setAdmin(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAdmin();
    }, []);

    const deleteNews = async (footballID) => {
        try {
            const { data } = await axios.delete(`${football}/allfootball/${footballID}`);
            alert(data.msg);
            // console.log(data.id)
            setNews(data.data)
        } catch (error) {
            alert(error.response.data.msg)
        }
    }


    const search = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.get(`${football}/search/?query=${encodeURIComponent(searchQuery)}`);
            setNews(data);
            console.log(data)
        } catch (error) {
            console.log(error);
        }
    }


    const handleCreate = async (e) => {
        e.preventDefault()
        const registerInput = new FormData();
        registerInput.append("title", title);
        registerInput.append("news", news);
        for (const image of file) {
            registerInput.append("file", image);
        }
        registerInput.append("category", category);

        try {
            const { data } = await axios.patch(`${football}/allfootball/${formID}`, registerInput)
            //console.log(data)
            alert(data.msg)
            setNews(data.data)
        } catch (error) {
            //console.log(error)
            alert(error.response.data.msg)
        }
        setFormID('');
        setShowForm(false)
    }

    const getActivatedUsers = async () => {
        try {
            const { data } = await axios.get(`${userUrl}/approveduser`);
            setActivated(data);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getActivatedUsers()
    }, [])

    const notActivatedUSER = async () => {
        try {
            const { data } = await axios.get(`${userUrl}/notapproved`);
            setNotActivated(data);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        notActivatedUSER()
    }, [])

    async function getallusers() {
        try {
            const { data } = await axios.get(`${userUrl}/allusers`);
            setAllUsers(data);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getallusers()
    }, []);

    async function approvedUser(userID) {
        try {
            const { data } = await axios.patch(`${userUrl}/approve/${userID}`);
            setActivated(data.dataApproved);
            setNotActivated(data.dataNotApproved);
        } catch (error) {
            console.log(error)
        }
    }

    async function blockUser(userID) {
        try {
            const { data } = await axios.patch(`${userUrl}/blockUser/${userID}`);
            setActivated(data.dataApproved);
            setNotActivated(data.dataNotApproved);
        } catch (error) {
            console.log(error)
        }
    }

    async function deleteUser(userID) {
        try {
            const { data } = await axios.delete(`${userUrl}/deleteuser/${userID}`);
            alert(data.msg);
            setAllUsers(data.data)
            setActivated(data.dataApproved);
            setNotActivated(data.dataNotApproved);
        } catch (error) {
            console.log(error)
        }
    }


    /**WINDOWS INNERWIDTH */
    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth);
        }
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [])

    return (
        <div className="dashboard">
            {admin && <h3>Welcome {admin.username}</h3>}
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

            <div className="length-nav">
                <div className="len">
                    <span>available news</span>
                    {news ? <span>{news.length}</span> : <span>loading....</span>}
                </div>

                <div className="len">
                    <span>available users</span>
                    {allusers ? <span>{allusers.length}</span> : <span>loading....</span>}
                </div>

                <div className="link-adm">
                    <Link to="/createnews">Create-News</Link>
                    <Link>Create-User</Link>
                </div>
            </div>

            <div className="dashboard-center">
                <div className="dashboard-center-right">
                    <h3>News</h3>
                    {
                        news && news.map(data => {
                            return <div className="dash-news-disp-cen">
                                {
                                    width <= 480 ? (
                                        <>
                                            <p>{data.title.substring(0, 15)}</p>
                                            <p>{data.category.substring(0, 6)}</p>
                                            <AiFillEdit onClick={() => toggleForm(data.id)} />
                                            <FaTrash onClick={() => deleteNews(data.id)} />
                                        </>
                                    ):(
                                        <>
                                                <p>{data.title.substring(0, 30)}</p>
                                                <p>{data.category.substring(0, 30)}</p>
                                                <p>{data.date}</p>
                                                <AiFillEdit onClick={() => toggleForm(data.id)} />
                                                <FaTrash onClick={() => deleteNews(data.id)} />
                                        </>
                                    )
                                }
                                {/* <p>{data.title.substring(0, 20)}</p>
                                <p>{data.category.substring(0, 20)}</p>
                                <p>{data.date}</p>
                                <AiFillEdit onClick={() => toggleForm(data.id)} />
                                <FaTrash onClick={() => deleteNews(data.id)} /> */}
                            </div>
                        })
                    }

                    <div >
                        {showForm && (
                            <div className="admin-update-form">
                                <form action="" onSubmit={handleCreate}>
                                    <div className="edit-close">
                                        <p>Edit</p>
                                        <FaWindowClose onClick={() => hideshowform()} />
                                    </div>
                                    <div>
                                        <input
                                            type="text"
                                            placeholder="title"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                        />
                                    </div>

                                    <div>
                                        <textarea
                                            type="text"
                                            placeholder="news"
                                            value={newsUp}
                                            onChange={(e) => setNewsUp(e.target.value)}
                                        ></textarea>
                                    </div>

                                    <div className="avar-file">
                                        <FaFile className="aifr" />
                                        <input
                                            type="file"
                                            id="file"
                                            accept="image/*"
                                            multiple
                                            onChange={(e) => setFile(e.target.files)}
                                            style={{ display: "none" }}
                                        />
                                        <label htmlFor="file"><AiOutlineUpload className="aifr" /></label>
                                    </div>

                                    <div>
                                        <select
                                            value={category}
                                            onChange={(e) => setCategory(e.target.value)}
                                        >
                                            <option value="News">News</option>
                                            <option value="EPL">EPL</option>
                                            <option value="Laliga">Laliga</option>
                                            <option value="Serie A">Serie A</option>
                                            <option value="Bundesliga">Bundesliga</option>
                                            <option value="NPFL">NPFL</option>
                                            <option value="Others">Others</option>
                                            <option value="UCL">UCL</option>
                                        </select>
                                    </div>
                                    <button>Submit</button>
                                </form>
                            </div>

                        )}
                    </div>
                </div>



                <div className="dashboard-center-left">
                    <h1>Users</h1>
                    <div className="dash-approvals">
                        <div className="approved-user">
                            <h1>Approved users</h1>
                            {
                                activated && activated.map((data, index) => {
                                    return <div key={data._id} className="approve-user-center">
                                        <p>{index + 1}.</p>
                                        <p>{data.firstname.substring(0, 20)} </p>
                                        <p>{data.lastname.substring(0, 20)} </p>
                                        <FaClipboard onClick={() => blockUser(data._id)} />
                                    </div>
                                })
                            }
                            {
                                activated.length === 0 && (
                                    <div style={{ textAlign: "center" }}>No user present</div>
                                )
                            }
                        </div>

                        <div className="not-approved">
                            <h1>Not Approved Users</h1>
                            {
                                notActivated && notActivated.map((data, index) => (
                                    <div className="not-approved-center" key={data._id}>
                                        <p>{index + 1}.</p>
                                        <p>{data.firstname.substring(0, 20)}</p>
                                        <p>{data.lastname.substring(0, 20)}</p>
                                        <FaClipboard onClick={() => approvedUser(data._id)} />
                                    </div>
                                ))
                            }
                            {
                                notActivated.length === 0 && (
                                    <div style={{ textAlign: "center" }}>No user present</div>
                                )
                            }
                        </div>

                        <div className="allusers">
                            <h1>All Users</h1>
                            {
                                allusers && allusers.map((data, index) => {
                                    return <div key={data._id} className="allusers-center">
                                        <p>{index + 1}. {data.username.substring(0, 14)}</p>
                                        <FaTrash onClick={() => deleteUser(data._id)} />
                                    </div>
                                })
                            }
                            {
                                allusers.length === 0 && (
                                    <div style={{ textAlign: "center" }}>No note present</div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}