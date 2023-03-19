import { useContext } from "react";
import "./darkMode.css";
import { RiMoonLine } from "react-icons/ri";
import { FiSun } from "react-icons/fi";

import { themeContext } from "../../App";

export default function DarkMood() {
  const { theme, changeTheme } = useContext(themeContext);
  return (
    <>
      <div>
        <input
          onClick={() => changeTheme()}
          type="checkbox"
          className="checkbox"
          id="checkbox"
        />
        <label for="checkbox" className="label">
          <RiMoonLine className="moon" />
          <FiSun className="sun" />
          <div className={`ball ${theme}`} />
        </label>
      </div>
    </>
  );
}
