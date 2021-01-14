import React, { useState, useEffect } from 'react';
import mockUser from './mockData.js/mockUser';
import mockRepos from './mockData.js/mockRepos';
import mockFollowers from './mockData.js/mockFollowers';
import axios from 'axios';

const rootUrl = 'https://api.github.com';


const GithubContext = React.createContext();


const GithubProvider = ({ children }) => {
const [githubUser, setGithubUser] = useState(mockUser);
const [githubRepos, setRepos] = useState(mockRepos);
const [githubFollowers, setGithubFollowers] = useState(mockFollowers);

const [requests, setRequests] = useState(0)
const [loading, setLoading] = useState(false)
const [error, setError] = useState({show: false, msg: ""})
const searchGithubUser = async(user)=>{
    toggleError(false, "")
    setLoading(true)
    const response = await axios(`${rootUrl}/users/${user}`).catch(
        err => console.log(err)
    )
    console.log(response)
    if(response){
        setGithubUser(response.data)
        const {login, followers_url} = response.data
        axios(`${rootUrl}/users/${login}/repos?per_page=100`).then(response => setRepos(response.data))
        axios(`${followers_url}?per_page=100 `).then(response => setGithubFollowers(response.data))
        //https://api.github.com/users/john-smilga/repos?per_page=100
        //https://api.github.com/users/john-smilga/followers
    }else{
        toggleError(true, "there is no user with this jméno")
    }
    setLoading(false)
    checkRequest()
}
const checkRequest = () =>{
    axios(`${rootUrl}/rate_limit`).then(({data})=>{
        let {rate:{remaining}} = data
        setRequests(remaining)
        if(remaining === 0){
            toggleError(true, "sorry, too much")
        }
    }).catch((err)=>{console.log(err)})
}

function toggleError(show, msg){
    setError({show,msg})
}

useEffect(checkRequest, [])
    return (<GithubContext.Provider value={{searchGithubUser,loading, error, githubUser,githubRepos,githubFollowers, requests}}>{children}</GithubContext.Provider>)}

export { GithubProvider, GithubContext };
