import React, { useEffect, useMemo, useState } from 'react';
import Pagination from '../Pagination/Pagination';
import SideBar from '../SideBar/SideBar';
let PageSize = 10;
const Author = () => {
    const [authors, setAuthors] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const currentData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return authors.slice(firstPageIndex, lastPageIndex);
    }, [authors, currentPage]);
   

    const handleFavoriteAdd = (data) => {
        data.favorite= true;
        const updateAuthor = authors.map(author => {
            if(author._id === data._id){
                author.favorite= true;
            }
            return author;
        })
        setAuthors(updateAuthor);
        localStorage.setItem('favorite', JSON.stringify(updateAuthor));

    }
    const handleFavoriteRemove = (data) => {
        data.favorite= false;
        const updateAuthor = authors.map(author => {
            if(author._id === data._id){
                author.favorite= false;
            }
            return author;
        })
        setAuthors(updateAuthor);
        localStorage.setItem('favorite', JSON.stringify(updateAuthor));
    }

   

    function MyComponent() {
        useEffect(() => {
            setAuthors(JSON.parse(localStorage.getItem('favorite')) || []);
        }, [])
    }

    function MyComponent2() {
        useEffect(() => {
            fetch('https://api.quotable.io/authors?limit=120')
                .then(res => res.json())
                .then(data => {
                    const authorData = data?.results;
                    const updateData = authorData.map((author) => {
                        author.favorite = false;
                        return author
                    })
                    setAuthors(updateData)
                })
        }, [])
    }
    if (localStorage.getItem("favorite")) {
        MyComponent();
    }
    else {
        MyComponent2()
    }
    return (
        <div>
            <div className="d-flex">
                <div style={{ background: 'white', minHeight: '130vh' }} className="col-2">
                    <SideBar></SideBar>
                </div>
                <div style={{ background: '#FFDBDB' }} className="col-10 container">
                    <div className="text-center"><h1 className="text-primary mt-4">Author List</h1></div>
                    {currentData.length <= 0 && <div className="text-center ">
                    <img style={{ width: "65vh" }} className="rounded mx-auto d-block " src="https://webstockreview.net/images/gear-clipart-setting-5.gif" alt="" />
                    </div>}
                    <div className="d-flex justify-content-center  mt-5">
                    
                        <div className="row container-fluid">                     
                            {currentData?.map(author => <div key={author._id} className="col-6 p-3">
                                <div style={{ border: '4px solid pink',minHeight:'500px',height:'400px' }} >
                                    <div className="p-5">
                                    <div className="row">
                                        <div className="col-6">
                                            <h3 className="text-danger">{author.name}</h3>
                                            <h2>{author.favorite}</h2>
                                            <small>{author.description}</small>
                                        </div>
                                        <div className="col-6 d-flex justify-content-end">
                                            <div>
                                            {
                                                !author.favorite ? <button onClick={() => handleFavoriteAdd(author)} className="btn btn-success font-weight-bold">Add Favorite</button> : <button onClick={() => handleFavoriteRemove(author)} className="btn btn-danger font-weight-bold">Remove Favorite</button>
                                            }                                            
                                            </div>
                                        </div>
                                    </div>
                                    <p className="mt-5">{author.bio}</p>
                                    </div>
                                </div>
                            </div>)}
                        </div>

                    </div>
                    <div className="d-flex justify-content-center">
                        <Pagination
                            className="pagination-bar"
                            currentPage={currentPage}
                            totalCount={authors.length}
                            pageSize={PageSize}
                            onPageChange={page => setCurrentPage(page)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Author;