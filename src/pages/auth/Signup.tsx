import { FormLabel } from '@material-ui/core';
import { ErrorMessage, Form, Formik, Field } from 'formik';
import { Link, useHistory } from 'react-router-dom';
import * as yup from 'yup';
import { useLocationQuery } from '../../helpers';
import { Actions } from '../../state/actions';
import { useAppStateDispatch } from '../../state/AppContext';
import './auth.css';

const validationSchema = yup.object({
    firstName: yup.string().required('First name is required'),
    lastName: yup.string().required('Last name is required'),
    email: yup.string()
        .email('Must be a valid email')
        .required('Email is required'),
    password: yup.string().required('Password is required')
})

export const Signup: React.FC = () => {
    const dispatch = useAppStateDispatch();
    const history = useHistory();
    let [next] = useLocationQuery(['next']);

    const onSubmit = (values: any) => {
        dispatch && dispatch({
            type: Actions.SIGNUP,
            payload: values
        });
        history.push(next || '/broadcast');
    };

    return <div className='auth'>

        <div className='auth__left'>
            <h1>
                <img className='logo' src={`${process.env.PUBLIC_URL}/logo.webp`} alt='logo' />
                Eagle Livestream
            </h1>

            <div className='auth__form'>
                <h3>Creat an account</h3>
                {/* <div className='text-small'>
                    Please log in to your account
                </div> */}

                <Formik
                    initialValues={{
                        firstName: '',
                        lastName: '',
                        email: '',
                        password: ''
                    }}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                >
                    <Form>

                        <FormLabel>First Name</FormLabel>
                        <Field name='firstName' />
                        <div className='input__error'>
                            <ErrorMessage name='firstName' />
                        </div>

                        <FormLabel>Last Name</FormLabel>
                        <Field name='lastName' />
                        <div className='input__error'>
                            <ErrorMessage name='lastName' />
                        </div>

                        <FormLabel>Email</FormLabel>
                        <Field name='email' />
                        <div className='input__error'>
                            <ErrorMessage name='email' />
                        </div>

                        <FormLabel>Password</FormLabel>
                        <Field type='password' name='password' />
                        <div className='input__error'>
                            <ErrorMessage name='password' />
                        </div>

                        <button className='btn-primary' type='submit'>
                            Create account
                        </button>
                    </Form>
                </Formik>

                <div className='text-small auth__form__footer'>
                    <div>Already have an account?{' '}
                        <Link className='link-primary' to={`/login?next=${next || '/broadcast'}`}>Log in</Link></div>
                </div>
            </div>
        </div>

    </div>
}
