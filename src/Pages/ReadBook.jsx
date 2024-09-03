import React from "react";
import { Box } from "@mui/material";
import { useLocation } from "react-router-dom";

const ReadBook = () => {
  const location = useLocation();

  return <Box>{location}</Box>;
};

export default ReadBook;
