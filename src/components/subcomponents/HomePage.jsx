import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const HomePage = ({ setCurrentPage }) => (
    <div className="app-container">
        <Header />

        <div className="main-content">
            <h1 className="welcome-title">Welcome to the MDII Evaluation Tool</h1>
            <p className="welcome-description">
                This tool allows you to generate standardized evaluation reports
                based on collected data. Please select an option below to get started.
            </p>

            <div className="accent-line"></div>

            <div className="button-grid">
                <div className="action-card purple-card">
                    <div className="card-icon">📖</div>
                    <h3 className="card-title">How It Works</h3>
                    <p className="card-description">Open offline manual</p>
                </div>

                <div className="action-card green-card">
                    <div className="card-icon">📝</div>
                    <h3 className="card-title">Request Code</h3>
                    <p className="card-description">Open external survey</p>
                </div>

                <div
                    onClick={() => setCurrentPage("compilation")}
                    className="action-card cyan-card"
                >
                    <div className="card-icon">📦</div>
                    <h3 className="card-title">Step 2: Generate</h3>
                    <h3 className="card-title">Compilations</h3>
                    <p className="card-description">After innovator answers</p>
                </div>

                <div className="action-card orange-card">
                    <div className="card-icon">📄</div>
                    <h3 className="card-title">Step 3: Generate</h3>
                    <h3 className="card-title">Report</h3>
                    <p className="card-description">After all evaluations</p>
                </div>
            </div>
        </div>

        <Footer />
    </div>
);

export default HomePage;
