import { FaBars, FaTwitter, FaWhatsapp, FaFootballBall } from "react-icons/fa";
import { AiFillFacebook, AiFillInstagram, AiFillCaretDown, AiOutlineUser, AiOutlineSearch, AiOutlineBars } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from 'react';
import { adminUrl, userUrl } from "../server";
import axios from "axios";
import { UserContext } from "../components/constext";
import { motion } from "framer-motion";

export const HeaderElement = () => {
    const navigate = useNavigate();
    const [showHideNav, setshowHideNav] = useState(true);
    //const [admin, setAdmin] = useState("")
    const { admin, setAdmin } = useContext(UserContext);
    const { showHeader, setShowHeader, reguser, setReguser } = useContext(UserContext);
    const [football, setFootball] = useState("");
    const [hidenavmobile, setHidenavmobile] = useState(true);
    axios.defaults.withCredentials = true;

    const toggleHeader = () => setShowHeader(previous => !previous)
    const toggleNewsNav = () => setshowHideNav(previous => !previous);
    //const toggleFootball = () => setFootball(previous => !previous);
    const toggleMobileNav = () => setHidenavmobile(previous => !previous)

    const getAdmin = async () => {
        try {
            const { data } = await axios.get(`${adminUrl}/persistlogin`);
            setAdmin(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAdmin();
    }, []);

    const logout = async () => {
        try {
            const { data } = await axios.post(`${adminUrl}/logoutadmin`);
            console.log(data)
            setAdmin("");
            navigate("/adminlogin")
        } catch (error) {
            console.log(error)
        }
    }

    const logoutUser = async () => {
        try {
            const { data } = await axios.post(`${userUrl}/logoutuser`);
            console.log(data)
            setReguser("");
            navigate("/loginuser");
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <header className={`${showHeader ? "hide-header" : ""}`}>
            <div className="nav-button">
                <section className="socials-float-left">
                    <p className="ctc-us">Total football, contact us</p>
                    <Link className="ss-tt">
                        <AiFillFacebook className="socials-logo" />
                    </Link>

                    <Link className="ss-tt" to='https://www.instagram.com/pet_dozie?igsh=MXBwNmZwZDg1cG90MQ=='>
                        <AiFillInstagram className="socials-logo" />
                    </Link>

                    <Link className="ss-tt" to='https://x.com/peter_chiedozie?t=vtiS3wRhTH6_FVoDJXckAQ&s=09'>
                        <FaTwitter className="socials-logo" />
                    </Link>
                    <Link className="ss-tt" to='https://wa.link/jya71e'>
                        <FaWhatsapp className="socials-logo" />
                    </Link>

                    <AiOutlineUser className="login-avatar" onClick={() => navigate("/loginuser")} />

                </section>
                <form className="nav-search">
                    <input
                        type="text"
                        placeholder="search"
                    />
                </form>
                {/* <AiOutlineUser style={{ fontSize: "1.1rem" }} onClick={() => navigate("/loginuser")} />  */}
               
                <AiOutlineSearch className="na-sr" onClick={() => {
                    navigate("/search");
                    toggleHeader()
                }} />
            </div>


            <div className="nav-bottom">
                <div className="logo-button">
                    <section className="logo-football-img">
                        <h1 onClick={() => navigate("/")} style={{ cursor: "pointer" }}><span style={{ color: "red" }}>Total</span>Football</h1>
                        <img src="./football_2.jpeg" alt="" className="football-img" />
                    </section>
                    {/* <FaFootballBall onClick={() => toggleNewsNav()} className="disp-non-lrg" /> */}
                    <span className="disp-non-lrg" onClick={() => toggleNewsNav()}>football</span>
                    <AiOutlineBars onClick={() => toggleMobileNav()} className="bars" />
                </div>

                <div className="nav-bar-section">
                    <motion.nav className={`nav-list ${hidenavmobile ? "" : "show-nav-section"}`}
                        transition={{ duration: 1 }}
                    >
                        <Link to='/' onClick={() => toggleMobileNav()}>Home</Link>
                        <Link to='/about' onClick={() => toggleMobileNav()}>About</Link>
                        <span>
                            <Link to='/football' onClick={() => toggleMobileNav()}>Football</Link>
                            <AiFillCaretDown className="home-caret" onClick={() => toggleNewsNav()} />
                        </span>
                        <Link to='/livescores' onClick={() => toggleMobileNav()}>Livescores</Link>
                        <Link to='/bettips' onClick={() => toggleMobileNav()}>Betting-tips</Link>
                        {
                            admin ? (
                                <span>
                                    <Link to="/dashboard" onClick={() => toggleMobileNav()}>Account</Link>
                                    <Link onClick={() => {
                                        logout()
                                        toggleMobileNav()
                                    }} >Logout</Link>
                                </span>
                            ) : (
                                <span>
                                    {/* <Link to='/createuser' onClick={() => toggleMobileNav()}>Sign-up</Link>
                                        <Link to='/loginuser' onClick={() => toggleMobileNav()}>Sign-in</Link> */}
                                </span>
                            )
                        }

                        {
                            reguser ? (
                                <span>
                                    <Link to="/dashboard" onClick={() => toggleMobileNav()}>Dashboard</Link>
                                    <Link onClick={() => {
                                        logoutUser()
                                        toggleMobileNav()
                                    }} >Logout</Link>
                                </span>
                            ):(
                                <span></span>
                            )
                        }

                    </motion.nav>
                    <section className={`news-section ${showHideNav ? "" : "show-news-nav"}`}>
                        <Link to="/epl" onClick={() => toggleNewsNav()}>EPL</Link>
                        <Link to='/seriea' onClick={() => toggleNewsNav()}>Serie A</Link>
                        <Link to="/laliga" onClick={() => toggleNewsNav()}>Laliga</Link>
                        <Link to="/bundesliga" onClick={() => toggleNewsNav()}>Bundesliga</Link>
                        <Link to='/npfl' onClick={() => toggleNewsNav()}>NPFL</Link>
                        <Link to='/ucl' onClick={() => toggleNewsNav()}>UCL/UEL</Link>
                        <Link>Others</Link>
                    </section>
                </div>
            </div>
        </header>
    )
}