import { IonDatetime, IonItem } from "@ionic/react";
import useDidUpdateEffect from "@hooks/use-did-update-effect";
import { FORM_DATEPICKER_CHANGE } from "@static/events";
import { formatDate, parseDate } from "@utils/date";
import React, { useEffect, useState } from "react";
import { useListener } from "react-gbus";
import { useController } from "react-hook-form";
import { FieldWrapper } from "./common";

interface IDatePickerBoxProps {
  name: string;
  label: string;
  disabled?: boolean;
  hint?: string;
  dateFormat?: string;
  style?;
  isRequired?: boolean;
  subscribe?: boolean;
}

const maxDate = new Date().toISOString();

export const DatePickerField = ({
  name,
  label,
  hint,
  subscribe = false,
  isRequired = false
}: IDatePickerBoxProps) => {
  const { field, fieldState } = useController({ name });
  const [date, setDate] = useState<any>(
    field.value ? parseDate(field.value).toString() : undefined
  );

  useEffect(() => {
    date && field.onChange(formatDate(date));
  }, []);

  useDidUpdateEffect(() => {
    field.onChange(formatDate(date));
  }, [date]);

  if (subscribe) {
    useListener(
      (d) => {
        d && setDate(d.toString());
      },
      [`${FORM_DATEPICKER_CHANGE}${name}`]
    );
  }

  return (
    <FieldWrapper isRequired={isRequired} label={label} hint={hint} fieldState={fieldState}>
      <div className="rs-container">
        <IonItem
          class="ion-no-padding"
          style={{
            width: "100%",
            border: "1px solid var(--ion-color-medium)",
            background: "white",
            borderRadius: "0.25rem",
            height: 40,
            paddingLeft: 10
          }}
        >
          <IonDatetime
            placeholder={label}
            displayFormat="MM/DD/YYYY"
            max={maxDate}
            value={date}
            style={{ marginBottom: 5 }}
            onIonChange={(e) => setDate(e?.detail?.value)}
          ></IonDatetime>
        </IonItem>
      </div>
    </FieldWrapper>
  );
};
