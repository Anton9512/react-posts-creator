import React, {useEffect, useState} from "react";
import {useFetching} from "../hooks/useFetching";
import PostService from "../API/PostService";
import {getPageCount} from "../utils/pages";
import {usePosts} from "../hooks/usePosts";
import MyButton from "../components/UI/button/MyButton";
import MyModal from "../components/UI/myModal/MyModal";
import PostForm from "../components/PostForm";
import PostFilter from "../components/PostFilter";
import PostList from "../components/PostList";
import Loader from "../components/UI/Loader/Loader";
import Pagination from "../components/UI/pagination/Pagination";


const Posts = () => {

    const [posts, setPosts] = useState([]);
    const [filter, setFilter] = useState({sort: '', query: '',});
    const [modal, setModal] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [limit, setLimit] = useState(10)
    const [page, setPage] = useState(1)
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);

    const [fetchPosts, isPostsLoading, postError] = useFetching(async (limit, page) => {
        const response = await PostService.getAll(limit, page);
        setPosts(response.data);
        const totalCount = response.headers['x-total-count'];
        setTotalPages(getPageCount(totalCount, limit))
    })

    useEffect(() => {
        fetchPosts(limit, page)
    }, [page])


    const createPost = (newPost) => {
        setPosts([...posts, newPost]);
        setModal(false)
    };
    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    };

    const changePage = (page) => {
        setPage(page);
        fetchPosts(limit, page)
    }

    return (
        <div className="App">
            <MyButton
                style={{margin: '15px 0 0 0'}}
                onClick={() => setModal(true)}
            >Создать пост</MyButton>
            <MyModal visible={modal} setVisible={setModal}>
                <PostForm create={createPost}/>
            </MyModal>
            <hr style={{margin: '15px 0'}}/>
            <PostFilter
                filter={filter}
                setFilter={setFilter}
            />
            {postError && <h1>Произошла ошибка ${postError}</h1>}
            {isPostsLoading
                ? <div style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}><Loader/></div>
                : <PostList remove={removePost} posts={sortedAndSearchedPosts} title={'Список постов'}/>
            }
            <Pagination
                page={page}
                changePage={changePage}
                totalPages={totalPages}
            />
        </div>
    );
}

export default Posts;
