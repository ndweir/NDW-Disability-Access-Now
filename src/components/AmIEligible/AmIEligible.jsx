import React, { useEffect, useState } from "react";
import axios from "axios";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

// Pulls an article with title ILIKE "Eligibility Criteria"
const AmIEligible = () => {
  const [articleBody, setArticleBody] = useState([]);

  useEffect(() => {
    axios
      .get("/api/articles/eligible")
      .then((response) => {
        setArticleBody(response.data);
      })
      .catch((error) => {
        console.log("Error fetching Am I Eligible article:", error);
      });
  }, []);

  return (
    <main id="content" tabIndex="-1">
      <Markdown remarkPlugins={[remarkGfm]}>{articleBody.body}</Markdown>
    </main>
  );
};

export default AmIEligible;
