import React from "react";
import {
  Box,
  OutlinedInput,
  Stack,
  Typography,
  InputAdornment,
} from "@mui/material";
import { Search, Close } from "@mui/icons-material";
import { ReactComponent as Back } from "../assets/Images/Back.svg";

const SearchBar = ({
  searchText,
  setSearchText,
  debouncedSearchBook,
  genre,
  clearSearch,
  navigate,
}) => {
  return (
    <Box
      sx={{ backgroundColor: "#ffffff" }}
      py={3}
      px={2}
      display={"flex"}
      justifyContent={"center"}
      flexDirection={"column"}
      position={"fixed"}
      height={80}
      zIndex={1}
      top={0}
      left={0}
      right={0}
    >
      <Stack mb={2} direction={"row"} spacing={1} alignItems={"center"}>
        <Back height={20} onClick={() => navigate("/")} />
        <Typography variant="h5" className="text-primary">
          {genre.toUpperCase()}
        </Typography>
      </Stack>
      <OutlinedInput
        className="txtSearch"
        startAdornment={
          <InputAdornment position="start">
            <Search />
          </InputAdornment>
        }
        endAdornment={
          searchText ? (
            <InputAdornment position="end">
              <Close onClick={clearSearch} />
            </InputAdornment>
          ) : null
        }
        placeholder="Search"
        onKeyUp={debouncedSearchBook}
        onChange={(e) => setSearchText(e.target.value)}
        value={searchText}
      />
    </Box>
  );
};

export default SearchBar;
