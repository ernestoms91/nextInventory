"use client";
import { user } from "@/interface";
import { Formik, FormikHelpers } from "formik";
import { MyTextInput } from "../UI/MyTextInput";
import { MySelect } from "../UI/MySelect";
import { MyPassInput } from "../UI/MyPassInput";
import { useSession } from "next-auth/react";
import { editUserSchema, newUserSchema } from "@/helper/yupSchemaUserForm";
import toast from "react-hot-toast";
import { Dispatch, SetStateAction } from "react";

interface MyFormValues extends user {
  password: string;
  password2: string;
}

interface Iprop {
  userEdit: user | undefined;
  setUserEdit: Dispatch<SetStateAction<user | undefined>>;
  users: user[] | [];
  setUsers: Dispatch<SetStateAction<user[]>>;
}

const initialValues: MyFormValues = {
  id: "",
  name: "",
  lastName: "",
  username: "",
  email: "",
  password: "",
  password2: "",
  role: "",
  disable: false,
};

const AddUser = ({ users, setUsers, userEdit, setUserEdit }: Iprop) => {
  const roles = ["ADMIN", "USER"];
  const { data: session, status } = useSession({ required: true });

  const handleNewUser = async (
    values: MyFormValues,
    actions: FormikHelpers<MyFormValues>
  ) => {
    const { name, lastName, username, email, password, role } = values;
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/new`,
        {
          method: "POST",
          body: JSON.stringify(values),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.user?.jwt}`,
          },
        }
      );

      const data = await res.json();

      if (res.ok) {
        toast.success("Usuario añadido");
      } else {
        console.log(data);
        if (data.errors) {
          const errorEntries = Object.entries(data.errors);
          errorEntries.map(([key, value]) => {
            toast(`${value}`, {
              duration: 3000,
            });
          });
        }
        return toast.error(data.msg);
      }

      const usuarios: user[] = users;

      let nuevoUsuario: user = {
        id: data.content.id,
        name,
        lastName,
        username,
        email,
        role,
        disable: false,
      };

      usuarios.push(nuevoUsuario);
      usuarios.sort((a, b) => {
        if (a.username < b.username) {
          return -1;
        }
        if (a.username > b.username) {
          return 1;
        }
        return 0;
      });
      setUsers([...usuarios]);
      actions.setSubmitting(false);
      actions.resetForm();
    } catch (error: any) {
      toast.error(error.message);
      console.error(error);
      throw error;
    }
  };

  const handleEditUser = async (
    values: MyFormValues,
    actions: FormikHelpers<MyFormValues>
  ) => {
    const { name, lastName, username, email, password, role } = values;
    const { password: sinUsar, ...newValues } = values;
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/update/${userEdit?.id}`,
        {
          method: "PUT",
          body: JSON.stringify(password ? values : newValues),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.user?.jwt}`,
          },
        }
      );

      const data = await res.json();

      if (res.ok) {
        toast.success("Usuario editado");
      } else {
        console.log(data);
        if (data.errors) {
          const errorEntries = Object.entries(data.errors);
          errorEntries.map(([key, value]) => {
            toast(`${value}`, {
              duration: 3000,
            });
          });
        }
        return toast.error(data.msg);
      }

      const usuarios = users.map((u) => {
        if (u.id === userEdit?.id) {
          let nuevoUsuario: user = {
            id: data.content.id,
            name,
            lastName,
            username,
            email,
            role,
            disable: u.disable,
          };
          return nuevoUsuario;
        }
        return u;
      });

      setUsers([...usuarios]);
      setUserEdit(undefined);
      actions.setSubmitting(false);
      actions.resetForm();
    } catch (error: any) {
      toast.error(error.message);
      console.error(error);
      throw error;
    }
  };

  const userEditInitialValues = () => {
    let userEditInitialValues: MyFormValues = {
      id: userEdit?.id as string,
      name: userEdit?.name as string,
      lastName: userEdit?.lastName as string,
      username: userEdit?.username as string,
      email: userEdit?.email as string,
      password: "",
      password2: "",
      role: userEdit?.role as string,
      disable: userEdit?.disable as boolean,
    };
    return userEditInitialValues;
  };

  return (
    <>
      <Formik
        initialValues={userEdit ? userEditInitialValues() : initialValues}
        validationSchema={userEdit ? editUserSchema() : newUserSchema()}
        onSubmit={async (values, actions) => {
          userEdit
            ? handleEditUser(values, actions)
            : handleNewUser(values, actions);
        }}
        enableReinitialize={true}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form
            className=" grid  gap-2 mx-2 bg-gray-100 rounded-lg p-2  lg:grid-cols-8 lg:mx-4 border border-black"
            onSubmit={handleSubmit}
          >
            {/*  Input name  */}
            <div>
              <MyTextInput
                classNameInput="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm  rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                name="name"
                placeholder="Introduce tu nombre"
              />
            </div>
            {/*  Input apellido  */}
            <div>
              <MyTextInput
                classNameInput="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm  rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                name="lastName"
                placeholder="Introduce tu apellido"
              />
            </div>
            {/*  Input correo  */}
            <div>
              <MyTextInput
                classNameInput="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                name="email"
                placeholder="Introduce email"
              />
            </div>
            {/*  Input usuario  */}
            <div>
              <MyTextInput
                classNameInput="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm  rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                name="username"
                placeholder="Introduce usuario"
              />
            </div>

            {/*  Input contraseña  */}
            <div>
              <MyPassInput
                classNameInput="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-l-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                name="password"
                placeholder="Introduce contraseña"
              />
            </div>

            {/*  Input contraseña 2*/}
            <div>
              <MyPassInput
                classNameInput="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-l-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                name="password2"
                placeholder="Repite contraseña"
              />
            </div>

            {/*  Input role*/}
            <div>
              <MySelect
                classNameSelect="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                name="role"
                placeholder="Repite contraseña"
              >
                <option value="">Seleccione</option>

                {roles.map((rol, index) => (
                  <option key={index} value={rol}>
                    {rol}
                  </option>
                ))}
              </MySelect>
            </div>
            <button
              type="submit"
              className="w-full font-bold tracking-wider  bg-green-500 rounded-lg text-white p-2  text-lg md:text-xs  xl:text-lg "
            >
              {userEdit ? "Editar usuario" : "+ Nuevo usuario"}
            </button>
          </form>
        )}
      </Formik>
    </>
  );
};

export default AddUser;
