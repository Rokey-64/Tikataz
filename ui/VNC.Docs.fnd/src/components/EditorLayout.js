import React, { useState, useEffect } from 'react'
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import { useLoaderData } from 'react-router-dom';
import { postArticlesAPI } from './Api'; 

const EditorLayout = (props) => {
    const [isEditorState, setIsEditorState] = useState(null);
    let formData = {
        idCatlg:'1',
        vers:'1',
        title:'',
        content:''
    }
    const [selectedValue, setSelectedValue] = useState(formData);

    const buttonClick = ()=>{
        try {
            const res = postArticlesAPI(selectedValue)
            console.log('Article posted successfully:', res);
        } catch (error) {
            console.error('Error posting article:', error);
            alert('Error posting article. Please try again.');
        }
    }
    const selectChanged = (event)=>{
        setSelectedValue({...selectedValue, idCatlg:event.target.value})
    }

    const verschanged = (event)=>{
        setSelectedValue({...selectedValue, vers:event.target.value})
    }

    const titlechanged = (event)=>{
        setSelectedValue({...selectedValue, title:event.target.value})
    }

    const onEditorStateChange = (isEditorState) => { 
        setIsEditorState(isEditorState);
        const rawContentState = convertToRaw(isEditorState.getCurrentContent())
        const htmlContent = draftToHtml(rawContentState)
        setSelectedValue({...selectedValue, content:htmlContent})
    }

    return (
        <div className='grid justify-items-center max-w-full'>
            <div className='h-auto flex'>
                <div className='py-4 flex-none w-96 px-3'>
                    <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <img src="../Tikataz.logo2.svg" className="h-8" alt="Flowbite Logo" />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Tikataz - docs</span>
                    </a>
                </div>
            </div>
            <div className='my-16'>
                <div className='my-16'>
                    <form className="mx-auto" >
                        <div >
                            <div className='py-3 flex flex-col'>
                                <div className='self-end'>
                                <button type="button" onClick={buttonClick} className=" text-white my-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Submit</button>
                                </div>
                            </div>
                            <div className='grid grid-cols-3'>
                                <div className="my-6 max-w-60 ">
                                    <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phân loại danh mục</label>
                                    <select id="countries" onChange={selectChanged} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        {                                        
                                            props.data.map((content) => {
                                                return content.id === 1 ?
                                                    <option selected value={content.id} key={content.id}>{content.name}</option>
                                                    :
                                                    <option value={content.id} key={content.id}>{content.name}</option>
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="my-6 w-60 ">
                                    <label htmlFor="number-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phiên bản</label>
                                    <input type="number" onChange={verschanged} id="number-input" aria-describedby="helper-text-explanation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="90210" required />
                                </div>
                                <div className="my-6 w-60 ">
                                    <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tiêu đề</label>
                                    <input type="text" onChange={titlechanged} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Title" required />
                                </div>
                            </div>

                        </div>
                        <div className='max-w-[50rem]'>
                            <Editor editorState={isEditorState} onEditorStateChange={onEditorStateChange} />
                        </div>

                    </form>
                </div>

            </div>
        </div>
    )
}


export default EditorLayout
