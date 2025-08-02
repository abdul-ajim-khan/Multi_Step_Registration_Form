import { useEffect, useState } from "react";
import "./MultiForm.css";
import FamilyInfo from "./FamilyInfo";
import PersonalInfo from "./PersonalInfo";
import ContactInfo from "./ContactInfo";
import EducationInfo from "./EducationInfo";
import EmploymentInfo from "./EmploymentInfo";
import AddressDocuments from "./AddressDocuments";
import UserView from "./UserView";
// import { useTheme } from '@mui/material/styles';
import MobileStepper from "@mui/material/MobileStepper";
import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";
import { use } from "react";

export default function MultiForm() {
  const defaultUser = {
    image: "",
    name: "",
    Dob: "",
    gender: "true",
    married: "",
    employmentStatus: "",
    country: "",
    state: "",
  };

  const [AllUserObj, setAllUserObj] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("AllUserObj"));
      return saved && typeof saved === "object" ? saved : defaultUser;
    } catch {
      return defaultUser;
    }
  });
  const [step, setstep] = useState(() => {
    try {
      return parseInt(localStorage.getItem("step")) || 0;
    } catch {
      return 0;
    }
  });
  const [ismarr, setismarr] = useState(AllUserObj.married || "false");
  useEffect(() => {
    localStorage.setItem("step", step.toString());
  }, [step]);

  const [ischeck, setischeck] = useState("fls")
  const [ischeckback, setischeckback] = useState("fls")


  useEffect(() => {
    localStorage.setItem("AllUserObj", JSON.stringify(AllUserObj));
  }, [AllUserObj]);

  
  const showSkip = step === 3 || (step === 2 && ismarr === "false") ||
  (step === 4 && ismarr === "true");
  

  // useEffect(()=>{
  //   setInterval(() => {
  //     setAllUserObj(JSON.parse(localStorage.getItem("AllUserObj")))
  //   }, 20);
  //   return clearInterval;
  // },[])
  
const [errors, setErrors] = useState({});

  const validateFields = (obj) => {
  let newErrors={};

    if (ischeck=="tru"&& step==0) {
      newErrors = {};
      if (!obj.image) newErrors.image = "Please add a profile photo";
      if (!obj.name?.trim()){
        newErrors.name = "Name is required"
      }else if (!/^[A-Za-z\s]+$/.test(obj.name)) {
        newErrors.name = "Please enter a valied name"
      }
      if (!obj.Dob){
        newErrors.Dob = "Date of birth is required";
      }else if (new Date().getFullYear()<=obj.Dob.split("-")[0]) {
        newErrors.Dob = "Invalied date of birth"
      }
      if (!obj.married) newErrors.marr = "Married or Unmarried";
      if (Object.keys(newErrors).length===0) {
        setischeck("fls")
        setischeckback("fls")
      }
      setErrors(newErrors);
    }

    if (ischeck=="tru"&& step == 1 && ismarr == "true") {
      newErrors = {};
      if (!obj.Wife&&obj.gender=="true") {
        newErrors.wife = "Please enter the wife name";
      }else if (!/^[A-Za-z\s]+$/.test(obj.Wife)) {
        newErrors.Husband = "Please enter a valied name";
      }
      if (!obj.Husband&&obj.gender=="false") {
        newErrors.Husband = "Please enter the Husband name";
      }else if (!/^[A-Za-z\s]+$/.test(obj.Husband)) {
        newErrors.Husband = "Please enter a valied name";
      }
      // if (!obj.childrenF) newErrors.Husband = "Please enter the Husband name";
      if (Object.keys(newErrors).length===0) {
        setischeck("fls")
        setischeckback("fls")
      }
      setErrors(newErrors);
    }
    
    if (ischeck=="tru"&& (step == 1 && ismarr == "false") || ischeck=="tru"&& (step == 2 && ismarr == "true")) {
      newErrors = {};
      if (!obj.country) newErrors.country = "Please select the country";
      if (!obj.state) newErrors.state = "Please select the state";
      if (!obj.city) newErrors.city = "Please enter the city";
      if (!obj.phone) {
        newErrors.phone = "Please enter a phone number";
      }else if (!/^[+]?(\d{1,4})?(\d{10,12})$/.test(obj.phone)) {
        newErrors.phone = "Invalid phone number format";
      }
      if (Object.keys(newErrors).length===0) {
        setischeck("fls")
        setischeckback("fls")
      }
      setErrors(newErrors);
    }
    
    // if (ischeck=="tru"&& step == 2 && ismarr == "false" || ischeck=="tru"&& step == 3 && ismarr == "true" ) {
    //   newErrors = {};
    //   if (!obj.qualification) newErrors.qualification = "Please select the qualification";
    //   if (!obj.passingYear) newErrors.passingYear = "Please enter the passingYear";
    //   if (!obj.InstitutionName) newErrors.InstitutionName = "Please enter the InstitutionName";
    //   if (Object.keys(newErrors).length===0) {
    //     setischeck("fls")
    //     setischeckback("fls")
    //   }
    //   setErrors(newErrors);
    // }

    // if (ischeck=="tru"&& step == 3 && ismarr == "false" || ischeck=="tru"&& step == 4 && ismarr == "true" ) {
    //   newErrors = {};
    //   if (!obj.employmentStatus) newErrors.employmentStatus = "Please select the employmentStatus";
    //   if (!obj.Companyname) newErrors.Companyname = "Please enter the Companyname";
    //   if (Object.keys(newErrors).length===0) {
    //     setischeck("fls")
    //     setischeckback("fls")
    //   }
    //   setErrors(newErrors);
    // }

    if (ischeck=="tru"&& step == 4 && ismarr == "false" || ischeck=="tru"&& step == 5 && ismarr == "true" ) {
      newErrors = {};
      if (!obj.permanentAddress) newErrors.permanentAddress = "Please enter the permanentAddress";
      if (!obj.IdProof) newErrors.IdProof = "Please select IdProof";
      if (!obj.AadharNum) newErrors.AadharNum = "Please enter the AadharNum";
      if (obj.consent=="off") newErrors.consent = "Please select the consent box";
      if (Object.keys(newErrors).length===0) {
        setischeck("fls")
        setischeckback("fls")
      }
      setErrors(newErrors);
    }




    return newErrors;     
  };

  useEffect(() => {
  if (ischeck === "tru") {
    const a = validateFields(AllUserObj);
    // console.log("hello");
    if (Object.keys(a).length === 0) {
      let next;
      if (ischeckback=="tru") {
        next = step - 1;
      }else{
        next = step + 1;
      }
      setstep(next);
      setAllUserObj({ ...AllUserObj, step: next });
    }
  }
}, [ischeck]); 


function pageresetfunc() {
  if (step==0) {
    setAllUserObj({ ...AllUserObj, name: "",Dob:"",gender:"true",married:"",image:"" })
  }
  if (step == 1 && ismarr == "true") {
    setAllUserObj({ ...AllUserObj, Wife: "",childrenF:[] })
  }
  if (step == 1 && ismarr == "false"||step == 2 && ismarr == "true") {
    setAllUserObj({ ...AllUserObj, country: "",countryNum:"",state:"",city:"",phone:"",phoneCode:"" })
  }
  if (step == 2 && ismarr == "false"||step == 3 && ismarr == "true" ) {
    setAllUserObj({ ...AllUserObj, qualification: "",passingYear:"",InstitutionName:"" })
  }
  if (step == 3 && ismarr == "false"||step == 4 && ismarr == "true") {
    setAllUserObj({ ...AllUserObj, employmentStatus: "",Companyname:"",Monthlyincome:"" })
  }
  if (step == 4 && ismarr == "false"||step == 5 && ismarr == "true") {
    setAllUserObj({ ...AllUserObj, permanentAddress: "",IdProof:"",AadharNum:"",consent:"off" })
  }
  // setischeck("fls")
}





// localStorage.clear  ()
  return (
    <div className="MultiStepFormCantainer">
      {/* {console.log(errors)} */}
      <div className="MultiStepFormCard">
        {(step !== 6 && ismarr == "true" ) && <div style={{display:"flex",justifyContent:"right",marginTop:"-30px",marginRight:"-30px"}}>
          {/* 🔄 */}
          <button style={{
            backgroundColor:"#ff5b5bff",
            color:"#ffffff",
            fontWeight:"bolder",
            width:"30px",
            height:"30px",
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            fontsize:"90px",
            fontStyle:""
            }}
            onClick={()=>{
              pageresetfunc()
            }}
            
            >↻</button>
        </div>}
        {(step !== 5 && ismarr == "false") && <div style={{display:"flex",justifyContent:"right",marginTop:"-30px",marginRight:"-30px"}}>
          {/* 🔄 */}
          <button style={{
            backgroundColor:"#ff5b5bff",
            color:"#ffffff",
            fontWeight:"bolder",
            width:"30px",
            height:"30px",
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            fontsize:"90px",
            fontStyle:""
            }}
            onClick={()=>{
              pageresetfunc()
            }}
            
            >↻</button>
        </div>}
        {step == 0 && <PersonalInfo             
            AllUserObj={AllUserObj}
            setAllUserObj={setAllUserObj}
            setismarr={setismarr}
            validateFields={validateFields}
            errors={errors}
            setErrors={setErrors} />}
        {step == 1 && ismarr == "false" && <ContactInfo 
            AllUserObj={AllUserObj}
            setAllUserObj={setAllUserObj}
            errors={errors}
            validateFields={validateFields}
            />}
            
        {step == 1 && ismarr == "true" && <FamilyInfo  
            AllUserObj={AllUserObj}
            setAllUserObj={setAllUserObj}
            validateFields={validateFields}
            errors={errors}
            />}
        {step == 2 && ismarr == "false" && <EducationInfo 
            AllUserObj={AllUserObj}
            setAllUserObj={setAllUserObj}
            errors={errors}
            validateFields={validateFields}
            />}
        {step == 2 && ismarr == "true" && <ContactInfo 
            AllUserObj={AllUserObj}
            setAllUserObj={setAllUserObj}
            errors={errors}
            validateFields={validateFields}
            />}
        {step == 3 && ismarr == "false" && <EmploymentInfo 
            AllUserObj={AllUserObj}
            setAllUserObj={setAllUserObj}
            errors={errors}
            validateFields={validateFields}
            />}
        {step == 3 && ismarr == "true" && <EducationInfo 
            AllUserObj={AllUserObj}
            setAllUserObj={setAllUserObj}
            errors={errors}
            validateFields={validateFields}
            />}
        {step == 4 && ismarr == "false" && <AddressDocuments 
            AllUserObj={AllUserObj}
            setAllUserObj={setAllUserObj}
            errors={errors}
            validateFields={validateFields}
            />}
        {step == 4 && ismarr == "true" && <EmploymentInfo 
            AllUserObj={AllUserObj}
            setAllUserObj={setAllUserObj}
            errors={errors}
            validateFields={validateFields}
            />}
        {step == 5 && ismarr == "false" && <UserView 
            AllUserObj={AllUserObj}
            />}
        {step == 5 && ismarr == "true" && <AddressDocuments 
            AllUserObj={AllUserObj}
            setAllUserObj={setAllUserObj}
            errors={errors}
            validateFields={validateFields}
            />}
        {step == 6 && ismarr == "true" && <UserView 
            AllUserObj={AllUserObj}
            />}

        {/* <FamilyInfo/> */}
        {/* <ContactInfo/> */}
        {/* <EducationInfo/> */}
        {/* <EmploymentInfo/> */}
        {/* <AddressDocuments/> */}
        {/* <UserView/> */}

        {showSkip && (
          <div
            style={{
              display: "flex",
              justifyContent: "right",
              position: "sticky",
              top: "100%",
              marginBottom: "30px",
            }}
          >
            <button
              style={{
                width: "80px",
                backgroundColor: "#00c821ff",
                color: "#e4ffdeff",
              }}
              onClick={() => {
                const next = step + 1;
                setstep(next);
                // increase()
                // console.log(next);
                setAllUserObj({ ...AllUserObj, step: next });
              }}
            >
              Skip ➤
            </button>
          </div>
        )}


        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            position: "sticky",
            top: "100%",
            marginBottom: "-20px",
          }}
        >
          <button
            style={{
              width: "80px",
              height: "40px",
              color: `${step === 0?"#005eff78":"blue"}`,

              border: "1px solid #cececeff",
            }}
            disabled={step == 0}
            onClick={() => {
              setischeck("tru")
              setischeckback("tru")
              const a =validateFields(AllUserObj)
              // console.log(ischeck);
              if (Object.keys(a).length===0&& ischeck=="tru") {
                const prev = step - 1;
                setstep(prev);
                setAllUserObj({ ...AllUserObj, step: prev });
              }

            }}
          >
            <span className="arrow" style={{ fontsize: "48px", color: `${step === 0?"#005eff78":"blue"}`,marginTop:"4px" }}>
              ➤
            </span>
            Back
          </button>

          <MobileStepper
            variant="dots"
            steps={ismarr == "true" ? 7 : 6}
            position="static"
            activeStep={step}
            sx={{
              maxWidth: 400,
              flexGrow: 1,
              display: "flex",
              justifyContent: "center",

              "& .MuiMobileStepper-dot": {
                width: 14,
                height: 14,
                marginLeft: 1,
              },
            }}
          />

          <button
            style={{
              width: "80px",
              height: "40px",
              // color: "blue",
              border: "1px solid #cececeff",
              backgroundColor:"#cececeff",
              // color: "#005eff78",
              
              color: `${step === (ismarr == "true" ? 6 : 5)?"#005eff78":"blue"}`,
            }}
            disabled={step === (ismarr == "true" ? 6 : 5)}
            onClick={() => {
              setischeck("tru")
              const a =validateFields(AllUserObj)
              // console.log(ischeck);
              if (Object.keys(a).length===0&& ischeck=="tru") {
                const next = step + 1;
                setstep(next);
                // increase()
                // console.log(next);
                setAllUserObj({ ...AllUserObj, step: next });
                // setErrors({})
              }
              
            }}
          >
            Next<span style={{ fontsize: "48px", color: `${step === (ismarr == "true" ? 6 : 5)?"#005eff78":"blue"}` }}>➤</span>
          </button>
        </div>
      </div>
    </div>
  );
}






// now create ContactInfo input validation