// import AuthLayout from "../../components/AuthLayout";
// import InputWithIcon from "../../components/InputWithIcon";
// // import SubmitButton from "../../components/SubmitButton";
// import { Mail, User, Calendar, Phone, MapPin, Lock } from "lucide-react";

// const SignUp: React.FC = () => {
//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     //TODO: implement handler
//   };

//   return (
//     <AuthLayout>
//       <h2 className="text-2xl lg:text-3xl font-bold text-blue-700 mb-2 text-right">
//         إنشاء حساب جديد
//       </h2>
//       <p className="text-sm text-gray-700 mb-6 text-right">
//         هل لديك حساب بالفعل؟
//         <a href="/Login" className="text-blue-700 hover:underline font-medium">
//           {" "}
//           تسجيل الدخول
//         </a>
//       </p>
//       <form onSubmit={handleSubmit} className="w-full flex flex-col">
//         <div className="flex flex-col md:flex-row gap-0 md:gap-4 mb-0">
//           <div className="w-full md:w-1/2 ">
//             <InputWithIcon
//               type="text"
//               name="name"
//               placeholder="الاسم"
//               icon={User}
//             />
//           </div>
//           <div className="w-full md:w-1/2">
//             <InputWithIcon
//               type="email"
//               name="email"
//               placeholder="البريد الالكتروني"
//               icon={Mail}
//             />
//           </div>
//         </div>
//         <InputWithIcon
//           type="date"
//           name="dateOfBirth"
//           placeholder="تاريخ الميلاد"
//           icon={Calendar}
//         />
//         <div className="flex flex-col md:flex-row gap-0 md:gap-4 mb-0">
//           <div className="w-full md:w-1/2">
//             <InputWithIcon
//               type="tel"
//               name="phoneNumber"
//               placeholder="رقم الهاتف"
//               icon={Phone}
//             />
//           </div>
//           <div className="w-full md:w-1/2">
//             <InputWithIcon
//               type="text"
//               name="responsible"
//               placeholder="اسم الشخص المسؤول"
//               icon={User}
//             />
//           </div>
//         </div>
//         <InputWithIcon
//           type="text"
//           name="Location"
//           placeholder="موقعك الحالي"
//           icon={MapPin}
//         />
//         <div className="flex flex-col md:flex-row gap-0 md:gap-4 mb-0">
//           <div className="w-full md:w-1/2">
//             <InputWithIcon
//               type="password"
//               name="password"
//               placeholder="كلمة السر"
//               icon={Lock}
//             />
//           </div>
//           <div className="w-full md:w-1/2">
//             <InputWithIcon
//               type="password"
//               name="ConfirmPassword"
//               placeholder="تأكيد كلمة السر"
//               icon={Lock}
//             />
//           </div>
//         </div>
//         <button className="w-full text-center mx-auto block bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200 font-semibold text-lg shadow-md">
//           إنشاء حساب
//         </button>
//       </form>
//     </AuthLayout>
//   );
// };

// export default SignUp;

// import AuthLayout from "../../components/AuthLayout";
// import InputWithIcon from "../../components/InputWithIcon";
// import { Mail, User, Calendar, Phone, MapPin, Lock } from "lucide-react";
// import { useState } from "react";

// const SignUp = () => {
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     password: "",
//     rePassword: "",
//     phoneNumber: "",
//     dateOfBirth: "",
//     address: "",
//     nameOfPersonInCharge: "",
//     numberPhoneOfPersonInCharge: ""
//   });

//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError("");

//     if (formData.password !== formData.rePassword) {
//       setError("كلمات السر غير متطابقة");
//       setIsLoading(false);
//       return;
//     }

//     try {
//       const response = await fetch(
//         "https://dalail-project-daoud.vercel.app/api/v1/auth/signUp",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             firstName: formData.firstName,
//             lastName: formData.lastName,
//             email: formData.email,
//             password: formData.password,
//             rePassword: formData.rePassword,
//             phoneNumber: formData.phoneNumber,
//             dateOfBirth: formData.dateOfBirth,
//             address: formData.address,
//             nameOfPersonInCharge: formData.nameOfPersonInCharge,
//             numberPhoneOfPersonInCharge: formData.numberPhoneOfPersonInCharge
//           }),
//         }
//       );

//       const data = await response.json();

//       if (!response.ok) throw new Error(data.message || "Registration failed");
//       if (data.success) {
//         window.location.href = "/login";
//       } else {
//         setError(data.message || "Unknown error occurred");
//       }
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "Connection error");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <AuthLayout>
//       <h2 className="text-2xl lg:text-3xl font-bold text-blue-700 mb-2 text-right">
//         إنشاء حساب جديد
//       </h2>

//       <p className="text-sm text-gray-700 mb-6 text-right">
//         هل لديك حساب بالفعل؟
//         <a href="/login" className="text-blue-700 hover:underline font-medium">
//           {" "}تسجيل الدخول
//         </a>
//       </p>

//       {error && (
//         <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-right">
//           {error}
//         </div>
//       )}

//       <form onSubmit={handleSubmit} className="w-full flex flex-col">
//         {/* Name Fields */}
//         <div className="flex flex-col md:flex-row gap-4 mb-0">
//           <div className="w-full md:w-1/2">
//             <InputWithIcon
//               type="text"
//               name="firstName"
//               placeholder="الاسم الأول"
//               icon={User}
//               value={formData.firstName}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="w-full md:w-1/2">
//             <InputWithIcon
//               type="text"
//               name="lastName"
//               placeholder="الاسم الأخير"
//               icon={User}
//               value={formData.lastName}
//               onChange={handleChange}
//               required
//             />
//           </div>
//         </div>

//         {/* Email & Date of Birth */}
//         <InputWithIcon
//           type="email"
//           name="email"
//           placeholder="البريد الإلكتروني"
//           icon={Mail}
//           value={formData.email}
//           onChange={handleChange}
//           required
//         />

//         {/* Phone & Responsible Person */}
//         <div className="flex flex-col md:flex-row gap-4 mb-0">
//           <div className="w-full md:w-1/2">
//             <InputWithIcon
//               type="tel"
//               name="phoneNumber"
//               placeholder="رقم الهاتف"
//               icon={Phone}
//               value={formData.phoneNumber}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="w-full md:w-1/2">
//             <InputWithIcon
//               type="text"
//               name="nameOfPersonInCharge"
//               placeholder="اسم المسؤول"
//               icon={User}
//               value={formData.nameOfPersonInCharge}
//               onChange={handleChange}
//               required
//             />
//           </div>
//         </div>

//         {/* Password Fields */}
//         <div className="flex flex-col md:flex-row gap-4 mb-4">
//           <div className="w-full md:w-1/2">
//             <InputWithIcon
//               type="password"
//               name="password"
//               placeholder="كلمة السر"
//               icon={Lock}
//               value={formData.password}
//               onChange={handleChange}
//               required
//               minLength={8}
//             />
//           </div>
//           <div className="w-full md:w-1/2">
//             <InputWithIcon
//               type="password"
//               name="rePassword"
//               placeholder="تأكيد كلمة السر"
//               icon={Lock}
//               value={formData.rePassword}
//               onChange={handleChange}
//               required
//             />
//           </div>
//         </div>

//         <button
//           type="submit"
//           disabled={isLoading}
//           className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700
//                      focus:outline-none focus:ring-2 focus:ring-blue-500 transition
//                      duration-200 font-semibold text-lg shadow-md disabled:opacity-70"
//         >
//           {isLoading ? "جاري التسجيل..." : "إنشاء حساب"}
//         </button>
//       </form>
//     </AuthLayout>
//   );
// };

// export default SignUp;

import AuthLayout from "../../components/AuthLayout";
import InputWithIcon from "../../components/InputWithIcon";
import { Mail, User, Calendar, Phone, MapPin, Lock } from "lucide-react";
import { useState } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";

interface ApiResponse {
  success: boolean;
  message?: string;
  // Add other properties if your API returns more data
}

const SignUp: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "", // Will be split into firstName and lastName
    email: "",
    dateOfBirth: "",
    phoneNumber: "",
    responsible: "", // Maps to nameOfPersonInCharge
    Location: "", // Maps to address
    password: "",
    ConfirmPassword: "", // Maps to rePassword
    responsiblePhone: "", // New field for numberPhoneOfPersonInCharge
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validation
    if (formData.password !== formData.ConfirmPassword) {
      setError("كلمات السر غير متطابقة");
      return;
    }

    // Split name into first and last name
    const nameParts = formData.name.split(" ");
    const firstName = nameParts[0] || "moh";
    const lastName = nameParts.slice(1).join(" ") || "داود";

    // Format date
    const formattedDate = formData.dateOfBirth
      ? formData.dateOfBirth.replace(/-/g, "/").replace(/\/0/g, "/")
      : "2002/8/23";

    try {
      const requestData = {
        firstName: formData,
        lastName: lastName,
        email: formData.email || "daoudmahmud@gmail.com",
        password: formData.password || "Daoud@3312",
        rePassword: formData.ConfirmPassword || "Daoud@3312",
        phoneNumber: formData.phoneNumber || "01092783773",
        dateOfBirth: formattedDate,
        address: formData.Location || "damnhour",
        nameOfPersonInCharge: formData.responsible || "mohamed",
        numberPhoneOfPersonInCharge: formData.responsiblePhone || "01063102521",
      };

      const response = await axios.post<ApiResponse>(
        "https://dalail-project-daoud.vercel.app/api/v1/auth/signUp",
        requestData
      );

      // Now response.data is properly typed as ApiResponse
      if (response.data.success) {
        navigate("/login");
      } else {
        setError(response.data.message || "حدث خطأ أثناء التسجيل");
      }
    } catch (err) {
      if (err && typeof err === "object" && "response" in err) {
        const axiosError = err as {
          response?: {
            data?: {
              message?: string;
            };
          };
        };
        setError(
          axiosError.response?.data?.message || "حدث خطأ أثناء الاتصال بالخادم"
        );
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("حدث خطأ غير متوقع");
      }
    }
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
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-right">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="w-full flex flex-col">
        <div className="flex flex-col md:flex-row gap-0 md:gap-4 mb-0">
          <div className="w-full md:w-1/2 ">
            <InputWithIcon
              type="text"
              name="name"
              placeholder="الاسم (الاسم الأول واللقب)"
              icon={User}
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="w-full md:w-1/2">
            <InputWithIcon
              type="text"
              name="lastName"
              placeholder="الاسم الأخير"
              icon={User}
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="w-full">
          <InputWithIcon
            type="email"
            name="email"
            placeholder="البريد الالكتروني"
            icon={Mail}
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <InputWithIcon
          type="date"
          name="dateOfBirth"
          placeholder="تاريخ الميلاد"
          icon={Calendar}
          value={formData.dateOfBirth}
          onChange={handleChange}
          required
        />
        <div className="flex flex-col md:flex-row gap-0 md:gap-4 mb-0">
          <div className="w-full md:w-1/2">
            <InputWithIcon
              type="tel"
              name="phoneNumber"
              placeholder="رقم الهاتف"
              icon={Phone}
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className="w-full md:w-1/2">
            <InputWithIcon
              type="text"
              name="responsible"
              placeholder="اسم الشخص المسؤول"
              icon={User}
              value={formData.responsible}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-0 md:gap-4 mb-0">
          <div className="w-full md:w-1/2">
            <InputWithIcon
              type="text"
              name="Location"
              placeholder="موقعك الحالي"
              icon={MapPin}
              value={formData.Location}
              onChange={handleChange}
              required
            />
          </div>
          <div className="w-full md:w-1/2">
            <InputWithIcon
              type="tel"
              name="responsiblePhone"
              placeholder="هاتف الشخص المسؤول"
              icon={Phone}
              value={formData.responsiblePhone}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-0 md:gap-4 mb-0">
          <div className="w-full md:w-1/2">
            <InputWithIcon
              type="password"
              name="password"
              placeholder="كلمة السر"
              icon={Lock}
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="w-full md:w-1/2">
            <InputWithIcon
              type="password"
              name="ConfirmPassword"
              placeholder="تأكيد كلمة السر"
              icon={Lock}
              value={formData.ConfirmPassword}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full text-center mx-auto block bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200 font-semibold text-lg shadow-md"
        >
          إنشاء حساب
        </button>
      </form>
    </AuthLayout>
  );
};

export default SignUp;
