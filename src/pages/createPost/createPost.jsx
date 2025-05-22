import React, { useState, useRef } from 'react';
import { Camera, Plus, X } from 'lucide-react';
import { User, MoreHorizontal, ThumbsUp, ThumbsDown, MessageCircleMore, Share, ArrowRight, Pencil, Trash, ChevronLeft } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import clsx from 'clsx'
import { toast, Toaster } from 'sonner'


const CreatePost = ({ title, content, tags, category, image }) => {
    const PostImgRef = useRef(null);
    const [PostImg, setPostImg] = useState(image || null);
    const navigate = useNavigate();
    const [allTags, setAllTags] = useState(tags || [])
    const [loading, setLoading] = useState(false);

    const handleFileUpload = () => {
        PostImgRef.current?.click();
    };

    const [imageFile, setImageFile] = useState(image || null)
    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
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
        title: title || '',
        content: content || '',
        tag: '',
        category: category || ''
    });
    const [err, setErr] = useState({
        title: '',
        content: '',
        tag: '',
        category: ''
    })


    const handleChange = (e) => {

        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        })

    }

const handlePostSubmit = async () => {
    if(!formData.title || !formData.content || !formData.category) {
        toast.error('Please fill all the fields')
        return
    }

    let formdata = new FormData();
    formdata.append("title", formData.title);
    formdata.append("content", formData.content);
    formdata.append("category", formData.category);
    formdata.append("tags", allTags);
    imageFile && formdata.append("image", imageFile, "file")
    
    let requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    };

    try{
        // const response = await fetch()


        //clear fields if successfull
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
    }catch(err) {
        console.log(err)
    }
}

const handleEditSubmit = async () => {
    if(!formData.title || !formData.content || !formData.category) {
        toast.error('Please fill all the fields')
        return
    }

    let formdata = new FormData();
    formdata.append("title", formData.title);
    formdata.append("content", formData.content);
    formdata.append("category", formData.category);
    formdata.append("tags", allTags);
    imageFile && formdata.append("image", imageFile, "file")
    
    let requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    };

    try{
        // const response = await fetch()

        //clear fields if successfull
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
    }catch(err) {
        console.log(err)
    }
}

    // <div className='bg-[#272b34] w-12 h-12 rounded-full flex justify-center items-center cursor-pointer transition hover:bg-[#1c1f26]'>{<img src={Postpic} className='object-fit w-full h-auto' /> && <User size={18} />}</div>
    // <div className=" text-[#bbbbcc] font-[poppins-medium] flex flex-col -gap-1.5">
    //     <p className="text-white text-[13px]">{username || 'anonymous'}</p>
    // </div>

    return (
        <div className="min-h-screen flex flex-col m-auto p-2 py-4 pb-20 w-full max-w-2xl gap-4">
            <Toaster position='top-center'/>
            <div className='flex w-full items-center justify-between'>
                <div className='flex gap-2 items-center '>
                    <ChevronLeft onClick={() => navigate(-1)} className='size-10 -ml-2 rounded-full transition p-2 hover:bg-[#272b34] active:bg-[#272b34]' />
                    <h1 className='font-[poppins-bold] text-xl'>Create Post</h1>
                </div>
                <Button className='bg-gradient-to-r from-[#6c5ce7] to-[#958aec] font-[poppins-medium]'>Post</Button>
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
                            if(e.target.value.length >= 40) {
                                e.target.value = e.target.value.slice(0, 40)
                                toast.error('Title should not be more than 40 characters')
                            }
                            setErr({
                                ...err,
                                title: `${e.target.value.length}/40`
                            })
                        }
                    }
                />
            </h1>{err.title && <p className='text-white text-xs'>{err.title}</p>}
            <div className='flex flex-col gap-4'>
                <div className='flex gap-4 flex-wrap items-center'>
                    <div>
                        {allTags && <div className='flex gap-2 items-center flex-wrap'>
                            {allTags.map((tag, i) => (
                                <p className='text-[12px] font-[poppins-medium] border-2 border-[#272b34] text-[#717889] px-1.5 py-1 rounded-lg cursor-pointer select-none cursor-pointer flex items-center gap-2' key={i}>
                                    #{tag} <X onClick={() => {
                                        setAllTags(allTags.filter((_, index) => index !== i))
                                    }} className='size-6 text-red-500 p-1 rounded-full hover:bg-[#6c5ce760] active:bg-[#6c5ce760]'/></p>
                            ))}
                        </div>}
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
                                    if(e.target.value.length >= 20) {
                                        e.target.value = e.target.value.slice(0, 20)
                                        toast.error('tag should not be more than 20 characters')
                                    }
                                }
                            }
                        />
                        <Button className={clsx(formData.tag ? 'bg-[#6c5ce7]' : 'bg-[#272b34]')} onClick={() => {
                            if(!formData.tag) {
                                toast.error('Please enter a tag')
                                return
                            }
                            if(allTags.includes(formData.tag)) {
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
                { formData.category && <p className='text-[10.5px] font-[poppins-medium] border-2 border-[#272b34] text-[#717889] px-1.5 py-1 rounded-lg cursor-pointer select-none cursor-pointer'>{formData.category}</p>}
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
                                    if(e.target.value.length >= 20) {
                                        e.target.value = e.target.value.slice(0, 20)
                                        toast.error('Category should nt be more than 20 characters')
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
                            if(e.target.value.length >= 1500) {
                                e.target.value = e.target.value.slice(0, 1500)
                                toast.error('Content should not be more than 1500 characters')
                            }
                            setErr({
                                ...err,
                                content: `${e.target.value.length}/1500`
                            })
                        }
                    }
                />
            </p>
            
            {err.content && <p className='text-white text-xs'>{err.content}</p>}
            <div className="bg-[#1c1f26] shadow-lg rounded-lg w-full min-h-32 h-auto">
                <input
                    type="file"
                    ref={PostImgRef}
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                />
                <div className="w-full h-auto min-h-30 rounded-md flex justify-center items-center overflow-hidden" onClick={handleFileUpload}>
                    {PostImg ? <img src={PostImg} /> : <div className='flex flex-col gap-1 items-center'><Camera className="size-10" /> <p>Add Image</p></div>}
                </div>
            </div>

            <button
                    type='submit'
                    className='p-3 text-white rounded-md w-full mt-2 bg-gradient-to-r from-[#6c5ce7] to-[#958aec] font-[poppins-medium]'
                onClick={() => {
                    title ? handleEditSubmit() : handlePostSubmit()
                    
                }}>
                    Post
            </button>

        </div>
    );
};

export default CreatePost;