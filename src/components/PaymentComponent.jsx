import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { getPaymentMethodForUsername, deletePaymentMethod } from "./api/ApiService"
import { useAuth } from "./auth/AuthContext"

export default function PaymentComponent () {

    const authContext = useAuth();
    const navigate = useNavigate();
    const [payments, setPayments] = useState([])

    function handleDelete(id) {
        deletePaymentMethod(authContext.user.username, id)
        .then(() => {navigate("/home")})
        .catch((err) => console.log(err))
    }

    function navigateToAdd(){
        navigate("/payment", {state:{navigated: false}})
    }

    useEffect(() => {
        getPaymentMethodForUsername(authContext.user.username)
        .then((response) => {
            setPayments(response.data)
        })
        .catch((error) => console.log(error))
    }, [authContext.user.username])

    return (
        <div>
            <h2>Payment methods:</h2>
            { payments.map(payment => {
                return (
                    <div className="form-card pad" key={payment.id}>
                        <div className="spaces">
                            <label>Card number</label>
                            <input placeholder="1111222233334444" type="text" name="cardnumber" defaultValue={payment.hidden}/>
                        </div>
                        <div className="spaces">
                            <div>
                            <label>MM</label>/<label>YY</label>
                            </div>
                            <div>
                            <input placeholder="MM" type="moe" name="moe" className="mmyy" defaultValue={payment.monthOfExpiry}/>
                            /
                            <input placeholder="YY" type="yoe" name="yoe" className="mmyy" defaultValue={payment.yearOfExpiry}/>
                            </div>
                        </div>
                        <div className="spaces">
                        <button type="button" className="btn btn-danger" name="formbtndelete" onClick={() => handleDelete(payment.id)}>Remove</button>
                        </div>
                    </div>
                )
            })}

            <div className="payment-container" onClick={navigateToAdd}> Add Payment </div>
        </div>
    )
}