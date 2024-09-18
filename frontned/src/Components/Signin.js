import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signin = () => {

    const navigate = useNavigate();

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        profilePictureUrl: "",
        bio: ""
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setUser({
            ...user,
            [id]: value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        
        let currentUrl = window.location.href;

        // Create a new URL object based on the current URL
        let url = new URL(currentUrl);

        // Set the port to 8000
        url.port = '8080';
        let baseUrl = `${url.protocol}//${url.hostname}:${url.port}`;

        let urlToHit = baseUrl +'/auth/signup'

        console.log(urlToHit);
        

        axios.post(urlToHit, user)
            .then(response => {
                console.log("jfdlkfjla");
                console.log(response.data);
                setUser(response.data);

                console.log(urlToHit);

                if (response.data === "") {
                    alert("Could not add the user")
                }
                else {
                    navigate('/login')
                }

            })
            .catch(error => {
                console.error('There was an error fetching the blogs!', error);
            });
    };

    return (
        <section className="bg-gray-50">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">

                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight">
                            Sign in to your account
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium ">
                                    Your email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                    value={user.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
                                    Password
                                </label>
                                <input
                                    type="text"
                                    name="password"
                                    id="password"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                    onChange={handleChange}
                                    value={user.password}
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="name" className="block mb-2 text-sm font-medium ">
                                    Your name
                                </label>
                                <input
                                    type="name"
                                    name="name"
                                    id="name"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                    value={user.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="bio" className="block mb-2 text-sm font-medium ">
                                    Your bio
                                </label>
                                <input
                                    type="bio"
                                    name="bio"
                                    id="bio"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                    value={user.bio}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                            >
                                Sign up
                            </button>
                            {/* <p className="text-sm font-light text-gray-500 ">
                                Don’t have an account yet?{' '}
                                <a className="font-medium text-blue-600 hover:underline">
                                    Sign up
                                </a>
                            </p> */}
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Signin;
