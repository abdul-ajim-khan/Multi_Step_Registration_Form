import React, { useEffect, useState } from "react";

export default function EducationInfo({
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
  // }
  // );  


useEffect(() => {
  validateFields(AllUserObj);
}, [AllUserObj.qualification,AllUserObj.passingYear, AllUserObj.InstitutionName]);






  useEffect(() => {
    localStorage.setItem("AllUserObj", JSON.stringify(AllUserObj));
  }, [AllUserObj]);

  return(
    <div style={{ display: "flex", gap: "10px", flexDirection: "column" }}>
      <h3 style={{marginBottom:"-7px"}}>Highest qualification</h3>
      <select style={{ height: "40px" }} value={AllUserObj.qualification} onChange={(e)=>{
        if (e.target.value!=="Highest qualification") {
          setAllUserObj((prev) => ({ ...prev, qualification: e.target.value}));
        }
      }}>
        <option value="Highest qualification">Highest qualification</option>
        <option value="10th">10th</option>
        <option value="12th">12th</option>
        <option value="Bachelor's">Bachelor's</option>
        <option value="Master's">Master's</option>
      </select>
      {errors.qualification && (
        <p style={{ color: "red", marginBottom:"-6px" }}>{errors.qualification}</p>
      )}
      <h3 style={{marginBottom:"-7px"}}>Passing year</h3>
      <input value={AllUserObj.passingYear||""} style={{ height: "40px" }} type="number" placeholder="Passing year" onChange={(e)=>{
        setAllUserObj((prev) => ({ ...prev, passingYear: e.target.value}));
      }}/>
      {errors.passingYear && (
        <p style={{ color: "red", marginBottom:"-6px" }}>{errors.passingYear}</p>
      )}
      <h3 style={{marginBottom:"-7px"}}>Institution Name</h3>
      <input value={AllUserObj.InstitutionName||""} style={{ height: "40px" }} type="text" placeholder="Institution Name" onChange={(e)=>{
        setAllUserObj((prev) => ({ ...prev, InstitutionName: e.target.value}));
      }}/>
      {errors.InstitutionName && (
        <p style={{ color: "red", marginBottom:"-6px" }}>{errors.InstitutionName}</p>
      )}
    </div>
  )
}