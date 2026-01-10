import { AtSign, User, X } from "lucide-react";
import Input from "../../components/input/content";
import AuthPageLayout from "../../layout/authPage/content";
import { useState } from "react";
import Loading from "../../components/loading/content";
import { fetchApi } from "../../services/api";

export default function RegisterPage() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isNotSamePassword, setIsNotSamePassword] = useState(false);
  const [isEmailAlreadyExists, setIsEmailAlreadyExists] = useState(false);
  const [passwordLess8Character, setPasswordLess8Character] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function handleRegisterAccount(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();
    const valueInput = event.target as HTMLFormElement;

    if (valueInput.password.value !== valueInput.confirmPassword.value) {
      setIsNotSamePassword(true);
      setPasswordLess8Character(false);
      return;
    } else {
      try {
        setIsLoading(true);
        const req = await fetchApi("/registration", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: valueInput.email.value,
            first_name: valueInput.firstName.value,
            last_name: valueInput.lastName.value,
            password: valueInput.password.value,
          }),
        });

        const res = await req.json();
        if (res.message === "Email sudah terdaftar") {
          setIsEmailAlreadyExists(true);
          setPasswordLess8Character(false);
        } else if (res.message === "Password length minimal 8 karakter") {
          setPasswordLess8Character(true);
          setIsEmailAlreadyExists(false);
        } else {
          setIsSuccess(true);
          setIsEmailAlreadyExists(false);
          setPasswordLess8Character(false);
        }
      } catch (error) {
        console.error("gagal fetch api", error);
      } finally {
        setIsNotSamePassword(false);
        setIsLoading(false);
      }
    }
  }

  return (
    <div className="relative">
      <AuthPageLayout
        authTitle="lengkapi data untuk membuat akun"
        callAction="sudah punya akun? login"
        href="/"
      >
        <form
          onSubmit={(e) => handleRegisterAccount(e)}
          className="grid grid-cols-1 gap-y-6 w-2/3"
        >
          <div>
            <Input
              typeInput="email"
              placeholder="masukkan email anda"
              inputId="email"
              isError={isEmailAlreadyExists}
            >
              <AtSign />
            </Input>
            {isEmailAlreadyExists && (
              <h3 className="text-[#f5261b] tracking-wide mt-2 text-end text-sm">
                Email sudah terdaftar
              </h3>
            )}
          </div>
          <Input
            typeInput="text"
            placeholder="nama depan"
            inputId="firstName"
            isError={false}
          >
            <User />
          </Input>
          <Input
            typeInput="text"
            placeholder="nama belakang"
            inputId="lastName"
            isError={false}
          >
            <User />
          </Input>
          <div>
            <Input
              typeInput="password"
              placeholder="buat password"
              inputId="password"
              isError={passwordLess8Character}
            >
              <User />
            </Input>
            {passwordLess8Character && (
              <h3 className="text-[#f5261b] tracking-wide mt-2 text-end text-sm">
                Password length minimal 8 karakter
              </h3>
            )}
          </div>
          <div>
            <Input
              typeInput="password"
              placeholder="konfirmasi password"
              inputId="confirmPassword"
              isError={isNotSamePassword}
            >
              <User />
            </Input>
            {isNotSamePassword && (
              <h3 className="text-[#f5261b] tracking-wide mt-2 text-end text-sm">
                Password tidak sama
              </h3>
            )}
          </div>
          <button className="bg-[#f5261b] text-[#e8e8e8] tracking-wider font-semibold text-xl py-2.5 rounded-md cursor-pointer hover:bg-red-500">
            Registrasi
          </button>
        </form>
        {isLoading && <Loading />}
        {isSuccess && (
          <div className="bg-red-50 mt-5 px-5 py-3 w-10/12 font-semibold flex items-center text-sm justify-between">
            <h2>Registrasi berhasil silahkan login</h2>
            <X className="cursor-pointer" onClick={() => setIsSuccess(false)} />
          </div>
        )}
      </AuthPageLayout>
    </div>
  );
}
