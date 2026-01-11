import { AtSign, Check, Pencil, User } from "lucide-react";
import ContainerRoot from "../../layout/containerRoot/content";
import { useGetDataUser } from "../../hooks/useGetUserData/getUserData";
import React, { useState } from "react";
import { useGetToken } from "../../hooks/useGetToken/getToken";
import { fetchApi } from "../../services/api";
import Loading from "../../components/loading/content";
import ModalBox from "../../layout/modalBox/content";
import { useNavigate } from "react-router-dom";

export default function AccountPage() {
  const token = useGetToken();
  const dataUser = useGetDataUser();
  const [editProfile, setEditProfile] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function handleEditAccount(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const valueInput = event.target as HTMLFormElement;

    try {
      setIsLoading(true);
      const req = await fetchApi("/profile/update", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: valueInput.email.value,
          first_name: valueInput.firstName.value,
          last_name: valueInput.lastName.value,
        }),
      });

      const res = await req.json();
      if (res) {
        setIsSuccess(true);
      }
    } catch (error) {
      console.error("gagal fetch api", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleEditImage(event: React.ChangeEvent<HTMLInputElement>) {
    if (!event.target.files?.[0]) return;

    const file = event.target.files[0];

    const formData = new FormData();
    formData.append("file", file);

    try {
      setIsLoading(true);
      const req = await fetchApi("/profile/image", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const res = await req.json();
      if (res) {
        setIsSuccess(true);
      }
    } catch (error) {
      console.error("gagal fetch api", error);
    } finally {
      setIsLoading(false);
    }
  }

  function handleLogout() {
    localStorage.removeItem("loginToken");
    navigate("/");
  }

  // amboi123@gmail.com
  // asdfghjkl

  return (
    <ContainerRoot>
      <div className="w-full sm:w-11/12 md:w-3/4 lg:w-2/3 xl:w-3/5 mx-auto px-4 sm:px-6 md:px-0 py-6 sm:py-8 pt-12 sm:pt-16 md:pt-20">
        {isLoading ? (
          <div className="w-full sm:w-80 md:w-72 mx-auto animate-pulse">
            <div className="relative w-fit mx-auto">
              <div className="size-24 sm:size-28 md:size-32 rounded-full bg-gray-200" />

              <div className="absolute border-2 border-[#e8e8e8] bg-gray-100 p-1.5 rounded-full -right-4 bottom-0">
                <div className="size-4 sm:size-5 bg-gray-300 rounded" />
              </div>
            </div>

            <div className="mt-4 sm:mt-5 flex flex-col items-center gap-y-2 px-2">
              <div className="h-7 sm:h-8 md:h-9 w-40 sm:w-48 md:w-56 rounded bg-gray-200" />
            </div>
          </div>
        ) : (
          <div className="w-full sm:w-80 md:w-72 mx-auto">
            <div className="relative w-fit mx-auto">
              <img
                src={dataUser?.profile_image}
                alt="Profile"
                className="size-24 sm:size-28 md:size-32 rounded-full object-cover"
                loading="eager"
              />
              <div className="absolute border-2 border-[#e8e8e8] bg-white p-1.5 rounded-full -right-4 bottom-0 hover:bg-gray-50 transition-colors">
                <label htmlFor="edit-image" className="cursor-pointer">
                  <Pencil className="size-4 sm:size-5" />
                </label>
                <input
                  id="edit-image"
                  type="file"
                  accept=".jpg,.jpeg"
                  onChange={handleEditImage}
                  className="hidden"
                />
              </div>
            </div>
            <h1 className="mt-4 sm:mt-5 font-bold text-2xl sm:text-3xl text-center wrap-break-words px-2">
              {dataUser?.first_name} {dataUser?.last_name}
            </h1>
          </div>
        )}

        {editProfile ? (
          <form
            className="mt-8 sm:mt-10 grid grid-cols-1 gap-y-4 sm:gap-y-5"
            onSubmit={(e) => handleEditAccount(e)}
          >
            <div>
              <label
                htmlFor="email"
                className="font-semibold tracking-wide text-base sm:text-lg"
              >
                Email
              </label>
              <div className="relative flex items-center mt-2 sm:mt-3">
                <input
                  id="email"
                  type="email"
                  className="pl-10 sm:pl-12 py-2.5 pr-4 border border-[#e8e8e8] placeholder:text-[#e8e8e8] w-full rounded-md text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#f5261b] focus:border-transparent"
                  defaultValue={dataUser?.email}
                />
                <AtSign className="size-4 sm:size-4.5 absolute left-3 sm:left-3.5 text-gray-400" />
              </div>
            </div>
            <div>
              <label
                htmlFor="firstName"
                className="font-semibold tracking-wide text-base sm:text-lg"
              >
                Nama Depan
              </label>
              <div className="relative flex items-center mt-2 sm:mt-3">
                <input
                  id="firstName"
                  type="text"
                  className="pl-10 sm:pl-12 py-2.5 pr-4 border border-[#e8e8e8] placeholder:text-[#e8e8e8] w-full rounded-md text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#f5261b] focus:border-transparent"
                  defaultValue={dataUser?.first_name}
                />
                <User className="size-4 sm:size-4.5 absolute left-3 sm:left-3.5 text-gray-400" />
              </div>
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="font-semibold tracking-wide text-base sm:text-lg"
              >
                Nama Belakang
              </label>
              <div className="relative flex items-center mt-2 sm:mt-3">
                <input
                  id="lastName"
                  type="text"
                  className="pl-10 sm:pl-12 py-2.5 pr-4 border border-[#e8e8e8] placeholder:text-[#e8e8e8] w-full rounded-md text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#f5261b] focus:border-transparent"
                  defaultValue={dataUser?.last_name}
                />
                <User className="size-4 sm:size-4.5 absolute left-3 sm:left-3.5 text-gray-400" />
              </div>
            </div>
            <button
              className="border-2 border-[#f5261b] text-[#f5261b] rounded-lg py-2.5 sm:py-3 font-semibold tracking-wide text-base sm:text-lg hover:bg-[#f5261b] hover:text-white transition-colors mt-2"
              type="submit"
            >
              Simpan
            </button>
            <button
              className="bg-[#f5261b] text-white rounded-lg py-2.5 sm:py-3 font-semibold tracking-wide text-base sm:text-lg hover:bg-red-600 transition-colors"
              type="button"
              onClick={() => setEditProfile(false)}
            >
              Batalkan
            </button>
          </form>
        ) : (
          <div className="mt-8 sm:mt-10 grid grid-cols-1 gap-y-4 sm:gap-y-5">
            <div>
              <h3 className="font-semibold tracking-wide text-base sm:text-lg">
                Email
              </h3>
              <div className="h-11 sm:h-12 border border-[#e8e8e8] w-full relative mt-2 sm:mt-3 flex items-center rounded-md bg-gray-50">
                <AtSign className="size-4 sm:size-4.5 absolute left-3 sm:left-3.5 text-gray-400" />
                <span className="ml-10 sm:ml-12 text-sm sm:text-base text-gray-700 truncate pr-4">
                  {dataUser?.email}
                </span>
              </div>
            </div>
            <div>
              <h3 className="font-semibold tracking-wide text-base sm:text-lg">
                Nama Depan
              </h3>
              <div className="h-11 sm:h-12 border border-[#e8e8e8] w-full relative mt-2 sm:mt-3 flex items-center rounded-md bg-gray-50">
                <User className="size-4 sm:size-4.5 absolute left-3 sm:left-3.5 text-gray-400" />
                <span className="ml-10 sm:ml-12 text-sm sm:text-base text-gray-700 truncate pr-4">
                  {dataUser?.first_name}
                </span>
              </div>
            </div>
            <div>
              <h3 className="font-semibold tracking-wide text-base sm:text-lg">
                Nama Belakang
              </h3>
              <div className="h-11 sm:h-12 border border-[#e8e8e8] w-full relative mt-2 sm:mt-3 flex items-center rounded-md bg-gray-50">
                <User className="size-4 sm:size-4.5 absolute left-3 sm:left-3.5 text-gray-400" />
                <span className="ml-10 sm:ml-12 text-sm sm:text-base text-gray-700 truncate pr-4">
                  {dataUser?.last_name}
                </span>
              </div>
            </div>
            <button
              className="border-2 border-[#f5261b] text-[#f5261b] rounded-lg py-2.5 sm:py-3 font-semibold tracking-wide text-base sm:text-lg hover:bg-[#f5261b] hover:text-white transition-colors mt-2"
              onClick={() => setEditProfile(true)}
              type="button"
            >
              Edit Profile
            </button>
            <button
              className="bg-[#f5261b] text-white rounded-lg py-2.5 sm:py-3 font-semibold tracking-wide text-base sm:text-lg hover:bg-red-600 transition-colors"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        )}

        <ModalBox isOpen={isSuccess}>
          <div className="px-4 sm:px-6 py-2">
            <div className="mx-auto mb-4 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-emerald-500">
              <Check className="text-white size-6 sm:size-7" strokeWidth={3} />
            </div>
            <p className="text-lg sm:text-xl text-gray-600 font-semibold text-center">
              Berhasil edit profile
            </p>
            <button
              onClick={() => setIsSuccess(false)}
              className="mt-5 text-base sm:text-lg font-semibold text-[#f5261b] hover:underline w-full py-2"
            >
              Oke
            </button>
          </div>
        </ModalBox>
        {isLoading && <Loading />}
      </div>
    </ContainerRoot>
  );
}
