import * as Yup from "yup";
import formRegexp from "./regexp";

export const firstSchema =
{
  type_of_contact_nip: Yup.string().when("type_of_contact_pesel", {
    is: "",
    then: Yup.string()
      .matches(
        formRegexp.nip,
        "Upewnij się, czy numer, który podajesz, jest prawidłowy."
      )
      .required("Podaj NIP"),
    otherwise: Yup.string()
  }),

  type_of_contact_pesel: Yup.string().when("type_of_contract_nip", {
    is: type_of_contract_nip => type_of_contract_nip === "",
    then: Yup.string().matches(
      formRegexp.pesel,
      "Upewnij się, czy numer, który podajesz, jest prawidłowy."
    )
      .required("Podaj PESEL"),
    otherwise: Yup.string()
  })
}
