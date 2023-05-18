import { useState } from "react"
import { useEffect} from "react"
import { retrieveCategories, retrieveProducts, retrieveCart, updateCartByUsername } from "./api/ApiService";
import { useAuth } from "./auth/AuthContext";

export default function HomeComponent() {

    const authContext = useAuth()
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(0);
    const [category, setCategory] = useState("all");
    const [filterCategories, setFilterCategories] = useState(false)
    const [categories, setCategories] = useState([]);
    const [animation, setAnimation] = useState('')
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [q, setQ] = useState('')

    function filterBySearch(event) {
        setQ(event.target.value)
        var updatedList = [...products];
        updatedList = updatedList.filter(
            (product) => {return product.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
        });

        filterProducts(updatedList)
    };

    function filterProducts(updatedList) {
        if(q === ''){ setFilteredProducts(products); } else { setFilteredProducts(updatedList); }
    }

    function refreshProducts(){
        retrieveProducts()
        .then((response) => {
            setProducts(response.data)
            setFilteredProducts(response.data)
        })
        .catch(error => console.log(error))
    }

    function refreshCategories(){
        retrieveCategories()
        .then((response) => {
            setCategories(response.data)
        })
        .catch(error => console.log(error))
    }

    function addProduct(product) {

        setLoading(product.id)
        setAnimation(<i className="fa fa-refresh fa-spin"></i>)

        retrieveCart(authContext.user.username)
        .then((response) => {
            response.data.products.push(product)
            updateCartByUsername(authContext.user.username, response.data)
            .catch(error => console.log(error))
        })
        .catch(error => console.log(error))
        
        animate(product.id)

    }

    function animate(id) {
        setTimeout(() => {setAnimation(<i className="fa fa-check"></i>) }, 300)
    }

    function categoriesManager(name, status) {
        setFilterCategories(status)
        setCategory(name)
    }

    function getClass(name) {
        if(name === category){
            return "btn btn-primary"
        } else {
            return "btn btn-outline-primary"
        }
    }

    useEffect(() => { 
        refreshProducts()
        refreshCategories() 
    }, []);

    if(categories.length === 0 || products.length === 0) {
    return(
        <div className="container">
            <h3>Sorry, seem like our website has not been populated with the products yet.</h3>
            <p>Contact website administrators at admin@codefish.io</p>
        </div>
    )
    }
        
    else
    return (
        <div className="container">


            <h6 className="inline-head">Search:</h6>
            <input type="text" name="searchfield" value={q} onChange={event => filterBySearch(event)} className="searchField"/>
        
            <div>
                <h6> Filter by category: </h6> 
                <div className="btn-group" role="group">
                    <button type="button" className={getClass("all")} onClick={() => categoriesManager("all", false)}>All</button>
                    {categories.map(category => {return (<button type="button" key={category.id} className={getClass(category.name)} onClick = {() => categoriesManager(category.name, true)}>{category.name}</button>)})}
                </div>
            </div>
            <div className="row disp">
                {
                    filteredProducts.map((product) => {
                        if(filterCategories){
                            if (product.category.name === category) {
                                return (
                                    <div className="col-lg-auto card cardStyle" key={product.id}>
                                    <img src={product.image} className="card-img-top" alt={product.description}/>
                                        <div className="card-body">
                                            <h5 className="card-title">{product.name}</h5>
                                            <p className="card-text">{product.description}</p>
                                            <p className="card-text"><b>{product.price}$</b></p>
                                            <button type="button" className="btn btn-primary" onClick={() => addProduct(product)}> {loading === product.id && animation} Add to cart</button>
                                        </div>
                                    </div>
                                )}
                        } else {
                            return (
                                <div className="col-lg-auto card cardStyle" key={product.id}>
                                <img src={product.image} className="card-img-top" alt={product.description}/>
                                    <div className="card-body">
                                        <h5 className="card-title">{product.name}</h5>
                                        <p className="card-text">{product.description}</p>
                                        <p className="card-text"><b>{product.price}$</b></p>
                                        <button type="button" className="btn btn-primary" onClick={() => addProduct(product)}> {loading === product.id && animation} Add to cart</button>
                                    </div>
                                </div>
                            )
                        }
                    })
                }
                
                

            </div>

        </div>
    )
}