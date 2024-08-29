import React from "react";
import { Box, Container, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navigation from "../Components/Navigation";

const Home = () => {
  return (
    <Box
      alignItems={"center"}
      justifyContent={"center"}
      display={"flex"}
      flexDirection={"column"}
    >
      <Box className="header" pt={5}>
        <Container>
          <Typography variant="h2" className="pageTitle">
            Gutenberg Project
          </Typography>
          <Typography
            className="pageTitleText"
            variant="h5"
            py={3}
            maxWidth={1200}
          >
            A social cataloging website that allows you to freely search its
            database of books, annotations, and reviews.
          </Typography>
        </Container>
      </Box>
      <Box px={2} pb={5}>
        <Container>
          <Navigation />
          <Outlet />
        </Container>
      </Box>
      <Box component="footer" py={3} mt={19} width="100%">
        <Container>
          <Typography variant="body2" className="pageTitleText" align="center">
            Made with love ❤️ by Viplove
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
