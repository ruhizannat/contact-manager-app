import { Button } from "react-bootstrap"
import { FaPlusCircle } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";


const About = () =>{
   const navigate = useNavigate()
    return(
        <>
          <h1 className="text-center mb-5 ">About Contact</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla, nesciunt similique fuga recusandae at excepturi sed libero repellat aut tempora sunt magnam? Quos, incidunt eligendi sed labore dolorem perspiciatis, nam ut suscipit, beatae laboriosam sapiente eius laborum. Explicabo labore eum placeat. Nostrum natus distinctio doloribus nesciunt, aliquid repudiandae accusantium a!</p>
          <p className="text-center">Create Contact
           <Button variant="primary" className="ms-2" onClick={() =>navigate('/add')}><FaPlusCircle />New</Button>

          </p>
        </>
    )
}
export default About