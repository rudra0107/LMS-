import Image from "next/image";
import logo from "@/public/_d0d0d84b-2806-4b14-a62f-7255aefb492ddddddddd.jpeg";

export const Logo = () => {
  return (
    <Image
      className="object-cover"
      height={74}
      width={74}
      alt="logo"
      src={logo}
    />
  );
};
