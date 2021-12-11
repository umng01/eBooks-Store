import React, { useState } from "react";
import "./App.css";
import {
  InputGroup,
  Input,
  InputGroupAddon,
  Button,
  FormGroup,
  Label,
  Spinner,
} from "reactstrap";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Books from "./Books.jsx";

function App() {


  const [maxResults, setMaxResults] = useState(12);
  const [startIndex, setStartIndex] = useState(1);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [cards, setCards] = useState([]);
  


  const handleSubmit = () => {
    setLoading(true);
    if (maxResults > 50 || maxResults < 1) {
      toast.error("Max results must be between 1 and 50");
    } else {
      axios
        .get(
          `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=${maxResults}&startIndex=${startIndex}`
        )
        .then((res) => {
          if (startIndex >= res.data.totalItems || startIndex < 1) {
            toast.error(
              `Max results must be between 1 and ${res.data.totalItems}`
            );
          } else {
            if (res.data.items.length > 0) {
              setCards(res.data.items);
              setLoading(false);
            }
          }
        })
        .catch((err) => {
          setLoading(true);
        });
    }
  };

  
  const mainHeader = () => {
    return (
      <div className="main-image d-flex justify-content-center align-items-center flex-column">
        <div className="filter"></div>
        <h1 className="display-2 text-center mb-3 title" >
          eBooks For You
        </h1>
        <div style={{ width: "60%", zIndex: 2 }}>
          <InputGroup size="lg" className="mb-3 ">
            <Input
              className=" input"
              placeholder="Search an eBook"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <InputGroupAddon addonType="append">
              <Button onClick={handleSubmit} className="button">
                <i className="fas fa-search"></i>
              </Button>
            </InputGroupAddon>
          </InputGroup>
          <div className="d-flex text-white justify-content-center">
            <FormGroup>
              <Label for="maxResults" className="label">
                Max Results
              </Label>
              <Input
                type="number"
                id="maxResults"
                className=" input"
                placeholder="Max Results"
                value={maxResults}
                onChange={(e) => setMaxResults(e.target.value)}
              />
            </FormGroup>
            <FormGroup className="ml-5">
              <Label for="startIndex" className="label">
                Start Index
              </Label>
              <Input
                type="number"
                id="startIndex"
                className="block input"
                placeholder="Start Index"
                value={startIndex}
                onChange={(e) => setStartIndex(e.target.value)}
              />
            </FormGroup>
          </div>
        </div>
      </div>
    );
  };

  const handleCards = () => {
    if (loading) {
      return (
        <div className="d-flex justify-content-center mt-3">
          <Spinner className="spin"/>
        </div>
      );
    } else {
      const items = cards.map((item, i) => {
        let thumbnail = "";
        if (item.volumeInfo.imageLinks) {
          thumbnail = item.volumeInfo.imageLinks.thumbnail;
        }

        return (
          <div className="col-lg-4 mb-3" key={item.id}>
            <Books
              thumbnail={thumbnail}
              title={item.volumeInfo.title}
              pageCount={item.volumeInfo.pageCount}
              language={item.volumeInfo.language}
              authors={item.volumeInfo.authors}
              publisher={item.volumeInfo.publisher}
              description={item.volumeInfo.description}
              previewLink={item.volumeInfo.previewLink}
              infoLink={item.volumeInfo.infoLink}
            />
          </div>
        );
      });
      return (
        <div className="container my-5">
          <div className="row">{items}</div>
        </div>
      );
    }
  };
  return (
    <div className="w-100 h-100">
      {mainHeader()}
      {handleCards()}
      <ToastContainer />
    </div>
  );
}

export default App;
