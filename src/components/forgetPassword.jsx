import {motion} from "framer-motion";


export const ForgetPassword = () => {
    return <div className="forget-password">
        <motion.div className="forget-password-center"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
        >
            <h2>Enter your registered email</h2>
            <form action="">
                <input type="email" 
                    placeholder="email"
                />
                <button type="submit">send</button>
            </form>
        </motion.div>
    </div>
}