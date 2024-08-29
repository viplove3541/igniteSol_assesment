import {
  Box,
  Container,
  Grid,
  InputAdornment,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getBookData } from "../Utils/Services"; // Ensure this is correctly implemented
import InfiniteScroll from "react-infinite-scroll-component";
import BookCard from "../Components/BookCard";
import { ReactComponent as Back } from "../assets/Images/Back.svg";
import { Search, Close } from "@mui/icons-material";

const Books = () => {
  // States
  const [page, setPage] = useState(1);
  const [bookList, setBookList] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [searchText, setSearchText] = useState("");

  const navigate = useNavigate();

  // Get parameters from URL
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());

  const bindBooks = useCallback(
    (res) => {
      if (res.results.length > 0) {
        setPage((prevPage) => prevPage + 1);
        setBookList((prevList) =>
          searchText ? res.results : prevList.concat(res.results)
        );
        setHasMore(res.count > bookList.length + res.results.length);
      } else {
        setHasMore(false);
      }
    },
    [bookList.length, searchText]
  );

  const getData = useCallback(() => {
    if (searchText !== "") {
      getBookData(
        `?topic=${params.topic}&search=${searchText.replace(
          / /g,
          "%20"
        )}&mime_type=image/jpeg`,
        bindBooks
      );
    } else {
      getBookData(
        `?topic=${params.topic}&page=${page}&mime_type=image/jpeg`,
        bindBooks
      );
    }
  }, [searchText, page, params.topic, bindBooks]);

  useEffect(() => {
    getData();
  }, [getData]);

  const openBook = (id, url) => {
    const keys = Object.keys(url);
    let selectedKey = keys.find((key) => key.includes("html"));

    if (!selectedKey) {
      selectedKey = keys.find((key) => key.includes("text"));
    }

    if (!selectedKey) {
      selectedKey = keys.find((key) => key.includes("/zip"));
    }

    if (selectedKey) {
      window.location.href = url[selectedKey];
    }
  };

  const searchBook = () => {
    setPage(1);
    setHasMore(false);
    setBookList([]);
    getData();
  };

  const clearSearch = () => {
    setSearchText("");
    searchBook();
  };

  return (
    <Container>
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
          <Back
            height={20}
            onClick={() => {
              navigate("/");
            }}
          />
          <Typography variant="h5" className="text-primary">
            {params.title}
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
                <Close
                  onClick={() => {
                    clearSearch();
                  }}
                />
              </InputAdornment>
            ) : null
          }
          placeholder="Search"
          onKeyUp={searchBook}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
          value={searchText}
          key={"txtSearch"}
        />
      </Box>

      <Box pt={15}>
        {bookList.length > 0 ? (
          <InfiniteScroll
            dataLength={bookList.length}
            next={getData}
            hasMore={hasMore}
            loader={
              <Box>
                <Typography variant="h6" textAlign={"center"} my={5}>
                  Loading More Books...
                </Typography>
              </Box>
            }
            endMessage={
              <Box my={4}>
                <Typography mb={1} variant="h6" textAlign={"center"}>
                  That's All!
                </Typography>
                <Link className="Back" to={`/`}>
                  <Back />
                </Link>
              </Box>
            }
          >
            <Grid container>
              {bookList.map((book, index) => (
                <Grid item xs={4} sm={3} md={3} lg={2} xl={2} key={index}>
                  <BookCard
                    id={book.id}
                    onPress={openBook}
                    url={book.formats}
                    image={book.formats["image/jpeg"]}
                    author={book.authors[0] ? book.authors[0]["name"] : ""}
                    title={book.title}
                  />
                </Grid>
              ))}
            </Grid>
          </InfiniteScroll>
        ) : (
          <Typography variant="h6" textAlign={"center"} my={5}>
            {searchText ? "No Results Found!" : "Loading Books..."}
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default Books;
