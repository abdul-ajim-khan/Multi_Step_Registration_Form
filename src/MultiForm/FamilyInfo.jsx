import React, { useEffect, useRef, useState } from "react";
import { MdOutlineEdit } from "react-icons/md";

export default function FamilyInfo({AllUserObj,
  setAllUserObj,
  validateFields,
  errors,
}) {
  const containerRef = useRef(null);
  
  // const [AllUserObj, setAllUserObj] = useState(
  //   JSON.parse(localStorage.getItem("AllUserObj")) || {
  //     image: "",
  //     name: "",
  //     Dob: "",
  //     gender: "true",
  //     married: "",
  //     step:0,
  //   }
  // );  
  
const [children, setchildren] = useState(AllUserObj.childrenF || [])
  const [ismarried, setismarried] = useState(() => AllUserObj.married);
  const [ismale, setismale] = useState(() => AllUserObj.gender);
  const [chilnam, setchilnam] = useState("")
  const [chilage, setchilage] = useState("")
  const [chilgen, setchilgen] = useState("")
  // const [lastChild, setlastChild] = useState("")
  const [boxToggle, setboxToggle] = useState("block")
const [agerror,setagerror] = useState("")

useEffect(()=>{
  setchildren(AllUserObj.childrenF||[])
},[AllUserObj.childrenF])


  function Childrenfunc(e) {
    e.preventDefault();
    if ((new Date().getFullYear()-AllUserObj.Dob.split("-")[0])<chilage) {
      setagerror("ChildAgeError")
    }else{
      const newChild = {
        id: Date.now(),
        name: chilnam,
        age: chilage,
        gender: chilgen,
      }; 
      setchildren((prev) => [...prev, newChild]);
      setchilnam("")
      setchilage("")
      setchilgen("")
      setagerror("")
    }
  }

  function delchildfunc(id) {
    setchildren((prev) => prev.filter((child) => child.id !== id));
  }

  // useEffect(() => {
  //   if (containerRef.current) {
  //     containerRef.current.scrollTop = containerRef.current.scrollHeight;
  //   }
  // }, [children]);

useEffect(() => {
  if (JSON.stringify(AllUserObj.childrenF) !== JSON.stringify(children)) {
    const update = { ...AllUserObj, childrenF: children };
    setAllUserObj(update);
    localStorage.setItem("AllUserObj", JSON.stringify(update));
  }
}, [children]);

  
  useEffect(() => {
    localStorage.setItem("AllUserObj", JSON.stringify(AllUserObj));
  }, [AllUserObj]);

// function updateChildren(id, field, value) {
//   const update = children.map((child)=>
//     id===child.id? {...child, [field]:value}: child
//   )
//   setchildren(update)
// }

useEffect(()=>{
  validateFields(AllUserObj)
},[AllUserObj.Wife,AllUserObj.Husband])

const lastChild = children[children.length - 1];







// console.log(lastChild);
return (
    <div style={{ display: "flex", gap: "10px", flexDirection: "column" }}>
      <input
        type="text"
        style={{ height: "40px" }}
        value={AllUserObj[ismale==="true" ? "Wife" : "Husband"]||""}
        placeholder={ismale==="true" ? "Wife's name" : "Husband's name"}
        onChange={(e) =>{
          const patername = ismale === "true" ? "Wife" : "Husband"
          return setAllUserObj({ ...AllUserObj, [patername]: e.target.value })}
        }
      />
        {errors.wife && (
          <p style={{ color: "red", marginBottom:"-6px" }}>{errors.wife}</p>
        )}
        {errors.Husband && (
          <p style={{ color: "red", marginBottom:"-6px" }}>{errors.Husband}</p>
        )}
      <div>
        <div style={{ fontWeight: "bold" }}>Add Children</div>
        <div onClick={()=>{setboxToggle("block")}} className="addicon">
          +
        </div>


        <div className="childadd">
          <form style={{display:boxToggle}} onSubmit={Childrenfunc}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "5px",
                flexDirection: "column",
                backgroundColor: "#eaeaeaff",
                padding: "10px",
                marginTop: "7px",
              }}
            > 
              <div
                style={{
                  width: "100%",
                  paddingLeft: "94%",
                  marginTop: "-8px",
                }}
              >
              <button type="button" onClick={()=>{setboxToggle("none")}} style={{border:"1px solid"}}>❌</button>

              </div>

              <input
                style={{ width: "100%", height: "40px" }}
                type="text"
                required
                placeholder="Children's name"
                // onKeyDown={(e)=>{
                //   if (e.key=="Enter") {
                //     const value = e.target.value.trim();
                //     if (value === "") return;
                //     Childrenfunc(value)
                //     e.target.value=""
                //   }
                // }}
                // onInvalid={(e) => e.target.setCustomValidity("Please enter your child name")}
                value={chilnam}
                onChange={(e)=>{
                  setchilnam(e.target.value)
                }}
              />
              {/* {console.log(children.length-1)} */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <input
                  style={{ width: "120px", height: "40px" }}
                  type="number"
                  placeholder="Age"
                  required
                  // onKeyDown={(e)=>{
                  //   if (e.key==="Enter") {
                  //     const agval = e.target.value;
                  //     if (agval === "") return;
                  //     Childrenfunc(agval)
                  //     e.target.value=""
                  //   }
                  // }}
                  // onInvalid={(e) => e.target.setCustomValidity("Please enter your child's age")}
                  value={chilage}
                  onChange={(e)=>{
                    setchilage(e.target.value)
                    // if ((new Date().getFullYear()-AllUserObj.Dob.split("-")[0])<e.target.value) {
                    //   setagerror("ChildAgeError")
                    // }
                  }}
                />
                {/* {agerror=="ChildAgeError"&&
                  <h1>dl;kf</h1>
                } */}
                <span>
                  <span style={{ fontWeight: "bold" }}>Gender</span> <br />
                  <input
                    type="radio"
                    name="agee"
                    id="agg"
                    checked={chilgen === "Male"}
                    onChange={(e)=>{
                      setchilgen("Male")
                    }}
                  />
                  <label
                  htmlFor="agg"
                    style={{ fontSize: "19px",marginRight:"10px" }}
                  >
                    Male
                  </label>
                  <input
                    type="radio"
                    name="agee"
                    id="ag"
                    required
                    checked={chilgen === "Female"}
                    onChange={(e)=>{
                      setchilgen("Female")
                    }}
                  />
                  <label
                  htmlFor="ag"
                    style={{ fontSize: "19px" }}
                  >
                    Female
                  </label>
                </span>
                <button style={{height:"35px", width:"50px",marginTop:"20px",backgroundColor:"#18ab2eff",color:"white"}}>
                  Add
                </button>
              </div>
              
                <div style={{width:"100%",marginTop:"-15px"}}>
                  {agerror=="ChildAgeError"&&
                  <p style={{ color: "red", marginBottom:"-6px" }}>Invalied age</p>
                }
                </div>
            </div>

          </form>
          

          
          <div style={{marginTop:"5px", padding:"5px",width:"100%"}}>
            <div style={children.length > 0 ? { display: "flex", backgroundColor: "#e7e7e7ff" } : { display: "none" }}>
              <h2 style={{width:"49%",overflow:"auto",paddingLeft:"20px",color:"peru"}}>Name</h2><h2 style={{width:"15%",overflow:"auto",color:"peru"}}>Age</h2><h2 style={{width:"25%",overflow:"auto",color:"peru"}}>Gender</h2>
            </div>
            
              {
                children.map((val,id)=>{
                  return(
                    <div key={val.id} style={{marginTop:"5px"}}>
                      <div style={{display:"flex",backgroundColor:"#e7e7e7ff"}}>
                        <pre>{id+1}.</pre>
                        <input style={{width:"45%",display:"none"}} type="text" placeholder="hh"/>
                        <h2 style={{width:"45%",overflow:"auto"}}>{val.name}</h2>
                        <h2 style={{width:"15%",overflow:"auto"}}>{val.age}</h2>
                        <h2 style={{width:"25%",overflow:"auto"}}>{val.gender}</h2>
                        {/* <span><MdOutlineEdit /></span> */}
                        <button onClick={() => delchildfunc(val.id)} style={{border:"none"}}>❌</button>


                      </div>
                    </div>
                  )
                })
              }
            </div>

              


        </div> 








        {/* <div ref={containerRef} className="childadd">
          {children.map((child, index) => (
            <div key={child.id}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "5px",
                  flexDirection: "column",
                  backgroundColor: "#eaeaeaff",
                  padding: "10px",
                  marginTop: "7px",
                }}
              > 
                <div
                  style={{
                    width: "100%",
                    paddingLeft: "94%",
                    marginTop: "-8px",
                  }}
                >
                  <button onClick={() => delchildfunc(child.id)}>❌</button>
                </div>

                <input
                  style={{ width: "100%", height: "40px" }}
                  type="text"
                  placeholder="Children's name"
                  value={child.name}
                  onChange={(e)=> updateChildren(child.id,"name", e.target.value)}
                />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <input
                    style={{ width: "120px", height: "40px" }}
                    type="number"
                    placeholder="Age"
                    value={child.age}
                    onChange={(e) => updateChildren(child.id, "age", e.target.value)}
                  />
                  <span>
                    <span style={{ fontWeight: "bold" }}>Gender</span> <br />
                    <input
                      id={`male${child.id}`}
                      type="radio"
                      name={`gender${child.id}`}
                      checked={child.gender === "male"}
                      onChange={() => updateChildren(child.id, "gender", "male")}
                    />
                    <label
                      htmlFor={`male${child.id}`}
                      style={{ fontSize: "19px",marginRight:"10px" }}
                    >
                      Male
                    </label>
                    <input
                      id={`female${child.id}`}
                      type="radio"
                      name={`gender${child.id}`}
                      checked={child.gender === "female"}     
                      onChange={() => updateChildren(child.id, "gender", "female")}
                    />
                    <label
                      htmlFor={`female${child.id}`}
                      style={{ fontSize: "19px" }}
                    >
                      Female
                    </label>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div> */}






      







      </div>
    </div>
  );
}
