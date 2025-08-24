import { useState } from "react";
import css from "./BookForm.module.css";
import { toast } from "react-hot-toast";

const todayISO = () => new Date().toISOString().split("T")[0];

const BookForm = ({ className = "" }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    date: "",
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

    console.log("BOOKING REQUEST:", form);

    toast.success("Booking request sent!");
    setForm({ name: "", email: "", date: "", comment: "" });
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

      <input
        className={css.input}
        type="date"
        name="date"
        placeholder="ДД.ММ.РРРР"
        min={todayISO()}
        value={form.date}
        onChange={onChange}
      />

      <textarea
        className={`${css.input} ${css.textarea}`}
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
