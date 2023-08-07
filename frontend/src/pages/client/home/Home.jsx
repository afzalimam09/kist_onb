import { useEffect } from "react";
import Footer from "../../../components/client/footer/Footer";
import Header from "../../../components/client/header/Header";
import Hero from "../../../components/client/hero/Hero";
import Notices from "../../../components/client/notices/Notices";
import BackToTop from "../../../components/shared/backtotop/BackToTop";

const Home = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <>
            <Header />
            <Hero />
            <Notices />
            <Footer />
            <BackToTop />
        </>
    );
};

export default Home;
