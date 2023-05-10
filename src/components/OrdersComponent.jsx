import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { retrieveOrdersForUsername } from "./api/ApiService";
import { useAuth } from "./auth/AuthContext";
import { Link } from "react-router-dom";


export default function OrdersComponent(){

    const [orders, setOrders] = useState([])
    const [empty, setEmpty] = useState(true)
    const authContext = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        retrieveOrdersForUsername(authContext.user.username)
        .then((response) => {
            setOrders(response.data.reverse())
            if(response.data.length !== 0) {
                setEmpty(false)
            }
        })
        .catch((error) => console.log(error))

    }, [authContext]);

    function navigateTo(order) {
        navigate('/orders/'+order.id, {state:{order:order}})
    }

    function statusClass(order) {
        if (!order.canceled) {
            return 'btn btn-success'
        } else {
            return 'btn btn-warning'
        }
    }

    function orderStatus(order) {
        if (!order.canceled) {
            return 'Active'
        } else {
            return 'Canceled'
        }
    }

    return (
        <div className="orders-cont">
            <h2>Orders:</h2>
        {
            empty && <div>Looks like you haven't ordered anything yet. Let's look what you can order <Link to="/home">here</Link></div>
        }
        {
            !empty && orders.map((order, index) => {
                return (
                    <div key={index} type="button" className="order-container" onClick={() => navigateTo(order)}>
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title order-active"> <div>Order #{order.id} | {order.date}</div> <div className={statusClass(order)}>{orderStatus(order)}</div></h5>
                                <p className="card-text">{
                                    order.products.map((product, index) => { return (
                                        <span key={index}>{product.name}<br></br></span>
                                    )})}</p>
                            </div>
                        </div>
                    </div>
                )
            })
        }
        
        
        </div>
    )
    
}