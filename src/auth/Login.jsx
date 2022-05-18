import { useContext, useState } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
import image from './avatar.png';
import styles from './Login.module.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';

const schema = yup
	.object({
		email: yup
			.string()
			.email('Must be valid')
			.trim()
			.lowercase()
			.required('Email is required'),
		password: yup
			.string()

			.required('Password is required'),
	})
	.required();

const Login = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const { saveAuthInfo } = useContext(AuthContext);
	const {
		register,
		handleSubmit,

		formState: { errors, isSubmitting },
	} = useForm({
		resolver: yupResolver(schema),
	});

	const [password, setPassword] = useState(false);
	const handelPassword = () => {
		setPassword(!password);
	};
	const onSubmit = async (data) => {
		const { email, password } = data;
		try {
			const res = await axios.post(
				// api request to the server
				'http://localhost:1337/api/auth/local',
				{
					identifier: email,
					password,
				}
			);
			saveAuthInfo(res.data);
			toast.success('Login successful');
			navigate(location?.state?.from || '/contacts');
		} catch (err) {
			console.log(err);
			toast.error(err.response.data.error.message);
			console.log(err.response);
		}
	};
	return (
		<div className='container-fluid content'>
			<h2 className='text-center pt-4 d-flex flex-md-column-reverse '>
				{' '}
				Log in <br />
				<img src={image} alt='login image' className='img-fluid images ' />
			</h2>
			<Form className='form' onSubmit={handleSubmit(onSubmit)}>
				<Form.Group as={Row} className='mb-3'>
					<Col sm={3}>
						<Form.Label column htmlFor='email'>
							email
						</Form.Label>
					</Col>
					<Col sm={9}>
						<Form.Control
							type='text'
							name='email'
							id='email'
							placeholder=' email'
							isInvalid={errors.email}
							{...register('email')}
						/>
						<Form.Control.Feedback type='invalid' className='d-block'>
							{errors.email?.message}
						</Form.Control.Feedback>
					</Col>
				</Form.Group>

				<Form.Group as={Row} className='mb-3'>
					<Col sm={3}>
						<Form.Label column htmlFor='password'>
							password
						</Form.Label>
					</Col>
					<Col sm={9}>
						<Form.Control
							className={styles.passwordControl}
							type={password === false ? 'password' : 'text'}
							name='password'
							id='password'
							placeholder='password'
							isInvalid={errors.password}
							{...register('password')}
						/>
						<div className={styles.passwordIcon}>
							{password === false ? (
								<AiFillEyeInvisible onClick={handelPassword} />
							) : (
								<AiFillEye onClick={handelPassword} />
							)}
						</div>
						<Form.Control.Feedback type='invalid' className='d-block'>
							{errors.password?.message}
						</Form.Control.Feedback>
					</Col>
				</Form.Group>
				<Button variant='warning' type='submit' disabled={isSubmitting}>
					Sing in
				</Button>
			</Form>
		</div>
	);
};

export default Login;
