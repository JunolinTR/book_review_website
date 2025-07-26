import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, InputLabel, TextField, Typography, Button } from "@mui/material";

const labelStyle = {
  mb: 1,
  mt: 2,
  fontSize: "20px",
  fontWeight: "bold",
  color: "#0d47a1",
};

const AddBlog = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    title: "",
    content: "",
    image: "",
  });

  const handleChange = (event) => {
    setInputs((prevValue) => ({
      ...prevValue,
      [event.target.name]: event.target.value,
    }));
  };

  const sendRequest = async () => {
    try {
      const res = await axios.post("http://localhost:8000/api/blog/add", {
        title: inputs.title,
        content: inputs.content,
        image: inputs.image,
        user: localStorage.getItem("userId"),
      });
      return res.data;
    } catch (err) {
      console.error("Failed to create blog:", err);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sendRequest()
      .then((data) => {
        if (data) {
          navigate("/myBlogs");
        }
      });
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Box
        border={2}
        borderColor="#0d47a1"
        borderRadius={3}
        boxShadow="10px 10px 20px #ccc"
        padding={3}
        margin="auto"
        marginTop={5}
        display="flex"
        flexDirection="column"
        width="70%"
      >
        <Typography
          fontWeight="bold"
          padding={3}
          color="#0d47a1"
          variant="h4"
          textAlign="center"
        >
          Write a Book Review
        </Typography>

        <InputLabel sx={labelStyle}>Book Title</InputLabel>
        <TextField
          name="title"
          placeholder="Enter book title"
          onChange={handleChange}
          value={inputs.title}
          margin="normal"
          variant="outlined"
          required
        />

        <InputLabel sx={labelStyle}>Content</InputLabel>
        <TextField
          name="content"
          placeholder="Write your review content here..."
          onChange={handleChange}
          value={inputs.content}
          margin="normal"
          multiline
          rows={4}
          variant="outlined"
          required
        />

        <InputLabel sx={labelStyle}>Book Image URL</InputLabel>
        <TextField
          name="image"
          placeholder="Paste image URL"
          onChange={handleChange}
          value={inputs.image}
          margin="normal"
          variant="outlined"
          required
        />

        <Button
          sx={{
            mt: 3,
            borderRadius: 4,
            backgroundColor: "#0d47a1",
            color: "white",
            "&:hover": { backgroundColor: "#08306b" },
          }}
          variant="contained"
          type="submit"
        >
          Submit Blog
        </Button>
      </Box>
    </Box>
  );
};

export default AddBlog;
