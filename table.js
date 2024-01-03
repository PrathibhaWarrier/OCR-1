
import React, { useState, useEffect } from "react";
import axios from 'axios';


// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
} from "reactstrap";




function Tables() {
//  const initialData=[{date:null,barcode_data:null, counter:null}]
 const [tbdata, setTbdata]=useState([]);
 const [err, seterr]=useState(0);
 const [isDone, setIsDone]=useState(false);
 const [loading, setLoading]=useState(false);

 

 useEffect(()=>{
  (console.log("HI"))
  //  fetchData();

        axios.get('http://127.0.0.1:8000/capApi/Capacity/')
        .then (response => {setTbdata(response.data);
          setLoading(false);
          setIsDone(true);
          
        console.log(response.data);})
    .catch(error=>{seterr(error);console.log(error); setLoading(false)})
    

 },[])
 
 
 

//  const fetchData=(evt)=>
//  {evt.preventDefault();
//    if(fromDate<=toDate)
//    {
//     axios.get(`http://127.0.0.1:8000/api/Capacity/`)
//     .then((response)=>{setTbdata(response.data);setIsDone(true);console.log(response)})
//     .catch(error=>{seterr(error);console.log(error)})
//    }
  
//  }

 const showData=()=>
 {
 const reqData=tbdata.map(row=>{
    return(
      <tr key={row.id} >
        
        <td>{row.id}</td>
        <td>{row.Plant}</td>
        <td>{row.Phase}</td>
        <td>{row.Process}</td>
        <td>{row.Line}</td>
        <td>{row.CostCenter}</td>
        <td>{row.CT}</td>
        <td>{row.Capacity}</td>
        <td>{row.WorkCenter}</td>
        <td>{row.Equipment}</td>
        <td>{row.EQID}</td>
        <td>{row.Technology}</td>
        <td>{row.MainValving}</td>
        <td>{row.Rod}</td>
        <td>{row.PT}</td>
      </tr>
       
    )});
    console.log(tbdata);

    return reqData;

 }

  return (
    <React.Fragment> 
   

      <div className="content">
        
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">CapacityPlanning</CardTitle>
              </CardHeader>
              <CardBody>

                
        
                <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                    <tr>
                      {/* <th>Numbe</th> */}
                      <th className="text-center">Id</th>
                      <th className="text-center">Plant</th>
                      <th className="text-center">Phase</th>
                      <th className="text-center">Process</th>
                      <th className="text-center">Line</th>
                      <th className="text-center">CostCenter</th>
                      <th className="text-center">CT</th>
                      <th className="text-center">Capacity</th>	
                      <th className="text-center">WorkCenter</th>
                      <th className="text-center">Equipment</th>
                      <th className="text-center">EQID</th>
                      <th className="text-center">Technology</th>
                      <th className="text-center">MainValving</th>
                      <th className="text-center">Rod</th>
                      <th className="text-center">PT</th>
                    </tr>
                  </thead>
                  <tbody className="text-center">
                    {console.log(isDone)}
                    {isDone?showData():null}
                    
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
          
        </Row>
      </div>
      </React.Fragment>
  );
}

export default Tables;// /*!
