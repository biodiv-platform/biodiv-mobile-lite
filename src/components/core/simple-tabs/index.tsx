import { IonIcon, IonLabel, IonSegment, IonSegmentButton } from "@ionic/react";
import React from "react";

interface TabsProps {
  children: any[];
  value: number;
  onChange?;
}

interface TabProps {
  icon;
  children;
  label;
}

export const Tab = (props: TabProps) => props.children;

export const Tabs = ({ children, value, onChange }: TabsProps) => (
  <div>
    <IonSegment scrollable value={value.toString()}>
      {children.map((tab, index) => (
        <IonSegmentButton
          value={index.toString()}
          onClick={() => onChange(index)}
          key={index.toString()}
        >
          <IonIcon icon={tab.props.icon} />
          <IonLabel className="ion-margin-top">{tab.props.label}</IonLabel>
        </IonSegmentButton>
      ))}
    </IonSegment>
    {children?.[value]}
  </div>
);
