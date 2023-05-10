import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { retrieveCategories } from "./api/ApiService"

export default function ManageProductsAndCategories() {

    const [categories, setCategories] = useState([])
    const navigate = useNavigate()
    

    useEffect(() => {

        retrieveCategories()
        .then((resp) => {setCategories(resp.data)})
        .catch((err) => console.log(err))

    }, [])

    return (
        <div className="cat">
            <h2>Manage categories and products:</h2>
            {categories.map(cat => {
                return(<div key={cat.id} className="spaces">
                    {cat.name}
                        <div>
                        <button className="btn btn-light" onClick={() => {navigate("/product/add",{state:{update: true, category: cat}})}}>Add product</button>
                        <span>  </span>
                        <button className="btn btn-warning" onClick={() => {navigate("/category/add",{state:{update: true, catId: cat.id, catName: cat.name}})}}>Update</button>
                        </div>
                    </div>)
            })}
            <button className="btn btn-primary" onClick={() => {navigate("/category/add",{state:{update: false, catId: 0}})}}>Add category</button>
        </div>
    )
}