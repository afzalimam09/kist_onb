import { useState } from "react";
import "./backtotop.css";

const BackToTop = () => {
    const [top, setTop] = useState(false);

    window.addEventListener("scroll", function () {
        if (window.scrollY >= 100) {
            setTop(true);
        } else {
            setTop(false);
        }
    });

    return (
        <button
            className={`back-top-btn ${top ? "active" : ""}`}
            onClick={() => window.scrollTo(0, 0)}
        >
            <ion-icon name="arrow-up"></ion-icon>
        </button>
    );
};

export default BackToTop;
