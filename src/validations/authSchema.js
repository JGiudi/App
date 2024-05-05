import { object, string, ref } from "yup";

export const signupSchema = object().shape({
    email: string()
        .email("Debe ser un formato válido de correo electrónico")
        .required(),
    password: string()
        .min(8, "La contraseña debe tener al menos 8 caracteres")
        .required(),
    confirmPassword : string()
        .oneOf([ref("password"), null], "Las contraseñas no son iguales")
        .required(),
});
