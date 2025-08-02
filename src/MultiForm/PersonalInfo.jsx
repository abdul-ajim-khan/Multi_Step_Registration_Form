import { useEffect, useState } from "react";

export default function PersonalInfo({  AllUserObj,
  setAllUserObj,
  setismarr,
  validateFields,
  errors,
  setErrors}) {

  // const [AllUserObj, setAllUserObj] = useState(
  //   JSON.parse(localStorage.getItem("AllUserObj")) || {
  //     image: "",
  //     name: "",
  //     Dob: "",
  //     gender: "true",
  //     married: "",
  //     employmentStatus: "",
  //     country: "",
  //     state: "",
  //     qualification: "10th",
  //     fake:0,

  //   }
  // );

  const [ismarried, setismarried] = useState(() => AllUserObj.married);
  const [ismale, setismale] = useState(() => AllUserObj.gender||"true");
  
  const [image, setimage] = useState(() => {
    return AllUserObj.image ||
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtUMYnI3wG2RI4W5FSoMe80u9BX0tzxstGfA&s";
  });
  

  useEffect(() => {
    setimage(AllUserObj.image || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtUMYnI3wG2RI4W5FSoMe80u9BX0tzxstGfA&s");
  }, [AllUserObj.image]);






  // useEffect(() => {
  //   localStorage.setItem("AllUserObj", JSON.stringify(AllUserObj));
  //   // validateFields()

  //   // console.log(errors);
  //   // return setErrors({})

  // }, [AllUserObj]);

  // useEffect(() => {
  //       validateFields()

  // }, [AllUserObj.name]);
  



  function handleChange(e) {
  const file = e.target.files[0];
  if (file) {
    
    const reader = new FileReader();
    reader.onloadend = () => {  
      const base64 = reader.result;
      setimage(base64);
      setAllUserObj({ ...AllUserObj, image: base64 });
    };
    reader.readAsDataURL(file);
  }
}

useEffect(() => {
  validateFields(AllUserObj);
}, [AllUserObj.name, AllUserObj.image, AllUserObj.Dob, AllUserObj.married]);



useEffect(() => {
  let updatedObj = { ...AllUserObj };
    if (ismarried!=="true") {
      delete updatedObj.childrenF;
      delete updatedObj.Wife;
      delete updatedObj.Husband;
    }
    if (ismale=="true") {
      delete updatedObj.Husband;
    } else {
      delete updatedObj.Wife;
    }
    setAllUserObj(updatedObj);
    localStorage.setItem("AllUserObj", JSON.stringify(updatedObj));
  }, [ismarried, ismale]);


// const [errors, setErrors] = useState({});

//   const validateFields = () => {
//     let newErrors = {};
//       if (!AllUserObj.image) newErrors.image = "Please add a profile photo";
//       if (!AllUserObj.name?.trim()) newErrors.name = "Name is required";
//       if (!AllUserObj.Dob) newErrors.Dob = "Date of birth is required";
    
//     setErrors(newErrors);
//     // console.log(newErrors);
//     // if (Object.keys(newErrors).length == 0) {
//     //   localStorage.setItem("errprop","tru")
//     // }else{
//     //   localStorage.setItem("errprop","fls")
//     // }
//     return Object.keys(newErrors).length === 0;
//   };
  // console.log(validateFields);


// useEffect(() => {
//   const interval = setInterval(() => {
//     if (localStorage.getItem("errp") == "tr") {
//       // validateFields();
//       localStorage.setItem("errp","fl")
//       return () => clearInterval(interval);

//     }
//   }, 100);
  
// }, []);


  return (
    <div style={{ display: "flex", gap: "6px", flexDirection: "column" }}>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <div className="userImageBox">
            <img src={image} alt="user img" className="userImage" />
          </div>
        </div>

        <label
          htmlFor="file"
          style={{
            width: "100%",
            height: "40px",
            marginTop: "10px",
            backgroundColor: "#4CAF50",
            color: "white",
            display: "block",
            textAlign: "center",
            paddingTop: "5px"
          }}
        >
          Add profile
        </label>
        <input
          type="file"
          id="file"
          accept="image/*"
          onChange={handleChange}
          style={{ display: "none" }}
        />
        {errors.image && (
          <p style={{ color: "red", marginBottom:"-12px" }}>{errors.image}</p>
        )}
      </div>

      <div>
        <h3 style={{ color: "#4e4e4eff", fontWeight: "bold" }}>Name</h3>
        <input
          type="text"
          placeholder="Fullname"
          value={AllUserObj.name}
          style={{ width: "100%", height: "40px", marginTop: "-2px" }}
          onChange={(e) => {
            setAllUserObj({ ...AllUserObj, name: e.target.value });
            // validateFields()
            // setErrors({})
            console.log(errors);

          }}
        />
        {errors.name && (
          <p style={{ color: "red", marginBottom:"-12px" }}>{errors.name}</p>
        )}
      </div>

      <div>
        <div style={{ color: "#4e4e4eff", fontWeight: "bold" }}>
          Date of birth
        </div>
        <input
          type="date"
          value={AllUserObj.Dob || ""}
          onChange={(e) => {
            setAllUserObj({ ...AllUserObj, Dob: e.target.value });
          }}
          style={{ width: "100%", color: "#636363ff", height: "40px" }}
        />
        {errors.Dob && (
          <p style={{ color: "red", marginBottom:"-6px" }}>{errors.Dob}</p>
        )}
      </div>

      <div>
        <div>
          <span
            style={{
              marginRight: "20px",
              color: "#454545ff",
              fontWeight: "bold",
              fontSize: "19px"
            }}
          >
            Gender
          </span>
          <label htmlFor="sex">
            <span>
              <input
                type="radio"
                onChange={() => {
                  setismale("true");
                  setAllUserObj({ ...AllUserObj, gender: "true" });
                }}
                checked={AllUserObj.gender == "true"}
                id="male"
                name="sex"
                style={{ marginLeft: "2px" }}
              />
              <label htmlFor="male" style={{ marginLeft: "3px" }}>
                Male
              </label>
            </span>
            <span>
              <input
                type="radio"
                onChange={() => {
                  setismale("false");
                  setAllUserObj({ ...AllUserObj, gender: "false" });
                }}
                checked={AllUserObj.gender == "false"}
                id="female"
                name="sex"
                style={{ marginLeft: "20px" }}
              />
              <label htmlFor="female" style={{ marginLeft: "3px" }}>
                Female
              </label>
            </span>
          </label>
        </div>

        <div style={{ marginTop: "10px" }}>
          <span
            style={{
              marginRight: "20px",
              color: "#4e4e4eff",
              fontWeight: "bold",
              fontSize: "18px"
            }}
          >
            Married
          </span>
          <label htmlFor="married">
            <span>
              <input
                type="radio"
                checked={AllUserObj.married === "true"}
                onChange={() => {
                  setismarr("true");
                  setismarried("true");
                  setAllUserObj({ ...AllUserObj, married: "true" });
                }}
                id="married"
                name="married"
              />
              <label htmlFor="married" style={{ marginLeft: "3px" }}>
                Married
              </label>
            </span>
            <span>
              <input
                type="radio"
                checked={AllUserObj.married === "false"}
                onChange={() => {
                  setismarr("false");
                  setismarried("false");

                  setAllUserObj({ ...AllUserObj, married: "false" });
                }}
                id="unmarried"
                name="married"
                style={{ marginLeft: "20px" }}
              />
              <label htmlFor="unmarried" style={{ marginLeft: "3px" }}>
                Unmarried
              </label>
            </span>
          </label>
          {errors.marr && (
            <p style={{ color: "red", marginBottom:"-6px" }}>{errors.marr}</p>
          )}
        </div>
      </div>


    </div>
  );
}

