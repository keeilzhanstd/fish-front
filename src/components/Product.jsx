import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { createProduct} from "./api/ApiService";

export default function Product() {


    const location = useLocation();
    const navigate = useNavigate();
    const [name, setNameForm] = useState('');
    const [desc, setDescForm] = useState('');
    const [link, setLinkForm] = useState('');
    const [price, setPriceForm] = useState(0);

    function handleNameChange(event) {
        setNameForm(event.target.value)
    }
    function handleDescChange(event) {
        setDescForm(event.target.value)
    }
    function handleLinkChange(event) {
        setLinkForm(event.target.value)
    }
    function handlePriceChange(event) {
        setPriceForm(event.target.value)
    }

    function handleSubmit() {
    
        let req = {}
        req.name = name
        req.description = desc
        req.image = link
        req.price = price
        req.category = location.state.category

        createProduct(req)
        .catch((err) => {console.log(err)})
        navigate("/profile")
    }

    return (
        <form action="submit">
            <label>Product name</label>
            <input type="text" name="name" value={name} onChange={handleNameChange}/>
            <label>Description</label>
            <input type="text" name="description" value={desc} onChange={handleDescChange}/>
            <label>Image link</label>
            <input type="text" name="link" value={link} onChange={handleLinkChange}/>
            <label>Price</label>
            <input type="number" name="price" value={price} onChange={handlePriceChange}/>
            <br></br>

            <button type="button" className="btn btn-success" name="formbtn" onClick={handleSubmit}>Create</button>
            
        </form>
    )
}