// import "../styles/navBar.css";

// function Navbar({ user }) {
//   const items = ["Home", "Catalog", "About"];

//   const handleClick = (item) => {
//     console.log(item);
//   };

//   return (
//     <nav>
//       <div className="flex-container">
//         <div className="logo">TrackingCatalog</div>
//         <div className="container">
//           <ul>
//             {items.map((item) => (
//               <li key={item} onClick={() => handleClick(item)}>
//                 {item}
//               </li>
//             ))}
//             {user ? (
//               <li onClick={() => handleClick(user.name)}>{user.name}</li>
//             ) : (
//               <li onClick={() => handleClick("Login")}>Login</li>
//             )}
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;

import { useState } from "react";
import "../styles/navBar.css";

function Navbar({ user }) {
  const [open, setOpen] = useState(false);

  const toggleDropdown = () => {
    setOpen((prev) => !prev);
  };

  return (
    <nav>
      <div className="flex-container">
        <div className="logo">TrackingCatalog</div>

        <div className="container">
          <ul>
            <li>Home</li>
            <li>Catalog</li>
            <li>About</li>

            <li onClick={toggleDropdown} className="dropdown-trigger">
              {user ? user.name : "Login"}

              {open && (
                <div className="dropdown">
                  {user ? (
                    <>
                      <div>Profile</div>
                      <div>Logout</div>
                    </>
                  ) : (
                    <>
                      <div>Sign In</div>
                      <div>Register</div>
                    </>
                  )}
                </div>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;