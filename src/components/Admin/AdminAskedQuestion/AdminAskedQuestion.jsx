import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import axios from "axios";
import "./AdminAskedQuestion.css";

export default function AdminUnansweredQuestions({ onAnswerQuestion }) {
  const dispatch = useDispatch();
  const unansweredQuestions = useSelector(
    (store) => store.adminQuestions.adminUnanswered || []
  );

  useEffect(() => {
    dispatch({ type: "FETCH_ADMIN_UNANSWERED" });
  }, [dispatch]);

  const handleRead = (questionId) => {
    const data = { questionId: questionId };
    axios.put("/api/questions/user-unread", data).then(() => {
      dispatch({ type: "FETCH_ADMIN_UNANSWERED" });
    });
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography
        variant="h4"
        component={"h1"}
        sx={{ fontWeight: "bold" }}
        gutterBottom
      >
        Unanswered Questions
      </Typography>
      {unansweredQuestions.length === 0 ? (
        <Typography variant="body1">No unanswered questions found.</Typography>
      ) : (
        <ul style={{ padding: 0, margin: 0 }}>
          {unansweredQuestions.map((question) => (
            <li key={question.id} style={{ marginBottom: 16 }}>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  padding: 2,
                  backgroundColor: question.unread && "rgba(18, 87, 155, 0.08)",
                  transition: "box-shadow 0.3s ease-in-out",
                  "&:hover": {
                    boxShadow: 3,
                  },
                }}
              >
                <CardContent>
                  {question.flagged && (
                    <Typography variant="body1" color="error" fontWeight="bold">
                      Help Requested!
                    </Typography>
                  )}
                  <Typography variant="body1" sx={{ marginBottom: 1 }}>
                    <strong>Question:</strong> {question.question}
                  </Typography>
                  <Typography variant="body1" sx={{ marginBottom: 1 }}>
                    <strong>Date Submitted:</strong>{" "}
                    {question.question_date.split("T")[0]}
                  </Typography>
                  <Typography variant="body1" sx={{ marginBottom: 2 }}>
                    <strong>Associated Article:</strong>{" "}
                    {question.associated_article_url ? (
                      <a href={question.associated_article_url}>
                        {question.associated_article_url}
                      </a>
                    ) : (
                      "No article was associated with this question"
                    )}
                  </Typography>
                  <Box sx={{ display: "flex", gap: 2 }}>
                    <Button
                      onClick={() => onAnswerQuestion(question)}
                      variant="contained"
                    >
                      Answer Question
                    </Button>
                    <Button
                      onClick={() => handleRead(question.id)}
                      variant={question.unread ? "outlined" : "text"}
                    >
                      {question.unread ? "Mark as Read" : "Mark as Unread"}
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      )}
    </Box>
  );
}
