import AuthLayout from "../../components/AuthLayout";
import InputWithIcon from "../../components/InputWithIcon";
import SubmitButton from "../../components/SubmitButton";
import { Mail } from "lucide-react";

const ForgotPassworPage: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    //TODO: implement handler
  };

  return (
    <AuthLayout>
      <h2 className="text-2xl lg:text-3xl font-bold text-blue-700 mb-2 text-right">
        نسيت كلمة السر
      </h2>
      <p className="text-sm text-gray-700 mb-6 text-right">
        ادخل بريدك الالكتروني لارسال كود التحقق لاعادة تعيين كلمة السر
      </p>
      <form onSubmit={handleSubmit} className="w-full">
        <InputWithIcon
          type="email"
          name="email"
          placeholder="البريد الالكتروني"
          icon={Mail}
        />
        <button className="w-full text-center mx-auto block bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200 font-semibold text-lg shadow-md">
          ارسال
        </button>
      </form>
    </AuthLayout>
  );
};

export default ForgotPassworPage;
