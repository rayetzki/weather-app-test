import flag from "country-code-emoji";

export const countryFlag = (country) => {
  return flag(country).replace(/../g, (cp) =>
    String.fromCharCode(cp.codePointAt(0) - 127397)
  );
};
