import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-hot-toast";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { useState } from "react";
import css from "./BookForm.module.css";

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .max(25, "Name must be max 25 characters")
    .required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  date: Yup.date()
    .min(new Date(), "Booking date must be in the future")
    .required("Booking date is required"),
  comment: Yup.string(),
});

const BookForm = ({ className = "" }) => {
  const [selectedDate, setSelectedDate] = useState(null);

  const initialValues = {
    name: "",
    email: "",
    date: null,
    comment: "",
  };

  const handleSubmit = (values, { resetForm }) => {
    const dataToSend = {
      ...values,
      date: values.date.toISOString().split("T")[0],
    };

    console.log("BOOKING REQUEST:", dataToSend);
    toast.success("Booking request sent!");
    resetForm();
    setSelectedDate(null);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue }) => (
        <Form className={`${css.wrap} ${className}`} noValidate>
          <h3 className={css.title}>Book your campervan now</h3>
          <p className={css.subtitle}>
            Stay connected! We are always ready to help you.
          </p>

          <Field
            name="name"
            type="text"
            placeholder="Name*"
            className={css.input}
          />

          <Field
            name="email"
            type="email"
            placeholder="Email*"
            className={css.input}
          />

          <div className={css.dateWrapper}>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => {
                setSelectedDate(date);
                setFieldValue("date", date);
              }}
              minDate={new Date()}
              placeholderText="Booking date*"
              dateFormat="MMMM d, yyyy"
              className={css.input}
              wrapperClassName={css.dateWrapper}
            />
          </div>

          <Field
            as="textarea"
            name="comment"
            placeholder="Comment"
            className={css.textarea}
          />

          <button type="submit" className={css.submit}>
            Send
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default BookForm;
