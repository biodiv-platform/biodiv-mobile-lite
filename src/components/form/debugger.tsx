import { IonButton, IonItem } from "@ionic/react";
import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

export default function FormDebugger() {
  const [data, setData] = useState<any>();
  const form = useFormContext();

  const update = () => {
    setData(form.getValues());
  };

  useEffect(() => {
    update();
  }, [form]);

  return (
    <IonItem>
      <div>
        <div>FOR DEVELOPMENT PURPOSES ONLY</div>
        <IonButton style={{ width: "100%" }} color="danger" onClick={update}>
          Refresh Values
        </IonButton>
        <div>
          Values
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
        <div style={{ background: "tomato", color: "white" }}>
          Errors
          {Object.entries(form?.formState?.errors || {})?.map(([name, { type, message }]) => (
            <div key={message}>
              <b>{name}</b>: [{type}] <pre>{JSON.stringify(message, null, 2)}</pre>
            </div>
          ))}
        </div>
      </div>
    </IonItem>
  );
}
