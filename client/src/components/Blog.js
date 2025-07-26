import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  Avatar,
  CardContent,
  CardHeader,
  Typography,
  CardMedia,
  Box,
  IconButton,
} from "@mui/material";
import {
  DeleteForeverOutlined,
  ModeEditOutlineOutlined,
} from "@mui/icons-material";
import axios from "axios";

const Blog = ({ title, content, image, userName, isUser, id }) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/myBlogs/${id}`);
  };

  const deleteRequest = async () => {
    try {
      const res = await axios.delete(`http://localhost:8000/api/blog/${id}`);
      return res.data;
    } catch (err) {
      console.error("Error deleting blog:", err);
    }
  };

  const handleDelete = () => {
    deleteRequest().then(() => navigate("/"));
  };

  return (
    <Box my={2}>
      <Card
        sx={{
          width: "60%",
          margin: "auto",
          padding: 2,
          borderRadius: 3,
          backgroundColor: "#f5f5f5",
          boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
          transition: "0.3s",
          ":hover": { boxShadow: "0 12px 30px rgba(0,0,0,0.2)" },
        }}
      >
        {isUser && (
          <Box display="flex" justifyContent="flex-end">
            <IconButton onClick={handleEdit} color="primary">
              <ModeEditOutlineOutlined />
            </IconButton>
            <IconButton onClick={handleDelete} color="error">
              <DeleteForeverOutlined />
            </IconButton>
          </Box>
        )}

        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: "#0d47a1" }} aria-label="user">
              {userName?.charAt(0).toUpperCase()}
            </Avatar>
          }
          title={<Typography variant="h6">{title}</Typography>}
          subheader={<Typography variant="subtitle2" color="text.secondary">Posted by {userName}</Typography>}
        />

        <CardMedia
          component="img"
          height="240"
          image={image}
          alt={title}
          sx={{ borderRadius: 2 }}
        />

        <CardContent>
          <Typography variant="body1" color="text.primary" mt={2}>
            {content}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Blog;
