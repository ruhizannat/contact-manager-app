import { Row, Col, Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';
const schema = yup
	.object({
		firstName: yup.string().required('First Name is required'),
		lastName: yup.string().required('Last Name is required'),
		username: yup
			.string()
			.required('username is Required')
			.min(4, 'username must be 4 or more in length'),
		email: yup
			.string()
			.email('Must be valid')
			.trim()
			.lowercase()
			.required('Email is required'),
		password: yup
			.string()

			.required('password is required')
			.min(
				8,
				'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character'
			),

		confirmPassword: yup
			.string()
			.required('confirm Password is Required')
			.oneOf([yup.ref('password')], "confirmPassword doesn't match"),
	})
	.required();

const Register = () => {
	const navigate = useNavigate();
	const { saveAuthInfo } = useContext(AuthContext);
	const {
		register,
		handleSubmit,

		formState: { errors, isSubmitting },
	} = useForm({
		resolver: yupResolver(schema),
	});

	const onSubmit = async (data) => {
		const { firstName, lastName, username, email, password } = data;
		try {
			const res = await axios.post(
				// api request to the server
				'http://localhost:1337/api/auth/local/register',
				{
					firstName,
					lastName,
					username,
					email,
					password,
				}
			);
			saveAuthInfo(res.data);
			toast.success('Registration successful');
			navigate('/contacts');
		} catch (err) {
			console.log(err);
			toast.error(err.response.data.error.message);
			console.log(err.response);
		}
	};

	const [password, setPassword] = useState(false);
	const [confirmPassword, setConfirmPassword] = useState(false);

	const handelPassword = () => {
		setPassword(!password);
	};
	const handelConfirmPassword = () => {
		setConfirmPassword(!confirmPassword);
	};
	return (
		<Row>
			<h2 className='mb-4 mt-4 text-center '>Register</h2>
			<Col sm={{ span: 8, offset: 2 }}>
				<Form onSubmit={handleSubmit(onSubmit)}>
					<Form.Group as={Row} className='mb-3'>
						<Col sm={3}>
							<Form.Label column htmlFor='firstName'>
								FirstName
							</Form.Label>
						</Col>
						<Col sm={9}>
							<Form.Control
								type='text'
								name='firstName'
								id='firstName'
								placeholder=' first name'
								isInvalid={errors.firstName}
								{...register('firstName')}
							/>

							<Form.Control.Feedback type='invalid' className='d-block'>
								{errors.firstName?.message}
							</Form.Control.Feedback>
						</Col>
					</Form.Group>

					<Form.Group as={Row} className='mb-3'>
						<Col sm={3}>
							<Form.Label column htmlFor='lastName'>
								LastName
							</Form.Label>
						</Col>
						<Col sm={9}>
							<Form.Control
								type='text'
								name='lastName'
								id='lastName'
								placeholder=' last name'
								isInvalid={errors.lastName}
								{...register('lastName')}
							/>
							<Form.Control.Feedback type='invalid' className='d-block'>
								{errors.lastName?.message}
							</Form.Control.Feedback>
						</Col>
					</Form.Group>

					<Form.Group as={Row} className='mb-3'>
						<Col sm={3}>
							<Form.Label htmlFor='username' column>
								username
							</Form.Label>
						</Col>

						<Col sm={9}>
							<Form.Control
								type='text'
								name='username'
								id='username'
								placeholder=' username'
								isInvalid={errors.username}
								{...register('username')}
							/>
							<Form.Control.Feedback type='inValid' className='d-block'>
								{errors.username?.message}
							</Form.Control.Feedback>
						</Col>
					</Form.Group>

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
								className='passwordControl'
								type={password === false ? 'password' : 'text'}
								name='password'
								id='password'
								placeholder='password'
								isInvalid={errors.password}
								{...register('password', {
									pattern:
										/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
								})}
							/>
							<div className='passwordIcon '>
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

					<Form.Group as={Row} className='mb-3'>
						<Col sm={3}>
							<Form.Label column htmlFor='confirmPassword'>
								confirmPassword
							</Form.Label>
						</Col>
						<Col sm={9}>
							<Form.Control
								className='passwordControl'
								type={confirmPassword === false ? 'password' : 'text'}
								name='confirmPassword'
								id='confirmPassword'
								placeholder='confirm password'
								isInvalid={errors.confirmPassword}
								{...register('confirmPassword')}
							/>
							<div className='passwordIcon '>
								{confirmPassword === false ? (
									<AiFillEyeInvisible onClick={handelConfirmPassword} />
								) : (
									<AiFillEye onClick={handelConfirmPassword} />
								)}
							</div>

							<Form.Control.Feedback type='invalid' className='d-block'>
								{errors.confirmPassword?.message}
							</Form.Control.Feedback>
						</Col>
					</Form.Group>
					<div className='mt-4'>
						<Button
							variant='warning'
							disabled={isSubmitting}
							type='submit'
							size='md'
						>
							Submit
						</Button>
					</div>
				</Form>
			</Col>
		</Row>
	);
};

export default Register;
