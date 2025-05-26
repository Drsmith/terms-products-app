import React, { useEffect, useState } from "react";
import "./TermsPage.css";
import TopNavbar from "../components/TopNavbar";

const TermsPage = () => {
  const [lang, setLang] = useState("en");
  const [termsContent, setTermsContent] = useState("");

 /* useEffect(() => {
    fetch(`http://localhost:5000/terms?lang=${lang}`)
      .then((res) => res.json())
      .then((data) => setTermsContent(data.content))
      .catch((err) => console.error("Error fetching terms:", err));
  }, [lang]);*/
  useEffect(() => {
  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  fetch(`${API_BASE}/terms?lang=${lang}`)
    .then((res) => res.json())
    .then((data) => setTermsContent(data.content))
    .catch((err) => console.error("Error fetching terms:", err));
}, [lang]);

  return (
    <div className="terms-page">
      <TopNavbar onLanguageChange={setLang} currentLang={lang} />

      <h1 className="terms-heading">Terms</h1>

      <button className="back-button" onClick={() => window.history.back()}>
        Close and Go Back
      </button>

      <div className="terms-box">
        <div
          className="terms-content"
          dangerouslySetInnerHTML={{ __html: termsContent }}
        />
      </div>
    </div>
  );
};

export default TermsPage;
