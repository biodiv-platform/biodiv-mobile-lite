import "@translations/i18n";

import { Storage } from "@utils/storage";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function CustomFieldLastValue({ id, name, set }) {
  const { t } = useTranslation();
  const [show, canShow] = useState(false);
  const [cfValue, setCfValue] = useState<any>();

  const use = () => {
    set(name, cfValue);
    canShow(false);
  };

  useEffect(() => {
    const lastCFValue = Storage.get(`cf-${id}`);
    if (lastCFValue) {
      canShow(true);
      setCfValue(lastCFValue);
    }
  }, []);

  return show ? (
    <button type="button" title={cfValue.toString()} onClick={use}>
      {t("observation.use_last_value")}
    </button>
  ) : null;
}
