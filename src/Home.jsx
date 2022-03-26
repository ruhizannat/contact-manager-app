import { Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
const Home = () =>{
    const navigate = useNavigate()
    return(
        <>
       
        
        
        <h1 className="text-center display-1">Contacts Manager</h1>
        <p className="p">Let's share our contact info</p>
        <div className="text-center">
         <Button className="m-auto" variant="info" onClick={() =>navigate('/contacts')}>Browse Contact</Button>
         </div>
        </>
    )
}
export default Home