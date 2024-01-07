import React, { useState } from "react";
import './barcodecss.css'; 

import {
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
} from "reactstrap";

function UserProfile(props) {
  const {
    plant,
    technology,
    mainValving,
    rod,
    pt,
    filterPlantCallback,
    filterTechnologyCallback,
    filterMainValvingCallback,
    filterRodCallback,
    filterPTCallback,
  } = props;

  const plantOptions = plant.map((val) => (
    <DropdownItem
      key={val}
      href="#pablo"
      onClick={(e) => {
        e.preventDefault();
        filterPlantCallback({ val });
      }}
    >
      {val}
    </DropdownItem>
  ));

  const mainValvingOptions = mainValving.map((val) => (
    <DropdownItem
      key={val}
      href="#pablo"
      onClick={(e) => {
        e.preventDefault();
        filterMainValvingCallback({ val });
      }}
    >
      {val}
    </DropdownItem>
  ));

  const rodOptions = rod.map((val) => (
    <DropdownItem
      key={val}
      href="#pablo"
      onClick={(e) => {
        e.preventDefault();
        filterRodCallback({ val });
      }}
    >
      {val}
    </DropdownItem>
  ));

  const ptOptions = pt.map((val) => (
    <DropdownItem
      key={val}
      href="#pablo"
      onClick={(e) => {
        e.preventDefault();
        filterPTCallback({ val });
      }}
    >
      {val}
    </DropdownItem>
  ));

  const technologyOptions = technology.map((val) => (
    <DropdownItem
      key={val}
      href="#pablo"
      onClick={(e) => {
        e.preventDefault();
        filterTechnologyCallback({ val });
      }}
    >
      {val}
    </DropdownItem>
  ));

  return (
    <div className="MyDropdown">
      <>
        <UncontrolledDropdown>
          <DropdownToggle caret color="secondary" type="button">
            Plant
          </DropdownToggle>
          <DropdownMenu>{plantOptions}</DropdownMenu>
        </UncontrolledDropdown>

        <UncontrolledDropdown>
          <DropdownToggle caret color="secondary" type="button">
            Main Valving
          </DropdownToggle>
          <DropdownMenu>{mainValvingOptions}</DropdownMenu>
        </UncontrolledDropdown>

        <UncontrolledDropdown>
          <DropdownToggle caret color="secondary" type="button">
            Rod
          </DropdownToggle>
          <DropdownMenu>{rodOptions}</DropdownMenu>
        </UncontrolledDropdown>

        <UncontrolledDropdown>
          <DropdownToggle caret color="secondary" type="button">
            PT
          </DropdownToggle>
          <DropdownMenu>{ptOptions}</DropdownMenu>
        </UncontrolledDropdown>

        <UncontrolledDropdown>
          <DropdownToggle caret color="secondary" type="button">
            Technology
          </DropdownToggle>
          <DropdownMenu>{technologyOptions}</DropdownMenu>
        </UncontrolledDropdown>
      </>
    </div>
  );
}

export default UserProfile;



// import React, { useState } from "react";
// import './barcodecss.css'; 
// // reactstrap components
// import {
//   DropdownToggle,
//   DropdownMenu,
//   DropdownItem,
//   UncontrolledDropdown,
// } from "reactstrap";

// function Example(props) {
//   // const [selPlant, setSelPlant]=useState(null)
//   const plantdrop= ()=>{
//     let plant=Array.from(props.plant);
//     console.log(plant);
//     // console.log(selPlant);
//     return(plant.map(val =>{
//       return(
//       <li>
//         <DropdownItem href="#pablo" onClick={(e) => {e.preventDefault(); props.filterPlantCallback({val})}}>
//         {val}
//       </DropdownItem>
//       </li>)
//     }));
//   }
  
//   return (
//     <div className="MyDropdown">
//     <>
//       <UncontrolledDropdown>
//         <DropdownToggle
//           caret
//           color="secondary"
//           id="dropdownMenuButton"
//           type="button"
//         >
//           Regular
//         </DropdownToggle>

//         <DropdownMenu aria-labelledby="dropdownMenuButton">
//         {plantdrop()}
//         </DropdownMenu>
//       </UncontrolledDropdown>

//       <UncontrolledDropdown>
//         <DropdownToggle caret color="default">
//           <img
//             alt="..."
//             src="https://demos.creative-tim.com/argon-dashboard-pro-bs4/assets/img/icons/flags/US.png"
//           ></img>
//           Flags
//         </DropdownToggle>

//         <DropdownMenu>
//           <li>
//             <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()}>
//               <img
//                 alt="..."
//                 src="https://demos.creative-tim.com/argon-dashboard-pro-bs4/assets/img/icons/flags/DE.png"
//               ></img>
//               Deutsch
//             </DropdownItem>
//           </li>

//           <li>
//             <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()}>
//               <img
//                 alt="..."
//                 src="https://demos.creative-tim.com/argon-dashboard-pro-bs4/assets/img/icons/flags/GB.png"
//               ></img>
//               English(UK)
//             </DropdownItem>
//           </li>

//           <li>
//             <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()}>
//               <img
//                 alt="..."
//                 src="https://demos.creative-tim.com/argon-dashboard-pro-bs4/assets/img/icons/flags/FR.png"
//               ></img>
//               FranÃ§ais
//             </DropdownItem>
//           </li>
//         </DropdownMenu>
//       </UncontrolledDropdown>
//     </>
//     </div>
//   );
// }

// export default Example;

