import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./TermsPage.css";
import TopNavbar from "../components/TopNavbar";

const TermsPage = () => {
  const [lang, setLang] = useState("en");
  const [termsContent, setTermsContent] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://terms-products-app.onrender.com/terms?lang=${lang}`)
      .then((res) => res.json())
      .then((data) => setTermsContent(data.content))
      .catch((err) => console.error("Error fetching terms:", err));
  }, [lang]);

  return (
    <div className="terms-page">
      <TopNavbar onLanguageChange={setLang} currentLang={lang} />

      <h1 className="terms-heading">Terms</h1>

 <button
  className="back-button"
  onClick={() =>
    (window.location.href =
      "https://terms-products-app-szgl-6k6wbigz4-nithish-hs-projects.vercel.app/")
  }
>
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
