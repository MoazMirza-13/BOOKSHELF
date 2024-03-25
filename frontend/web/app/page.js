"use client";
import { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import axios from "axios";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [showAllBooks, setShowAllBooks] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(
          "https://book-store-git-api.vercel.app/books"
        );
        setBooks(response.data);
      } catch (error) {
        console.error("Error fetching books:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const displayedBooks = showAllBooks ? books : books.slice(0, 5);

  return (
    <>
      {loading ? (
        <div className="h-screen flex justify-center items-center ">
          <ClipLoader color={"#374151"} loading={true} size={70} />
        </div>
      ) : (
        <div className="my-40 justify-center items-center text-center flex flex-col min-h-screen">
          <h1 className="text-2xl font-bold font-sans">Books List</h1>
          <div className="my-14 flex flex-wrap justify-center max-w-[80%] md:max-w-[90%] lg:max-w-[95%] m-auto xl:gap-6 gap-4 md:gap-1 lg:gap-4">
            {displayedBooks.map((book) => (
              <div
                class="relative flex flex-col text-gray-700 bg-white shadow-md w-96 rounded-xl bg-clip-border hover:shadow-xl"
                key={book._id}
              >
                <div class="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white shadow-lg h-80 rounded-xl bg-clip-border">
                  <img src={book.imageUrl} alt="book-image" />
                </div>
                <div class="p-6 text-center">
                  <h4 class="block mb-2 font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                    Name: {book.name}
                  </h4>
                  <p class="block font-sans text-base antialiased font-medium leading-relaxed text-transparent bg-gradient-to-tr from-slate-600 to-slate-400 bg-clip-text">
                    Author: {book.author}
                  </p>
                </div>
              </div>
            ))}
          </div>
          {!showAllBooks && (
            <button
              onClick={() => setShowAllBooks(true)}
              className="inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-gray-600 border border-gray-700 rounded-md shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              View All
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default Home;
