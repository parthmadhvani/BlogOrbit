import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';

const BlogPage = () => {
    const [blog, setBlog] = useState({
        author: {},
        content: "",
        createdAt: "",
        id: "",
        likes: "",
        title: "",
        updatedAt: "",
        views: ""
    });
    const [comments, setCommetns] = useState([])
    const [newComment, setNewComment] = useState("");
    const { id } = useParams();
    const location = useLocation();
    const { userId } = location.state;
    const [emailReq, setEmailReq] = useState("");

    console.log("in vlog page");
    console.log(userId);

    let currentUrl = window.location.href;

        // Create a new URL object based on the current URL
        let url = new URL(currentUrl);

        // Set the port to 8000
        url.port = '8080';
        let baseUrl = `${url.protocol}//${url.hostname}:${url.port}`;

        let urlToHit = baseUrl +`/api/blog-posts/${id}`

    useEffect(() => {

        // let urlToHit = baseUrl +`/api/blog-posts/${id}`

        axios.get(urlToHit)
            .then(response => {
                console.log("Fetched blog data:", response.data);
                console.log("blogs");
                
                setBlog(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the blog!', error);
            });
      
        // urlToHit = baseUrl +`/api/comments`

        axios.get(baseUrl +`/api/comments`)
            .then(response => {
                console.log("comments");
                console.log(response.data);
                setCommetns(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the commetns!', error);
            });

    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };

    const handleCommentChange = (event) => {
        setNewComment(event.target.value);
    };

    const handleCommentSubmit = () => {
        const comment = {
            authorId: userId,
            content: newComment,
            blogPostId: id
        };

        // let urlToHit = baseUrl +`/api/comments`


        // Here, you could also make a POST request to your backend to save the comment
        axios.post(baseUrl +`/api/comments`, comment)
            .then(response => {
                setEmailReq(response.data)
                console.log("int the commetns api");
                console.log(response.data);
                setNewComment("");
                const email = response.data.author.email;
                const title = response.data.blogPost.title;
                sendMail(email, title);
                // Optionally update the blog state with the response data
            })
            .catch(error => {

                console.error('There was an error adding the comment!', error);
            });
    };

    const sendMail = (emailReq, title) => {
        console.log("in the email service");
        console.log(emailReq);

        axios.post('https://3h7jumyucf.execute-api.us-east-1.amazonaws.com/dev/', { email: emailReq, title: title }, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => {
                console.log("resp");
                console.log(response.data);
                // Optionally update the blog state with the response data
            })
            .catch(error => {
                console.error('There was an error sending mail!', error);
            });
    }

    return (
        <div className="bg-background text-foreground text-left">
            <header className="px-4 py-6 md:px-6 md:py-12 border-b">
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-4xl font-bold">{blog.title}</h1>
                    <div className="flex items-center gap-4 text-muted-foreground mt-2">
                        <p>{blog.author.name}</p>
                        <span className="h-4 w-px bg-muted" />
                        <p>Published on {formatDate(blog.createdAt)}</p>
                    </div>
                </div>
            </header>
            <main className="px-4 py-12 md:px-6 md:py-16 max-w-4xl mx-auto prose prose-gray dark:prose-invert">
                <p>{blog.content}</p>
            </main>
            <section className="px-4 py-12 md:px-6 md:py-16 bg-muted">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl font-bold mb-6">Comments</h2>
                    <div className="space-y-6">
                        {comments.map((comment, index) => (
                            <div key={index} className="flex gap-4">
                                {/* <img src="/placeholder.svg" alt="Avatar" className="w-10 h-10 rounded-full" /> */}
                                <div>
                                    <h3 className="font-medium">{comment.author.name}</h3>
                                    <p className="text-muted-foreground">{comment.content}</p>
                                </div>
                            </div>
                        ))}
                        <div className="flex items-start gap-4">
                            {/* <img src="/placeholder.svg" alt="Avatar" className="w-10 h-10 rounded-full" /> */}
                            <div className="flex-1">
                                <textarea
                                    placeholder="Write your comment..."
                                    value={newComment}
                                    onChange={handleCommentChange}
                                    className="bg-background border border-muted rounded-md p-2 w-full"
                                />
                                <button
                                    onClick={handleCommentSubmit}
                                    className="w-full bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 focus:outline-none focus:ring focus:border-green-700"
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default BlogPage;
