// eslint-disable-next-line

import "./post.css";
import { MoreVert } from "@material-ui/icons";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function Post({ post }) {
  const [like, setLike] = useState(post.likes.length);
  const [text,setCommenttext]=useState('');
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currentUser } = useContext(AuthContext);

  

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?userId=${post.userId}`);
      setUser(res.data);
    };
    fetchUser();
  }, [post.userId]);


  const likeHandler = () => {
    try {
      axios.put("/posts/" + post._id + "/like", { userId: currentUser._id });
    } catch (err) { }
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  const commentHandler = () => {
    try {
      axios.put("posts/" + post._id + "/comment", { username: currentUser.username ,image:currentUser.profilePicture, text:text});
      window.location.reload();
    } catch (err) {
      console.log(err)
     }

  };

/*   const getName= async (id)=>{
    console.log("before matching id",id);
    const res = await axios.get(`/users?userId=${id}`);
    console.log("after matching id",res.data._id)
    console.log("Name",res.data.username)
    return (res.data.username);
  }

  const  getImage= async (id)=>{
    const res = await axios.get(`/users?userId=${id}`);
    return res.data.profilePicture;
  } */

  return (
    <>
    {
    }
      <div class=" rounded overflow-hidden border w-full lg:w-6/12 md:w-6/12 bg-white mx-3 md:mx-0 lg:mx-0">
        <div class="w-full flex justify-between p-3">
          <div class="flex">
            <div class="rounded-full h-8 w-8 bg-gray-500 flex items-center justify-center overflow-hidden">
              <Link to={`/profile/${user.username}`}>
                <img
                  className="postProfileImg"
                  src={
                    user.profilePicture
                      ? PF + user.profilePicture
                      : PF + "person/noAvatar.png"
                  }
                  alt=""
                />
              </Link>
            </div>
            <span class="pt-1 ml-2 font-bold text-sm">{user.username}</span>
            <span class="pt-1 ml-2 font-bold text-sm">{format(post.createdAt)}</span>

          </div>
          <span class="px-2 hover:bg-gray-300 cursor-pointer rounded"><i class="fas fa-ellipsis-h pt-2 text-lg"></i></span>
        </div>
      
        {post.img !== undefined ? <img class="w-full bg-cover" src={PF + post.img} /> : ""}
        <div class="px-3 pb-2">
          <div class="pt-2">
            <img
              className="likeIcon"
              src={`${PF}like.png`}
              onClick={likeHandler}
              alt=""
            />
            <i class="far fa-heart cursor-pointer"></i>
            <span class="text-sm text-gray-400 font-medium">{like} likes</span>
          </div>
          <div class="pt-1">
            <div class="mb-2 text-sm">
              <span class="font-medium mr-2  font-normal">{user.username}</span> {post?.desc}
            </div>
          </div>
          <div class="text-sm mb-2 text-gray-400 cursor-pointer	">View all {post.comment} comments</div>
          <div class="mb-2">
            <div class="mb-2 text-sm">
              <input type="text" class="font-medium mr-2" onChange={(e) =>{setCommenttext(e.target.value)}} />
              <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" onClick={commentHandler}>
              Post
            </button>
            </div>
          
            <div class="mb-2 text-sm">
                {post.comments.map((comment) => (  
                          <div className="commentArea"> 
                          <Link to={`/profile/${comment.name}`}>
                          <div className="profileomment">
                            <img src={comment.image?PF+comment.image:PF + "person/noAvatar.png"} className="rounded-full h-8 w-8 bg-gray-500 flex items-center justify-center overflow-hidden" />   
                            <span>{comment.name}</span>  
                            </div>
                            </Link>
                            
                            <div className="comment">{comment.text}</div>
                          </div>
                      ))}
                    
                    
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
