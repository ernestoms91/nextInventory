import { useContext } from "react";
import * as Yup from "yup";

const lowercaseRegex = /(?=.*[a-z])/;
const uppercaseRegex = /(?=.*[A-Z])/;
const numericRegex = /(?=.*[0-9])/;
const ciRegex = /^[0-9]+$/;
const symbolRegex = /(?=.*\W)/;

const roles = ["ADMIN", "USER"];

export const newUserSchema = () => {
  return Yup.object().shape({
    name: Yup.string()
      .required("El nombre es obligatorio")
      .min(2, "El nombre es muy corto")
      .max(20, "El nombre es muy largo"),
    lastName: Yup.string()
      .required("Los apellidos son obligatorios")
      .min(2, "El apellido es muy corto")
      .max(20, "El apellido es muy largo"),

    username: Yup.string()
      .required("EL usuario es obligatorio")
      .min(2, " La usuario es muy corto")
      .max(80, "La usuario es muy largo"),

    email: Yup.string()
      .lowercase()
      .email("Escriba un email válido")
      .required("Introduzca su email"),

    password: Yup.string()
      .required("Introduzca una contraseña")
      .matches(lowercaseRegex, "Debe contener al menos una minúscula")
      .matches(uppercaseRegex, "Debe contener al menos una mayúscula")
      .matches(
        symbolRegex,
        "Debe contener al menos una símbolo (no incluye guión bajo )"
      )
      .matches(numericRegex, "Debe contener al menos una número")
      .min(8, "Debe contener al menos 8 caracteres"),

    password2: Yup.string()
      .required("Confirme su contraseña")
      .oneOf([Yup.ref("password")], "Las contraseñas no coinciden"),

    role: Yup.string()
      .oneOf(roles, "Debe seleccionar una opción")
      .required("Seleccione rol"),
  });
};

const passwordSchema = Yup.string()
  .matches(lowercaseRegex, "Debe contener al menos una minúscula")
  .matches(uppercaseRegex, "Debe contener al menos una mayúscula")
  .matches(numericRegex, "Debe contener al menos un número")
  .matches(
    symbolRegex,
    "Debe contener al menos un símbolo (que no sea un guión bajo)"
  )
  .min(8, "Debe contener al menos 8 caracteres");

export const editUserSchema = () => {
  return Yup.object().shape({
    name: Yup.string()
      .required("El nombre es obligatorio")
      .min(2, "El nombre es muy corto")
      .max(20, "El nombre es muy largo"),
    lastName: Yup.string()
      .required("Los apellidos son obligatorios")
      .min(2, "El apellido es muy corto")
      .max(20, "El apellido es muy largo"),

    username: Yup.string()
      .required("EL usuario es obligatorio")
      .min(2, " La usuario es muy corto")
      .max(80, "La usuario es muy largo"),

    email: Yup.string()
      .lowercase()
      .email("Escriba un email válido")
      .required("Introduzca su email"),

    password: Yup.string()
      .matches(lowercaseRegex, "Debe contener al menos una minúscula")
      .matches(uppercaseRegex, "Debe contener al menos una mayúsculA")
      .matches(
        symbolRegex,
        "Debe contener al menos una símbolo (no incluye guión bajo )"
      )
      .matches(numericRegex, "Debe contener al menos una número")
      .min(8, "Debe contener al menos 8 caracteres"),

    password2: Yup.string().test(
      "password-match",
      "Las contraseñas deben coincidir",
      function (value) {
        const { password } = this.parent;
        return password === value;
      }
    ),

    role: Yup.string()
      .oneOf(roles, "Debe seleccionar una opción")
      .required("Seleccione rol"),
  });
};
