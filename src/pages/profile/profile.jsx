import { Pencil, User } from "lucide-react";
import { useState, useEffect } from "react";
import { Post } from "../home/home";
import clsx from 'clsx';
import { Button } from "@/components/ui/button";
import { useContext } from "react";
import { GlobalContext } from "@/components/functional/context"; // ✅ Import context
import Loader from "@/assets/loader/loader";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const [file, setFile] = useState(null)
    const [currentUser, setCurrentUser] = useState(null);
    const { state } = useContext(GlobalContext); // ✅ Use context to get state
    const navigate = useNavigate();
    useEffect(() => {
        fetchUser(localStorage.getItem('userId'));
    }, []);

    const [posts, setPosts] = useState([]);
    const fetchUser = async (id) => {
        if (!id) return;

        const requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        try {
            const response = await fetch(state.url + `/users/${id}/profile`, requestOptions);
            const result = await response.json();
            setCurrentUser(result.user); // ✅ Properly update state
            setPosts(result.posts); // ✅ Set posts from the fetched user data
        } catch (err) {
            console.log(err);
        }
    };


    return (
        <div className="min-h-screen flex flex-col m-auto items-center max-w-3xl w-full p-2 px-0">
            <div className="flex flex-col items-center my-2">

                {currentUser?.profile_image_url ? <div className="w-24 h-24 rounded-full mb-2 bg-[#272b34] relative o">
                    <img
                        src={currentUser?.profile_image_url}
                        alt="Profile Avatar"
                        className="w-full rounded-full"
                    />
                    <Pencil className="bg-[#1c1f26] rounded-full size-9 p-2 absolute -bottom-2 -right-2" />
                </div>
                    : <div className="relative w-24 h-24 rounded-full mb-2 bg-[#272b34] flex justify-center items-center">
                        <User className="size-8" />
                        <Pencil className="bg-[#1c1f26] rounded-full size-9 p-2 absolute -bottom-2 -right-2" />
                    </div>
                }
                <h2 className="text-lg font-[poppins-medium] text-white">{currentUser?.username || <Loader size={16} />}</h2>
                <p className="text-white text-center mt-2 text-sm font-[poppins]">{currentUser?.bio || null}
                </p>
            </div>

            <div className="flex gap-2">
                <Button className='bg-gradient-to-r from-[#6c5ce7] to-[#958aec]'>Edit Profile</Button>
                <Button className='bg-red-400' onClick={() => {
                    localStorage.removeItem('authToken')
                    localStorage.removeItem('userId')
                    navigate('/')
                }}>Logout</Button>
            </div>

            <div className="mt-4 p-4  w-full flex flex-col items-center">
                <h3 className="text-xl font-[poppins-bold] mb-4">Recent Posts</h3>
                <div className={clsx('flex', 'flex-wrap', 'gap-6', 'justify-center', 'pb-18')}>
                    {posts ? posts.map(element =>
                        <Post username={currentUser?.username} profilepic={currentUser?.profile_image_url} readtime={element?.read_time} date={element.created_at.slice(0, 10)} title={element.title} tags={element.tags} postImg={element.image_url} likes={element.like_count} comment={element.comment_count} review={false} id={element.id} content={element.content} />
                    ) :
                        <Loader size={30} />
                    }
                </div>
            </div>
        </div>
    );
};

export default Profile;