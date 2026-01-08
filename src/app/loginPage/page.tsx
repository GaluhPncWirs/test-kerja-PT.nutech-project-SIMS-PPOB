import { AtSign, Lock } from "lucide-react";
import Input from "../../components/input/content";
import AuthPageLayout from "../../layout/authPage/content";

export default function LoginPage() {
  return (
    <div>
      <AuthPageLayout
        authTitle="Masuk atau buat akun untuk memulai"
        titleBtnAction="Masuk"
        callAction="belum punya akun? registrasi"
        href="/Registrasi"
      >
        <Input typeInput="email" placeholder="masukkan email anda">
          <AtSign className="text-[#e8e8e8]" />
        </Input>
        <Input typeInput="password" placeholder="masukkan password anda">
          <Lock className="text-[#e8e8e8]" />
        </Input>
      </AuthPageLayout>
    </div>
  );
}
