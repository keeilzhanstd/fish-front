import { retrieveRecordById } from "./../api/ApiService"
import { useAuth } from "./../auth/AuthContext";
import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom";
import { deleteRecordById, getAppointmentsById } from "./../api/ApiService";

export default function RecordComponent() {
    
    const [record, setRecord] = useState({});
    const [apps, setApps] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();
    const authContext = useAuth();

    function handleRecordDelete(){
        deleteRecordById(id)
        .then(setTimeout(()=> {navigate("/records");}, 100))
        .catch(error => console.log(error))
    }

    function handleAppointmentCreate(){
        navigate(`/records/${id}/${record.name}/appointments/-1`)
    }

    function handleRecordUpdate(){
        navigate(`/records/${id}/update`)
    }

    function handleAppointmentUpdate(appid){
        navigate(`/records/${id}/${record.name}/appointments/${appid}`)
    }

   

    useEffect(
        () => {
            function getApps(){
                getAppointmentsById(id)
                .then((response) => {
                    setApps(response.data)
                })
                .catch(error => console.log(error))
            }
        
            function refreshRecord(){
                retrieveRecordById(id)
                .then((response) => {
                    setRecord(response.data)
                    getApps()
                })
                .catch(error => console.log(error))
            }

            function getRecordDate() {
                refreshRecord()
                getApps()
            }

            getRecordDate()}, [id]
    )
    
    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <div className="record-info">
                        <h3 className="inline-head">Patient: {record.name}</h3>
                        {authContext.user.role.includes("ROLE_ADMIN") && <button className="btn btn-warning"onClick={handleRecordUpdate}>Edit record</button>
                        }{authContext.user.role.includes("ROLE_ADMIN") && <button className="btn btn-danger" onClick={handleRecordDelete}>Delete</button>
}</div>
                    <div className="additional-record-info">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th colSpan="2"><h5>General info</h5></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><strong>ID</strong></td>
                                    <td>{record.id}</td>
                                </tr>
                                <tr>
                                    <td><strong>Name</strong></td>
                                    <td>{record.name}</td>
                                </tr>
                                <tr>
                                    <td><strong>Gender</strong></td>
                                    <td>{record.gender}</td>
                                </tr>
                                <tr>
                                    <td><strong>Birth Date</strong></td>
                                    <td>{record.birthDate}</td>
                                </tr>
                                <tr>
                                    <td><strong>Country</strong></td>
                                    <td>{record.country}</td>
                                </tr>
                                <tr>
                                    <td><strong>State</strong></td>
                                    <td>{record.state}</td>
                                </tr>
                                <tr>
                                    <td><strong>City</strong></td>
                                    <td>{record.city}</td>
                                </tr>
                                <tr>
                                    <td><strong>Address</strong></td>
                                    <td>{record.address}</td>
                                </tr>
                                <tr>
                                    <td><strong>Postcode</strong></td>
                                    <td>{record.postcode}</td>
                                </tr>

                                </tbody>
                                </table>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th colSpan="2">
                                                <h5>Dimensions</h5>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td><strong>Weight</strong></td>
                                            <td>{record.weight}</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Height</strong></td>
                                            <td>{record.height}</td>
                                        </tr>
                                        <tr>
                                            <td><strong>BMI</strong></td>
                                            <td>{record.bmi}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th colSpan="2">
                                            <h5>Contact information</h5>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td><strong>Email</strong></td>
                                            <td>{record.email}</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Phone</strong></td>
                                            <td>{record.phone}</td>
                                        </tr>
                                    </tbody>
                                </table>
                    </div>
                </div>
                <div className="col">
                    <div className="record-appointments-info">
                        <h3 className="inline-head">Appointments</h3>
                        <table className='table'>
                                    <thead>
                                        <tr>
                                            <th>Date</th>
                                            <th>Status</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                        {apps.map(
                            appoinment => (
                            <tr key={appoinment.id} role="button" className="appointmentCell">
                                <td>{appoinment.date.toString()}</td>
                                <td>{appoinment.status.toString()}</td>
                                {authContext.user.role.includes("ROLE_ADMIN") &&  <td><button className="btn btn-warning" onClick={event => handleAppointmentUpdate(appoinment.id)}>Update</button></td>} </tr>)
                        )}
                        </tbody>
                        </table>

                        {authContext.user.role.includes("ROLE_ADMIN") && <button className="btn btn-success" onClick={handleAppointmentCreate}>Arrange appointment</button>}
                    </div>
                </div>
            </div>
        </div>
    )
}
