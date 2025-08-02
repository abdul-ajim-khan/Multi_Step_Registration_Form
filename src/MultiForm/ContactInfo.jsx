import React, { useEffect, useState } from "react";
import iso from "iso-3166-2.json";

export default function ContactInfo({
  AllUserObj,
  setAllUserObj,
  validateFields,
  errors
  }) {
    

  // const countryStates = Object.values(iso).reduce((acc, { name, divisions }) => {
  // acc[name] = Object.values(divisions);
  // return acc;
  // }, {});

  // Example usage:
  // console.log(Object.keys(countryStates));        // ["Andaman and Nicobar Islands", "Andhra Pradesh", ...]
  // // console.log(countryStates["United States"]); // ["Alabama", "Alaska", ...]
  
  // console.log(iso); // ["Alabama", "Alaska", ...]
  // const [AllUserObj, setAllUserObj] = useState(
  //   JSON.parse(localStorage.getItem("AllUserObj")) || {
  //     image: "",
  //     name: "",
  //     Dob: "",
  //     gender: "true",
  //     married: "",
  //     country: "",
  //     state: "",
  //     step:0,
  //   }
  // );  





  // useEffect(()=>
    const countryPhoneCodes = [
  "+93", "+355", "+213", "+1-684", "+376", "+244", "+1-264", "+672", "+1-268", "+54",
  "+374", "+297", "+61", "+43", "+994", "+1-242", "+973", "+880", "+1-246", "+375", "+32",
  "+501", "+229", "+1-441", "+975", "+591", "+387", "+267", "+55", "+246", "+673", "+359",
  "+226", "+257", "+855", "+237", "+1", "+238", "+1-345", "+236", "+235", "+56", "+86",
  "+61", "+61", "+57", "+269", "+242", "+243", "+682", "+506", "+225", "+385", "+53",
  "+357", "+420", "+45", "+253", "+1-767", "+1-809", "+670", "+593", "+20", "+503", "+240",
  "+291", "+372", "+251", "+500", "+298", "+679", "+358", "+33", "+594", "+689", "+262",
  "+241", "+220", "+995", "+49", "+233", "+350", "+44", "+30", "+299", "+1-473", "+590",
  "+1-671", "+502", "+224", "+245", "+592", "+509", "+672", "+379", "+504", "+852", "+36",
  "+354", "+91", "+62", "+98", "+964", "+353", "+972", "+39", "+1-876", "+81", "+962",
  "+7", "+254", "+686", "+850", "+82", "+965", "+996", "+856", "+371", "+961", "+266",
  "+231", "+218", "+423", "+370", "+352", "+853", "+389", "+261", "+265", "+60", "+960",
  "+223", "+356", "+692", "+596", "+222", "+230", "+262", "+52", "+691", "+373", "+377",
  "+976", "+1-664", "+212", "+258", "+95", "+264", "+674", "+977", "+31", "+599", "+687",
  "+64", "+505", "+227", "+234", "+683", "+672", "+1-670", "+47", "+968", "+92", "+680",
  "+507", "+675", "+595", "+51", "+63", "+870", "+48", "+351", "+1-787", "+974", "+262",
  "+40", "+7", "+250", "+290", "+1-869", "+1-758", "+508", "+1-784", "+685", "+378", "+239",
  "+966", "+221", "+248", "+232", "+65", "+421", "+386", "+677", "+252", "+27", "+500",
  "+34", "+94", "+249", "+597", "+47", "+268", "+46", "+41", "+963", "+886", "+992", "+255",
  "+66", "+228", "+690", "+676", "+1-868", "+216", "+90", "+993", "+1-649", "+688", "+256",
  "+380", "+971", "+1", "+598", "+998", "+678", "+58", "+84", "+1-284", "+1-340", "+681",
  "+212", "+967", "+381", "+260", "+263"
];

  


  const [countryid, setcountryid] = useState(() => {
    const selectedCountry = Object.values(iso).findIndex(
      (c) => c.name === (JSON.parse(localStorage.getItem("AllUserObj"))?.country || "")
    );
    return selectedCountry !== -1 ? selectedCountry : "";
  });
  const [statnam, setstatnam]=useState("")
  const [state, setstate] = useState(AllUserObj.state || statnam);
  const a = AllUserObj.countryNum
  const [selectedCountryid, setselectedCountryid] = useState(a)

// console.log(Object.values(Object.values(Object.values(iso))));
// console.log(iso);

// useEffect(()=>{
//   console.log(state);
// },[state])
useEffect(() => {
  localStorage.setItem("AllUserObj", JSON.stringify(AllUserObj));
  // console.log(selectedCountry);
}, [AllUserObj]);

useEffect(() => {
  const defaultId = AllUserObj.country === "India" ? "Aadhar" : "Passport";
  setAllUserObj((prev) => ({ ...prev, IdProof: defaultId }));
    if (AllUserObj.country === "") {
    setcountryid("");
    setselectedCountryid("");
    setstate("");
  }
}, [AllUserObj.country]);


  useEffect(() => {
    setAllUserObj((prev) => ({ ...prev, state: state }));
  }, [state]);

  
useEffect(() => {
  validateFields(AllUserObj);
}, [AllUserObj.country, AllUserObj.state, AllUserObj.city, AllUserObj.phone]);


  if (!AllUserObj) return null;
  
  return(
    <div style={{ display: "flex", gap: "10px", flexDirection: "column" }}>
      <h4 style={{marginBottom:"-9px"}}>Country</h4>
      <select required  style={{ height: "40px" }} value={selectedCountryid??""} 
      onChange={(e) => {
        const id = e.target.value;
        // setstatnam(Object.values(Object.values(iso)[countryid]?.divisions[0]))
        setcountryid(id);
        setselectedCountryid(id)
        const countryName = Object.values(iso)[id]?.name || "";
        if (e.target.value!=="Select Country") {
          setAllUserObj((prev) => ({ ...prev, country: countryName,countryNum: id, phoneCode:countryPhoneCodes[id-1]}));
        }
      }}>
        <option value={"Select Country"}>Select Country</option>
          {Object.values(Object.values(iso)).map((val,id)=>
          <option key={id} value={id} >{val.name}</option>)}
      </select>
      {errors.country && (
          <p style={{ color: "red", marginBottom:"-6px" }}>{errors.country}</p>
        )}
      <h4 style={{marginBottom:"-9px", marginTop:"8px" }}>State</h4>
      <select disabled={AllUserObj.country==""?true:false}  value={state} 
      onChange={(e)=>{setstate(e.target.value)
        if (e.target.value!=="Select State") {
          setAllUserObj((prev) => ({ ...prev, state:""}));
        }
      }}  style={{ height: "40px" }}>
        <option value={"Select State"}>Select State</option>
          {Object.values(Object.values(iso)[countryid]?.divisions || {})
          .map((val,ids)=>
            <option key={ids}>{val}</option>)}
      </select>
      {errors.state && (
        <p style={{ color: "red", marginBottom:"-6px" }}>{errors.state}</p>
      )}
      <h4 style={{marginBottom:"-9px", marginTop:"8px" }}>City</h4>
      <input value={AllUserObj.city||""} onChange={(e) =>setAllUserObj((prev) => ({ ...prev, city: e.target.value })) } disabled={!state} style={{ height: "40px"}} type="text" placeholder="City Name" name="" id="" />
      {errors.city && (
        <p style={{ color: "red", marginBottom:"-6px" }}>{errors.city}</p>
      )}
      <h4 style={{marginBottom:"-9px", marginTop:"8px" }}>Phone Number</h4>
      <input  type="text" maxLength="10" value={AllUserObj.phone||""}
       onChange={(e) =>{
          const value = e.target.value;
          if (/^\d*$/.test(value)) {
            return setAllUserObj((prev) => ({ ...prev, phone: e.target.value })) 
          }
        }} disabled={!state} style={{ height: "40px"}} placeholder="Phone Number" name="" id="" />
      {errors.phone && (
        <p style={{ color: "red", marginBottom:"-6px" }}>{errors.phone}</p>
      )}
    </div>
  )
}


