import { Form, Row, Col } from "react-bootstrap";
import CheckInput from "./CheckInput";

const CommonValueCheckedInput = ({label, onChange, valueToIterate}) =>{
    return(
        <>
           	<Form.Group as={Row} className='mb-3'>
					<Col sm={3}>
						<Form.Label column htmlFor='gender'>
							{label}
						</Form.Label>
					</Col>
					{valueToIterate.map((elm, index) => {
						const { name, label, type, value, valueToCheck} = elm;
						return (
							
								<CheckInput
								    key={index}
									name={name}
									type={type}
									onChange={onChange}
									value={value}
									label={label}
									valueToCheck={ valueToCheck}
								/>
								
							
						);
					})}
				</Form.Group>

        </>
    )
}

export default CommonValueCheckedInput