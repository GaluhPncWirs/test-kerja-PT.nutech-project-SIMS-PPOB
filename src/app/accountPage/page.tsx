import { AtSign, Pen } from "lucide-react";
import ContainerRoot from "../../layout/containerRoot/content";
import Input from "../../components/input/content";

export default function AccountPage() {
  return (
    <ContainerRoot>
      <div>
        <div className="w-72 mx-auto">
          <div className="relative flex justify-center items-center">
            <img
              src="/images/globalImg/Profile Photo.png"
              alt="Profile"
              className="size-36"
            />
            <div className="absolute border-2 border-[#e8e8e8] p-1.5 rounded-full right-14 bottom-1">
              <Pen className="size-5" />
            </div>
          </div>
          <h1 className="mt-5 font-bold text-3xl text-center">
            Kristanto Wibowo
          </h1>
        </div>
        <div className="mt-10">
          <label htmlFor="">Email</label>
          <Input placeholder="" typeInput="email">
            <AtSign />
          </Input>
        </div>
      </div>
    </ContainerRoot>
  );
}
