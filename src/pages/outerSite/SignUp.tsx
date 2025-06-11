import AuthLayout from "../../components/AuthLayout";
import InputWithIcon from "../../components/InputWithIcon";
import SubmitButton from "../../components/SubmitButton";
import { Mail, User, Calendar, Phone, MapPin, Lock } from "lucide-react";

const SignUp: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    //TODO: implement handler
  };

  return (
    <AuthLayout>
      <h2 className="text-2xl lg:text-3xl font-bold text-blue-700 mb-2 text-right">
        إنشاء حساب جديد
      </h2>
      <p className="text-sm text-gray-700 mb-6 text-right">
        هل لديك حساب بالفعل؟
        <a href="/Login" className="text-blue-700 hover:underline font-medium">
          {" "}
          تسجيل الدخول
        </a>
      </p>
      <form onSubmit={handleSubmit} className="w-full flex flex-col">
        <div className="flex flex-col md:flex-row gap-0 md:gap-4 mb-0">
          <div className="w-full md:w-1/2 ">
            <InputWithIcon
              type="text"
              name="name"
              placeholder="الاسم"
              icon={User}
            />
          </div>
          <div className="w-full md:w-1/2">
            <InputWithIcon
              type="email"
              name="email"
              placeholder="البريد الالكتروني"
              icon={Mail}
            />
          </div>
        </div>
        <InputWithIcon
          type="date"
          name="dateOfBirth"
          placeholder="تاريخ الميلاد"
          icon={Calendar}
        />
        <div className="flex flex-col md:flex-row gap-0 md:gap-4 mb-0">
          <div className="w-full md:w-1/2">
            <InputWithIcon
              type="tel"
              name="phoneNumber"
              placeholder="رقم الهاتف"
              icon={Phone}
            />
          </div>
          <div className="w-full md:w-1/2">
            <InputWithIcon
              type="text"
              name="responsible"
              placeholder="اسم الشخص المسؤول"
              icon={User}
            />
          </div>
        </div>
        <InputWithIcon
          type="text"
          name="Location"
          placeholder="موقعك الحالي"
          icon={MapPin}
        />
        <div className="flex flex-col md:flex-row gap-0 md:gap-4 mb-0">
          <div className="w-full md:w-1/2">
            <InputWithIcon
              type="password"
              name="password"
              placeholder="كلمة السر"
              icon={Lock}
            />
          </div>
          <div className="w-full md:w-1/2">
            <InputWithIcon
              type="password"
              name="ConfirmPassword"
              placeholder="تأكيد كلمة السر"
              icon={Lock}
            />
          </div>
        </div>
        <button className="w-full text-center mx-auto block bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200 font-semibold text-lg shadow-md">
          إنشاء حساب
        </button>
      </form>
    </AuthLayout>
  );
};

export default SignUp;
