import { NavLink } from "react-router-dom";

function NavigationLink({ link, description }) {
  return (
    <NavLink
      className={({ isActive }) =>
        isActive ? "navigation__item active" : "navigation__item inactive"
      }
      to={link}
    >
      {description}
    </NavLink>
  );
}

export default NavigationLink;
