import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { createCategory, updateCategoryById} from "./api/ApiService";

export default function Category() {


    const location = useLocation();
    const navigate = useNavigate();
    const [catNameForm, setCatNameForm] = useState("");
    const [add, setAdd] = useState(false);
    const [upd, setUpd] = useState(false);
    const [catId, setCatId] = useState(0);

    function handleCatNameChange(event) {
        setCatNameForm(event.target.value)
    }

    function handleSubmit() {
        if(catId === 0){
            let req = {}
            req.name = catNameForm
            createCategory(req)
            .catch((err) => {console.log(err)})
            navigate("/profile")
        }

        if(catId !== 0) {
            let req = {}
            req.name = catNameForm
            updateCategoryById(catId, req)
            .catch((err) => {console.log(err)})
            navigate("/profile")
        }

    }

    useEffect(() => {
        setUpd(location.state.update)
        setAdd(!location.state.update)
        setCatId(location.state.catId)
        setCatNameForm(location.state.catName)
    }, [location.state.update, location.state.catId, location.state.catName])

    return (
        <form action="submit">
            {add && <h1> Create category </h1>}
            {upd && <h1> Update category</h1>}

            <label>Category name</label>
            <input type="text" value={catNameForm || ""} onChange={handleCatNameChange}/>
            <br></br>
            {add && <button type="button" className="btn btn-success" name="formbtn" onClick={handleSubmit}>Create</button>}
            {upd && <button type="button" className="btn btn-success" name="formbtn" onClick={handleSubmit}>Update</button>}
        </form>
    )
}