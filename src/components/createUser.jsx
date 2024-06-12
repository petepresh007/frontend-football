import axios from "axios";
import react, { useState } from "react";
import { userUrl } from "../server";
import { RxAvatar, RxUpload } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../components/constext";
import { motion } from "framer-motion";
import { toast } from "react-toastify";


export const CreateUser = () => {
    const [firstname, setFirsttName] = useState("");
    const [lastname, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");
    const [files, setFiles] = useState(null);
    const navigate = useNavigate()



    async function handleSubmit(event) {
        event.preventDefault();
        const user = new FormData
        user.append("firstname", firstname);
        user.append("lastname", lastname);
        user.append("username", username);
        user.append("email", email);
        user.append("password", password);
        user.append("confirmpassword", confirmpassword);
        user.append("file", files)

        for (const value of user) {
            console.log(value)
        }
        try {
            const { data } = await axios.post(`${userUrl}/registerUser`, user);
            //alert(`registered successfully, check email your email for confirmation`);
            toast.success(`registered successfully, check email your email for confirmation`);
            navigate("/loginuser")
        } catch (error) {
            //alert(error.response.data.msg);
            toast.error(error.response.data.msg)
        }
        setFirsttName("");
        setLastName("");
        setUsername("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
    }

    return (
        <div className="register-user">
            <motion.div className="register-user-center" 
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
            >
                <h1>Register</h1>
                <form action="" onSubmit={handleSubmit}>
                    <div>
                        <input
                            type="text"
                            placeholder="firstname"
                            value={firstname}
                            onChange={(e) => setFirsttName(e.target.value)}
                        />
                    </div>

                    <div>
                        <input
                            type="text"
                            placeholder="lastname"
                            value={lastname}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>

                    <div>
                        <input
                            type="text"
                            placeholder="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <div>
                        <input
                            type="text"
                            placeholder="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <input
                            type="password"
                            placeholder="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div>
                        <input
                            type="password"
                            placeholder="confirm password"
                            value={confirmpassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>

                    <div className="file-avatar">
                        <div>
                            {
                                !files ? (
                                    <span >
                                        <RxAvatar className="fa-avatar" />
                                    </span>
                                ) : (
                                    <img src={URL.createObjectURL(files)} alt="pic" className="avatar" />
                                )
                            }
                        </div>

                        <div>
                            <input
                                type="file"
                                accept="image/*"
                                name="file"
                                id="file"
                                onChange={(e) => setFiles(e.target.files[0])}
                                style={{ display: "none" }}
                            />
                            <label htmlFor="file" > <RxUpload className="upload" /></label>
                        </div>
                    </div>
                    <button className="submit" type="submit">Register</button>
                </form>

                <div className="handle-log-sign">
                    <span>Already have an account? <Link to="/loginuser">Sign In</Link></span>
                </div>
            </motion.div>
        </div>
    )
}





export const LoginUser = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()
    const { setShowHeader, reguser, setReguser } = useContext(UserContext);

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const { data } = await axios.post(`${userUrl}/loginUser`, { email, password });
            //alert(`Welcome ${data.user.username}`);
            toast.success(`Welcome ${data.user.username}`)
            navigate("/userdashboard");
            setShowHeader(false);
            setReguser(data)
            console.log(email, password)
            //location.reload()
        } catch (error) {
            //alert(error.response.data.msg);
            toast.error(error.response.data.msg)
        }
        // setEmail("")
        // setPassword("")
    }



    return (
        <div className="login-admin">
            <div className="login-admin-center">
                <motion.div className="login-admin-center-details"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    <h1>Login</h1>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <input
                                type="text"
                                placeholder="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div>
                            <input
                                type="password"
                                placeholder="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button className="submit" type="submit">Login</button>
                        {/* <input type="submit" value="sub" className="submit" /> */}
                    </form>
                    <div className="handle-log-sign">
                        <span onClick={() => navigate("/passwordreset")}>Forget password?</span>
                        <span>Don't have an account? <Link to="/createuser">Sign Up</Link></span>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}