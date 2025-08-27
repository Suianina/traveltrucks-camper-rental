import { useState } from "react";
import css from "./BookForm.module.css";
import { toast } from "react-hot-toast";

import DatePicker, { registerLocale } from "react-datepicker";
import enUS from "date-fns/locale/en-US";
import "react-datepicker/dist/react-datepicker.css";

registerLocale("en", enUS);

const BookForm = ({ className = "" }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    date: null,
    comment: "",
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!form.name.trim()) return toast.error("Enter your name");
    if (!/^\S+@\S+\.\S+$/.test(form.email))
      return toast.error("Enter a valid email");
    if (!form.date) return toast.error("Pick a booking date");

    const dataToSend = {
      ...form,
      date: form.date.toISOString().split("T")[0],
    };

    console.log("BOOKING REQUEST:", dataToSend);

    toast.success("Booking request sent!");
    setForm({ name: "", email: "", date: null, comment: "" });
  };

  return (
    <form className={`${css.wrap} ${className}`} onSubmit={onSubmit} noValidate>
      <h3 className={css.title}>Book your campervan now</h3>
      <p className={css.subtitle}>
        Stay connected! We are always ready to help you.
      </p>

      <input
        className={css.input}
        type="text"
        name="name"
        placeholder="Name*"
        value={form.name}
        onChange={onChange}
      />

      <input
        className={css.input}
        type="email"
        name="email"
        placeholder="Email*"
        value={form.email}
        onChange={onChange}
      />

      <DatePicker
        selected={form.date}
        onChange={(date) => setForm((s) => ({ ...s, date }))}
        minDate={new Date()}
        placeholderText="Booking date*"
        locale="en"
        className={css.input}
        aria-label="Booking date"
        dateFormat="MMMM d, yyyy"
      />

      <textarea
        className={`${css.textarea}`}
        name="comment"
        placeholder="Comment"
        value={form.comment}
        onChange={onChange}
      />

      <button type="submit" className={css.submit}>
        Send
      </button>
    </form>
  );
};

export default BookForm;
