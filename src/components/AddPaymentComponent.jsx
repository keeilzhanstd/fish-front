import { useAuth } from "./auth/AuthContext"
import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { addPaymentMethod } from "./api/ApiService"

export default function AddPaymentComponent(){
    const [cardnumber, setCardnumber] = useState('')
    const [moe, setMoe] = useState('')
    const [yoe, setYoe] = useState('')
    const [cvv, setCvv] = useState('')
    const [errorMessage] = useState(false)
    const authContext = useAuth()
    const navigate = useNavigate()
    const location = useLocation()

    function handleCardnumberChange(event) {
        setCardnumber(event.target.value)
    }

    function handleMoeChange(event) {
        setMoe(event.target.value)
    }

    function handleYoeChange(event) {
        setYoe(event.target.value)
    }

    function handleCvvChange(event) {
        setCvv(event.target.value)
    }

    function handleSubmit() {
        let resp = {}
        resp.cardNumber = cardnumber;
        resp.monthOfExpiry = moe;
        resp.yearOfExpiry = yoe;
        resp.cvv = cvv;

        addPaymentMethod(authContext.user.username, resp)
        .then((response) => {
            authContext.user.payment = response.data; 
            if(location.state.navigated === true){
                navigate('/cart')
            } else {
                navigate('/profile')
            }
            
        })
        .catch((err) => console.log(err))

    }

    return(
    <div className="container form-cont">
        <div className="form-card">
            <div className="spaces">
                <label>Card number</label>
                <input placeholder="1111222233334444" type="text" name="cardnumber" value={cardnumber} onChange={handleCardnumberChange}/>
            </div>
            <div className="spaces">
                <div>
                <label>MM</label>/<label>YY</label>
                </div>
                <div>
                <input placeholder="MM" type="moe" name="moe" className="mmyy" value={moe} onChange={handleMoeChange}/>
                /
                <input placeholder="YY" type="yoe" name="yoe" className="mmyy" value={yoe} onChange={handleYoeChange}/>
                </div>
            </div>
            <div className="spaces">
                <label>CVV</label><input placeholder="CVV" type="cvv" name="cvv" className="mmyy" value={cvv} onChange={handleCvvChange}/>
            </div>
            <button type="button" className="btn btn-success" name="formbtn" onClick={handleSubmit}>Save</button>

            {errorMessage && <div className="errorMessage">Error card</div>}

        </div>
    </div>
)
}

