
import { useEffect, useState } from "react";
import { useAuth } from "./auth/AuthContext";
import OrdersComponent from "./OrdersComponent"
import PaymentComponent from "./PaymentComponent";
import ManageProductsAndCategories from "./ManageProductsAndCategories";
import { useNavigate } from "react-router-dom";
import { deleteCustomerByUsername } from "./api/ApiService";

export default function ProfileComponent(){
    
    const authContext = useAuth();
    const navigate = useNavigate();
    const [order, setOrder] = useState(true);
    const [payment, setPayment] = useState(false);
    const [manage, setManage] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        if(authContext.user.role.includes("ROLE_ADMIN")){
            setIsAdmin(true);
        }
    }, [authContext])


    function deleteUser() {
        deleteCustomerByUsername(authContext.user.username)
        .then(() => {
            authContext.logout(); 
            navigate("/");
        })
        .catch((err) => console.error(err))
    }

    return(
    <div className="container">
        <div className="spaces">
        <div className="btn-group" role="group" aria-label="Basic example">
            <button type="button" className="btn btn-outline-primary" 
            onClick={() => {setOrder(true); setPayment(false); setManage(false)}}>Orders</button>
            <button type="button" className="btn btn-outline-primary" 
            onClick={() => {setOrder(false); setPayment(true); setManage(false)}}>Payment methods</button>
            {isAdmin && <button type="button" className="btn btn-outline-primary" 
            onClick={() => {setOrder(false); setPayment(false); setManage(true)}}>Manage categories and products</button>}
        </div> 
        <button type="button" className="btn btn-outline-danger" 
            onClick={() => {deleteUser()}}>Delete account</button>
        </div>
        <br></br>
        {order && <OrdersComponent />}
        {payment && <PaymentComponent />}
        {manage && <ManageProductsAndCategories />}
        
    </div>)
}