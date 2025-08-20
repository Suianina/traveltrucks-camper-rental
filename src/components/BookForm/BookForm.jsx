import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-hot-toast";
import styles from "./BookForm.module.css";

const schema = Yup.object({
  name: Yup.string().trim().min(2).required("Required"),
  email: Yup.string().email().required("Required"),
  date: Yup.string().required("Required"),
  comment: Yup.string().max(500),
});

export default function BookForm({ camperName }) {
  const initial = { name: "", email: "", date: "", comment: "" };

  return (
    <div className={styles.box}>
      <h3 className={styles.title}>Book your campervan now</h3>
      <p className={styles.sub}>
        Stay connected! We are always ready to help you.
      </p>

      <Formik
        initialValues={initial}
        validationSchema={schema}
        onSubmit={(vals, { resetForm }) => {
          toast.success("Booking submitted!");
          console.log("Booking:", { camperName, ...vals });
          resetForm();
        }}
      >
        <Form className={styles.form}>
          <Field name="name" placeholder="Name*" className={styles.input} />
          <ErrorMessage name="name" component="div" className={styles.err} />

          <Field name="email" placeholder="Email*" className={styles.input} />
          <ErrorMessage name="email" component="div" className={styles.err} />

          <Field name="date" type="date" className={styles.input} />
          <ErrorMessage name="date" component="div" className={styles.err} />

          <Field
            as="textarea"
            name="comment"
            placeholder="Comment"
            rows="4"
            className={styles.textarea}
          />
          <ErrorMessage name="comment" component="div" className={styles.err} />

          <button type="submit" className={styles.btn}>
            Send
          </button>
        </Form>
      </Formik>
    </div>
  );
}
