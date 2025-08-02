
import React, { useEffect, useState } from "react";
export default function AddressDocuments({
  AllUserObj,
setAllUserObj,
errors,
validateFields
}) {
  
  //   const [AllUserObj, setAllUserObj] = useState(
  //   JSON.parse(localStorage.getItem("AllUserObj")) || {
  //     image: "",
  //     name: "",
  //     Dob: "",
  //     gender: "true",
  //     married: "",
  //   }
  // );  
// localStorage.clear()

  useEffect(() => {
    localStorage.setItem("AllUserObj", JSON.stringify(AllUserObj));
  }, [AllUserObj]);



  useEffect(() => {
    validateFields(AllUserObj);
  }, [AllUserObj.permanentAddress,AllUserObj.IdProof,AllUserObj.AadharNum,AllUserObj.consent]);

  


  return(
    <div style={{ display: "flex", gap: "10px", flexDirection: "column"}}>
      <h3 style={{marginBottom:"-7px"}}>Permanent Address</h3>
      <textarea value={AllUserObj.permanentAddress} placeholder="Permanent Address.." style={{width:"100%",padding:"5px"}} maxLength={200} cols="40" rows="4" onChange={(e)=>{
        setAllUserObj((prev) => ({ ...prev, permanentAddress: e.target.value}));
      }}></textarea>
      {errors.permanentAddress && (
        <p style={{ color: "red", marginBottom:"-6px" }}>{errors.permanentAddress}</p>
      )}

      <h3 style={{marginBottom:"-7px"}}>Proof of Identity</h3>
      <select
        style={{ height: "40px" }}
        value={AllUserObj.IdProof}
        onChange={(e) => {
          if (e.target.value!=="Select Id") {
            setAllUserObj((prev) => ({ ...prev, IdProof: e.target.value }));
          }
        }}
      >
        <option value="Select Id">Select Id</option>
        {AllUserObj.country === "India" && (
          <option value="Aadhar">Aadhar</option>
        )}
        <option value="Passport">Passport</option>
      </select>
      {errors.IdProof && (
        <p style={{ color: "red", marginBottom:"-6px" }}>{errors.IdProof}</p>
      )}
        <h3 style={{marginBottom:"-7px"}}>{AllUserObj.IdProof} Number</h3>
      <input  type="text" maxLength={12} value={AllUserObj.AadharNum||""} style={{ height: "40px"}} placeholder={`${AllUserObj.IdProof} Number`}  onChange={(e)=>{
        setAllUserObj((prev) => ({ ...prev, AadharNum: e.target.value}));
      }}/>
      {errors.AadharNum && (
        <p style={{ color: "red", marginBottom:"-6px" }}>{errors.AadharNum}</p>
      )}
      <div style={{ display: "flex", gap: "5px",marginTop:"10px"}}>
        <input style={{scale:"1.3"}} type="checkbox" id="consent" checked={AllUserObj.consent=="on"?true:false} value={AllUserObj.consent} onChange={(e)=>{
          if (AllUserObj.consent=="on") {
            setAllUserObj((prev) => ({ ...prev, consent: "off"}));
          }else{
            setAllUserObj((prev) => ({ ...prev, consent: "on"}));
          }
      }}/><label htmlFor="consent" style={{marginTop:"-3px"}}><small style={{color:"blue"}}>I agree to term & condition</small></label>
      </div>
      {errors.consent && (
        <p style={{ color: "red", marginBottom:"-6px" }}>{errors.consent}</p>
      )}
    </div>
  )
}