import React, { useEffect, useState } from "react";

const ChangeTheme = () => {
  const [theme, setTheme] = useState("light"); 

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme); 
  }, []);

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme); 
    document.documentElement.setAttribute("data-theme", newTheme); 
  };

  return (
    <div>
      <div className="dropdown dropdown-left">
        <div tabIndex={0} role="button" className="btn m-1">
          Theme
          <svg
            width="12px"
            height="12px"
            className="inline-block h-2 w-2 fill-current opacity-60"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 2048 2048"
          >
            <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
          </svg>
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content bg-base-300 rounded-box z-[1] w-52 p-2 shadow-2xl z-99"
        >
          {["light", "retro", "cyberpunk", "valentine", "aqua", "dark"].map(
            (item) => (
              <li key={item}>
                <label className="btn btn-sm btn-block btn-ghost justify-start">
                  <input
                    type="radio"
                    name="theme-dropdown"
                    value={item}
                    checked={theme === item}
                    onChange={() => handleThemeChange(item)}
                  />
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </label>
              </li>
            )
          )}
        </ul>
      </div>
    </div>
  );
};

export default ChangeTheme;
