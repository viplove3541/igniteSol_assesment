import { Container } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getBookData } from "../Utils/Services";
import BookList from "../Components/BookList";
import SearchBar from "../Components/SearchBar";
import debounce from "lodash.debounce";

const Books = () => {
  const [page, setPage] = useState(1);
  const [bookList, setBookList] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [isFetching, setIsFetching] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const genre = location.state?.genre || "default";

  const bindBooks = useCallback(
    (res) => {
      setIsFetching(false);
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
    if (isFetching) return;

    setIsFetching(true);
    if (searchText !== "") {
      getBookData(
        `?topic=${genre}&search=${searchText.replace(
          / /g,
          "%20"
        )}&mime_type=image/jpeg`,
        bindBooks
      );
    } else {
      getBookData(
        `?topic=${genre}&page=${page}&mime_type=image/jpeg`,
        bindBooks
      );
    }
  }, [searchText, page, genre, bindBooks, isFetching]);

  useEffect(() => {
    getData();
  }, [getData]);

  const openBook = (id, url) => {
    const keys = Object.keys(url);
    let selectedKey =
      keys.find((key) => key.includes("html")) ||
      keys.find((key) => key.includes("text")) ||
      keys.find((key) => key.includes("/zip"));

    if (selectedKey) {
      window.location.href = url[selectedKey];
    }
  };

  const debouncedSearchBook = useCallback(
    debounce(() => {
      setPage(1);
      setHasMore(false);
      setBookList([]);
      getData();
    }, 500),
    [getData]
  );

  const clearSearch = () => {
    setSearchText("");
    debouncedSearchBook();
  };

  return (
    <Container>
      <SearchBar
        searchText={searchText}
        setSearchText={setSearchText}
        debouncedSearchBook={debouncedSearchBook}
        genre={genre}
        clearSearch={clearSearch}
        navigate={navigate}
      />
      <BookList
        bookList={bookList}
        isFetching={isFetching}
        hasMore={hasMore}
        getData={getData}
        openBook={openBook}
      />
    </Container>
  );
};

export default Books;
