"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Spinners from "../UI/Spinners";
import Disable from "../UI/Disable";
import Enable from "../UI/Enable";
import Edit from "../UI/Edit";
import toast from "react-hot-toast";
import { user } from "../../interface/user";
import AddUser from "./AddUser";

const AdminUsers = () => {
  const { data: session, status } = useSession({ required: true });
  const [users, setUsers] = useState<Array<user>>([]);
  const [userEdit, setUserEdit] = useState<user>()
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);


  const getUsers = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/all?page=${page}&size=10&sort=username,asc`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.user?.jwt}`,
          },
        }
      );

      const data = await res.json();
      setUsers(data.content);
      setTotalPages(data.totalPages);
      return users;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const disableUser = async (id: string) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.user?.jwt}`,
          },
        }
      );

      const data = await res.json();
      if (res.ok) {
        toast.success("Usuario actualizado");
      }else{
        console.log(data);
        return toast.error(data.msg);
      }
      const updatedUsers = users.map((user) => {
        if (user.id === id) {
          return {
            ...user,
            disable: !user.disable,
          };
        } else {
          return user;
        }
      });
      console.log(updatedUsers);
      setUsers(updatedUsers);
    } catch (error: any) {
      toast.error(error.msg);
      console.error(error);
      throw error;
    }
  };

  useEffect(() => {
    getUsers();
  }, [status, page]);

  if (status === "loading") {
    return <Spinners />;
  }

  return (
    <>
      <AddUser  userEdit={userEdit} setUserEdit={setUserEdit} users={users} setUsers={setUsers}/>
      <div className="flex justify-center overflow-auto rounded-lg mx-2 my-5">
        <table className="w-full border-2 rounded-lg shadow mx-2">
          <thead className="bg-gray-200 border-b-2 border-gray-200">
            <tr>
              <th className="p-3 text-lg font-semibold whitespace-nowrap tracking-wide text-left">
                No.
              </th>
              <th className="p-3 text-lg font-semibold whitespace-nowrap tracking-wide text-left">
                Nombre
              </th>
              <th className="p-3 text-lg font-semibold whitespace-nowrap tracking-wide text-left">
                Apellido
              </th>
              <th className="p-3 text-lg font-semibold whitespace-nowrap tracking-wide text-left">
                Usuario
              </th>
              <th className="p-3 text-lg font-semibold whitespace-nowrap tracking-wide text-left">
                Rol
              </th>
              <th className="p-3 text-lg font-semibold whitespace-nowrap tracking-wide text-left">
                Status
              </th>
              <th className="p-3 text-lg font-semibold whitespace-nowrap tracking-wide text-left">
                Email
              </th>
              <th className="p-3 text-lg font-semibold whitespace-nowrap tracking-wide text-left">
                Editar
              </th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {users &&
              users.length > 0 &&
              users.map((user: user, index) => (
                <tr
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
                  key={user.id}
                >
                  <td className="p-3 text-base whitespace-nowrap text-gray-600 font-semibold">
                    {index + 1}.
                  </td>
                  <td className="p-3 text-base whitespace-nowrap text-gray-600">
                    {user.name}
                  </td>
                  <td className="p-3 text-base whitespace-nowrap text-gray-600">
                    {user.lastName}
                  </td>
                  <td className="p-3 text-base whitespace-nowrap text-gray-600">
                    {user.username}
                  </td>
                  <td className="p-3 text-base whitespace-nowrap text-gray-600">
                    {user.role}
                  </td>
                  <td className="p-3 text-base whitespace-nowrap text-gray-600">
                    <button onClick={() => disableUser(user.id)}>
                      {user.disable ? <Disable /> : <Enable />}
                    </button>
                  </td>
                  <td className="p-3 text-base whitespace-nowrap text-gray-600">
                    {user.email}
                  </td>
                  <td className="p-3 text-base whitespace-nowrap text-gray-600">
                    <button 
                    onClick={()=>{setUserEdit(user)}}>
                    <Edit />
                    </button>
                
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className="mx-4 flex justify-center">
        <div className="p-3 flex justify-between gap-8">
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
            disabled={page === 0 ? true : false}
            onClick={() => setPage(page - 1)}
          >
            Prev
          </button>
          <p className="my-2 font-bold">{`${page + 1} - ${totalPages}`}</p>
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
            disabled={page === totalPages - 1 ? true : false}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default AdminUsers;
