// src/components/BookForm/BookForm.jsx
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { toast } from "react-hot-toast";
import styles from "./BookForm.module.css";
import Button from "../Button/Button";
import FormErrorMessage from "../FormErrorMessage/FormErrorMessage";

const todayISO = () => new Date().toISOString().split("T")[0];

const schema = Yup.object({
  name: Yup.string()
    .trim()
    .min(2, "Min 2 characters")
    .max(25, "Max 25 characters")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  date: Yup.date()
    .transform((val, orig) => (orig ? new Date(orig) : val))
    .min(new Date(todayISO()), "Date must be today or later")
    .required("Required"),
  comment: Yup.string().max(500, "Max 500 characters"),
});

export default function BookForm({ camperName, onSubmit }) {
  const initial = { name: "", email: "", date: "", comment: "" };

  const handleSubmit =
    onSubmit ||
    ((vals, { resetForm }) => {
      toast.success("Booking submitted!");
      console.log("Booking:", { camperName, ...vals });
      resetForm();
    });

  return (
    <div className={styles.box}>
      <h3 className={styles.title}>Book your campervan now</h3>
      <p className={styles.sub}>
        Stay connected! We are always ready to help you.
      </p>

      <Formik
        initialValues={initial}
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form className={styles.form} noValidate>
            {/* Name */}
            <label className={styles.label}>
              <span className={styles.req}>Name*</span>
              <Field
                name="name"
                placeholder="Name"
                className={styles.input}
                aria-describedby="err-name"
                aria-invalid={touched.name && !!errors.name}
                autoComplete="name"
              />
            </label>
            <FormErrorMessage name="name" id="err-name" />

            {/* Email */}
            <label className={styles.label}>
              <span className={styles.req}>Email*</span>
              <Field
                name="email"
                type="email"
                placeholder="Email"
                className={styles.input}
                aria-describedby="err-email"
                aria-invalid={touched.email && !!errors.email}
                autoComplete="email"
              />
            </label>
            <FormErrorMessage name="email" id="err-email" />

            {/* Booking date */}
            <label className={styles.label}>
              <span className={styles.req}>Booking date*</span>
              <Field
                name="date"
                type="date"
                className={styles.input}
                aria-describedby="err-date"
                aria-invalid={touched.date && !!errors.date}
                min={todayISO()}
              />
            </label>
            <FormErrorMessage name="date" id="err-date" />

            {/* Comment */}
            <label className={styles.label}>
              <span>Comment</span>
              <Field
                as="textarea"
                name="comment"
                placeholder="Comment"
                rows={4}
                className={styles.textarea}
                aria-describedby="err-comment"
                aria-invalid={touched.comment && !!errors.comment}
              />
            </label>
            <FormErrorMessage name="comment" id="err-comment" />

            {/* Кнопка з UI-кіта */}
            <Button
              type="submit"
              variant="primary"
              size="md"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send"}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
