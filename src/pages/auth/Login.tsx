import { FormLabel } from '@material-ui/core';
import { ErrorMessage, Form, Formik, Field } from 'formik';
import { Link, useHistory } from 'react-router-dom';
import * as yup from 'yup';
import { useLocationQuery } from '../../helpers';
import { Actions } from '../../state/actions';
import { useAppStateDispatch } from '../../state/AppContext';
import './auth.css';

const validationSchema = yup.object({
    email: yup.string()
        .email('Must be a valid email')
        .required('Email is required'),
    password: yup.string().required('Password is required')
})

export const Login: React.FC = () => {
    const dispatch = useAppStateDispatch();
    const history = useHistory();
    let [next] = useLocationQuery(['next']);

    const onSubmit = (values: any) => {
        dispatch && dispatch({
            type: Actions.LOGIN,
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
                            Login
                        </button>
                    </Form>
                </Formik>

                <div className='text-small auth__form__footer'>
                    <div>You don't have an account? <Link className='link-primary' to={`/signup?next=${next || '/broadcast'}`}>
                        Create an account</Link></div>
                    <div>Forgot password? <Link className='link-primary' to='/forgot-password'>Forgot Password</Link></div>
                </div>
            </div>
        </div>

    </div>
}
