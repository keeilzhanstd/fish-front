
import { Link, useLocation, useNavigate} from 'react-router-dom';
import { useEffect, useState } from "react";
import { updateOrderByUsername } from './api/ApiService';
import { useAuth } from './auth/AuthContext';

export default function OrderComponent(){

    const authContext = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const [order, setOrder] = useState();
    const [orderStatus, setOrderStatus] = useState('');
    const [statusClass, setStatusClass] = useState('');
    const [isLoading, setIsLoading] = useState(true)


    useEffect(() => { 
        setOrder(location.state.order)
        setIsLoading(false)

        if (!location.state.order.canceled) {
            setOrderStatus('Active')
            setStatusClass('btn btn-success')
        } else {
            setOrderStatus('Canceled')
            setStatusClass('btn btn-warning')
        }

    }, [location.state.order]);

    
    
    function cancelOrder() {
        order.canceled = true;
        updateOrderByUsername(authContext.user.username, order.id, order)
        .then(navigate('/orders/' + order.id, {state:{order:order}}))
        .catch((error) => console.log(error))
    }

    function calculateTotal() {
        let initial = 0;
        order.products.map((product) => 
            initial = initial + product.price
        )

        return initial.toFixed(2);
    }

    if(!isLoading) 
    return (
        <>
        <Link className="btn btn-primary back-btn" to="/profile"><i className="fa fa-arrow-left"></i> Return</Link>
    <div className="card">
        <div className="card-body">
            <div className="card-title"></div>
            <div className='order-active'><h4>Order: {order.id} / {order.date} </h4>
            <div className={statusClass}>{orderStatus}</div></div>
            <table className="table">
                <thead>
                    <tr><th>Image</th><th>Name</th><th>Price</th><th></th></tr>
                </thead>
                <tbody>
                    {order.products.map((product, index) => {return (
                    <tr key={index}>
                         <td><img className="table-image-up" src={product.image} alt={product.description}></img></td>
                        <td>{product.name}</td>
                        <td>{product.price}</td>
                    </tr>
                    )})}
                </tbody>
            </table>
            <span>Payed by: {order.payedBy}</span>
            <h4>Total price: {calculateTotal()}</h4>
            {orderStatus === 'Active' && <button type='button' className='btn btn-warning' onClick={() => cancelOrder()}>Cancel</button>}
        </div>
    </div></>)
        
    
}