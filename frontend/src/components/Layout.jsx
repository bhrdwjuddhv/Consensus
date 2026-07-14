import { Outlet } from "react-router-dom";

import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";

/** Chrome around every page. */
export default function Layout() {
    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />

            <main className="grow">
                <Outlet />
            </main>

            <Footer />
        </div>
    );
}
