import DatePicker from 'react-datepicker';
import { Form, Row, Col } from 'react-bootstrap';
const DateInput = ({
	label,
	type,
	selected,
	name,
	onChange,
	value,
	error,
	...rest
}) => {
	return (
		<>
			<Form.Group as={Row} className='mb-3'>
				<Col sm={3}>
					<Form.Label column htmlFor='dateOfBirth'>
						{label}
					</Form.Label>
				</Col>

				<Col sm={9}>
					<DatePicker
						type={type}
						selected={selected}
						id={name}
						name={name}
						onChange={onChange}
						value={value}
						isInvalid={error}
						{
                            ...rest
                        }
					/>

					<Form.Control.Feedback type='invalid' className='d-block'>
						{error}
					</Form.Control.Feedback>
				</Col>
			</Form.Group>
		</>
	);
};

export default DateInput;
