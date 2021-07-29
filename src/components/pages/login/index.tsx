import "./login.css";

import { Toast } from "@capacitor/toast";
import { PhoneNumberInputField } from "@components/form/PhoneNumberInputField";
import { RadioField } from "@components/form/RadioField";
import { TextBoxField } from "@components/form/TextBoxField";
import SITE_CONFIG from "@configs/site-config";
import { yupResolver } from "@hookform/resolvers/yup";
import useGlobalState from "@hooks/use-global-state";
import { IonButton, IonCol, IonRow } from "@ionic/react";
import { axLogin } from "@services/auth.service";
import { STORAGE_KEYS, VERIFICATION_MODE, VERIFICATION_TYPE } from "@static/constants";
import { Storage } from "@utils/storage";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { isPossiblePhoneNumber } from "react-phone-number-input";
import { useHistory } from "react-router";
import * as Yup from "yup";

export default function LoginPageComponent() {
  const [showMobile, setShowMobile] = useState(true);
  const { initializeStorage, setIsLoading } = useGlobalState();

  const { user, isLoggedIn } = useGlobalState();
  const history = useHistory();

  useEffect(() => {
    if (user.init && isLoggedIn) {
      history.replace("/observation/list");
    }
  }, [user]);

  const hForm = useForm<any>({
    mode: "onChange",
    resolver: yupResolver(
      Yup.object().shape({
        verificationType: Yup.string().required(),
        email: Yup.string()
          .email()
          .when("verificationType", {
            is: (m) => m === VERIFICATION_TYPE[0].value,
            then: Yup.string().required()
          }),
        mobileNumber: Yup.string()
          .test("mobile", "invalid mobile", (v) => (v ? isPossiblePhoneNumber(v) : true))
          .when("verificationType", {
            is: (m) => m === VERIFICATION_TYPE[1].value,
            then: Yup.string().required()
          }),
        password: Yup.string().required()
      })
    ),
    defaultValues: {
      verificationType: VERIFICATION_TYPE[0].value
    }
  });

  const verificationType = hForm.watch("verificationType");

  useEffect(() => {
    setShowMobile(verificationType === VERIFICATION_TYPE[1].value);
  }, [verificationType]);

  const handleOnSubmit = async (v) => {
    setIsLoading(true);
    const payload = {
      username: showMobile ? v.mobileNumber : v.email,
      password: v.password,
      mode: v.mode || VERIFICATION_MODE.MANUAL
    };

    const { success, data } = await axLogin(payload);

    if (success && data?.status) {
      if (data?.verificationRequired) {
        Toast.show({ text: "Account verification required" });
      } else {
        Toast.show({ text: "Welcome!" });
        Storage.set(STORAGE_KEYS.BA_TOKEN, data.access_token);
        Storage.set(STORAGE_KEYS.BR_TOKEN, data.refresh_token);
        initializeStorage();
      }
    } else {
      Toast.show({ text: "Invalid Credentials" });
    }
    setIsLoading(false);
  };

  return (
    <div>
      <div className="login-logo">
        <img src="/assets/icon/icon.png" className="logo" alt="Ionic logo" />
      </div>
      <FormProvider {...hForm}>
        <form onSubmit={hForm.handleSubmit(handleOnSubmit)}>
          <div data-hidden={!SITE_CONFIG.REGISTER.MOBILE}>
            <RadioField name="verificationType" options={VERIFICATION_TYPE} />
          </div>
          {showMobile ? (
            <PhoneNumberInputField name="mobileNumber" label="Phone" />
          ) : (
            <TextBoxField name="email" type="email" label="Email" />
          )}
          <TextBoxField name="password" type="password" label="Password" />
          <IonRow>
            <IonCol>
              <IonButton type="submit" expand="block">
                Login
              </IonButton>
            </IonCol>
            <IonCol>
              <IonButton routerLink="/signup" color="light" expand="block">
                Signup
              </IonButton>
            </IonCol>
          </IonRow>
        </form>
      </FormProvider>
    </div>
  );
}
