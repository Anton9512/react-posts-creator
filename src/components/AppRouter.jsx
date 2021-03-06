import React from 'react';
import {Route, Routes} from "react-router-dom";
import About from "../pages/About";
import Posts from "../pages/Posts";
import NotFound from "./UI/NotFound/NotFound";
import PostIdPage from "../pages/PostIdPage";

const AppRouter = () => {
    return (
        <div>
            <Routes>
                <Route path={'/'} element={<Posts/>}/>
                <Route path={'/about'} element={<About/>}/>
                <Route exact path={'/posts'} element={<Posts/>}/>
                <Route exact path={'/posts/:id'} element={<PostIdPage/>}/>
                <Route path={'*'} element={<NotFound/>}/>
            </Routes>
        </div>
    );
};

export default AppRouter;
