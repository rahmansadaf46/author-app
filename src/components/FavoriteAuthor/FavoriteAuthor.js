import React, { useEffect, useState } from 'react';
import SideBar from '../SideBar/SideBar';

const FavoriteAuthor = () => {
    const [authors, setAuthors] = useState([])
    const [allAuthors, setAllAuthors] = useState([])
    if (localStorage.getItem("favorite")) {
        MyComponent()
    }
    function MyComponent() {
        useEffect(() => {
            const data = JSON.parse(localStorage.getItem('favorite'))
            const favoriteAuthor = data.filter(author => author.favorite === true)
            setAuthors(favoriteAuthor || []);
            setAllAuthors(data)
        }, [])
    }
    const handleFavoriteRemove = (data) => {
        data.favorite = false;
        const updateAuthor = allAuthors.map(author => {
            if (author._id === data._id) {
                author.favorite = false;
            }
            return author;
        })
        localStorage.setItem('favorite', JSON.stringify(updateAuthor));
        const favoriteAuthor = authors.filter(author => author._id !== data._id)
        setAuthors(favoriteAuthor || []);
    }
    return (
        <div>
            <div className="d-flex">
                <div style={{ background: 'white', minHeight: '120vh' }} className="col-2">
                    <SideBar></SideBar>
                </div>
                <div style={{ background: '#FFFFDB' }} className="col-10">
                    <div className="text-center"><h1 className="text-danger mt-4">Favorite Author</h1></div>
                    <div className="d-flex justify-content-center  mt-5">
                        <div className="row container-fluid">
                            {authors?.map(author => <div key={author._id} className="col-6 p-3">
                                <div style={{ border: '4px solid orange', height: '500px' }} >
                                    <div className="p-5">
                                        <div className="row">
                                            <div className="col-6">
                                                <h3 className="text-primary">{author.name}</h3>
                                                <h2>{author.favorite}</h2>
                                                <small>{author.description}</small>
                                            </div>
                                            <div className="col-6 d-flex justify-content-end">
                                                <div>
                                                    <button onClick={() => handleFavoriteRemove(author)} className="btn btn-danger font-weight-bold">Remove Favorite</button>
                                                </div>
                                            </div>
                                        </div>
                                        <p className="mt-5 text-danger">{author.bio}</p>
                                    </div>
                                </div>
                            </div>)}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default FavoriteAuthor;