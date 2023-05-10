import { useEffect, useState } from "react";
import { useAuth } from "./auth/AuthContext";
import { retrieveCart, updateCartByUsername, createOrder, clearCart, getCustomerByUsername, getPaymentMethodForUsername } from "./api/ApiService";
import { useNavigate } from "react-router-dom";

export default function CartComponent(){

    const authContext = useAuth()
    const navigate = useNavigate()
    const [cart, setCart] = useState({})
    const [emptyCartWarning, setEmptyCartWarning] = useState(true)

    const [payments, setPayments] = useState([])
    const [selectPMethod, setSelectPMethod] = useState(true);
    const [pm, setPm] = useState(0);
    const [selected, setSelected] = useState('');
    const [isLoading, setIsLoading] = useState(false)

    

    function removeItem(key) {
        cart.products.splice(key, 1)
        updateCartByUsername(authContext.user.username, cart)
        .then((response) =>{
            setCart(response.data)
            if(Array.isArray(response.data.products) && response.data.products.length > 0) {
                setEmptyCartWarning(false)
            } else {
                setEmptyCartWarning(true)
            }
        })
    }

    function placeOrder() {
        if(Array.isArray(cart.products) && cart.products.length > 0) {

            getCustomerByUsername(authContext.user.username)
            .then((response) => {

                if(response.data.payment.length !== 0) {
                    setEmptyCartWarning(false)
                    let resp = {}
                    resp.customer = response.data
                    resp.customerId = response.data.id
                    resp.products = cart.products
                    resp.canceled = false
                    resp.payedBy = selected
                    resp.date = new Date().toJSON().slice(0, 19).replace("T", " ");
    
                    createOrder(authContext.user.username, resp)
                    .catch((error) => console.log(error))
        
                    clearCart(authContext.user.username)
                    .catch((error) => console.log(error))
        
                    navigate(`/orders`)
                    return
                }

                navigate('/payment', {state:{navigated:true}})
            })

        } else {
            setEmptyCartWarning(true)
        }
    }

    function calculateTotal() {
        let initial = 0;
        cart.products.map((product) => 
            initial = initial + product.price
        )

        return initial.toFixed(2);
    }

    function getPayments(){
        getPaymentMethodForUsername(authContext.user.username)
            .then((response) => {
                setPayments(response.data)
                setSelectPMethod(true)
                
                if(response.data.length === 0){
                    navigate('/payment', {state:{navigated:true}})
                }
            })
            .catch((error) => console.log(error))
    }

    useEffect(() => {
        function getCart(){
            retrieveCart(authContext.user.username)
            .then((response) => {
                setCart(response.data)
                if(Array.isArray(response.data.products) && response.data.products.length > 0) {
                    setEmptyCartWarning(false)
                }
                setIsLoading(true)
            })
            .catch(error => console.log(error))
        }
        getCart()
     }, [emptyCartWarning, authContext.user.username]);

    if(isLoading)
    return (
        <div className="container">
            <div className="cart-products">
            {!emptyCartWarning && <table className="table">
                <thead>
                    <tr><th></th><th>Name</th><th>Price</th><th></th></tr>
                </thead>
                <tbody>
                    {cart.products.map((product, index) => {return (
                    <tr key={index}>
                         <td><img className="table-image" src={product.image} alt={product.description}></img></td>
                        <td>{product.name}</td>
                        <td>{product.price}</td>
                        <td><button type="button" className="btn btn-warning" onClick={() => removeItem(index)}>Remove</button></td>
                    </tr>
                    )})}
                </tbody>
            </table>}
            {emptyCartWarning && <div className="alert alert-warning" role="alert"> Cart is empty. </div>}
            {!emptyCartWarning && <h4>Total price: {calculateTotal()}</h4>}
            {!emptyCartWarning && 
                <div>
                    <button className="btn btn-secondary" onClick={() => {setPm(0); getPayments();}}>
                        {pm === 0 && <>Select payment method</>} { pm!==0 && <>Selected:</>}
                    </button>

                    {selectPMethod && 
                        <ul className="list-group">
                            {payments.map(p => {
                                return (
                                    (pm === 0 || pm === p.id) && <li key={p.id} className="list-group-item" type="button" onClick={() => {setPm(p.id); setSelected(p.hidden)}}>{p.hidden}</li>
                                )
                            })}
                        </ul>
                    }
                </div>
            }
            {!emptyCartWarning && pm !==0 && <button type="button" className="btn btn-primary" onClick={() => placeOrder()}>Place order</button>}
            
            </div>
        </div>
    )

}