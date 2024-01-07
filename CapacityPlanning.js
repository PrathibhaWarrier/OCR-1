
import React, { useState, useEffect } from "react";
import axios from 'axios';
import './barcodecss.css'; 
import CapPlanFilter from './CapPlanFilter.js';

import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
} from "reactstrap";

// rest of the imports

function Tables() {
  const [tbdata, setTbdata] = useState([]);
  const [basedata, setBasedata] = useState([]);
  const [err, setErr] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [unqPlant, setUnqPlant] = useState([]);
  const [unqTechnology, setUnqTechnology] = useState([]);
  const [selectedPlant, setSelectedPlant] = useState([]);
  const [selectedTechnology, setSelectedTechnology] = useState([]);
  const [unqMainValving, setUnqMainValving] = useState([]);
  const [unqRod, setUnqRod] = useState([]);
  const [unqPT, setUnqPT] = useState([]);
  const [selectedMainValving, setSelectedMainValving] = useState([]);
  const [selectedRod, setSelectedRod] = useState([]);
  const [selectedPT, setSelectedPT] = useState([]);
  const [stationCheck1, setStationCheck1] = useState(true);

  const filterPlantCallback = (selPlant) => {
    console.log(selPlant.val);
    setSelectedPlant(selPlant.val);
  };
  
   const filterMainValvingCallback = (selMainValving) => {
    console.log(selMainValving.val);
    setSelectedMainValving(selMainValving.val);
  };

  const filterRodCallback = (selRod) => {
    console.log(selRod.val);
    setSelectedRod(selRod.val);
  };

  const filterPTCallback = (selPT) => {
    console.log(selPT.val);
    setSelectedPT(selPT.val);
  };
     
  const filterTechnologyCallback = (selTechnology) => {
    console.log(selTechnology.val);
    setSelectedTechnology(selTechnology.val);
  };
    

  useEffect(() => {
    let regexPlant = new RegExp([`^${selectedPlant}`], "i");
    let regexMainValving = new RegExp([`^${selectedMainValving}`], "i");
    let regexRod = new RegExp([`^${selectedRod}`], "i");
    let regexPT = new RegExp([`^${selectedPT}`], "i");
    let regexTechnology = new RegExp([`^${selectedTechnology}$`], "i");

    setTbdata(
      basedata.filter((val) => {
        return (
          regexPlant.test(val.Plant) &&
          regexMainValving.test(val.MainValving) &&
          regexRod.test(val.Rod) &&
          regexPT.test(val.PT) &&
          regexTechnology.test(val.Technology) 
        );
      })
    );
  }, [selectedPlant, selectedMainValving, selectedRod, selectedPT, selectedTechnology]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/capApi/Capacity/")
      .then((response) => {
        setBasedata(response.data);
        setTbdata(response.data);
        setLoading(false);
        setIsDone(true);

       
        let uniquePlants = new Set(response.data.map((val) => val.Plant));
        let uniqueMainValving = new Set(response.data.map((val) => val.MainValving));
        let uniqueRod = new Set(response.data.map((val) => val.Rod));
        let uniquePT = new Set(response.data.map((val) => val.PT));
        let uniqueTechnologies = new Set(response.data.map((val) => val.Technology));

        setUnqPlant(Array.from(uniquePlants));
        setUnqMainValving(Array.from(uniqueMainValving));
        setUnqRod(Array.from(uniqueRod));
        setUnqPT(Array.from(uniquePT));
        setUnqTechnology(Array.from(uniqueTechnologies));

        console.log(response.data);
      })
      .catch((error) => {
        setErr(error);
        console.log(error);
        setLoading(false);
      });
  }, []);

  const showData = () => {
    const reqData = tbdata.map((row, i) => (
      <tr key={row.EQID + row.Plant + i}>
        <td>{row.id}</td>
        <td>{row.Plant}</td>
        <td>{row.Phase}</td>
        <td>{row.Process}</td>
        <td>{row.Line}</td>
        <td>{row.CostCenter}</td>
        <td> 
          <input type="checkbox" id="stationCheck1" name="stationCheck1" value="optionChecked1" onChange={(e)=>setStationCheck1(e.target.checked)} checked={stationCheck1}/>
          <label for="stationCheck1">Option</label>
        </td>
        {/* <td>{stationCheck1 ? 6 : null}</td> */}
        <td>{stationCheck1 ? row.CT : null}</td>        
        {/* <td>{row.CT}</td> */}
        <td>{row.Capacity}</td>
        <td>{row.WorkCenter}</td>
        <td>{row.Equipment}</td>
        <td>{row.EQID}</td>
        <td>{row.Technology}</td>
        <td>{row.MainValving}</td>
        <td>{row.Rod}</td>
        <td>{row.PT}</td>
      </tr>
    ));

    console.log(tbdata);
    return reqData;
  };

  return (
    <React.Fragment>
      <CapPlanFilter
        plant={unqPlant}
        mainValving={unqMainValving}
        rod={unqRod}
        pt={unqPT}        
        technology={unqTechnology}
        filterPlantCallback={filterPlantCallback}
        filterMainValvingCallback={filterMainValvingCallback}
        filterRodCallback={filterRodCallback}
        filterPTCallback={filterPTCallback}        
        filterTechnologyCallback={filterTechnologyCallback}
      />

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
                    <th className="text-center">ID</th>
                    <th className="text-center">Plant</th>
                    <th className="text-center">Phase</th>
                    <th className="text-center">Process</th>
                    <th className="text-center">Line</th>
                    <th className="text-center">CostCenter</th>
                    <th className="text-center">Station Check</th>
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
                    {isDone ? showData() : null}
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

export default Tables;



// function Tables() {
// //  const initialData=[{date:null,barcode_data:null, counter:null}]
//  const [tbdata, setTbdata]=useState([]);
//  const [basedata, setBasedata]=useState([]);
//  const [err, seterr]=useState(0);
//  const [isDone, setIsDone]=useState(false);
//  const [loading, setLoading]=useState(false);
//  const [unqPlant, setUnqPlant]=useState([]);
//  const [selectedPlant, setSelectedPlant]=useState([]);
 

//  const filterPlantCallback=(selPlant)=>{
//   console.log(selPlant.val);
//   setSelectedPlant(selPlant.val);
//  }
//  useEffect(()=>{
//   let regex=new RegExp([selectedPlant],"i");
//   setTbdata(basedata.filter((val)=>{
//     console.log(val.Plant, regex.test(val.Plant))
//     return(regex.test(val.Plant))
//   }))
//  },[selectedPlant])
//  useEffect(()=>{
//   (console.log("HI"))
//   //  fetchData();

//         axios.get('http://127.0.0.1:8000/capApi/Capacity/')
//         .then (response => {setBasedata(response.data);
//           setTbdata(response.data)
//           setLoading(false);
//           setIsDone(true);
//           let col=new Set(response.data.map( val =>{
//               return val.Plant
//           }))
//           console.log(col)
          
//         setUnqPlant(col);
//         console.log(response.data);})
//     .catch(error=>{seterr(error);console.log(error); setLoading(false)})
    

//  },[])
 
//  const showData=()=>
//  {
//  const reqData=tbdata.map((row,i)=>{
//     return(
//       <tr key={row.EQID+row.Plant+i} >
        
//         <td>{row.id}</td>
//         <td>{row.Plant}</td>
//         <td>{row.Phase}</td>
//         <td>{row.Process}</td>
//         <td>{row.Line}</td>
//         <td>{row.CostCenter}</td>
//         <td>{row.CT}</td>
//         <td>{row.Capacity}</td>
//         <td>{row.WorkCenter}</td>
//         <td>{row.Equipment}</td>
//         <td>{row.EQID}</td>
//         <td>{row.Technology}</td>
//         <td>{row.MainValving}</td>
//         <td>{row.Rod}</td>
//         <td>{row.PT}</td>
//       </tr>
       
//     )});
//     console.log(tbdata);

//     return reqData;

//  }

//   return (
//     <React.Fragment> 
//       <CapPlanFilter plant={unqPlant} filterPlantCallback={filterPlantCallback}/>
   

//       <div className="content">
        
//         <Row>
//           <Col md="12">
//             <Card>
//               <CardHeader>
//                 <CardTitle tag="h4">CapacityPlanning</CardTitle>
//               </CardHeader>
//               <CardBody>

                
        
//                 <Table className="tablesorter" responsive>
//                   <thead className="text-primary">
//                     <tr>
//                       {/* <th>Numbe</th> */}
//                       <th className="text-center">Id</th>
//                       <th className="text-center">Plant</th>
//                       <th className="text-center">Phase</th>
//                       <th className="text-center">Process</th>
//                       <th className="text-center">Line</th>
//                       <th className="text-center">CostCenter</th>
//                       <th className="text-center">CT</th>
//                       <th className="text-center">Capacity</th>	
//                       <th className="text-center">WorkCenter</th>
//                       <th className="text-center">Equipment</th>
//                       <th className="text-center">EQID</th>
//                       <th className="text-center">Technology</th>
//                       <th className="text-center">MainValving</th>
//                       <th className="text-center">Rod</th>
//                       <th className="text-center">PT</th>
//                     </tr>
//                   </thead>
//                   <tbody className="text-center">
//                     {console.log(isDone)}
//                     {isDone?showData():null}
                    
//                   </tbody>
//                 </Table>
//               </CardBody>
//             </Card>
//           </Col>
          
//         </Row>
//       </div>
//       </React.Fragment>
//   );
// }

// export default Tables;

// ///////////////////////////////////////////////////////////////////*!


// /*!

// =========================================================
// * Black Dashboard React v1.2.0
// =========================================================

// * Product Page: https://www.creative-tim.com/product/black-dashboard-react
// * Copyright 2020 Creative Tim (https://www.creative-tim.com)
// * Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

// * Coded by Creative Tim

// =========================================================

// * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

// */
// import React, { useState, useEffect } from "react";
// import axios from 'axios';
// import DateFnsUtils from '@date-io/date-fns';
// import Grid from '@material-ui/core/Grid';
// import Icon from '@material-ui/core/Icon';
// import Button from '@material-ui/core/Button';
// import {
//   MuiPickersUtilsProvider,
//   KeyboardDatePicker,
// } from '@material-ui/pickers';
// import './barcodecss.css'

// // reactstrap components
// import {
//   Card,
//   CardHeader,
//   CardBody,
//   CardTitle,
//   Table,
//   Row,
//   Col,
// } from "reactstrap";


// function Tables() {
// //  const initialData=[{date:null,barcode_data:null, counter:null}]
//  const [tbdata, setTbdata]=useState([]);
//  const [err, seterr]=useState(0);
//  const [isDone, setIsDone]=useState(false);
//  const [loading, setLoading]=useState(false);

 

//  useEffect(()=>{
//   (console.log("HI"))
//   //  fetchData();

//         axios.get('http://127.0.0.1:8000/api/Capacity/')
//         .then (response => {setTbdata(response.data);
//           setLoading(false);
//           setIsDone(true);
          
//         console.log(response.data);})
//     .catch(error=>{seterr(error);console.log(error); setLoading(false)})
    

//  },[])
 
 
 

// //  const fetchData=(evt)=>
// //  {evt.preventDefault();
// //    if(fromDate<=toDate)
// //    {
// //     axios.get(`http://127.0.0.1:8000/api/Capacity/`)
// //     .then((response)=>{setTbdata(response.data);setIsDone(true);console.log(response)})
// //     .catch(error=>{seterr(error);console.log(error)})
// //    }
  
// //  }

//  const showData=()=>
//  {
//  const reqData=tbdata.map(row=>{
//     return(
//       <tr key={row.id} >
        
//         <td>{row.id}</td>
//         <td>{row.Plant}</td>
//         <td>{row.Phase}</td>
//       </tr>
       
//     )});
//     console.log(tbdata);

//     return reqData;

//  }

//   return (
//     <React.Fragment> 
   

//       <div className="content">
        
//         <Row>
//           <Col md="12">
//             <Card>
//               <CardHeader>
//                 <CardTitle tag="h4">CapacityPlanning</CardTitle>
//               </CardHeader>
//               <CardBody>

                
        
//                 <Table className="tablesorter" responsive>
//                   <thead className="text-primary">
//                     <tr>
//                       {/* <th>Numbe</th> */}
//                       <th className="text-center">Id</th>
//                       <th className="text-center">Plant</th>
//                       <th className="text-center">Phase</th>
//                     </tr>
//                   </thead>
//                   <tbody className="text-center">
//                     {console.log(isDone)}
//                     {isDone?showData():null}
                    
//                   </tbody>
//                 </Table>
//               </CardBody>
//             </Card>
//           </Col>
          
//         </Row>
//       </div>
//       </React.Fragment>
//   );
// }

// export default Tables;
