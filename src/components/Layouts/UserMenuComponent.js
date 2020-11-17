import * as React from "react";
import { UserMenu, MenuItemLink } from "react-admin";
import SettingsIcon from "@material-ui/icons/Settings";

const ConfigurationMenu = React.forwardRef(({ onClick }, ref) => (
  <MenuItemLink
    ref={ref}
    to="/my-profile"
    primaryText="My Profile"
    leftIcon={<SettingsIcon />}
    onClick={onClick} // close the menu on click
  />
));

const UserMenuComponent = (props) => (
  <UserMenu {...props}>
    <ConfigurationMenu />
  </UserMenu>
);

export default UserMenuComponent;
