import Image from "next/image";
import Inv from "@/img/inv.jpg";

const ImageInv = () => {
  return (
      <Image
        src={Inv}
        className="w-full h-auto"
        alt="Inventory banner"
      />
  );
};

export default ImageInv;
