import { Form, Row, Col } from 'react-bootstrap';
const EmailInput = ({
	label,
	type,
	name,
	onChange,
	value,
	placeholder,
	error,
	
}) => {
	return (
		<>
			<Form.Group as={Row} className='mb-3'>
				<Col sm={3}>
					<Form.Label column htmlFor='email'>
						{label}
					</Form.Label>
				</Col>

				<Col sm={9}>
					<Form.Control
						type={type}
						id={name}
						name={name}
						placeholder={placeholder}
						onChange={onChange}
						value={value}
						isInvalid={error}
					/>

					<Form.Control.Feedback type='invalid' className='d-block'>
						{error}
					</Form.Control.Feedback>
				</Col>
			</Form.Group>
		</>
	);
};
export default EmailInput;
