import "./profile.css";
import Topbar from "../../components/topbar/Topbar";

import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { AuthContext } from "../../context/AuthContext";

export default function Profile() {

  const PF = "/images/"
  const [user, setUser] = useState({});
  const username = useParams().username;
  const [profile, setproFile] = useState(null);
  const [cover, setCover] = useState(null)
  const { user: currentUser } = useContext(AuthContext);
  console.log(currentUser)
  console.log(JSON.parse(localStorage.getItem("user")))

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/api/users?username=${username}`);
      setUser(res.data);
    };
    fetchUser();
  }, [username]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const profilePic = {
      userId: currentUser._id,

    };
    if (profile) {
      const data = new FormData();
      console.log("Data :: ");
      console.log(data);
      const profileName = Date.now() + profile.name;
      console.log("filename : ")
      console.log(profileName)
      data.append("name", profileName);
      data.append("file", profile);

      profilePic.profilePicture = profileName;

      try {
        await axios.post("/api/upload", data);
      } catch (err) { }
    }
    if (cover) {
      const data = new FormData();
      console.log("Data :: ");
      console.log(data);
      const coverName = Date.now() + cover.name;
      console.log("coverName : ")
      console.log(coverName)
      data.append("name", coverName);
      data.append("file", cover);

      profilePic.coverPicture = coverName;

      try {
        await axios.post("/api/upload", data);
      } catch (err) { }
    }
    try {
      await axios.put("/api/users/" + user._id, profilePic).then((res) => {
        var user = JSON.parse(localStorage.getItem("user"));
        console.log(Object.keys(user).length)
        for (var key in user) {
          if (key === "profilePicture") {
            user[key] = res.data.profilePicture
          }
          else if(key==="coverPicture"){
            user[key]=res.data.coverPicture
          }
        }
        const users = JSON.stringify(user);
        console.log("After Update on Profile Picture")
        console.log(users)
        localStorage.setItem("user", users);
        console.log("After Updatation")
        console.log(JSON.parse(localStorage.getItem("user")))
        console.log(res.data.profilePicture)
      })
      window.location.reload();
      // console.log(localStorage.getItem("user"))
    } catch (err) { }
  };


  return (
    <>
      <Topbar />
      <div className="profile">

        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">

              {cover !== null ?
                <img
                  className="profileCoverImg"
                  src={
                    URL.createObjectURL(cover)
                  }
                  alt=""
                />
                :
                <img
                  className="profileCoverImg"
                  src={
                    user.coverPicture
                      ? PF + user.coverPicture
                      : PF + "person/noCover.png"
                  }
                  alt=""
                />
              }
              {profile !== null ?

                <img
                  className="profileUserImg"
                  src={

                    URL.createObjectURL(profile)
                  }
                  alt=""
                /> :
                <img
                  className="profileUserImg"
                  src={
                    user.profilePicture
                      ? PF + user.profilePicture
                      : PF + "person/noAvatar.png"
                  }
                  alt=""
                />}
              <form className="shareBottom" onSubmit={submitHandler}>
                <label htmlFor="cover" className="shareOption">
                  {/* <PermMedia htmlColor="tomato" className="shareIcon" /> */}
                  <span className="shareOptionText cover"><img src={PF + "pencil.png"} /></span>
                  <input
                    style={{ display: "none" }}
                    type="file"
                    id="cover"
                    accept=".png,.jpeg,.jpg"
                    onChange={(e) => setCover(e.target.files[0])}

                  />
                  
                </label>
                <div className="shareOptions">
                  <label htmlFor="profile" className="shareOption">
                    {/* <PermMedia htmlColor="tomato" className="shareIcon" /> */}
                    <span className="shareOptionText text"><img className="edit" src={PF + "pencil.png"} /></span>
                    <input
                      style={{ display: "none" }}
                      type="file"
                      id="profile"
                      accept=".png,.jpeg,.jpg"
                      onChange={(e) => setproFile(e.target.files[0])}

                    />
                    {/* {console.log("hjguyfwejkf")}
                    {console.log(file.name)} */}
                  </label>
                </div>
                <div className="edit">
                  <button className="shareButton editbutton" type="submit">
                    Update
                  </button>
                </div>
              </form>
              <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}</h4>
              <span className="profileInfoDesc">{user.desc}</span>
            </div>
            </div>
            
          </div>
          <div className="profileRightBottom">
            <Feed username={username} />
            <Rightbar user={user} />
          </div>
        </div >
      </div >
    </>
  );
}