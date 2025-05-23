import { MoreHorizontal, Search, ThumbsUp, User, ThumbsDown, MessageCircleMore, Link, Filter, X, Pencil, Trash, Share, Link2, Share2, Send, ArrowBigUp, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import sayso from '../../assets/sayso assets/sayso.svg'
import clsx from 'clsx'
import { useMediaQuery } from "@mui/material";
import ModalTrigger from "../components/authtrigger";
import AuthForm from "../components/authform";
import Drawer from '@mui/material/Drawer';
import { useState, useRef, useEffect } from 'react'
import { Toaster } from 'sonner'
import imageOne from '../../assets/logo2.jpg'
import './home.css'
import InfoDisplay from "../components/trigger";
import { useNavigate } from 'react-router-dom'
import heroImg from '../../assets/hero.png'
import Loader from "@/assets/loader/loader";

function FullPageInfo({ username, profilepic, readtime, date, title, tags, postImg, likes, comment, id, content }) {
    const isMobile = useMediaQuery('(max-width: 700px)');
    const navigate = useNavigate()

    const fetchComments = async () => {


        const requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };

        try{
            const response = await fetch(`https://sayso-seven.vercel.app/api/${id}/comments`, requestOptions)
            const result = await response.json();

            console.log(result)
        }
        catch(err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchComments()
    },[])
    return (
        <div className={clsx('flex', isMobile ? 'p-0' : 'p-4', 'gap-2', 'text-white')}>
            {isMobile ? <></> :
                <Post username={username} profilepic={profilepic} readtime='20 mins' date={date} title={title} tags={tags} postImg={postImg} likes={likes} comment={comment} review={true} id={1} content={content} />
            }

            <div className='flex flex-col gap-2'>
                <p className='font-[poppins-bold] text-lg' style={{ textAlign: isMobile ? 'center' : 'left' }}>Comments</p>
                {isMobile ?
                    <div className=' flex items-center gap-1'> <input
                        className='bg-[#272b34] rounded-xl w-full py-3 px-4 outline-0 transition text-sm '
                        placeholder='Comment'
                    /> <ArrowRight className='bg-[#272b34] p-3 rounded-xl size-11 w-14' /> </div>
                    : <></>
                }
                <div className={clsx('rounded-xl', isMobile ? 'w-full' : 'w-92', 'overflow-scroll', 'h-128', 'flex', 'flex-col', 'gap-2', 'handleScroll', 'pb-12')}>


                    <div className='flex flex-col gap-2 font-[poppins] text-[13px]'>
                        <div className='border-2 border-[#272b34] rounded-lg p-2 flex gap-2 items-start'>
                            <span className='w-8 h-8 min-w-8 rounded-full bg-[#272b34]'></span>
                            <p className='leading-snug'>
                                <span className='font-[poppins-medium] w-full text-sm'>username</span><br />
                                <span>Lorem ipsum dolor sit amet consectetur repellat autem!</span> <br />
                                <span className='flex items-center text-[#ffffff90] gap-2 cursor-pointer'>
                                    <Pencil className='size-7 active:bg-[#272b34] hover:bg-[#272b34] p-1.5 rounded-full' />
                                    <Trash className='size-7 active:bg-[#272b34] hover:bg-[#272b34] p-1.5 rounded-full' /></span>
                            </p>

                        </div>
                    </div>


                </div>

            </div>

        </div>
    );

}

export function More(id) {
    const navigate = useNavigate();
    return (
        <div className='flex flex-col items-center gap-4 font-[poppins-medium] p-6'>
            <p className='text-white font-[poppins-bold]'>What do you Wanna do?</p>
            <div className='flex gap-2 text-md text-white'>
                <Button className='flex gap-1 items-center bg-[#272b34]' onClick={() => navigate(`/editPost/${id}`)}><Pencil className='size-4' /> <p>Edit Post</p></Button>
                <Button className='flex gap-1 items-center bg-[#272b34]'><Trash className='text-red-500 size-4' /> <p>Delete Post</p></Button>
            </div></div>
    );

}

const Post = ({ username, profilepic, readtime, date, title, tags, postImg, likes, comment, review, id, content }) => {
    const isMobile = useMediaQuery('(max-width: 460px)');
    const [liked, setLiked] = useState(false)
    const [dislike, setDisLiked] = useState(false)
    const [msgOpen, setMsgOpen] = useState(false)
    const navigate = useNavigate();




    return (

        <div onMouseMove={(e) => {
            const mouseX = e.clientX
            const mouseY = e.clientY

        }} className={clsx('bg-[#1c1f26]', 'border-[1.5px]', 'border-[#272b34]', 'hover:border-[#444455]', 'hover:bg-[#1f2429]', 'cursor-pointer', 'transition', 'rounded-2xl', 'flex', 'flex-col', 'gap-2.5', 'pb-2.5', 'parent', isMobile ? 'w-full' : 'w-78', review ? 'w-92' : '')} style={{}}>
            <div className='p-3 pb-0 flex justify-between'>
                <div className='flex gap-2 items-center'>
                    <div className='bg-[#0e1116] w-9 h-9 rounded-full flex justify-center items-center cursor-pointer transition hover:bg-[#1c1f26] overflow-hidden'>{<img src={profilepic} loading="lazy" className='object-fit w-full h-auto' /> || <User size={18} />}</div>
                    <div className=" text-[#bbbbcc] font-[poppins-medium] flex flex-col -gap-1.5">
                        <p className="text-white text-[13px]">{username}</p>
                        <p className='flex items-center gap-1.5 text-xs'>{date}<span className='bg-[#bbbbcc] w-1 h-1 rounded-full'></span> {readtime} read </p>
                    </div>
                </div>
                <div className='flex cursor-pointer items-center gap-1 active:bg-[#272b34] hover:bg-[#272b34] p-2 rounded-xl'>
                    <InfoDisplay
                        info={More}
                        infoProps = {{ id: id }}
                        trigger={<MoreHorizontal size={18} className="text-[#bbbbcc] cursor-pointer transition" />}
                    />
                </div>
            </div>
            <div className='p-3 pb-0 pt-0 flex flex-col gap-2'>
                <h2 className="font-[poppins-bold] text-lg leading-snug h-13 text-white" onClick={() => navigate(`/post/${id}`)}>{title}</h2>
                {review ? <h2 className="font-[poppins-medium] text-sm leading-snug h-15 text-white">{content || "couldn't load"}</h2> : ''}
                <div className='flex items-center gap-2 w-12'>
                    {tags && tags.map(tag =>
                        <p className='text-[10.5px] font-[poppins-medium] border-2 border-[#272b34] text-[#717889] px-1.5 py-1 rounded-lg cursor-pointer select-none cursor-pointer'>{tag}</p>
                    )
                    }
                    {/* // <p className='text-[10.5px] font-[poppins-medium] border-2 border-[#272b34] text-[#717889] px-1.5 py-1 rounded-lg cursor-pointer'>+ 1</p> */}

                </div>
            </div>
            <div className='p-2 pt-0 pb-0'>
                <div className={clsx('rounded-lg', 'w-full', isMobile ? 'h-46' : 'h-36', review ? 'h-40' : '', 'bg-[#272b34]', 'overflow-hidden')} onClick={() => navigate(`/post/${id}`)}>
                    <img loading="lazy" src={postImg || imageOne} className='object-fit w-full h-auto' />
                </div>
            </div>
            <div className='px-2 select-none'>
                <div className='w-full b-0 h-full flex relative items-center gap-4'>
                    <div className='bg-[#272b34] rounded-xl flex gap-1 items-center cursor-pointer'>

                        <span className='flex gap-2 p-2 py-1.5 items-start rounded-xl hover:bg-[#3B82F650] active:bg-[#3B82F650] transition' onClick={() => { setDisLiked(false); setLiked(!liked); }}>
                            {liked && !dislike ? <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" className='size-5 cursor-pointer fill-blue-500 stroke-[#3B82F6]' onClick={() => setLiked(false)}><path d="M23 10a2 2 0 0 0-2-2h-6.32l.96-4.57c.02-.1.03-.21.03-.32c0-.41-.17-.79-.44-1.06L14.17 1L7.59 7.58C7.22 7.95 7 8.45 7 9v10a2 2 0 0 0 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73zM1 21h4V9H1z"></path></svg>
                                : <ThumbsUp onClick={() => {
                                    setDisLiked(false)
                                    setLiked(true)
                                }} className='size-5 cursor-pointer stroke-[#bbbbcc] stroke-2 fill-transparent ' />

                            }<p className='text-[#bbbbcc] font-[poppins-medium] text-[15px]' style={{ color: liked && !dislike ? '#3B82F6' : '#bbbbcc' }}>{likes}</p>
                        </span>
                        <span className='p-2 py-1.5 rounded-xl hover:bg-[#EF444450] active:bg-[#EF444450] transition'>
                            {!dislike ? <ThumbsDown onClick={() => setDisLiked(true)} className='size-5 cursor-pointer stroke-[#bbbbcc] stroke-2 fill-transparent' />
                                : <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" className='size-5 cursor-pointer fill-red-500 stroke-[#EF4444]' onClick={() => setDisLiked(false)}><path d="M19 15h4V3h-4m-4 0H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v2a2 2 0 0 0 2 2h6.31l-.95 4.57c-.02.1-.03.2-.03.31c0 .42.17.79.44 1.06L9.83 23l6.58-6.59c.37-.36.59-.86.59-1.41V5a2 2 0 0 0-2-2"></path></svg>
                            }
                        </span>
                    </div>
                    {review ? <div className='flex items-center gap-1 cursor-pointer active:bg-[#272b34] hover:bg-[#272b34] p-2 py-1.5 rounded-xl' onClick={() => setMsgOpen(!msgOpen)}>
                        <MessageCircleMore className='size-5 cursor-pointer stroke-[#bbbbcc]' />   <p className='text-[#bbbbcc] font-[poppins-medium] text-[15px]'>{comment}</p>
                    </div> :
                        <InfoDisplay
                            info={FullPageInfo}
                            infoProps = {{ username, profilepic, readtime, date, title, tags, postImg, likes, comment, id, content }}
                            trigger={<div className='flex items-center gap-1 cursor-pointer active:bg-[#272b34] hover:bg-[#272b34] p-2 py-1.5 rounded-xl' onClick={() => setMsgOpen(!msgOpen)}>
                                <MessageCircleMore className='size-5 cursor-pointer stroke-[#bbbbcc]' />   <p className='text-[#bbbbcc] font-[poppins-medium] text-[15px]'>{comment}</p>
                            </div>}
                        />
                    }
                    <div className='flex cursor-pointer items-center gap-1 active:bg-[#272b34] hover:bg-[#272b34] p-2 py-1.5 rounded-xl'>
                        <Share className='size-5 cursor-pointer stroke-[#bbbbcc]' />
                    </div>
                    <p className='bg-white rounded-lg p-1.5 py-1 absolute right-0 text-black text-[13px] items-center gap-1 font-[poppins-medium] readMore' onClick={() => navigate(`/post/${id}`)}> Read
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                        </svg>
                    </p>
                </div>
                {review ?
                    <div className='mt-2 flex items-center gap-1'> <input
                        className='bg-[#272b34] rounded-xl w-full py-3 px-4 outline-0 transition text-sm '
                        placeholder='Comment'
                    /><ArrowRight className='bg-[#272b34] p-3 rounded-xl size-11 w-14' /></div> : ''
                }
            </div>
        </div>
    )
}

const Home = () => {

    const isMobile = useMediaQuery('(max-width: 460px)');
    const [AuthActive, setAuthActive] = useState(false);

    const [isFocused, setIsFocused] = useState(false)
    const inputRef = useRef(null);
    const navigate = useNavigate();

    const handleInputRef = () => {
        setTimeout(() => {
            inputRef.current?.focus()
        }, 0);
        setIsFocused(true)
    }



    const startData = [
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

    const [data, setData] = useState(null);

    const [filterOpen, setFilterOpen] = useState(false);
    const filter = () => {
        setFilterOpen(!filterOpen)
    }

    const fetchPosts = async () => {

        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        try {
            const response = await fetch("https://sayso-seven.vercel.app/api/posts", requestOptions);

            const result =await response.json();
            console.log(result)
            setData(result)

        } catch(err) {
            console.log(err)

        }
    }

    useEffect(() => {
        fetchPosts()
    }, [])

    const currentUser = JSON.parse(localStorage.getItem('user'));

    currentUser && console.log(currentUser)

    return (
        <div>
            <div className='flex justify-between items-center p-3 py-2 border-b border-[#1c1f26] sticky top-0 bg-[#0e1116] z-1000'>
                <h1 className='font-[poppins-bold] text-xl select-none'><img src={sayso} alt='saysologo' className='w-24' /></h1>
                <div className='flex gap-2 items-center'>
                    {
                        isFocused && (
                            <input
                                ref={inputRef}
                                onBlur={() => setIsFocused(false)}
                                type='search'
                                placeholder='Search Posts...'
                                className='absolute text-xs bg-[#262a35] rounded-xl p-4 pl-4 outline-0 InputAni min-lg:InputAni2 right-2 max-w-xl' />
                        )
                    }

                    {
                        !isFocused && (
                            <Button variant="ghost" className='cursor-pointer transition hover:bg-[#1c1f26] active:bg-[#1c1f26] rounded-xl h-11 w-11' onClick={handleInputRef}>
                                <Search size={34} />
                            </Button>
                        )
                    }
                    {currentUser ? <div className='w-9 h-9 rounded-full cursor-pointer overflow-hidden' onClick={() => navigate('/profile')}><img className='aspect-auto w-10 object-fit' src={currentUser.image_url || heroImg} /></div>
                        : <div className='bg-[#1c1f26] w-11 h-11 rounded-xl flex justify-center items-center cursor-pointer transition hover:bg-[#1c1f26]' onClick={() => setAuthActive(true)}><User size={18} /></div>
                    }</div>
            </div>

            <div className='w-full h-[100vh] bg-cover bg-center flex items-center flex-col gap-4 justify-center relative' loading="lazy" style={{ backgroundImage: `url(${heroImg})` }}>
                <div className='absolute bg-[#000000aa] insert-0 w-full h-full'></div>
                <p className='text-2xl font-[poppins-bold] text-center leading-snug z-100'><br /> Blog Freely, Speak Boldly. <br /> Say More With Sayso</p>
                {currentUser ?
                    <div className='flex gap-2 items-center'>
                        <Button className='bg-gradient-to-r from-[#6c5ce7] to-[#958aec] px-10 z-100' onClick={() => navigate('/createpost')}>Create Post</Button>
                    </div>
                    : <Button className='bg-gradient-to-r from-[#6c5ce7] to-[#958aec] px-10 z-100' onClick={() => setAuthActive(true)}>Get Started</Button>}
            </div>


            <div className='flex justify-center'>

                <div className='flex flex-col p-2 gap-4 max-w-6xl'>
                    <div className='flex items-center justify-center gap-4 mt-6 mb-2'>
                        <Button className='bg-blue-500 font-[poppins-medium]'>All Posts</Button>
                        <Button className='bg-[#1c1f26] font-[poppins-medium]' onClick={() => filter()}>Filter <Filter /> </Button>
                        <div className='flex gap-2 items-center overflow-hidden w-0 border-b-l' style={{ width: filterOpen ? '130px' : '0px', transition: '.3s' }}>
                            <span className='px-2 py-1 bg-[#272b34] rounded-full text-[12px]'>Category</span>
                            <span className='px-2 py-1 bg-[#272b34] rounded-full text-[12px]'>Tags</span>
                            <span className='px-2 py-1 bg-[#272b34] rounded-full text-[12px]'>Keyword</span>
                        </div>
                    </div>
                    <div className={clsx('flex', 'flex-wrap', 'gap-6', 'justify-center', 'pb-18')}>
                        {data ? 
                        data.map(element =>
                            <Post username={element.users.username} profilepic={element?.users?.image_url} readtime='20 mins' date={element.created_at.slice(0, 10)} title={element.title} tags={element.tags} postImg={element.image_url} likes={element.like_count} comment={element.comment_count} review={false} id={element.id} content={element.content}/>
                        ) :
                         <Loader size={30}/>
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

            <Drawer
                anchor="bottom"
                open={AuthActive && !currentUser}
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
                    <X className='absolute right-4 top-4 cursor-pointer' onClick={() => setAuthActive(false)} />
                    {/* <div className='w-full flex gap-2 items-center'> */}
                    <AuthForm />
                </div>
            </Drawer>

            <Toaster position="top-center" closeButton />
        </div>
    );
};

export default Home;