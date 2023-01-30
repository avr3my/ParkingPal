import React from 'react'
import "./home.css"
import imgLogo from "../../Assets/IMG-20230126-WA0018-removebg-preview (1).png"
import {VscLocation} from 'react-icons/vsc';

export default function Home() {
  return (
    <>
    <div className="home-page">
      <div className="top">
        <div className="logo">
        <img className='logo-size' src={imgLogo} alt="logo" />
        </div>
        <div className="account">
          <button>
          <span className='material-symbols-outlined size-icon'>account_circle</span>
          </button>
        </div>
      </div>
      <div className="bady">
        <div className="search">
          <input className='font-input' type="text" placeholder="Enter Address Here..."/>
          <button>
              <span class="material-symbols-outlined">
                  search
              </span>
          </button>
        </div>
        <div className="button-search">
        <button className='stail-buttom test'>search by address</button>
        <button className='stail-buttom'>search by location <VscLocation/></button>
        </div>
      </div>
    </div>

    </>
  )
}
