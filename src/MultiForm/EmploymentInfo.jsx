import React, { useEffect, useState } from "react";

export default function EmploymentInfo({
  AllUserObj,
setAllUserObj,
errors,
validateFields
}) {

  // const [AllUserObj, setAllUserObj] = useState(
  // JSON.parse(localStorage.getItem("AllUserObj")) || {
  //   image: "",
  //   name: "",
  //   Dob: "",
  //   gender: "true",
  //   married: "",
  //   employmentStatus:"",

  // }
  // );  
  useEffect(() => {
    localStorage.setItem("AllUserObj", JSON.stringify(AllUserObj));
  }, [AllUserObj]);

  useEffect(() => {
    validateFields(AllUserObj);
  }, [AllUserObj.employmentStatus,AllUserObj.Companyname]);




  return(
    <div style={{ display: "flex", gap: "10px", flexDirection: "column" }}>
      <h3 style={{marginBottom:"-7px"}}>Employment Status</h3>
      <select style={{ height: "40px" }} value={AllUserObj.employmentStatus||""} 
      onChange={(e)=>{
        if (e.target.value!=="Employment Status") {
          console.log("object");
          setAllUserObj((prev) => ({ ...prev, employmentStatus: e.target.value}));
        }
      }}>
        <option style={{color:"#717171ff"}} value="Employment Status">Employment Status</option>
        <option value="employed">Employed</option>
        <option value="selfEmployed">Self Employed</option>
        <option value="student">Student</option>
        <option value="unemployed">Unemployed</option>
      </select>
      {errors.employmentStatus && (
        <p style={{ color: "red", marginBottom:"-6px" }}>{errors.employmentStatus}</p>
      )}

      <h3 style={{marginBottom:"-7px"}}>Company Name</h3>
      <input value={AllUserObj.Companyname||""} style={{ height: "40px" }} type="text" placeholder="Company Name" 
      onChange={(e)=>{
        setAllUserObj((prev) => ({ ...prev, Companyname: e.target.value}));
      }}/>
      {errors.Companyname && (
        <p style={{ color: "red", marginBottom:"-6px" }}>{errors.Companyname}</p>
      )}

      <h3 style={{marginBottom:"-7px"}}>Monthly Income(Optional)</h3>
      <input value={AllUserObj.Monthlyincome||""} style={{ height: "40px" }} type="number" placeholder="Monthly Income" 
      onChange={(e)=>{
        setAllUserObj((prev) => ({ ...prev, Monthlyincome: e.target.value}));
      }}/>
    </div>
  )
}