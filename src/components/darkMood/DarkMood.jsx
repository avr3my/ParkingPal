import React, { useContext, useState } from "react";
import "./darkMood.css";
import { RiMoonLine } from "react-icons/ri";
import { FiSun } from "react-icons/fi";
// import {IoMoonOutline} from "Io react-icons"
// import { IoMoonOutline } from "react-icons/io";
import { themeContext } from "../../App";

export default function DarkMood() {
  const { theme, changeTheme } = useContext(themeContext);
  let mode;
  theme==="dark"?mode="dark":mode="light";
  return (
    <>
      <div>
        <input
          onClick={() => changeTheme()}
          type="checkbox"
          class="checkbox"
          id="checkbox"
        />
        <label for="checkbox" class="label">
          <RiMoonLine className="moon" />
          <FiSun className="sun" />
          <div class={`ball ${mode}`} />
        </label>
      </div>
    </>
  );
}
