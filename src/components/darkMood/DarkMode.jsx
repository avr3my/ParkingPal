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
          class="checkbox"
          id="checkbox"
        />
        <label for="checkbox" class="label">
          <RiMoonLine className="moon" />
          <FiSun className="sun" />
          <div class={`ball ${theme}`} />
        </label>
      </div>
    </>
  );
}
