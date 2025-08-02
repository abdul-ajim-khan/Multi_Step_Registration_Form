import { capitalize } from "@mui/material";
import React, { useEffect, useState } from "react";
export default function UserView() {
  const [AllUserObj, setAllUserObj] = useState(
    JSON.parse(localStorage.getItem("AllUserObj")) || {
      image: "",
      name: "",
      Dob: "",
      gender: "true",
      married: "",
    }
  );
  useEffect(() => {
    localStorage.setItem("AllUserObj", JSON.stringify(AllUserObj));
  }, [AllUserObj]);
  return (
    <div
      style={{
        display: "flex",
        gap: "3px",
        flexDirection: "column",
        fontSize: "12px",
        // height:"110%",
        width: "430px",
        marginLeft: "-30px",
        marginTop: "-30px",
      }}
    >
      
      <table border={1}  style={{ borderCollapse: "collapse"}}>
        
        <caption style={{marginTop:"-15px"}}><b style={{fontSize:"30px"}}>User's Details</b></caption>
        <colgroup>
          <col style={{ width: "35%" }} />
          <col style={{ width: "60%" }} />
        </colgroup>
        <thead>
          <tr>
            <th>Data</th>
            <th>Data Details</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Name</td>
            <td>{capitalize(AllUserObj.name)}</td>
          </tr>
          <tr>
            <td>Date of birth </td>
            <td>{AllUserObj.Dob}</td>
          </tr>
          <tr>
            <td>Gender</td>
            <td>{AllUserObj.gender === "true" ? "Male" : "Female"}</td>
          </tr>
          <tr>
            <td>Married</td>
            <td>{AllUserObj.married=="true" ? "Yes" : "No"}</td>
          </tr>
          {AllUserObj.Wife && 
          <tr>
            <td>Wife Name</td>
            <td>{AllUserObj.Wife}</td>
          </tr>}
          {AllUserObj.Husband && 
          <tr>
            <td>Husband Name</td>
            <td>{AllUserObj.Husband}</td>
          </tr>}

          {Array.isArray(AllUserObj.childrenF) &&
            AllUserObj.childrenF.length > 0 && (
              <tr>
                <td rowSpan={1}>Children</td>
                <td style={{ marginLeft: "5px" }}>
                  <table
                    border={1}
                    style={{
                      width: "103.9%",
                      borderCollapse: "collapse",
                      marginLeft: "-10.5px",
                    }}
                  >
                    <colgroup>
                      <col style={{ width: "50%" }} />
                      <col style={{ width: "25%" }} />
                      <col style={{ width: "25%" }} />
                    </colgroup>
                    <thead style={{}}>
                      <tr>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Gender</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Array.isArray(AllUserObj.childrenF) &&
                        AllUserObj.childrenF.map((val, idx) => {
                          return (
                            <tr key={idx}>
                              <td>{val.name&&capitalize(val.name)}</td>
                              <td>{val.age}</td>
                              <td>{val.gender&&capitalize(val.gender)}</td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </td>
              </tr>
            )}

          <tr>
            <td>Country Name</td>
            <td>{AllUserObj.country}</td>
          </tr>
          <tr>
            <td>State</td>
            <td>{AllUserObj.state}</td>
          </tr>
          <tr>
            <td>City</td>
            <td>{AllUserObj.city&& capitalize(AllUserObj.city)}</td>
          </tr>
          <tr>
            <td>Phone Number</td>
            <td>{AllUserObj.phoneCode&& capitalize(AllUserObj.phoneCode)}{AllUserObj.phone&& capitalize(AllUserObj.phone)}</td>
          </tr>
          {AllUserObj.qualification && 
          <tr>
            <td>qualification</td>
            <td>{AllUserObj.qualification&& capitalize(AllUserObj.qualification)}</td>
          </tr>}
          {AllUserObj.passingYear && 
          <tr>
            <td>Passing year</td>
            <td>{AllUserObj.passingYear}</td>
          </tr>}
          {AllUserObj.InstitutionName && 
          <tr>
            <td>Institution Name</td>
            <td>{AllUserObj.InstitutionName&& capitalize(AllUserObj.InstitutionName)}</td>
          </tr>}
          {AllUserObj.employmentStatus&&<tr>
            <td>Employment Status</td>
            <td>{AllUserObj.employmentStatus}</td>
          </tr>}
          {AllUserObj.Monthlyincome && 
          <tr>
            <td>Monthly Income</td>
            <td>{AllUserObj.Monthlyincome}</td>
          </tr>}
          <tr>
            <td>Permanent Address</td>
            <td style={{ whiteSpace: "normal", wordBreak: "break-word" }}>{AllUserObj.permanentAddress&& capitalize(AllUserObj.permanentAddress)}</td>
          </tr>
          <tr>
            <td>Proof of Identity</td>
            <td>{AllUserObj.IdProof}</td>
          </tr>
          <tr>
            <td>Aadhar Number</td>
            <td>{AllUserObj.AadharNum}</td>
          </tr>
        </tbody>
      </table>
      {/* <div style={{textAlign:"right"}}>
        <button>button</button>
      </div> */}

    </div>
  );
}
