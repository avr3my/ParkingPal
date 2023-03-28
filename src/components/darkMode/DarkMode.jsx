import "./darkMode.css";

import { useContext } from "react";
import { RiMoonLine } from "react-icons/ri";
import { FiSun } from "react-icons/fi";

import { themeContext } from "../../App";

export default function DarkMode() {
  const { theme, changeTheme } = useContext(themeContext);
  return (
    <div className="dark-mode-switch">
      <input
        onClick={() => changeTheme()}
        type="checkbox"
        className="checkbox"
        id="checkbox"
      />
      <label htmlFor="checkbox" className="label">
        <RiMoonLine className="moon" />
        <FiSun className="sun" />
        <div className={`ball ${theme}`} />
      </label>
    </div>
  );
}
