
import React, { useState, useEffect } from 'react';
import Header from './Header';
import './ProjectPage.css'; // CSS 파일을 따로 작성하여 스타일 적용

function ProjectPage() {
  const [posts, setPosts] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [newPost, setNewPost] = useState({ title: '', image: null, content: '' });
  const [editIndex, setEditIndex] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    document.getElementById('create-post-button').scrollIntoView();
  }, []);

  const handleCreatePost = () => {
    const reader = new FileReader();
    reader.onload = () => {
      setPosts([...posts, { ...newPost, image: reader.result }]);
      setNewPost({ title: '', image: null, content: '' });
      setModalOpen(false);
    };
    if (newPost.image) {
      reader.readAsDataURL(newPost.image);
    } else {
      setPosts([...posts, newPost]);
      setNewPost({ title: '', image: null, content: '' });
      setModalOpen(false);
    }
  };

  const handleEditPost = index => {
    setEditIndex(index);
    setNewPost(posts[index]);
    setModalOpen(true);
  };

  const handleDeletePost = index => {
    setPosts(posts.filter((_, i) => i !== index));
  };

  const handleImageChange = e => {
    setNewPost({ ...newPost, image: e.target.files[0] });
  };

  const handlePostClick = index => {
    setSelectedPost(posts[index]);
  };

  const closePostModal = () => {
    setSelectedPost(null);
  };

  return (
    <div className="no-background">
      <Header />
      <div className="project-page">
        <button id="create-post-button" className="create-post-button" onClick={() => setModalOpen(true)}>게시물 생성</button>
        <div className="posts">
          {posts.map((post, index) => (
            <div className="post" key={index} onClick={() => handlePostClick(index)}>
              <h2>{post.title}</h2>
              {post.image && <img src={post.image} alt={post.title} />}
            </div>
          ))}
        </div>
      </div>
      {modalOpen && (
        <div className="modal">
          <h2>{editIndex !== null ? '게시물 수정' : '게시물 생성'}</h2>
          <input
            type="text"
            value={newPost.title}
            onChange={e => setNewPost({ ...newPost, title: e.target.value })}
            placeholder="제목"
          />
          <input type="file" onChange={handleImageChange} />
          <textarea
            value={newPost.content}
            onChange={e => setNewPost({ ...newPost, content: e.target.value })}
            placeholder="내용"
          />
          <button onClick={handleCreatePost}>
            {editIndex !== null ? '수정 완료' : '생성'}
          </button>
          <button onClick={() => setModalOpen(false)}>취소</button>
        </div>
      )}
      {selectedPost && (
        <div className="post-modal" onClick={closePostModal}>
          <div className="post-modal-content" onClick={e => e.stopPropagation()}>
            <h2>{selectedPost.title}</h2>
            {selectedPost.image && <img src={selectedPost.image} alt={selectedPost.title} />}
            <p>{selectedPost.content}</p>
            <button onClick={closePostModal}>닫기</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProjectPage;
