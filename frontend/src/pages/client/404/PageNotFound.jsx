import React from "react";
import "./404.css";
import { Link } from "react-router-dom";
import Footer from "../../../components/client/footer/Footer";
import Header from "../../../components/client/header/Header";

const PageNotFound = () => {
    return (
        <>
            <Header />
            <section
                className="section not-found"
                id="notice"
                style={{ backgroundImage: "url('/images/course-bg.jpg')" }}
            >
                <div className="container">
                    <h2 className="h2 section-title"> 404 </h2>

                    <div className="page-not-found">
                        <h3>Page Not Found for this URL</h3>
                        <p>Please check your URL or Go to Home Page</p>
                        <div className="goback">
                            <Link className="btn btn-primary" to="/">
                                Go to Home Page
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
};

export default PageNotFound;
