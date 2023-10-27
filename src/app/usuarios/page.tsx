

import AdminUsers from "@/components/Usuarios/AdminUsers";
import AddUser from "@/components/Usuarios/AddUser";

export default function Usuarios() {
  
  return (
    <>
      <div className=" mx-4 flex ">
  
          <h1 className="font-bold text-3xl text-center my-5">
            Gestionar usuarios</h1>
            <h1 className=" hidden lg:inline text-sm font-light my-8 mx-2 italic">
              Todos los usuarios a tu alcance con <span className="font-semibold">InventoryApp</span>
            </h1>
        <div className="flex items-center">
             
        </div>

      </div>

      <AdminUsers />
    </>
  );
}
