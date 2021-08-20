import { ErrorMessage, Form, Formik, Field } from 'formik';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import './auth.css';

const validationSchema = yup.object({
    email: yup.string()
        .email('Must be a valid email')
        .required('Email is required'),
    password: yup.string().required('Password is required')
})

export const Login: React.FC = () => {
    const onSubmit = () => { };

    return <div className='container auth'>
        <h1>Demo</h1>

        <div className='auth__form'>
            <h3>Welcome Back!</h3>
            <div className='text-small'>
                Please log in to your account
            </div>

            <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                <Form>
                    <Field name='email' />
                    <div className='input__error'>
                        <ErrorMessage name='email' />
                    </div>
                    
                    <Field type='password' name='password' />
                    <div className='input__error'>
                        <ErrorMessage name='password' />
                    </div>

                    <button className='btn-primary' type='submit'>
                        Login
                    </button>
                </Form>
            </Formik>

            <div className='text-small auth__form__footer'>
                <div>You don't have an account? <Link className='link-primary' to='/signup'>Create an account</Link></div>
                <div>Forgot password? <Link className='link-primary' to='/forgot-password'>Forgot Password</Link></div>
            </div>
        </div>
    </div>
}
