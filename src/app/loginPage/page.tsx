import { AtSign, Lock, X } from "lucide-react";
import Input from "../../components/input/content";
import AuthPageLayout from "../../layout/authPage/content";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/loading/content";
import { fetchApi } from "../../services/api";

export default function LoginPage() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isWrongPassword, setIsWrongPassword] = useState({
    status: false,
    message: "",
  });
  const [isEmailWrong, setIsEmailWrong] = useState({
    status: false,
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function handleLoginAccount(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const valueInput = event.target as HTMLFormElement;

    try {
      setIsLoading(true);
      const req = await fetchApi("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: valueInput.email.value,
          password: valueInput.password.value,
        }),
      });

      const res = await req.json();
      if (res.status === 102) {
        setIsEmailWrong({
          status: true,
          message: res.message,
        });
      } else if (res.status === 103) {
        setIsWrongPassword({
          status: true,
          message: res.message,
        });
      } else {
        setIsSuccess(true);
        navigate("/Homepage");
        localStorage.setItem("loginToken", res.data.token);
      }
    } catch (error) {
      console.error("gagal fetch api", error);
    } finally {
      setIsLoading(false);
      setInterval(() => {
        setIsWrongPassword({
          status: false,
          message: "",
        });
        setIsEmailWrong({
          status: false,
          message: "",
        });
      }, 3000);
    }
  }

  return (
    <div className="relative">
      <AuthPageLayout
        authTitle="Masuk atau buat akun untuk memulai"
        callAction="belum punya akun? registrasi"
        href="/Registrasi"
      >
        <form
          onSubmit={(e) => handleLoginAccount(e)}
          className="grid grid-cols-1 gap-y-6 w-2/3"
        >
          <Input
            typeInput="email"
            placeholder="masukkan email anda"
            inputId="email"
            isError={false}
            valueInput={""}
          >
            <AtSign />
          </Input>
          <Input
            typeInput="password"
            placeholder="masukkan password anda"
            inputId="password"
            isError={false}
            valueInput={""}
          >
            <Lock />
          </Input>
          <button className="bg-[#f5261b] text-[#e8e8e8] tracking-wider font-semibold text-xl py-2.5 rounded-md cursor-pointer hover:bg-red-500">
            Login
          </button>
        </form>
        {isEmailWrong.status ? (
          <div className="bg-red-50 mt-5 px-5 py-3 w-10/12 font-semibold flex items-center text-sm justify-between">
            <h2>{isEmailWrong.message}</h2>
            <X
              className="cursor-pointer"
              onClick={() => setIsEmailWrong({ message: "", status: false })}
            />
          </div>
        ) : isWrongPassword.status ? (
          <div className="bg-red-50 mt-5 px-5 py-3 w-10/12 font-semibold flex items-center text-sm justify-between">
            <h2>{isWrongPassword.message}</h2>
            <X
              className="cursor-pointer"
              onClick={() => setIsWrongPassword({ message: "", status: false })}
            />
          </div>
        ) : (
          isSuccess && (
            <div className="bg-red-50 mt-5 px-5 py-3 w-10/12 font-semibold flex items-center text-sm justify-between">
              <h2>Login Berhasil</h2>
              <X
                className="cursor-pointer"
                onClick={() => setIsSuccess(false)}
              />
            </div>
          )
        )}
      </AuthPageLayout>
      {isLoading && <Loading />}
    </div>
  );
}

// pecahseribu123@gmail.com
// qwertyuiop
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
//   .eyJlbWFpbCI6InBlY2Foc2VyaWJ1MTIzQGdtYWlsLmNvbSIsIm1lbWJlckNvZGUiOiJNSzc0N0kwNSIsImlhdCI6MTc2ODAxMjcxNywiZXhwIjoxNzY4MDU1OTE3fQ
//   .hVjTbPjgIESvDphlcODQs2w0Ldz4upqvS5DSoBWORog;
