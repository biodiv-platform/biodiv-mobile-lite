import { IonIcon } from "@ionic/react";
import { closeOutline } from "ionicons/icons";
import React from "react";
import { useTranslation } from "react-i18next";

export const selectStyles = {
  control: (p) => ({
    ...p,
    width: "100%",
    cursor: "text",
    borderColor: "var(--ion-color-medium)"
  }),
  placeholder: (p) => ({
    ...p,
    color: "#757474"
  }),
  valueContainer: (p) => ({ ...p, height: "38px" }),
  menu: (p) => ({ ...p, minWidth: "20em" }),
  menuPortal: (p) => ({ ...p, zIndex: 1900 }),
  clearIndicator: (base, state) => ({
    ...base,
    cursor: "pointer",
    color: state.isFocused ? "var(--ion-color-primary)" : "var(--ion-color-medium)"
  })
};

export const ClearIndicator = (props) => {
  const {
    getStyles,
    innerProps: { ref, ...restInnerProps }
  } = props;
  const { t } = useTranslation();
  return (
    <div {...restInnerProps} ref={ref} style={getStyles("clearIndicator", props)}>
      <div
        style={{ lineHeight: "1rem" }}
        onMouseDown={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
      ></div>
      <button
        type="button"
        style={{
          minWidth: "auto",
          lineHeight: 0,
          background: "transparent",
          color: "var(--ion-text-color)"
        }}
        aria-label={t("common.clear")}
      >
        <IonIcon style={{ fontSize: "1.4rem" }} icon={closeOutline} />
      </button>
    </div>
  );
};
