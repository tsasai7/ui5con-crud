import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Popover,
  ProductSwitch,
  ProductSwitchItem,
} from "@ui5/webcomponents-react";
import { useI18nBundle } from "@ui5/webcomponents-react-base";

function ProductPopover({ popoverProductState, setPopoverProductState }) {
  let navigate = useNavigate();
  const i18nBundle = useI18nBundle("myApp");

  return (
    <Popover
      id="product-popover"
      opener="avatar"
      open={popoverProductState}
      placementType="Bottom"
      onAfterClose={() => setPopoverProductState(false)}
      hideArrow="true"
    >
      <ProductSwitch>
        <ProductSwitchItem
          titleText={i18nBundle.getText("productDashboard")}
          icon="business-objects-experience"
          onClick={() => {
            navigate("/dashboard");
            setPopoverProductState(false);
          }}
        />
        <ProductSwitchItem
          titleText={i18nBundle.getText("productTransactions")}
          icon="lead"
          onClick={() => {
            navigate("/transactions");
            setPopoverProductState(false);
          }}
        />
      </ProductSwitch>
    </Popover>
  );
}

export default ProductPopover;
