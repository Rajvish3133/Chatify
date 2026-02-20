import { Link,useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios"
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setAuthUser } from "../redux/userSlice";
import { BACKEND_URL } from "../main.jsx";

const Signup = () => {
  
  const dispatch = useDispatch();
    const [user, setUser] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmpassword: "",
    gender: "",
  });
  const [photoFile, setPhotoFile] = useState(null);
  const navigate = useNavigate();

    const handleCheckbox = (gender) => {
    setUser({ ...user, gender });
  }
  const onSubmitHandler = async (e)=>{
    e.preventDefault();
    
    try {
       const formData = new FormData();
       formData.append("fullName", user.fullName);
       formData.append("username", user.username);
       formData.append("password", user.password);
       formData.append("confirmpassword", user.confirmpassword);
       formData.append("gender", user.gender);
       if (photoFile) {
         formData.append("profilePhoto", photoFile);
       }

       const res = await axios.post(`${BACKEND_URL}/api/v1/user/register`, formData ,{
        headers:{
          "Content-Type" : "multipart/form-data"
        },
        withCredentials: true
       })
       
       if(res.data.success){
        dispatch(setAuthUser(res.data.user));  
         toast.success(res.data.message);
         navigate("/");
       }
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed")
      console.log(error);
    }
        setUser({
      fullName: "",
      username: "",
      password: "",
      confirmpassword: "",
      gender: "",
    });
    setPhotoFile(null);
  }

  return (

    
    <div className="min-w-96 max-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100">
        <h1 className="text-3xl font-bold text-center ">Signup</h1>
        <form onSubmit={onSubmitHandler}>
          <div>
            <label className="label p-2">
              <span className="text-base label-text text-black">Full Name</span>
            </label>
            <input
              value = {user.fullName}
              onChange={(e)=>setUser({...user, fullName: e.target.value})}
              className="w-full input input-bordered h-10 placeholder-white"
              type="text"
              placeholder="Full Name"
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text text-black">Username</span>
            </label>
            <input
             value = {user.username}
              onChange={(e)=>setUser({...user, username: e.target.value})}
              className="w-full input input-bordered h-10 placeholder-white"
              type="text"
              placeholder="Username"
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text text-black">Password</span>
            </label>
            <input
               value = {user.password}
              onChange={(e)=>setUser({...user, password: e.target.value})}
              className="w-full input input-bordered h-10 placeholder-white"
              type="password"
              placeholder="password"
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text text-black">
                Confirm Password
              </span>
            </label>
            <input
             value = {user.confirmpassword}
              onChange={(e)=>setUser({...user, confirmpassword: e.target.value})}
              className="w-full input input-bordered h-10 placeholder-white"
              type="password"
              placeholder="Confirm password"
            />
          </div>

          <div className="flex flex-col items-center mb-4">
            <div
              className="relative w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center cursor-pointer hover:opacity-90"
              onClick={() => document.getElementById('photo-input').click()}
            >
              {photoFile ? (
                <img
                  src={URL.createObjectURL(photoFile)}
                  alt="preview"
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <span className="text-xl text-gray-600">+</span>
              )}
              <div className="absolute bottom-0 right-0 bg-white rounded-full p-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>
            <input
              id="photo-input"
              type="file"
              accept="image/*"
              onChange={(e) => setPhotoFile(e.target.files[0])}
              className="hidden"
            />
            <p className="text-sm text-white mt-2">Upload profile photo (optional)</p>
          </div>
          <div className="flex items-center my-4">
            <div className="flex items-center">
              <p>Male</p>
              <input 
              checked={user.gender === "male"}
              onChange={() => handleCheckbox("male")}
              type="checkbox" 
              defaultChecked 
              className="checkbox mx-2" />
            </div>
            <div className="flex items-center">
              <p>Female</p>
              <input 
              checked={user.gender === "female"}
              onChange={() => handleCheckbox("female")}
              type="checkbox"
              defaultChecked 
              className="checkbox mx-2" />
            </div>
          </div>
          <p className="text-center my-2">Already have a account ? <Link to="/login">login</Link></p>
           <div>
            <button type='submit' className='btn btn-block btn-sm mt-2 border border-slate-700'>Singup</button>
           </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
