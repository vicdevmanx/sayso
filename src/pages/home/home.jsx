import { MoreHorizontal, Search, ThumbsUp, User, ThumbsDown, MessageCircleMore, Link, Filter, X, Pencil, Trash, Share } from "lucide-react";
import { Button } from "@/components/ui/button";
import sayso from '../../assets/sayso assets/sayso.svg'
import clsx from 'clsx'
import { useMediaQuery } from "@mui/material";
import ModalTrigger from "../components/authtrigger";
import AuthForm from "../components/authform";
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { useState, useRef } from 'react'
import { Toaster } from 'sonner'

const Post = ({ username, profilepic, readtime, date, title, tags, postImg, likes, comment }) => {
    const isMobile = useMediaQuery('(max-width: 460px)');
    const [liked, setLiked] = useState(false)
    const [dislike, setDisLiked] = useState(false)
    const [msgOpen, setMsgOpen] = useState(false)                                                       
    

    return (

        <div className={clsx('bg-[#1c1f26]', 'border-[1.5px]', 'border-[#272b34]', 'hover:border-[#444455]', 'cursor-pointer', 'transition', 'rounded-2xl', 'flex', 'flex-col', 'gap-2.5', 'pb-2.5', isMobile ? 'w-full' : 'w-78')} style={{}}>
            <div className='p-3 pb-0 flex justify-between'>
                <div className='flex gap-2 items-center'>
                    <div className='bg-[#0e1116] w-9 h-9 rounded-full flex justify-center items-center cursor-pointer transition hover:bg-[#1c1f26]'>{<img src={profilepic} className='object-fit w-full h-auto' /> && <User size={18} />}</div>
                    <div className=" text-[#bbbbcc] font-[poppins-medium] flex flex-col -gap-1.5">
                        <p className="text-white text-[13px]">{username}</p>
                        <p className='flex items-center gap-1.5 text-xs'>{date}<span className='bg-[#bbbbcc] w-1 h-1 rounded-full'></span> {readtime} read </p>
                    </div>
                </div>
                <div className='flex cursor-pointer items-center gap-1 active:bg-[#272b34] hover:bg-[#272b34] p-2 rounded-xl'>
                    <MoreHorizontal size={18} className="text-[#bbbbcc] cursor-pointer transition" />
                </div>
            </div>
            <div className='p-3 pb-0 pt-0 flex flex-col gap-2'>
                <h2 className="font-[poppins-semibold] text-lg leading-snug h-15 text-white">{title}</h2>
                <div className='flex items-center gap-2'>
                    {tags.map(tags =>
                        <p className='text-[10.5px] font-[poppins-medium] border-2 border-[#272b34] text-[#717889] px-1.5 py-1 rounded-lg cursor-pointer select-none cursor-pointer'>{tags}</p>
                    )
                    }
                    {/* // <p className='text-[10.5px] font-[poppins-medium] border-2 border-[#272b34] text-[#717889] px-1.5 py-1 rounded-lg cursor-pointer'>+ 1</p> */}

                </div>
            </div>
            <div className='p-2 pt-0 pb-0'>
                <div className={clsx('rounded-lg', 'w-full', isMobile ? 'h-46' : 'h-36', 'bg-[#272b34]')}>
                    <img src={postImg} className='object-fit w-full h-auto' />
                </div>
            </div>
            <div className='px-2 select-none'>
                <div className='w-full b-0 h-full flex items-center gap-4'>
                    <div className='bg-[#272b34] rounded-xl flex gap-1 items-center cursor-pointer'>

                        <span className='flex gap-2 p-2 py-1.5 items-start rounded-xl hover:bg-[#3B82F650] active:bg-[#3B82F650] transition' onClick={() => {setDisLiked(false); setLiked(!liked);  }}>
                            {liked && !dislike ?  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" className='size-5 cursor-pointer fill-blue-500 stroke-[#3B82F6]' onClick={() => setLiked(false)}><path d="M23 10a2 2 0 0 0-2-2h-6.32l.96-4.57c.02-.1.03-.21.03-.32c0-.41-.17-.79-.44-1.06L14.17 1L7.59 7.58C7.22 7.95 7 8.45 7 9v10a2 2 0 0 0 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73zM1 21h4V9H1z"></path></svg> 
                            : <ThumbsUp onClick={() => {
                                setDisLiked(false)
                                setLiked(true)
                            }} className='size-5 cursor-pointer stroke-[#bbbbcc] stroke-2 fill-transparent '/>
                            
                         }<p className='text-[#bbbbcc] font-[poppins-semibold] text-[15px]' style={{color: liked && !dislike ? '#3B82F6':'#bbbbcc'}}>{likes}</p>
                        </span>
                        <span className='p-2 py-1.5 rounded-xl hover:bg-[#EF444450] active:bg-[#EF444450] transition'>
                            {!dislike ? <ThumbsDown onClick={() => setDisLiked(true)} className='size-5 cursor-pointer stroke-[#bbbbcc] stroke-2 fill-transparent'/>
                            : <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" className='size-5 cursor-pointer fill-red-500 stroke-[#EF4444]' onClick={() => setDisLiked(false)}><path d="M19 15h4V3h-4m-4 0H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v2a2 2 0 0 0 2 2h6.31l-.95 4.57c-.02.1-.03.2-.03.31c0 .42.17.79.44 1.06L9.83 23l6.58-6.59c.37-.36.59-.86.59-1.41V5a2 2 0 0 0-2-2"></path></svg> 
                            }
                        </span>
                    </div>
                    <div className='flex items-center gap-1 cursor-pointer active:bg-[#272b34] hover:bg-[#272b34] p-2 py-1.5 rounded-xl' onClick={() => setMsgOpen(!msgOpen)}>
                        <MessageCircleMore className='size-5 cursor-pointer stroke-[#bbbbcc]' />
                        <p className='text-[#bbbbcc] font-[poppins-semibold] text-[15px]'>{comment}</p>
                     
                    </div>
                    <div className='flex cursor-pointer items-center gap-1 active:bg-[#272b34] hover:bg-[#272b34] p-2 py-1.5 rounded-xl'>
                        <Share className='size-5 cursor-pointer stroke-[#bbbbcc]' />
                    </div>

                </div>
            </div>
        </div>
    )
}

const Home = () => {

    const isMobile = useMediaQuery('(max-width: 460px)');
    const [AuthActive, setAuthActive] = useState(false);

    const [isFocused, setIsFocused] = useState(false)
    const inputRef = useRef(null);

    const handleInputRef = () => {
        setTimeout(() => {
            inputRef.current?.focus()
        }, 0);
        setIsFocused(true)
    }

    const data = [
        {
            username: "JohnDoe",
            profilePicture: "https://via.placeholder.com/150",
            readTime: "5 min",
            date: "2023-10-01",
            postTitle: "Understanding JavaScript Closures",
            tags: ["#javascript", "#programming", "#webdev"],
            postImage: 'https://app.daily.dev/posts/20-mern-stack-projects-that-will-guarantee-you-a-job-in-2025-m3rrf6vs1',
            likes: 12,
            comments: 4,
        },
        {
            username: "JaneSmith",
            profilePicture: "https://via.placeholder.com/150",
            readTime: "3 min",
            date: "2023-10-02",
            postTitle: "A Guide to Python Decorators",
            tags: ["#python", "#coding", "#tutorial"],
            postImage: "https://via.placeholder.com/600x200",
            likes: 8,
            comments: 2,
        },
        {
            username: "DevGuru",
            profilePicture: "https://via.placeholder.com/150",
            readTime: "7 min",
            date: "2023-10-03",
            postTitle: "React vs Vue: Which One to Choose?",
            tags: ["#react", "#vue", "#frontend"],
            postImage: "https://via.placeholder.com/600x200",
            likes: 20,
            comments: 10,
        },
        {
            username: "CodeMaster",
            profilePicture: "https://via.placeholder.com/150",
            readTime: "6 min",
            date: "2023-10-04",
            postTitle: "10 Tips for Writing Clean Code",
            tags: ["#coding", "#bestpractices", "#software"],
            postImage: "https://via.placeholder.com/600x200",
            likes: 15,
            comments: 5,
        },
        {
            username: "Techie",
            profilePicture: "https://via.placeholder.com/150",
            readTime: "4 min",
            date: "2023-10-05",
            postTitle: "Exploring the New Features in ES2023",
            tags: ["#javascript", "#es2023", "#webdev"],
            postImage: "https://via.placeholder.com/600x200",
            likes: 10,
            comments: 3,
        },
        {
            username: "CoderGirl",
            profilePicture: "https://via.placeholder.com/150",
            readTime: "5 min",
            date: "2023-10-06",
            postTitle: "How to Build a REST API with Node.js",
            tags: ["#nodejs", "#api", "#backend"],
            postImage: "https://via.placeholder.com/600x200",
            likes: 18,
            comments: 7,
        },
        {
            username: "FrontendFan",
            profilePicture: "https://via.placeholder.com/150",
            readTime: "6 min",
            date: "2023-10-07",
            postTitle: "CSS Grid vs Flexbox: When to Use Which?",
            tags: ["#css", "#frontend", "#webdesign"],
            postImage: "https://via.placeholder.com/600x200",
            likes: 14,
            comments: 6,
        },
        {
            username: "BackendBoss",
            profilePicture: "https://via.placeholder.com/150",
            readTime: "8 min",
            date: "2023-10-08",
            postTitle: "Understanding Database Indexing",
            tags: ["#database", "#sql", "#backend"],
            postImage: "https://via.placeholder.com/600x200",
            likes: 22,
            comments: 9,
        },
        {
            username: "AIEnthusiast",
            profilePicture: "https://via.placeholder.com/150",
            readTime: "7 min",
            date: "2023-10-09",
            postTitle: "Introduction to Machine Learning",
            tags: ["#ai", "#ml", "#datascience"],
            postImage: "https://via.placeholder.com/600x200",
            likes: 25,
            comments: 12,
        },
        {
            username: "WebWizard",
            profilePicture: "https://via.placeholder.com/150",
            readTime: "5 min",
            date: "2023-10-10",
            postTitle: "Top 5 JavaScript Frameworks in 2023",
            tags: ["#javascript", "#frameworks", "#webdev"],
            postImage: "https://via.placeholder.com/600x200",
            likes: 30,
            comments: 15,
        },
        {
            username: "DataDiva",
            profilePicture: "https://via.placeholder.com/150",
            readTime: "6 min",
            date: "2023-10-11",
            postTitle: "Data Visualization with D3.js",
            tags: ["#d3js", "#dataviz", "#javascript"],
            postImage: "https://via.placeholder.com/600x200",
            likes: 12,
            comments: 4,
        },
        {
            username: "CloudCoder",
            profilePicture: "https://via.placeholder.com/150",
            readTime: "7 min",
            date: "2023-10-12",
            postTitle: "Getting Started with AWS Lambda",
            tags: ["#aws", "#cloud", "#serverless"],
            postImage: "https://via.placeholder.com/600x200",
            likes: 18,
            comments: 6,
        },
        {
            username: "DevOpsPro",
            profilePicture: "https://via.placeholder.com/150",
            readTime: "8 min",
            date: "2023-10-13",
            postTitle: "CI/CD Pipelines Explained",
            tags: ["#devops", "#cicd", "#automation"],
            postImage: "https://via.placeholder.com/600x200",
            likes: 20,
            comments: 8,
        },
        {
            username: "MobileMaker",
            profilePicture: "https://via.placeholder.com/150",
            readTime: "5 min",
            date: "2023-10-14",
            postTitle: "Building Your First React Native App",
            tags: ["#reactnative", "#mobile", "#development"],
            postImage: "https://via.placeholder.com/600x200",
            likes: 16,
            comments: 5,
        },
        {
            username: "SecuritySage",
            profilePicture: "https://via.placeholder.com/150",
            readTime: "6 min",
            date: "2023-10-15",
            postTitle: "Best Practices for Web Security",
            tags: ["#security", "#webdev", "#bestpractices"],
            postImage: "https://via.placeholder.com/600x200",
            likes: 14,
            comments: 7,
        },
        {
            username: "GameDev",
            profilePicture: "https://via.placeholder.com/150",
            readTime: "7 min",
            date: "2023-10-16",
            postTitle: "Introduction to Unity Game Development",
            tags: ["#gamedev", "#unity", "#programming"],
            postImage: "https://via.placeholder.com/600x200",
            likes: 19,
            comments: 9,
        },
        {
            username: "TechExplorer",
            profilePicture: "https://via.placeholder.com/150",
            readTime: "5 min",
            date: "2023-10-17",
            postTitle: "Exploring the Internet of Things (IoT)",
            tags: ["#iot", "#technology", "#innovation"],
            postImage: "https://via.placeholder.com/600x200",
            likes: 10,
            comments: 3,
        },
        {
            username: "FullStackFan",
            profilePicture: "https://via.placeholder.com/150",
            readTime: "6 min",
            date: "2023-10-18",
            postTitle: "Understanding the MERN Stack",
            tags: ["#mern", "#fullstack", "#webdev"],
            postImage: "https://via.placeholder.com/600x200",
            likes: 22,
            comments: 11,
        },
        {
            username: "AIResearcher",
            profilePicture: "https://via.placeholder.com/150",
            readTime: "8 min",
            date: "2023-10-19",
            postTitle: "Deep Learning Basics",
            tags: ["#ai", "#deeplearning", "#datascience"],
            postImage: "https://via.placeholder.com/600x200",
            likes: 28,
            comments: 14,
        },
        {
            username: "TechBlogger",
            profilePicture: "https://via.placeholder.com/150",
            readTime: "4 min",
            date: "2023-10-20",
            postTitle: "How to Start a Tech Blog",
            tags: ["#blogging", "#tech", "#writing"],
            postImage: "https://via.placeholder.com/600x200",
            likes: 12,
            comments: 5,
        }
    ]


    return (
        <div>
            <div className='flex justify-between items-center p-3 py-2 border-b border-[#1c1f26] sticky top-0 bg-[#0e1116]'>
                <h1 className='font-[poppins-bold] text-xl select-none'><img src={sayso} alt='saysologo' className='w-24' /></h1>
                <div className='flex gap-2 items-center'>
                    {
                        isFocused && (
                            <input
                                ref={inputRef}
                                onBlur={() => setIsFocused(false)}
                                type='search'
                                placeholder='Search Posts...'
                                className='absolute text-xs bg-[#262a35] rounded-xl p-4 pl-4 outline-0 InputAni min-lg:InputAni2 right-2' />
                        )
                    }

                    {
                        !isFocused && (
                            <Button variant="ghost" className='cursor-pointer transition hover:bg-[#1c1f26] active:bg-[#1c1f26] rounded-xl h-11 w-11' onClick={handleInputRef}>
                                <Search size={34} />
                            </Button>
                        )
                    }

                    <div className='bg-[#1c1f26] w-11 h-11 rounded-xl flex justify-center items-center cursor-pointer transition hover:bg-[#1c1f26]' onClick={() => setAuthActive(true)}><User size={18} /></div>
                </div>
            </div>

            <div className='w-full h-[90vh] bg-gradient-to-r from-blue-500 to-pink-500 flex items-center flex-col gap-4 justify-center'>
                <p className='text-xl font-[poppins-bold] text-center leading-snug'>Blog Freely, Speak Boldly. <br /> Say More With Sayso</p>
                <Button className='bg-[#272b34]' onClick={() => setAuthActive(true)}>Get Started</Button>
            </div>


            <div className='flex justify-center'>

                <div className='flex flex-col p-2 gap-4 max-w-6xl'>
                    <div className='flex items-center justify-center gap-4 mt-6 mb-2'>
                        <Button className='bg-blue-500 font-[poppins-medium]'>All Posts</Button>
                        <Button className='bg-[#1c1f26] font-[poppins-medium]'>Filter <Filter /> </Button>
                    </div>
                    <div className={clsx('flex', 'flex-wrap', 'gap-6', 'justify-center', 'pb-18')}>
                        {data.map(element =>
                            <Post username={element.username} profilepic={element.profilePicture} readtime={element.readTime} date={element.date} title={element.postTitle} tags={element.tags} postImg={element.postImage} likes={element.likes} comment={element.comments} />
                        )
                        }
                    </div>

                </div>

            </div>

            <footer className="bg-[#0e1116] text-[#717889] py-6 pb-20">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="text-center md:text-left">
                            <h2 className="text-white font-[poppins-bold] text-lg">Sayso</h2>
                            <p className="text-sm mt-2">Blog Freely, Speak Boldly. Say More With Sayso.</p>
                        </div>
                        <div className="flex gap-4">
                            <a href="#" className="hover:text-white transition">Privacy Policy</a>
                            <a href="#" className="hover:text-white transition">Terms of Service</a>
                            <a href="#" className="hover:text-white transition">Contact Us</a>
                        </div>
                    </div>
                    <div className="mt-6 border-t border-[#272b34] pt-4 text-center">
                        <p className="text-sm">&copy; {new Date().getFullYear()} Sayso. All rights reserved.</p>
                    </div>
                </div>
            </footer>

            <SwipeableDrawer
                anchor="bottom"
                open={AuthActive}
                onClose={() => setAuthActive(false)}
                onOpen={() => setAuthActive(true)}
                transitionDuration={200}
                PaperProps={{
                    sx: {
                        backgroundColor: '#1a1b20',
                        borderTopLeftRadius: '2rem',
                        borderTopRightRadius: '2rem',
                    },
                }}
            >
                <div className="p-1.5 px-3 h-[90vh] max-wd-lg text-white bg-[#1a1b20] flex flex-col gap-4 items-center">
                    <div className='bg-[#444455] w-12 h-1.5 rounded-full'></div>
                    <X className='absolute top-4 right-4 cursor-pointer' onClick={() => setAuthActive(false)} />
                    {/* <div className='w-full flex gap-2 items-center'> */}
                    <AuthForm />
                </div>
            </SwipeableDrawer>
            
            <Toaster position="top-center" closeButton />
        </div>
    );
};

export default Home;