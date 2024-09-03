import React from "react";
import { Grid, Typography, Box } from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";
import BookCard from "./BookCard";
import { Link } from "react-router-dom";
import { ReactComponent as Back } from "../assets/Images/Back.svg";

const BookList = ({ bookList, isFetching, hasMore, getData, openBook }) => {
  return (
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
          No Results Found!
        </Typography>
      )}
    </Box>
  );
};

export default BookList;
