// components/AuthForm.jsx
import { useNavigate, NavLink } from 'react-router-dom';
import { useContext, useState, useRef } from 'react'
import Loader from '../../assets/loader/loader';
import { toast } from 'sonner';
import { GlobalContext } from '../../components/functional/context';
import { Camera, Plus } from 'lucide-react';


const Signup = ({ func }) => {

    const { state } = useContext(GlobalContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        bio: ''
    });
    const [err, setErr] = useState({
        username: '',
        email: '',
        password: '',
        bio: ''
    })
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {

        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        })

    }

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


    const handleSignup = async () => {

        var formdata = new FormData();
        formdata.append("email", formData.email);
        formdata.append("password", formData.password);
        formdata.append("fullname", "anonymous");
        formdata.append("username", formData.username);
        formdata.append("bio", formData.bio);
        {mainPicFile && formdata.append("profilePic", mainPicFile, "file")}

        var requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        };

        try {

            if (!formData.username || !formData.email || !formData.password || !formData.bio) {
                toast.error('please fill out all fields')
                return
            }
            if (err.username || err.email || err.password || err.bio) {
                toast.error(err.username || err.email || err.password || err.bio)
                return
            }
            setLoading(true);
            

            const response = await fetch("https://sayso-seven.vercel.app/api/register", requestOptions)
            
            
                const result = await response.json()
                setLoading(false);
                toast.success('Signed successfully');
                localStorage.setItem('user', JSON.stringify(result))
                console.log(result);
                navigate('/')

                setFormData({
                    username: '',
                    email: '',
                    password: '',
                    bio: ''
                });

                setProfileImg(null)
                setMainPicFile(null)
           

        }
        catch (err) {
            console.log(err)
            setLoading(false);
            toast.error('error');
        }
    }

    return (
        <div>
            <div className="flex flex-col gap-2 p-2 text-center">
                <h1 className="text-2xl font-[poppins-bold] text-white">Create an account</h1>
                <p className="text-sm text-[#717889]">Join the community and start sharing your thoughts.</p>
            </div>
            <div className="min-[350px]:w-82 w-72 flex justify-center relative">
                <div className="w-26 h-26 rounded-full bg-[#1c1f26] flex justify-center items-center overflow-hidden">
                    {profileImg ? <img src={profileImg} /> : <Camera className="size-10" />}
                </div>
                <div onClick={handleFileUpload} className="cursor-pointer w-10 h-10 rounded-full bg-[#272b34] flex justify-center items-center absolute bottom-0 right-24 min-[350px]:right-24">
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
            <div className="flex flex-col gap-2 mt-2 p-2 pb-0">
                <input
                    type="text"
                    placeholder="Enter Username"
                    className="bg-[#272b34] border-2 border-[#272b34] rounded-lg p-3 text-sm text-white focus:border-white transition outline-0"
                    required
                    name='username'
                    value={formData.username}
                    onChange={handleChange}
                    onInput={(e) => {
                        e.target.value = e.target.value.replace(/[^a-zA-Z0-9]/g, '');

                        if (e.target.value.length < 3) {
                            setErr({ ...err, username: 'Username must be at least 3 characters' });
                        } else if (e.target.value.length > 15) {
                            setErr({ ...err, username: 'Username must be at most 15 characters' });
                        }
                        else {
                            setErr({ ...err, username: '' });
                        }
                    }
                    }
                />{err.username && <p className='text-red-500 text-sm'>{err.username}</p>}
                <input
                    type="email"
                    placeholder="Email"
                    className="bg-[#272b34] border-2 border-[#272b34] rounded-lg p-3 text-sm text-white  focus:border-white transition outline-0"
                    name='email'
                    value={formData.email}
                    onChange={handleChange}
                    onInput={(e) => {
                        e.target.value = e.target.value.replace(/[^a-zA-Z0-9@._+%-]/g, '')

                        if (!/\S+@\S+\.\S+/.test(e.target.value)) {
                            setErr({ ...err, email: 'Please enter a valid email address' });
                        } else if (e.target.value.length < 5) {
                            setErr({ ...err, email: 'Email must be at least 5 characters' });
                        } else if (e.target.value.length > 30) {
                            setErr({ ...err, email: 'Email must be at most 30 characters' });
                        }
                        else {
                            setErr({ ...err, email: '' });
                        }
                    }}
                />{err.email && <p className='text-red-500 text-sm'>{err.email}</p>}
                <textarea
                    type="text"
                    placeholder="Say something about yourself"
                    className="bg-[#272b34] border-2 border-[#272b34] rounded-lg p-3 text-sm text-white  focus:border-white transition outline-0 h-25"
                    name='bio'
                    value={formData.bio}
                    onChange={handleChange}
                    onInput={(e) => {
                        if (e.target.value.length < 5) {
                            setErr({ ...err, bio: 'bio must be at least 5 characters' });
                        } else if (e.target.value.length > 150) {
                            setErr({ ...err, bio: 'bio must be at most 150 characters' });
                        }
                        else {
                            setErr({ ...err, bio: '' });
                        }
                    }
                    }
                />{err.bio && <p className='text-red-500 text-sm'>{err.bio}</p>}
                <input
                    type="password"
                    placeholder="Password"
                    className="bg-[#272b34] border-2 border-[#272b34] rounded-lg p-3 text-sm text-white  focus:border-white transition outline-0"
                    name='password'
                    value={formData.password}
                    onChange={handleChange}
                    onInput={(e) => {
                        e.target.value = e.target.value.replace(/[^a-zA-Z0-9!@#$%&-_=+]/g, '')
                        if (e.target.value.length < 6) {
                            setErr({ ...err, password: 'Password must be at least 6 characters' });
                        } else if (e.target.value.length > 20) {
                            setErr({ ...err, password: 'Password must be at most 20 characters' });
                        }
                        else {
                            setErr({ ...err, password: '' });
                        }
                    }
                    }
                />{err.password && <p className='text-red-500 text-sm'>{err.password}</p>}
            </div>
            <div className='p-2 pt-0 flex flex-col gap-2 '>
                <button className="cursor-pointer py-4 bg-gradient-to-r  from-[#6c5ce7] to-[#958aec] w-full rounded-lg p-3 mt-4 text-sm font-[poppins-bold] flex justify-center items-center gap-2" onClick={handleSignup} disabled={loading}>
                    {loading ?
                        <> <Loader size='16px' /> <p>Signing up...</p></>
                        :
                        <p> Signup </p>
                    }
                </button>
                <p className="text-sm text-[#717889] text-center flex items-center justify-center mt-4">Already have an account? &nbsp;<div className='text-blue-500 cursor-pointer underline' onClick={func}> Login</div></p>
            </div></div>
    )
};



const Login = ({ func }) => {

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {

        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value.trim()
        })

    }

    const handleLogin = async () => {

        try {

            if (!formData.email || !formData.password) {
                toast.error('please fill out all fields')
                return
            }
            setLoading(true);
            // const response = await fetch(`${state.url}`, {
            //     method: 'POST',
            //     headers: { 'content-Type': 'application/json' },
            //     body: JSON.stringify({ username: formData.username, email: formData.email, password: formData.password, bio: formData.bio})
            // });
            // const result = await response.json()
            // if (result.ok) {
            //     setLoading(false);
            //     toast.success(result.message);
            //     localStorage.setItem('authToken', result.token)
            //     console.log(result.token);
            //     navigate('/')
            // } else {
            //     setLoading(false);
            //     toast.error(`${result.message} try again!`);
            // }

        }
        catch (err) {
            console.log(err)
            toast.error(err);
        }
    }

    return (
        <div>
            <div className="flex flex-col gap-2 p-2 text-center">
                <h1 className="text-2xl font-[poppins-semibold] text-white">Welcome Back!</h1>
            </div>
            <div className="flex flex-col gap-2 mt-2 p-2 pb-0 min-[350px]:w-82 w-72 flex justify-center">
                <input
                    type="email"
                    placeholder="Email"
                    className="bg-[#272b34] border-2 border-[#272b34] rounded-lg p-3 text-sm text-white"
                    name='email'
                    value={formData.email}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="bg-[#272b34] border-2 border-[#272b34] rounded-lg p-3 text-sm text-white"
                    name='password'
                    value={formData.password}
                    onChange={handleChange}
                />
            </div>
            <div className='p-2 pt-0 flex flex-col gap-2'>
                <button className="py-4 bg-gradient-to-r from-[#6c5ce7] to-[#958aec] w-full rounded-lg p-3 mt-4 text-sm font-[poppins-bold] flex justify-center items-center gap-2" onClick={handleLogin} disabled={loading}>
                    {loading ?
                        <> <Loader size='16px' /> <p>Logging in...</p></>
                        :
                        <p> Login </p>
                    }
                </button>
                <p className="text-sm text-[#717889] text-center">Dont have an account?</p>
                <button className="py-4 border-2 w-full rounded-lg p-3 mt-4 text-sm font-[poppins-semibold]" onClick={func}>Sign up</button>
            </div>

        </div>
    )
};


export default function AuthForm() {
    const [login, setLogin] = useState(false);

    const toggle = () => {
        setLogin((prev) => !prev);
    }
    return (
        <div className="">
            {login ? <Login func={toggle} /> : <Signup func={toggle} />}
        </div>
    )
}
