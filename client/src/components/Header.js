import React, { useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store";

function Header() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const [value, setValue] = useState();

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: "#0d47a1", // Plain dark blue
      }}
    >
      <Toolbar>
        <Typography
          component={Link}
          to="/"
          variant="h4"
          sx={{
            textDecoration: "none",
            color: "white", // Ensure text is readable on dark background
          }}
        >
          Read & Rant
        </Typography>

        {isLoggedIn && (
          <Box display="flex" marginLeft={"auto"}>
            <Tabs
              textColor="inherit"
              indicatorColor="secondary"
              value={value}
              onChange={(event, val) => setValue(val)}
            >
              <Tab
                LinkComponent={Link}
                to="/"
                label="All Reviews"
                sx={{ color: "white" }}
              />
              <Tab
                LinkComponent={Link}
                to="/myBlogs"
                label="My Reviews"
                sx={{ color: "white" }}
              />
              <Tab
                LinkComponent={Link}
                to="/blogs/add"
                label="Write Review"
                sx={{ color: "white" }}
              />
            </Tabs>
          </Box>
        )}

        <Box display="flex" marginLeft="auto">
          {!isLoggedIn && (
            <>
              <Button
                LinkComponent={Link}
                to="/auth"
                variant="contained"
                sx={{
                  margin: 1,
                  borderRadius: 10,
                  backgroundColor: "#1976d2",
                  "&:hover": { backgroundColor: "#1565c0" },
                }}
              >
                Sign In
              </Button>
              <Button
                LinkComponent={Link}
                to="/auth"
                variant="contained"
                sx={{
                  margin: 1,
                  borderRadius: 10,
                  backgroundColor: "#1976d2",
                  "&:hover": { backgroundColor: "#1565c0" },
                }}
              >
                Sign Up
              </Button>
            </>
          )}

          {isLoggedIn && (
            <Button
              onClick={() => dispatch(authActions.logout())}
              LinkComponent={Link}
              to="/"
              variant="contained"
              sx={{
                margin: 1,
                borderRadius: 10,
                backgroundColor: "#e53935",
                "&:hover": { backgroundColor: "#d32f2f" },
              }}
            >
              Log Out
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
