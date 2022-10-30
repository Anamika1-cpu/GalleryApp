import React from 'react'
import { useEffect, useState } from "react";
import axios from "axios";
import './style.css';
import ReactPaginate from 'react-paginate';
import loading from './assests/loading.gif';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {

  const [images, setimages] = useState(null);
  const [count, setcount] = useState(0);

  useEffect(() => {
    GetImages();
  }, [count])


  const GetImages = async () => {
    try {
      const response = await axios.get(
        `https://picsum.photos/v2/list?page=${count + 1}&limit=12`
      );
      setimages(response.data);
      console.log(response);

    } catch (error) {
      console.log(error);
    }
  };

  const handlePageClick = (event) => {
    setcount(event.selected);
  }

  let imagelist = (
    <div className="loader-gif">
      <img src={loading} alt="Loading..." />
    </div>
  )

  if (images) {
    imagelist = images.map((image) => (
      <div
        key={image.id}
        className="card ml-10 mb-3"
        style={{ width: "18rem" }}
      >
        <div
          style={{
            width: "100%",
            height: "30vh",
            backgroundImage: `url(${image.download_url})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        ></div>
        <div className="card-body">
          <p className="card-text">{image.author}</p>
        </div>
      </div>
    ))
  }
  console.log(count);
  return (
    <div className="conatiner mt-4">
      <h1 className="text-center">Gallery App</h1>
      <div className="alert alert-light mt-5 d-flex flex-wrap">{imagelist}
        <ReactPaginate
          className="pagination-ul"
          nextLabel=">"
          onPageChange={handlePageClick}
          pageCount={5}
          previousLabel="<"
        />
      </div>
    </div>

  )
}

export default App;