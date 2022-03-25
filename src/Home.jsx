import { Button } from "react-bootstrap"

const Home = () =>{
    return(
        <>
        
        <h1 className="text-center display-1">Contacts Manager</h1>
        <p className="p">Let's share our contact info</p>
         <Button className="m-auto" variant="info">Browse Contact</Button>
        </>
    )
}
export default Home