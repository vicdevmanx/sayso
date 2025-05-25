import { Pencil, User } from "lucide-react";
import { useState } from "react";
import { Post } from "../home/home";
import clsx from 'clsx';

const Profile = () => {
    const [file, setFile] = useState(null)
    const [posts, setPosts] = useState(["one", "two", "one", "two", "one", "two", "one", "two"])

    return (
        <div className="min-h-screen flex flex-col m-auto items-center max-w-3xl w-full p-2">
            <div className="flex flex-col items-center my-2">

                {file ? <div className="w-24 h-24 rounded-4xl mb-2 bg-[#272b34] relative">
                    <img
                        src={file}
                        alt="Profile Avatar"
                        className="w-full"
                    /> 
                    <Pencil className="bg-[#1c1f26] rounded-full size-9 p-2 absolute -bottom-2 -right-2" />
                    </div> 
                    : <div className="relative w-24 h-24 rounded-4xl mb-2 bg-[#272b34] flex justify-center items-center">
                        <User className="size-8" /> 
                        <Pencil className="bg-[#1c1f26] rounded-full size-9 p-2 absolute -bottom-2 -right-2" />
                        </div>
                }
                <h2 className="text-lg font-[poppins-medium] text-white">John Doe</h2>
                <p className="text-white text-center mt-2 text-sm font-[poppins]">
                    Lover of tech, coffee, and good vibes. 🌟
                </p>
            </div>

            <div className="mt-4 p-4  w-full flex flex-col items-center">
                <h3 className="text-xl font-[poppins-bold] mb-4">Recent Posts</h3>
                <div className={clsx('flex', 'flex-wrap', 'gap-6', 'justify-center', 'pb-18')}>
                    {posts.map(() =>
                        <Post />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;