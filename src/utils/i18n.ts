export const translateOptions = (t, options) => options.map((o) => ({ ...o, label: t(o.label) }));
