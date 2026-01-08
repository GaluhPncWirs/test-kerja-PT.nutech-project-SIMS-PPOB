import { AtSign, Lock } from "lucide-react";
import Input from "../../components/input/content";
import AuthPageLayout from "../../layout/authPage/content";

export default function RegisterPage() {
  return (
    <div>
      <AuthPageLayout
        authTitle="lengkapi data untuk membuat akun"
        titleBtnAction="Registrasi"
        callAction="sudah punya akun? login"
        href="/Login"
      >
        <Input typeInput="email" placeholder="masukkan email anda">
          <AtSign className="text-[#e8e8e8]" />
        </Input>
        <Input typeInput="text" placeholder="nama depan">
          <img src="/images/globalImg/person.png" alt="Person" />
        </Input>
        <Input typeInput="text" placeholder="nama belakang">
          <img src="/images/globalImg/person.png" alt="Person" />
        </Input>
        <Input typeInput="password" placeholder="buat password">
          <Lock className="text-[#e8e8e8]" />
        </Input>
        <Input typeInput="password" placeholder="konfirmasi password">
          <Lock className="text-[#e8e8e8]" />
        </Input>
      </AuthPageLayout>
    </div>
  );
}
