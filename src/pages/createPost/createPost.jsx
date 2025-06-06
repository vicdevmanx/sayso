import React, { useState, useRef, useEffect } from 'react';
import { Camera, Edit, Plus, Trash2, WandSparkles, X } from 'lucide-react';
import { User, MoreHorizontal, ThumbsUp, ThumbsDown, MessageCircleMore, Share, ArrowRight, Pencil, Trash, ChevronLeft } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import clsx from 'clsx'
import { toast, Toaster } from 'sonner'
import Loader from '@/assets/loader/loader';
import useBlogGenerator from '../components/blogGenerator';
import { useAiUsage } from '../components/aiUsage';


const CreatePost = ({ title, content, tags, category, image, id, update = false }) => {
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth" // remove 'behavior' for instant scroll
        });
    }, []);


    const PostImgRef = useRef(null);
    const [PostImg, setPostImg] = useState(image || null);
    const navigate = useNavigate();
    const [allTags, setAllTags] = useState(update ? tags : [])
    const [myloading, setmyLoading] = useState(false);

    const handleFileUpload = () => {
        PostImgRef.current?.click();
    };

    const [imageFile, setImageFile] = useState(image || null)
    const MAX_IMAGE_SIZE_MB = 3; // Maximum image size in MB
    const handleFileChange = (e) => {
        const file = e.target.files?.[0];

        if (file) {
            const sizeInMB = file.size / (1024 * 1024);
            if (sizeInMB > MAX_IMAGE_SIZE_MB) {
                toast.error(`Image too large. Max size is ${MAX_IMAGE_SIZE_MB}MB`);
                return;
            }
        }


        setImageFile(file)

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result;
                setPostImg(base64String);
            };
            reader.readAsDataURL(file);
        }
    }


    const [formData, setFormData] = useState({
        title: update ? title : '',
        content: update ? content : '',
        tag: '',
        category: update ? category : ''
    });
    const [err, setErr] = useState({
        title: '',
        content: '',
        tag: '',
        category: ''
    })

    useEffect(() => {
        if (update && title && content && category) {
            setFormData({
                title,
                content,
                tag: '',
                category
            });
            setAllTags(tags || []);
            setPostImg(image || null);
            setImageFile(null); // or set to image if you want
        }
    }, [title, content, category, tags, image, update]);


    const handleChange = (e) => {

        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        })

    }

    const handlePostSubmit = async () => {
        if (!formData.title || !formData.content || !formData.category) {
            toast.error('Please fill all the fields')
            return
        }

        let formdata = new FormData();
        formdata.append("title", formData.title);
        formdata.append("content", formData.content);
        formdata.append("category", formData.category);
        formdata.append("tags", allTags);
        imageFile && formdata.append("image", imageFile, "file")

        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${localStorage.getItem('authToken')}`);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        try {
            setmyLoading(true)
            const response = await fetch(`https://sayso-seven.vercel.app/posts`, requestOptions);
            const result = await response.json();
            toast.success('Post created successfully')
            navigate('/')

            if (response.ok) setmyLoading(false)
            else setmyLoading(false)
            //clear fields if successfully
            setPostImg(null)
            setImageFile(null)
            setAllTags([])
            setFormData({
                title: '',
                content: '',
                tag: '',
                category: ''
            })
            /////////
        } catch (err) {
            setmyLoading(false)
            console.log(err)
        }
    }

    const handleEditSubmit = async () => {
        if (!formData.title || !formData.content || !formData.category) {
            toast.error('Please fill all the fields')
            return
        }

        let formdata = new FormData();
        formdata.append("title", formData.title);
        formdata.append("content", formData.content);
        formdata.append("category", formData.category);
        formdata.append("tags", allTags);
        imageFile && formdata.append("image", imageFile, "file")

        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${localStorage.getItem('authToken')}`);

        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        try {
            setmyLoading(true)
            const response = await fetch(`https://sayso-seven.vercel.app/posts/${id}`, requestOptions);
            const result = await response.json();
            toast.success('Post Edited successfully')
            navigate('/')

            if (response.ok) setmyLoading(false)
            else setmyLoading(false)
            //clear fields if successfully
            setPostImg(null)
            setImageFile(null)
            setAllTags([])
            setFormData({
                title: '',
                content: '',
                tag: '',
                category: ''
            })
            /////////
        } catch (err) {
            setmyLoading(false)
            console.log(err)
        }
    }

    // <div className='bg-[#272b34] w-12 h-12 rounded-full flex justify-center items-center cursor-pointer transition hover:bg-[#1c1f26]'>{<img src={Postpic} className='object-fit w-full h-auto' /> && <User size={18} />}</div>
    // <div className=" text-[#bbbbcc] font-[poppins-medium] flex flex-col -gap-1.5">
    //     <p className="text-white text-[13px]">{username || 'anonymous'}</p>
    // </div>

    const { loading, generatedContent, generateContent } = useBlogGenerator()
    const { usesLeft, disabled, consumeUse } = useAiUsage();

    return (
        <div className="min-h-screen flex flex-col m-auto px-2 pb-20 w-full max-w-4xl gap-4">
            <Toaster position='top-center' />
            <div className='flex w-full items-center justify-between'>
                <div className='flex gap-2 items-center '>
                    <ChevronLeft onClick={() => navigate(-1)} className='size-10 -ml-2 rounded-full transition p-2 hover:bg-[#272b34] active:bg-[#272b34]' />
                    <h1 className='font-[poppins-bold] text-xl'>{title ? 'Update Post' : 'Create Post'}</h1>
                </div>
                <Button className='bg-gradient-to-r from-[#6c5ce7] to-[#958aec] font-[poppins-medium]'
                    onClick={() => {
                        title ? handleEditSubmit() : handlePostSubmit()

                    }}>
                    {myloading ?
                        <> <Loader size='16px' /> <p>{title ? 'Updating Post...' : 'Creating Post...'}</p></>
                        :
                        <p>{title ? 'Update Post' : 'Create Post'} </p>
                    }

                </Button>
            </div>
            <h1 className="text-2xl font-[poppins-bold] text-white">
                <textarea
                    type='text'
                    placeholder='Title'
                    className='p-3 rounded-md text-white w-full outline-0 focus:border-white transition border border-[#272b34] resize-none'
                    name='title'
                    value={formData.title}
                    onChange={handleChange}
                    onInput={
                        (e) => {
                            if (e.target.value.length >= 80) {
                                e.target.value = e.target.value.slice(0, 80)
                                toast.error('Title should not be more than 80 characters')
                            }
                            setErr({
                                ...err,
                                title: `${e.target.value.length}/80`
                            })
                        }
                    }
                />
            </h1>{err.title && <p className='text-white text-xs'>{err.title}</p>}
            <div className='flex flex-col gap-4'>
                <div className='flex gap-4 flex-wrap items-center'>
                    <div>
                        {allTags && (
                            Array.isArray(allTags)
                                ? <div className='flex gap-2 items-center flex-wrap'>
                                    {allTags.map((tag, i) => (
                                        <p
                                            className='text-[12px] font-[poppins-medium] border-2 border-[#272b34] text-[#717889] px-1.5 py-1 rounded-lg cursor-pointer select-none flex items-center gap-2'
                                            key={i}
                                        >
                                            #{tag}
                                            <X
                                                onClick={() =>
                                                    setAllTags(allTags.filter((_, index) => index !== i))
                                                }
                                                className='size-6 text-red-500 p-1 rounded-full hover:bg-[#6c5ce760] active:bg-[#6c5ce760]'
                                            />
                                        </p>
                                    ))}
                                </div>
                                : <p className='text-[12px] font-[poppins-medium] border-2 border-[#272b34] text-[#717889] px-1.5 py-1 rounded-lg cursor-pointer select-none flex items-center gap-2'>#{allTags}</p>
                        )}
                    </div>

                    <div className='w-36 flex gap-1'>
                        <input
                            type='text'
                            placeholder='Enter a tag'
                            className='p-2 py-1.5 rounded-md text-white w-full outline-0 focus:border-white transition text-xs border border-[#272b34]'
                            name='tag'
                            value={formData.tag}
                            onChange={handleChange}
                            onInput={
                                (e) => {
                                    if (e.target.value.length >= 20) {
                                        e.target.value = e.target.value.slice(0, 20)
                                        toast.error('tag should not be more than 20 characters')
                                    }
                                }
                            }
                        />
                        <Button className={clsx(formData.tag ? 'bg-[#6c5ce7]' : 'bg-[#272b34]')} onClick={() => {
                            if (!formData.tag) {
                                toast.error('Please enter a tag')
                                return
                            }
                            if (allTags.includes(formData.tag)) {
                                toast.error('Tag already exists')
                                return
                            }
                            setAllTags([...allTags, formData.tag])
                            setFormData({
                                ...formData,
                                tag: ''
                            })
                        }}><Plus /></Button>
                    </div>
                </div>


                <div className='flex gap-4 flex-wrap items-center'>
                    {formData.category && <p className='text-[10.5px] font-[poppins-medium] border-2 border-[#272b34] text-[#717889] px-1.5 py-1 rounded-lg cursor-pointer select-none cursor-pointer'>{formData.category}</p>}
                    <div className='w-36 flex gap-1'>
                        <input
                            type='text'
                            placeholder='Enter a category'
                            className='p-2 py-2.5 py-1.5 rounded-md text-white w-full outline-0 focus:border-white transition text-xs border border-[#272b34]'
                            name='category'
                            value={formData.category}
                            onChange={handleChange}
                            onInput={
                                (e) => {
                                    if (e.target.value.length >= 20) {
                                        e.target.value = e.target.value.slice(0, 20)
                                        toast.error('Category should not be more than 20 characters')
                                    }
                                }
                            }
                        />
                    </div>
                </div>
            </div>
            <p className='text-sm'>
                <textarea
                    placeholder='Write Content...'
                    className='p-3 rounded-md text-white min-h-40 w-full outline-0 focus:border-white transition text-md border border-[#272b34]'
                    name='content'
                    value={formData.content}
                    onChange={handleChange}
                    onInput={
                        (e) => {
                            setErr({
                                ...err,
                                content: `${e.target.value.length} letters`
                            })
                        }
                    }
                />
            </p>

            {err.content && <p className='text-white text-xs'>{err.content}</p>}
            <button
                onClick={async () => {
                    if (disabled) {
                        toast.error('You have no AI uses left today');
                        return;
                    }

                    if (!formData.title?.trim()) {
                        toast.error('Please enter a title before generating content');
                        return;
                    }

                    if (generatedContent) {
                        toast.error('Content already generated');
                        return;
                    }

                    try {
                        consumeUse(); // All checks passed

                        const content = await generateContent(formData.title); // 👈 capture result

                        if (content) {
                            setFormData({
                                ...formData,
                                content,
                            });
                        } else {
                            toast.error('Failed to generate content');
                        }
                    } catch (err) {
                        toast.error('Something went wrong during generation');
                    }
                }}

                disabled={loading}
                className={`bg-gradient-to-r from-[#6c5ce7] to-[#958aec] text-white py-4 px-4 rounded-lg flex justify-center gap-2 items-center font-[poppins-medium] hover:opacity-90 transition-all  disabled:cursor-not-allowed ${loading ? 'animate-pulse animate-glow' : ''}`}
                title={`You have ${usesLeft} left today to Generate Blog Content`}
            >
                <WandSparkles /> {loading ? "AI Generating Content..." : `Let AI Generate Content. (${usesLeft} Left)`} {loading && <Loader size='18px' />}
            </button>
            <div className="bg-[#1c1f26] shadow-lg rounded-lg w-full min-h-32 h-auto">
                <input
                    type="file"
                    ref={PostImgRef}
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                />
                <div className="w-full h-auto min-h-36 rounded-md flex justify-center items-center overflow-hidden relative" onClick={!PostImg && handleFileUpload}>
                    {PostImg && <div className='absolute top-2 right-2 p-1 cursor-pointer flex gap-2 items-center'>
                        <span className='w-10 h-10 bg-[#272b34] rounded-full flex items-center justify-center' onClick={handleFileUpload}><Pencil className='size-6' /></span>
                        <span className='w-10 h-10 bg-[#272b34] rounded-full flex items-center justify-center' onClick={() => {
                            setPostImg(null);
                            setImageFile(null);
                        }}><Trash2 className='size-6 stroke-red-500' /></span>
                    </div>}
                    {PostImg ? <img src={PostImg} />
                        : <div className='flex flex-col gap-1 items-center'><Camera className="size-10" /> <p>Add Image</p><p>Max image size is {MAX_IMAGE_SIZE_MB}MB</p></div>}
                </div>
            </div>

            <button
                type='submit'
                disable={myloading}
                className='p-4 text-white rounded-lg w-full mt-2 bg-gradient-to-r from-[#6c5ce7] to-[#958aec] font-[poppins-medium] flex justify-center gap-2 items-center'
                onClick={() => {
                    title ? handleEditSubmit() : handlePostSubmit()

                }}>
                {myloading ?
                    <> <Loader size='16px' /> <p>{title ? 'Updating Post...' : 'Creating Post...'}</p></>
                    :
                    <p>{title ? 'Update Post' : 'Create Post'} </p>
                }
            </button>

        </div>
    );
};

export default CreatePost;