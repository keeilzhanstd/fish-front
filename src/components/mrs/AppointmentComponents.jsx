import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom";

import { Formik, Form, Field, ErrorMessage } from "formik";
import {createAppointment, retrieveAppointmentById, updateAppointment} from "./../api/ApiService";

export default function AppointmentComponents() {
    const { id, name, aid} = useParams();
    const navigate = useNavigate();

    const [targetDate, setDate] = useState('');
    const [status, setStatus] = useState(true);
    

    function submitUpdate(appointment){
        updateAppointment(id, aid, appointment)
        .then(() => {
            navigate(`/records/${id}`)
        })
        .catch(error => console.log(error))
    }

    function submitCreate(appointment){
        createAppointment(id, appointment)
        .then(() => {
            navigate(`/records/${id}`)
        })
        .catch(error => console.log(error))
    }

    function onSubmit(values) {
        const appointment = {
            date: values.targetDate,
            status: values.status, 
        }

        if(aid > 0) {
            submitUpdate(appointment)
            } else {
                submitCreate(appointment)
        }
    }

    function retrieveAppt(){
        retrieveAppointmentById(id, aid)
            .then((response) => {
                setDate(response.data.date)
                setStatus(response.data.status)
            })
            .catch(error => console.log(error))
}

    useEffect(
        () => midFunction(), [id]
    )

    function midFunction(){
        if(aid > 0) {
            retrieveAppt()
        }
    }

    function validate(values){
        let errors = {}
        if (values.targetDate === null || values.targetDate === '') {
            errors.targetDate = "Target date field is required."
        }

        if (values.status === null) {
            errors.status = "Status is required."
        }
        return errors
    }

    return (
        <div className="container">
            <h2>Arrange appointments for {name}!</h2>
            <Formik initialValues={ {targetDate, status} } 
                enableReinitialize={true} 
                onSubmit = {onSubmit} 
                validate = {validate}
                validateOnChange = {false}
                validateOnBlur = {false}>
                    {
                        (props) => (
                            <Form>
                                <ErrorMessage
                                    name="targetDate"
                                    component="div"
                                    className = "alert alert-warning"
                                />
                                <fieldset className="form-group">
                                    <label>Appointment Date <span className="red">*</span></label>
                                    <Field type="date" className="form-control" name="targetDate"/>
                                </fieldset>
                                <fieldset className="form-group">
                                    <label>Status <span className="red">*</span></label>
                                    <br/>
                                    <label>
                                    <Field type="radio" name="status" value="true"/>
                                    Ongoing
                                    </label>
                                    <label>
                                    <Field type="radio" name="status" value="false"/>
                                    Expired
                                    </label>
                                </fieldset>
                                <div>
                                    <button className="btn btn-success" type="submit">Save</button>
                                </div>
                            </Form>
                        )
                    }
                </Formik>
        </div>
    )
}

