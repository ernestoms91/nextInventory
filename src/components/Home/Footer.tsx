
const Footer = () => {
    const date = new Date();
    const year = date.getFullYear();
  return (
<footer
  className="flex  items-center text-center text-white bg-black">
  <div
    className="w-full p-4 text-center ">
    © {year} Copyright: Ernesto Menchaca Sardiñas. Todos los derechos reservados.
  
  </div>
</footer>
  )
}

export default Footer