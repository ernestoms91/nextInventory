
import ImageInv from "@/components/Home/ImageInv";
import Navbar from "@/components/Home/Navbar";
import User from "@/img/user.svg";
import Libreta from "@/img/libreta.svg";
import Informes from "@/img/informes.svg";
import Image from "next/image";
import Footer from "@/components/Home/Footer";

export default function Home() {

  return (
    <>
    <div>
      <ImageInv />

      <div className=" my-10">
        <h1 className="font-bold text-3xl text-center">
          Mejor software de gestión de inventarios
        </h1>
        <p className="text-xl text-center my-2">
          InventoryApp gestiona más de{" "}
          <span className="font-bold underline underline-offset-4 decoration-lime-400 ">
            50 mil millones de pesos
          </span>{" "}
          en inventario en todo el país.
        </p>
      </div>

      <div className=" mx-4 md:flex justify-center">
        <div className="border-2  rounded-lg p-5 ">
          <h1 className="text-3xl font-semibold text-blue-950 text-center">
            10 mil millones+
          </h1>
          <p className="text-xl text-center">
            Productos rastreados diariamente
          </p>
        </div>

        <div className="border-2  rounded-lg p-4">
          <h1 className="text-3xl font-semibold text-blue-950 text-center">
            5 millones+
          </h1>
          <p className="text-xl text-center">Ventas facturadas diariamente</p>
        </div>

        <div className="border-2  rounded-lg p-4">
          <h1 className="text-3xl font-semibold text-blue-950 text-center">
            150 millones+
          </h1>
          <p className="text-xl text-center">Solicitudes de página /mes</p>
        </div>
      </div>

      <div className=" my-20">
        <h1 className="font-bold text-3xl text-center">
          Todas las funciones que necesitará para administrar su empresa
        </h1>
        <p className="text-xl text-center  mx-2 my-2">
          Danos una oportunidad. No hay nada que instalar. No se necesitan
          manuales de formación. Todo muy fácil e institutivo .
        </p>
      </div>

      <div className=" mx-4 md:grid grid-cols-2 lg:grid-cols-3  gap-2 justify-center">
        <div className="border-2 my-2 rounded-lg p-5 hover:border-black">
          <div className="flex">
            <Image
              src={User}
              width={40}
              height={40}
              /* className="w-full h-auto" */
              alt="Inventory img"
            />
            <h1 className=" mx-3 text-3xl font-semibold text-blue-950 text-center">
              Cuentas de usuarios
            </h1>
          </div>

          <p className="text-xl  my-4 text-justify">
            Entendemos que a veces puede ser difícil mantenerse al día sobre
            todos los artículos inventariados en tu departamento. Por eso hemos
            creado una plataforma fácil de usar donde cada usuario registrado
            puede acceder a la información detallada sobre todos los artículos
            de su departamento.
          </p>
        </div>

        <div className="border-2 my-2 rounded-lg p-5 hover:border-black">
          <div className="flex">
            <Image
              src={Libreta}
              width={40}
              height={40}
              /* className="w-full h-auto" */
              alt="Inventory img"
            />
            <h1 className=" mx-3 text-3xl font-semibold text-blue-950 text-center">
              Variaciones en los artículos
            </h1>
          </div>

          <p className="text-xl  my-4 text-justify">
            Organice los artículos del inventario utilizando atributos
            personalizados como tamaño, color y ubicación. Al crear un sistema de
            categorización adaptado a las necesidades específicas de su negocio,
            puede mejorar la precisión de inventario, reducir el tiempo de
            búsqueda y aumentar la productividad.
          </p>
        </div>

        <div className="border-2 my-2 rounded-lg p-5 hover:border-black">
          <div className="flex">
            <Image
              src={Informes}
              width={40}
              height={40}
              /* className="w-full h-auto" */
              alt="Inventory img"
            />
            <h1 className=" mx-3 text-3xl font-semibold text-blue-950 text-center">
              Informes
            </h1>
          </div>

          <p className="text-xl  my-4 text-justify">
            Genere informes extremadamente detallados de los artículos en
            existencia. Con esta información, puedes tomar decisiones 
            sobre qué productos mantener en existencias, cuándo volver a
            abastecer y cómo se deprecian tus artículos.
          </p>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
}
