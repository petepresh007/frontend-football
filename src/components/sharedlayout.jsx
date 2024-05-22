import { Outlet } from "react-router-dom";
import { HeaderElement } from "./header";
import { Footer } from "./footer";
import { ScrollToTop } from "../components/scroltotop";

export const SharedLayout = () => {
    return (
        <>
            <HeaderElement />
            <div className="container">
                <ScrollToTop>
                    <Outlet />
                </ScrollToTop>
            </div>
            <Footer />
        </>
    )
}