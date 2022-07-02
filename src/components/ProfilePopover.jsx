import React, { useState } from "react";
import {
  Popover,
  List,
  StandardListItem,
  Title,
} from "@ui5/webcomponents-react";
import { useI18nBundle } from "@ui5/webcomponents-react-base";

import { Auth } from "aws-amplify";
import { useEffect } from "react";

function ProfilePopover({ popoverProfileState, setPopoverProfileState }) {
  const [username, setUsername] = useState();

  const i18nBundle = useI18nBundle("myApp");

  useEffect(() => {
    checkUser();
  });

  async function checkUser() {
    try {
      const loggedInUser = await Auth.currentAuthenticatedUser();
      setUsername(loggedInUser.username);
    } catch (err) {
      setUsername(null);
      console.log(err.message);
    }
  }

  const onItemClick = (item) => {
    const itemClicked = item.detail.item.id;
    switch (itemClicked) {
      case "account":
        console.log("Account");
        break;
      case "settings":
        console.log("Settings");
        break;
      case "help":
        console.log("Help");
        break;
      case "logout":
        Auth.signOut();
        break;
      default:
        console.log("Option not configured: " + itemClicked);
    }
    setPopoverProfileState(false);
  };

  return (
    <Popover
      opener={"avatar"}
      open={popoverProfileState}
      onAfterClose={() => {
        setPopoverProfileState(false);
      }}
      placementType="Bottom"
      header={
        <Title style={{ padding: "0.25rem 1rem 0rem 1rem" }}>{username}</Title>
      }
    >
      <List onItemClick={onItemClick} separators="None">
        <StandardListItem id="account" icon="account">
          {i18nBundle.getText("profileAccount")}
        </StandardListItem>
        <StandardListItem id="settings" icon="settings">
          {i18nBundle.getText("profileSettings")}
        </StandardListItem>
        <StandardListItem id="help" icon="sys-help">
          {i18nBundle.getText("profileHelp")}
        </StandardListItem>
        <StandardListItem id="logout" icon="log">
          {i18nBundle.getText("profileLogout")}
        </StandardListItem>
      </List>
    </Popover>
  );
}

export default ProfilePopover;
