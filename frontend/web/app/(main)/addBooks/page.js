"use client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const AddBook = () => {
  const initialValues = {
    name: "",
    author: "",
    imageUrl: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Book name is required"),
    author: Yup.string().required("Author name is required"),
    imageUrl: Yup.string().url("Invalid URL").required("Image URL is required"),
  });

  const { data: session } = useSession();
  const router = useRouter();

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const user_id = session.user.id;
      const body = {
        ...values,
        user_id: user_id,
      };
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_NESTJS_API_URL}/books`,
        body
      );

      if (response.status === 201) {
        toast.success("Book added successfully!", {
          onClose: () => router.push("/"),
          autoClose: 2000,
        });
        resetForm();
      } else {
        console.error("Error adding book:", response);
      }
    } catch (error) {
      console.error("Error adding book:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="my-40  flex flex-col">
      <h1 className="text-2xl font-bold font-sans mb-8 text-center">
        Add Book
      </h1>
      <Formik
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 "
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="flex flex-col max-w-[70%] m-auto ">
          <div className="mb-4 flex flex-col gap-4">
            <div className="flex flex-col   ">
              <label
                className="block text-gray-700  font-bold mb-2 "
                htmlFor="name"
              >
                Book Name
              </label>
              <Field
                type="text"
                id="name"
                name="name"
                className="block  md:w-[17rem] w-[13rem] rounded-md border-0 p-[0.47rem] text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 outline-gray-400 focus:ring-inset focus:ring-gray-500  sm:text-sm sm:leading-6"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="my-1 text-red-500"
              />
            </div>
          </div>
          <div className="mb-4 flex flex-col gap-4">
            <div className="flex flex-col   ">
              <label
                className="block text-gray-700  font-bold mb-2 "
                htmlFor="author"
              >
                Author Name
              </label>
              <Field
                type="text"
                id="author"
                name="author"
                className="block  md:w-[17rem] w-[13rem] rounded-md border-0 p-[0.47rem] text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 outline-gray-400 focus:ring-inset focus:ring-gray-500  sm:text-sm sm:leading-6"
              />
              <ErrorMessage
                name="author"
                component="div"
                className="my-1 text-red-500"
              />
            </div>
          </div>
          <div className="mb-4 flex flex-col gap-4">
            <div className="flex flex-col   ">
              <label
                className="block text-gray-700  font-bold mb-2 "
                htmlFor="imageUrl"
              >
                Image Url
              </label>
              <Field
                type="text"
                id="imageUrl"
                name="imageUrl"
                className="block  md:w-[17rem] w-[13rem] rounded-md border-0 p-[0.47rem] text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 outline-gray-400 focus:ring-inset focus:ring-gray-500  sm:text-sm sm:leading-6"
              />
              <ErrorMessage
                name="imageUrl"
                component="div"
                className="my-1 text-red-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-gray-600 border border-gray-700 rounded-md shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Add Book
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default AddBook;
