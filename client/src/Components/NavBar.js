import React from 'react'
// import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import 'bootstrap/dist/css/bootstrap.css';
import { Button } from '@mui/material';
import { useEffect,useState } from 'react';
// import {Redirect}from 'react-router-dom'
import { useHistory } from "react-router-dom";
export const NavBar = () => {
    let history = useHistory();
    const [isLogin, setIsLogin] = useState(true);
    const [isSignup,setIsSignup] = useState(true);

    useEffect(() => {
        if(localStorage.getItem("authToken"))
        {
            setIsLogin(false);
            setIsSignup(false);
        }        
    }, [isLogin,isSignup]);


    const logOutHandler=()=>{
        localStorage.removeItem("authToken");
        // <Redirect to="/login" />
        setIsLogin(true);
        setIsSignup(true);
        history.push("/login");
    }
    
    return (
        <Container>
            <Nav  fill  variant="pills" >
                <Nav.Item>
                <Button> <Nav.Link eventKey="link-1" href="/home">home</Nav.Link> </Button>
                </Nav.Item>
                {isLogin && (<Nav.Item>
                <Button><Nav.Link href="/login">login</Nav.Link> </Button>
                </Nav.Item>)}
                {isSignup && (<Nav.Item>
                   <Button size='small'> <Nav.Link eventKey="link-2" href="/signup" >signup</Nav.Link> </Button>
                </Nav.Item>)}
                {!isLogin && (<Nav.Item>
                <Button
                    size='large'
                    onClick={logOutHandler}
                >
                    log out
                </Button>
                </Nav.Item>)}
            </Nav>
            
        </Container>
    )
}
