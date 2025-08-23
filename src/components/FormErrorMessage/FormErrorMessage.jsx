import { ErrorMessage as FormikErrorMessage } from "formik";
import s from "./FormErrorMessage.module.css";

/**
 * Універсальний вивід помилки для Formik.
 * Приклад: <FormErrorMessage name="email" id="err-email" />
 * - name: ім'я поля Formik
 * - id: опціонально, для aria-describedby на інпуті
 */
export default function FormErrorMessage({ name, id }) {
  if (!name) return null;
  return (
    <FormikErrorMessage
      name={name}
      render={(msg) => (
        <div id={id} className={s.err} role="alert" aria-live="polite">
          {msg}
        </div>
      )}
    />
  );
}
