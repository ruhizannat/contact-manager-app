import { Form, Col, Row } from 'react-bootstrap';
const TextInput = ({
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
					<Form.Label column htmlFor={name}>
						{label}
					</Form.Label>
				</Col>
				<Col sm={9}>
					<Form.Control
						type={type}
						name={name}
						id={name}
						onChange={onChange}
						value={value}
						placeholder={placeholder}
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
export default TextInput;
