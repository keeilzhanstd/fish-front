import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./../auth/AuthContext";
import { retrieveRecords } from "./../api/ApiService";

export default function ListRecordsComponent() {

    const [records, setRecords] = useState([])
    const [filteredRecords, setFilteredRecords] = useState([]);
    const [q, setQ] = useState('')
    const authContext = useAuth()
    const navigate = useNavigate()

    function refreshRecords(){
        retrieveRecords()
        .then((response) => {
            setRecords(response.data)
            setFilteredRecords(response.data)
        })
        .catch(error => console.log(error))
    }

    function filterBySearch(event) {
        
        setQ(event.target.value)
        var updatedList = [...records];
        updatedList = updatedList.filter(
            (record) => {return record.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
        });
        if(q.length === 1){
            setFilteredRecords(records);
        } else {
            setFilteredRecords(updatedList);
        }
        
    };
    
    function navigateToRecord(event, id) {
        navigate(`/records/${id}`)
    }

    function addNewRecord(){
        navigate(`/records/-1/update`)
    }

    useEffect(() => { refreshRecords() }, []);

    return (
        <div className="container">
            <div className="list-container-header">
                <h4 className="inline-head">Find patient record:</h4>
                {authContext.user.role.includes("ROLE_ADMIN") && <button className="btn btn-success" onClick={addNewRecord}>Add record</button>}
            </div>
            <input type="text" name="searchfield" value={q} onChange={event => filterBySearch(event)} className="searchField"/>
            <div>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Identifier</th>
                        <th>Patient name</th>
                        <th>Gender</th>
                        <th>Birth date</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        filteredRecords.map(
                            record => (
                            <tr key={record.id} role="button" onClick = {event => navigateToRecord(event, record.id)}>
                                <td>{record.id}</td>
                                <td>{record.name}</td>
                                <td>{record.gender}</td>
                                <td>{record.birthDate.toString()}</td>
                            </tr>)
                        )
                    }
                    
                </tbody>
            </table>    
            </div>
        </div>
    )
}
