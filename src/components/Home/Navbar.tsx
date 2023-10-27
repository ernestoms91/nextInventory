"use client";

import Image from "next/image";
import Logo from "@/img/faicon.png";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { links } from "./NavbarData";



const Navbar = () => {

  const router = useRouter();
  const [active, setActive] = useState<boolean>(false);

  const { status, data: Session } = useSession();


  const handleActive = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setActive(!active);
  };

  return (
    <nav className=" z-20  bg-white shadow md:flex md:items-center  w-full sticky md:justify-between">
      <div className="flex justify-between">
        <Image src={Logo} width={100} height={100} alt="Inventory banner" />
        {/* <span className="text-2xl font-[Poppins] cursor-pointer">Radio Reloj</span> */}
        <button className="md:hidden" onClick={handleActive}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      <ul
        className={` sm:flex flex-col text-center mx-2   md:flex-row  ${
          active ? "" : "hidden"
        } md:flex`}
      >
        {links &&
          links.map((data, index) => {
          if  (Session?.user.rol === data.role  )
          return (
              <li
                key={index}
                className="flex justify-between border-4 border-transparent font-bold p-2 rounded-lg hover:border-b-black "
              >
                <Link href={data.url}>{data.name}</Link>
              </li>
            );
          })}
      { status==="authenticated" ? <button
          className="flex justify-between border-4 border-transparent font-bold  p-2 rounded-lg bg-black text-white "
          onClick={() => signOut()}
        >
          Salir
        </button> :
        <button
        className="flex justify-between border-4 border-transparent font-bold  p-2 rounded-lg bg-black text-white "
        onClick={() => router.push("/login")}
      >
        Acceder
      </button>
        
        }
      </ul>
    </nav>
  );
};

export default Navbar;
