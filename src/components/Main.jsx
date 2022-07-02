import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import {
  FlexBox,
  FlexBoxAlignItems,
  FlexBoxDirection,
  ShellBar,
  Avatar,
} from "@ui5/webcomponents-react";
import "@ui5/webcomponents-icons/dist/AllIcons.js";
import ProductPopover from "./ProductPopover";
import ProfilePopover from "./ProfilePopover";

import { useI18nBundle } from "@ui5/webcomponents-react-base";

function Main() {
  const [popoverProductState, setPopoverProductState] = useState(false);
  const [popoverProfileState, setPopoverProfileState] = useState(false);

  let navigate = useNavigate();
  const i18nBundle = useI18nBundle("myApp");

  return (
    <>
      <ShellBar
        profile={<Avatar id="avatar" icon="employee" shape="Cicle" size="XS" />}
        onProfileClick={() => setPopoverProfileState(true)}
        onProductSwitchClick={() => setPopoverProductState(true)}
        primaryTitle={i18nBundle.getText("appTitle")}
        showNotifications="true"
        showProductSwitch="true"
        logo={<img src="UI5con_logo.png" alt="UI5con logo" />}
        onLogoClick={() => {
          navigate("/");
        }}
      />
      <ProductPopover
        popoverProductState={popoverProductState}
        setPopoverProductState={setPopoverProductState}
      />
      <ProfilePopover
        popoverProfileState={popoverProfileState}
        setPopoverProfileState={setPopoverProfileState}
      />
      <FlexBox
        style={{ width: "100%", height: "100vh" }}
        direction={FlexBoxDirection.Column}
        alignItems={FlexBoxAlignItems.Center}
      >
        <p />
        <Outlet />
      </FlexBox>
    </>
  );
}

export default Main;
