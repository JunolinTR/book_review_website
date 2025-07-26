import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, InputLabel, TextField, Typography, Button } from "@mui/material";

const labelStyle = {
  mb: 1,
  mt: 2,
  fontSize: "20px",
  fontWeight: "bold",
  color: "#0d47a1", // Dark blue label color
};

function BlogDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [inputs, setInputs] = useState({
    title: "",
    content: "",
    image: "",
  });
  const [loading, setLoading] = useState(true);

  const handleChange = (event) => {
    setInputs((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const fetchDetails = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/blog/${id}`);
      const data = res.data;
      setInputs({
        title: data.blog.title,
        content: data.blog.content,
        image: data.blog.image,
      });
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch blog details:", err);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`http://localhost:8000/api/blog/update/${id}`, {
        title: inputs.title,
        content: inputs.content,
        image: inputs.image,
      });
      navigate("/myBlogs");
    } catch (err) {
      console.error("Failed to update blog:", err);
    }
  };

  return (
    <div>
      {!loading && (
        <form onSubmit={handleSubmit}>
          <Box
            border={2}
            borderColor="#0d47a1"
            borderRadius={10}
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
              Update Your Blog
            </Typography>

            <InputLabel sx={labelStyle}>Title</InputLabel>
            <TextField
              name="title"
              onChange={handleChange}
              value={inputs.title}
              margin="normal"
              variant="outlined"
            />

            <InputLabel sx={labelStyle}>Content</InputLabel>
            <TextField
              name="content"
              onChange={handleChange}
              value={inputs.content}
              margin="normal"
              multiline
              rows={4}
              variant="outlined"
            />

            <InputLabel sx={labelStyle}>Image URL</InputLabel>
            <TextField
              name="image"
              onChange={handleChange}
              value={inputs.image}
              margin="normal"
              variant="outlined"
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
        </form>
      )}
    </div>
  );
}

export default BlogDetail;
