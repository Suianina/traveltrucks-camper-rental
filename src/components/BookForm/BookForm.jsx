import css from './BookForm.module.css';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import Button from '../Button/Button.jsx';
import toast from 'react-hot-toast';

const BookForm = () => {
    const emailRegexp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .min(5, 'Name must be at least 5 characters')
            .max(25, 'Name must be maximum 25 characters')
            .required('Name is required'),
        
        email: Yup.string()
            .matches(emailRegexp, 'Invalid email')
            .required('Email is required'),
        
        date: Yup.date()
            .min(new Date(), 'Its too early')
            .required('Date is required'),
        
        comment: Yup.string(),
    });

    const initialValues = {
        name: '',
        email: '',
        date: '',
        comment: '',
    }

    const handleSubmit = values => {
        toast.success('Successfully booked a camper truck')
    };

    return (
      <div className={css.container}>
        <h3 className={css.title}>Book your campervan now</h3>
        <p className={css.text}>
          Stay connected! We are always ready to help you.
            </p>
            <Formik initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}>
                <Form className={css.form}>
                    <label className={css.fieldform}>
                        <Field id="name"
                            name="name"
                            type="text"
                            placeholder="Name"
                            className={css.input}
                        />
                        <ErrorMessage name='name'
                            component='div'
                            className={css.errorMess} />
                    </label>
                    <label className={css.fieldform}>
                        <Field
                            id='email'
                            name='email'
                            type='email'
                            placeholder='Email'
                            className={css.input} />
                    </label>
                    <ErrorMessage className={css.errorMess}
                        name='email'
                        component='div'
                    />
                    <label className={css.fieldform}>
                        <Field className={css.input}
                            id='date'
                            name='date'
                            placeholder='Booking date*'
                            type='text'
                            onBlur={e => {
                                e.currentTarget.type = 'text';
                            }}
                            onFocus={e => {
                                e.currentTarget.type = 'date';
                            }}
                        />
                        <ErrorMessage className={css.errorMess}
                            name='date'
                        component='div'
                        />
                    </label>
                    <label className={css.fieldform}>
                        <Field
                            as='textarea'
                            id='comment'
                            name='comment'
                            type='text'
                            placeholder='Comment'
                            className={css.input}
                        />
                        <ErrorMessage name='comment'
                            className={css.errorMess}
                            component='div'
                        />
                    </label>
                    <Button type='submit' className={css.btn}>Send</Button>
                </Form>
            </Formik>
      </div>
    );
}
export default BookForm;