import { useContext, useEffect, useState } from "react";
import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

export default function Feed({ username }) {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = username
        ? await axios.get("/api/posts/profile/" + username)
        : await axios.get("/api/posts/timeline/" + user._id);
        console.log("response from post fetch ::" , res.data)
      setPosts(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    };
    fetchPosts();
  }, [username, user._id]);



  return (
    <div className="feed">
      <div className="feedWrapper">
        {console.log(posts)}
        {(!username || username === user.username) && <Share />}
        {console.log("Length",posts.length)}
        {console.log(typeof(posts))}
        {posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
}
