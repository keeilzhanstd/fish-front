import { createTodo, retrieveRecordById, updateRecordById } from "./../api/ApiService";
import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";

export default function UpdateRecordComponent() {
    const { id } = useParams();

    const [rid, setRid] = useState('');
    const [name, setName] = useState('');
    const [gender, setGender] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [country, setCountry] = useState('');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');
    const [postcode, setPostcode] = useState('');
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [bmi, setBmi] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const navigate = useNavigate();

    useEffect(
        () => {      
            function retrieveRecord(){
                retrieveRecordById(id)
                .then((response) => {
                    setRid(response.data.id)
                    setName(response.data.name)
                    setGender(response.data.gender)
                    setBirthDate(response.data.birthDate)
                    setCountry(response.data.country)
                    setState(response.data.state)
                    setCity(response.data.city)
                    setAddress(response.data.address)
                    setPostcode(response.data.postcode)
                    setWeight(response.data.weight)
                    setHeight(response.data.height)
                    setBmi(response.data.bmi)
                    setEmail(response.data.email)
                    setPhone(response.data.phone)
                })
                .catch(error => console.log(error))
            }      
            function updateOrCreate() { if (id > 0) { retrieveRecord() } }
            updateOrCreate()}, [id]
    )

    

   

    function onSubmit(values) {
        const record = {
            name: values.name,
            gender: values.gender,
            birthDate: values.birthDate,
            country: values.country, 
            state: values.state, 
            city: values.city, 
            address: values.address, 
            postcode: values.postcode, 
            weight: values.weight, 
            height: values.height, 
            bmi: values.bmi, 
            email: values.email, 
            phone: values.phone,
        }

        if(id===-1){
            createTodo(record)
            .then((response) => {
                navigate('/records/')
            })
            .catch(error => console.log(error))
        } else {
            record.id = parseInt(rid)
            updateRecordById(id, record)
            .then((response) => {
                navigate(`/records/${rid}`)
            })
            .catch(error => console.log(error))
        }
    }

    function validate(values){
        let errors = {}

        if (!values.name.length) {
            errors.name = "Name field is required."
        }

        if (values.birthDate === null || values.birthDate === '') {
            errors.birthDate = "Birth date field is required."
        }

        if (values.gender === null) {
            errors.gender = "Gender is required."
        }

        if (isNaN(values.phone)) {
            errors.phone = "Enter a valid phone number. Dont use any of the following chars: (,),[,],+"
        }

        if (isNaN(values.height)) {
            errors.height = "Enter integer value"
        }

        if (isNaN(values.weight)) {
            errors.weight = "Enter integer value"
        }

        if (isNaN(values.bmi)) {
            errors.bmi = "Enter integer value"
        }

        return errors
    }

    return (
        <div className="container">
            <div className="record-info">
                <Formik initialValues={ {name, gender, birthDate, country, state, city, address, postcode, weight, height, bmi, email, phone} } 
                enableReinitialize={true} 
                onSubmit = {onSubmit} 
                validate = {validate}
                validateOnChange = {false}
                validateOnBlur = {false}>
                    {
                        (props) => (
                            <Form>
                                <ErrorMessage
                                    name="name"
                                    component="div"
                                    className = "alert alert-warning"
                                />
                                <fieldset className="form-group">
                                    <label>Name <span className="red">*</span></label>
                                    <Field type="text" className="form-control" name="name"/>
                                </fieldset>
                                <ErrorMessage
                                    name="gender"
                                    component="div"
                                    className = "alert alert-warning"
                                />
                                <fieldset className="form-group">
                                    <label>Gender <span className="red">*</span></label>
                                    <br/>
                                    <label>
                                    <Field type="radio" name="gender" value="male"/>
                                    Male
                                    </label>
                                    <label>
                                    <Field type="radio" name="gender" value="female"/>
                                    Female
                                    </label>
                                </fieldset>

                                <ErrorMessage
                                    name="birthDate"
                                    component="div"
                                    className = "alert alert-warning"
                                />
                                <fieldset className="form-group">
                                    <label>Birth Date <span className="red">*</span></label>
                                    <Field type="date" className="form-control" name="birthDate"/>
                                </fieldset>
                                <fieldset className="form-group">
                                    <label>Country</label>
                                    <Field type="text" className="form-control" name="country"/>
                                </fieldset>
                                <fieldset className="form-group">
                                    <label>State</label>
                                    <Field type="text" className="form-control" name="state"/>
                                </fieldset>
                                <fieldset className="form-group">
                                    <label>City</label>
                                    <Field type="text" className="form-control" name="city"/>
                                </fieldset>
                                <fieldset className="form-group">
                                    <label>Address</label>
                                    <Field type="text" className="form-control" name="address"/>
                                </fieldset>
                                <fieldset className="form-group">
                                    <label>Postcode</label>
                                    <Field type="text" className="form-control" name="postcode"/>
                                </fieldset>
                                <ErrorMessage
                                    name="height"
                                    component="div"
                                    className = "alert alert-warning"
                                />
                                <fieldset className="form-group">
                                    <label>Height</label>
                                    <Field type="text" className="form-control" name="height"/>
                                </fieldset>
                                <ErrorMessage
                                    name="weight"
                                    component="div"
                                    className = "alert alert-warning"
                                />
                                <fieldset className="form-group">
                                    <label>Weight</label>
                                    <Field type="text" className="form-control" name="weight"/>
                                </fieldset>
                                <ErrorMessage
                                    name="bmi"
                                    component="div"
                                    className = "alert alert-warning"
                                />
                                <fieldset className="form-group">
                                    <label>BMI</label>
                                    <Field type="text" className="form-control" name="bmi"/>
                                </fieldset>
                                <fieldset className="form-group">
                                    <label>Email</label>
                                    <Field type="text" className="form-control" name="email"/>
                                </fieldset>

                                <ErrorMessage
                                    name="phone"
                                    component="div"
                                    className = "alert alert-warning"
                                />
                                <fieldset className="form-group">
                                    <label>Phone <span className="red">*</span></label>
                                    <Field type="text" className="form-control" name="phone"/>
                                </fieldset>
                                <span className="red">*</span> <span> = required </span>

                                <div>
                                    <button className="btn btn-success" type="submit">Save</button>
                                </div>
                            </Form>
                        )
                    }
                </Formik>
            </div>
        </div>
    )
}
