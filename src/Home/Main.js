import { useState } from 'react';
import './Css/index.css';
import Header from './Header';
import Nav from './Nav';


function Main() {
  if(localStorage.Authorization){
    var auth = JSON.parse(localStorage.getItem("Authorization")).auth;
  }else{
    auth = "False";
  }
  return (
    <>
    <Header/>
    <Nav Auth={auth}/>
    </>
  );
}

export default Main;
