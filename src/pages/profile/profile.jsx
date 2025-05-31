import { Edit, LogOut, Pencil, Plus, SearchSlash, User } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Post } from "../home/home";
import clsx from 'clsx';
import { Button } from "@/components/ui/button";
import { useContext } from "react";
import { GlobalContext } from "@/components/functional/context"; // ✅ Import context
import Loader from "@/assets/loader/loader";
import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { PostSkeleton } from "../components/postskeleton";
import { toast, Toaster } from "sonner";
import defaultProfile from "@/assets/default.webp"; // Import default profile image

const Profile = () => {
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth" // remove 'behavior' for instant scroll
        });
    }, []);
    const [currentUser, setCurrentUser] = useState(null);
    const { state } = useContext(GlobalContext); // ✅ Use context to get state
    const navigate = useNavigate();
    useEffect(() => {
        fetchUser(localStorage.getItem('userId'));
    }, []);

    const [posts, setPosts] = useState(null);
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
            setPosts(result.posts);
        } catch (err) {
            console.log(err);
        }
    };
    const [form, setForm] = useState({
        username: '',
        bio: ''
    })

    const handleChange = (e) => {

        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        })

    }
    const [editMode, setEditMode] = useState(false);
    const profileImgRef = useRef(null);
    const [profileImg, setProfileImg] = useState(null);
    const [mainPicFile, setMainPicFile] = useState(null);

    const handleFileUpload = () => {
        profileImgRef.current?.click();
    };


    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        setMainPicFile(file)

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result;
                setProfileImg(base64String);
            };
            reader.readAsDataURL(file);
        }
    }

    const [updating, setUpdating] = useState(false);
    const handleUpdateProfile = async () => {
        if (!form.username || !form.bio) {
            toast.error('Please fill in all fields')
            return;
        }
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${localStorage.getItem('authToken')}`);

        var formdata = new FormData();
        formdata.append("username", form.username);
        // formdata.append("email", "new@example.com");
        formdata.append("bio", form.bio);
        { mainPicFile && formdata.append("image", mainPicFile, "file") };

        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        try {
            setUpdating(true)
            const response = await fetch(state.url + `/users/me`, requestOptions);
            const result = await response.json();

            window.location.reload();
            toast.success('Profile updated successfully!');
            setEditMode(false);
            setUpdating(false)
            // setCurrentUser(result.user);
            // setPosts(result.posts);
            setProfileImg(null); // Reset profile image after update
            setMainPicFile(null); // Reset main picture file after update
            setForm({
                username: null,
                bio: null
            });

        }
        catch (error) {
            console.log(error);
            toast.error('Failed to update profile. Please try again later.');
             setUpdating(false)
            setEditMode(false); // Exit edit mode on error
        }
    }

    return (
        <div className="min-h-screen flex flex-col m-auto items-center max-w-4xl w-full p-2 px-0">
            <Toaster position="top-center" closeButton={false} />
            {editMode ?
                <div className="flex flex-col items-center my-2 gap-1 mb-4">

                    {currentUser?.profile_image_url || defaultProfile || profileImg ?
                        <div className='relative'>
                            <div className="w-24 h-24 rounded-full mb-2 bg-[#272b34] relative overflow-hidden flex items-center justify-center">
                                <img
                                    src={profileImg || currentUser?.profile_image_url || defaultProfile}
                                    alt="Profile Avatar"
                                    className=" object-cover h-full"
                                />

                            </div>
                            <div onClick={handleFileUpload} className="cursor-pointer w-10 h-10 rounded-full bg-[#272b34] flex justify-center items-center absolute bottom-0 mb-1 -right-1">
                                <Plus className="size-6" />
                            </div>

                            <input
                                type="file"
                                ref={profileImgRef}
                                accept="image/*"
                                className="hidden"
                                onChange={handleFileChange}
                            />
                        </div>
                        : <div className="relative w-24 h-24 rounded-full mb-2 bg-[#272b34] flex justify-center items-center">
                            <Loader size={24} />
                        </div>
                    }
                    <input className="text-md font-[poppins-medium] text-white border p-3 rounded-lg py-1 border-[#2c2f36]" value={form.username} name='username' onChange={handleChange} placeholder="Enter username" />
                    <input className="text-white mt-2 text-sm font-[poppins] border p-3 rounded-lg border-[#2c2f36] w-82" value={form.bio} name='bio' onChange={handleChange} placeholder="Enter bio" />
                </div>




                :




                <div className="flex flex-col items-center my-2">

                    {currentUser?.profile_image_url || defaultProfile ? <div className="w-24 h-24 rounded-full mb-2 bg-[#272b34] relative overflow-hidden flex items-center justify-center">
                        <img
                            src={currentUser?.profile_image_url || defaultProfile}
                            alt="Profile Avatar"
                            className="object-cover h-full"
                        />
                    </div>
                        : <div className="relative w-24 h-24 rounded-full mb-2 bg-[#272b34] flex justify-center items-center">
                            <Loader size={24} />
                        </div>
                    }
                    <h2 className="text-lg font-[poppins-medium] text-white">{currentUser?.username || <Skeleton width={100} height={15} baseColor="#2c2f36" highlightColor="#3a3e48" />}</h2>
                    <p className="text-white text-center mt-1 text-md font-[poppins] px-2">{currentUser?.bio || <Skeleton width={200} height={15} baseColor="#2c2f36" highlightColor="#3a3e48" />}
                    </p>
                </div>}

            <div className="flex gap-2 justify-center items-center">
                <Button className='bg-gradient-to-r from-[#6c5ce7] to-[#958aec] font-[poppins-medium] flex items-center justify-center gap-1' onClick={() => {
                    if (editMode) {
                        // If in edit mode, save changes
                        handleUpdateProfile();

                    } else {
                        // If not in edit mode, toggle to edit mode
                        setForm({
                            username: currentUser?.username || '',
                            bio: currentUser?.bio || ''
                        });
                        setEditMode(!editMode)
                    }
                }
                }>{updating ? <Loader size={16} /> : <Edit className="w-6"/>}{editMode ? 'Save Profile' : 'Edit Profile'}</Button>
                <Button className='bg-red-400 flex justify-center items-center gap-1 font-[poppins-medium]' onClick={() => {
                    localStorage.removeItem('authToken')
                    localStorage.removeItem('userId')
                    toast('Logging out...')
                    localStorage.removeItem("aiUsesDate");
                    localStorage.removeItem("aiUsesLeft")
                    navigate('/')
                    window.location.reload();
                }}>Logout <LogOut className='w-5'/></Button>
            </div>

            <div className="mt-4 p-4  w-full flex flex-col items-center">
                <h3 className="text-xl font-[poppins-bold] mb-4">Recent Posts</h3>
                <div className={clsx('flex', 'flex-wrap', 'gap-6', 'justify-center', 'pb-18')}>
                    {posts ? posts.length <= 0 ?
                        <div className='flex flex-col items-center justify-center gap-4 bg-[#272b34] p-6 rounded-lg w-[18rem]'>
                            <SearchSlash className='size-8 text-[#6c5ce7]' />
                            <h2 className='text-lg font-[poppins-medium] text-white'>No Posts Found</h2>
                            <Button className='bg-gradient-to-r from-[#6c5ce7] to-[#958aec]' onClick={() => navigate('/createpost')}>Create Your First Post</Button>
                        </div> : posts.map((element, i) =>
                            <Post key={i} username={currentUser?.username} profilepic={currentUser?.profile_image_url} readtime={element?.read_time} date={element.created_at.slice(0, 10)} title={element.title} tags={typeof element.tags === 'string' && element.tags.includes(',') ? element.tags.split(',') : element.tags} postImg={element.image_url} likes={element.like_count} comment={element.comment_count} review={false} id={element.id} content={element.content} myprofile={true} />
                        ) :
                        Array.from({ length: 6 }).map((_, i) =>
                            <PostSkeleton key={i} />
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default Profile;