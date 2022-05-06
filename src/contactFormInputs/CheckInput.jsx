import { Form, Col } from 'react-bootstrap';

const CheckInput = ({ name, type, onChange, value, label, valueToCheck }) => {
	console.log(value, valueToCheck);

	return (
		<>
			<Col sm='auto'>
				<Form.Check
					type={type}
					name={name}
					onChange={onChange}
					value={value}
					label={label}
					checked={valueToCheck === value}
				/>
			</Col>
		</>
	);
};

export default CheckInput;
