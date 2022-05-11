import { Row, Col, Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
import { useState } from 'react';
const schema = yup
	.object({
		firstName: yup.string().required('First Name is required'),
		lastName: yup.string().required('Last Name is required'),
		email: yup
			.string()
			.email('Must be valid')
			.trim()
			.lowercase()
			.required('Email is required'),
		password: yup
			.string()
			.min(8, 'password must be 8 character long')
			.required('Password is required'),
		confirmPassword: yup
			.string()
			.required('confirm Password is Required')
			.oneOf([yup.ref('password')], "confirmPassword doesn't match"),
	})
	.required();

const Register = () => {
	const {
		register,
		handleSubmit,

		formState: { errors, isSubmitting },
	} = useForm({
		resolver: yupResolver(schema),
	});

	const submit = (data) => {
		console.log(data);
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
			<h2 className='mb-4 mt-4 text-center '>register</h2>
			<Col sm={{ span: 8, offset: 2 }}>
				<Form onSubmit={handleSubmit(submit)}>
					<Form.Group as={Row} className='mb-3'>
						<Col sm={3}>
							<Form.Label column htmlFor='firstName'>
								First Name
							</Form.Label>
						</Col>
						<Col sm={9}>
							<Form.Control
								type='text'
								name='firstName'
								id='firstName'
								placeholder=' first name'
								isInvalid={errors.firstName}
								defaultValue={'ishika'}
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
								Last Name
							</Form.Label>
						</Col>
						<Col sm={9}>
							<Form.Control
								type='text'
								name='lastName'
								id='lastName'
								placeholder=' last name'
								isInvalid={errors.lastName}
								defaultValue={'sopno'}
								{...register('lastName')}
							/>
							<Form.Control.Feedback type='invalid' className='d-block'>
								{errors.lastName?.message}
							</Form.Control.Feedback>
						</Col>
					</Form.Group>

					<Form.Group as={Row} className='mb-3'>
						<Col sm={3}>
							<Form.Label column htmlFor='email'>
								Email
							</Form.Label>
						</Col>
						<Col sm={9}>
							<Form.Control
								type='text'
								name='email'
								id='email'
								placeholder=' email'
								isInvalid={errors.email}
								defaultValue={'ishikasopno90@gmail.com'}
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
								Password
							</Form.Label>
						</Col>
						<Col sm={9}>
							<Form.Control
								className='relative'
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
							<div className='absolute '>
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
								Confirm Password
							</Form.Label>
						</Col>
						<Col sm={9}>
							<Form.Control
								className='relative'
								type={confirmPassword === false ? 'password' : 'text'}
								name='confirmPassword'
								id='confirmPassword'
								placeholder='confirm password'
								isInvalid={errors.confirmPassword}
								{...register('confirmPassword')}
							/>
							<div className='absolute '>
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
							className='button'
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
