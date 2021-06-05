import * as React from "react";
import { useSelector } from "react-redux";
import { useMediaQuery } from "@material-ui/core";
import { MenuItemLink, getResources } from "react-admin";
import DefaultIcon from "@material-ui/icons/ViewList";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import DashboardIcon from "@material-ui/icons/Dashboard";
import { usePermissions } from "react-admin";

const MenuComponent = ({ onMenuClick, logout }) => {
  const { permissions } = usePermissions();
  const isXSmall = useMediaQuery((theme) => theme.breakpoints.down("xs"));
  const open = useSelector((state) => state.admin.ui.sidebarOpen);
  const resources = useSelector(getResources);
  return (
    <div style={{ marginTop: "2rem" }}>
      <MenuItemLink
        to="/dashboard"
        primaryText="Dashboard"
        leftIcon={<DashboardIcon />}
        onClick={onMenuClick}
        sidebarIsOpen={open}
      />

      {resources.map((resource) => (
        <MenuItemLink
          key={resource.name}
          to={`/${resource.name}`}
          primaryText={
            (resource.options && resource.options.label) || resource.name
          }
          leftIcon={resource.icon ? <resource.icon /> : <DefaultIcon />}
          onClick={onMenuClick}
          sidebarIsOpen={open}
        />
      ))}
      {["admin", "operator"].includes(permissions) && (
        <MenuItemLink
          to="/availability"
          primaryText="Availability"
          leftIcon={<CheckCircleIcon />}
          onClick={onMenuClick}
          sidebarIsOpen={open}
        />
      )}
      {isXSmall && logout}
    </div>
  );
};

export default MenuComponent;
