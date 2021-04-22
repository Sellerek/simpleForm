import * as Yup from "yup";
import formRegexp from "./regexp";

export const firstSchema = {
  type_of_contact_nip: Yup.string()
    .matches(
      formRegexp.nip,
      "Upewnij się, czy numer, który podajesz, jest prawidłowy."
    )
    .required("Podaj NIP"),
  type_of_contact_pesel: Yup.string()
    .matches(
      formRegexp.pesel,
      "Upewnij się, czy numer, który podajesz, jest prawidłowy."
    )
    .required("Podaj PESEL")
};
