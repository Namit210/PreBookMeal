
import i18next from "i18next";
import { useState, useEffect } from "react";

const LANGUAGES = [
    { code: "en", label: "En" },
    { code: "hi", label: "अ" },
    { code: "ben", label: "অ" }
];

export default function LanguageSwitcher({ mobile = false }) {

    const [currentIdx, setCurrentIdx] = useState(0);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    // Continuous animation: cycle every 0.8s
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIdx((prev) => (prev + 1) % LANGUAGES.length);
        }, 800);
        return () => clearInterval(interval);
    }, []);

    const handleIconClick = () => {
        setDropdownOpen(true);
    };

    const handleLanguageSelect = (code, idx) => {
        i18next.changeLanguage(code);
        setCurrentIdx(idx);
        setDropdownOpen(false);
    };

    // Responsive dropdown style
    const dropdownStyle = mobile
        ? {
            position: "absolute",
            top: "110%",
            right: 0,
            left: "auto",
            transform: "none",
            background: "#fff",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            padding: "0.5rem 0",
            zIndex: 100,
            minWidth: "120px"
        }
        : {
            position: "absolute",
            top: "110%",
            left: "50%",
            transform: "translateX(-50%)",
            background: "#fff",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            padding: "0.5rem 0",
            zIndex: 100,
            minWidth: "100px"
        };

    return (
        <div style={{ position: "relative", display: "inline-block", width: mobile ? '100%' : 'auto' }}>
            <button
                onClick={handleIconClick}
                style={{
                    fontSize: mobile ? "1.2rem" : "1.5rem",
                    width: mobile ? "2rem" : "2.5rem",
                    height: mobile ? "2rem" : "2.5rem",
                    borderRadius: "50%",
                    border: "none",
                    background: "linear-gradient(135deg, #FF6B35, #F7931E, #FDC830)",
                    color: "#fff",
                    cursor: "pointer",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
                    transition: "transform 0.3s",
                    outline: "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "bold",
                    animation: "spin 0.5s"
                }}
                aria-label="Change language"
            >
                {LANGUAGES[currentIdx].label}
            </button>
            {dropdownOpen && (
                <div style={dropdownStyle}>
                    {LANGUAGES.map((lang, idx) => (
                        <div
                            key={lang.code}
                            onClick={() => handleLanguageSelect(lang.code, idx)}
                            style={{
                                padding: "0.5rem 1rem",
                                cursor: "pointer",
                                background: currentIdx === idx ? "#FDC830" : "#fff",
                                color: currentIdx === idx ? "#172f35ff" : "#333",
                                fontWeight: currentIdx === idx ? "bold" : "normal"
                            }}
                        >
                            {lang.label} {lang.code === "en" ? "English" : lang.code === "hi" ? "हिन्दी" : "বাংলা"}
                        </div>
                    ))}
                </div>
            )}
            <style>{`
                @keyframes spin {
                    0% { transform: rotateY(0deg); }
                    100% { transform: rotateY(360deg); }
                }
            `}</style>
        </div>
    );
}