"use client";
import { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [showAllBooks, setShowAllBooks] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isGuest, setIsGuest] = useState(false);

  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (typeof document !== "undefined") {
      setIsGuest(document.cookie.includes("guest=true"));
    }
  }, []);

  useEffect(() => {
    if (session || isGuest) {
      const fetchBooks = async () => {
        try {
          const options = session
            ? { params: { userId: session.user.id } } // only send for logged-in users
            : {}; // get dummy data for guest users

          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_NESTJS_API_URL}/books/user`,
            options
          );

          const data = response.data;

          if (isGuest) {
            // Only first 5 dummy books and from local storage
            const dummyBooks = data.slice(0, 5);

            const localBooks =
              JSON.parse(localStorage.getItem("guestBooks")) || [];
            const mergedBooks = [...dummyBooks, ...localBooks];

            setBooks(mergedBooks);
          } else {
            setBooks(data);
          }
        } catch (error) {
          console.error("Error fetching books:", error.message);
        } finally {
          setLoading(false);
        }
      };
      fetchBooks();
    }
  }, [session, isGuest]);

  const displayedBooks = showAllBooks ? books : books.slice(0, 5);

  const handleGuestSignOut = () => {
    document.cookie = "guest=; path=/; max-age=0";
    router.push("/signin");
  };

  return (
    <>
      {loading ? (
        <div className="h-screen flex justify-center items-center ">
          <ClipLoader
            color={"#374151"}
            loading={true}
            size={70}
            cssOverride={{
              borderWidth: "4px",
            }}
          />
        </div>
      ) : (
        <div className="my-40 justify-center items-center text-center flex flex-col min-h-screen">
          <h1 className="text-2xl font-bold font-sans">Books List</h1>
          <div className="my-14 flex flex-wrap justify-center max-w-[80%] md:max-w-[90%] lg:max-w-[95%] m-auto xl:gap-6 gap-4 md:gap-1 lg:gap-4">
            {displayedBooks.map((book) => (
              <div
                className="relative flex flex-col text-gray-700 bg-white shadow-md w-96 rounded-xl bg-clip-border hover:shadow-xl"
                key={book._id}
              >
                <div className="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white shadow-lg h-80 rounded-xl bg-clip-border">
                  <img
                    src={book.imageUrl}
                    alt="book-image"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="p-6 text-center">
                  <h4 className="block mb-2 font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                    Name: {book.name}
                  </h4>
                  <p className="block font-sans text-base antialiased font-medium leading-relaxed text-transparent bg-gradient-to-tr from-slate-600 to-slate-400 bg-clip-text">
                    Author: {book.author}
                  </p>
                </div>
              </div>
            ))}
          </div>
          {!showAllBooks && books.length > 5 && (
            <button
              onClick={() => setShowAllBooks(true)}
              className="inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-gray-600 border border-gray-700 rounded-md shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              View All
            </button>
          )}
          {isGuest && (
            <>
              <button
                onClick={handleGuestSignOut}
                className="inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-gray-600 border border-gray-700 rounded-md shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 mt-6"
              >
                Continue to your account
              </button>
              <p className="mt-4 text-sm text-muted-foreground">
                Note: As a guest, new books will be temporarily added only for
                24h.
              </p>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Home;
