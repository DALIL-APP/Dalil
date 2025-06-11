import React from 'react';
import { Facebook, Twitter, Linkedin, Mail, User } from 'lucide-react'; // Example icons
import logo from '../assets/logo.png';

interface FooterProps {
}

const Footer: React.FC<FooterProps> = () => {
  return (
    <footer className="bg-[linear-gradient(84.42deg,_#AEDDE9_0%,_#C7E9F1_53.17%,_#ADD8E2_100%)] text-white p-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">

          {/* Column 1: Logo and Description */}
            <div className="text-right">
                <div className='inline-block'>
                    <h4 className="text-lg font-semibold text-black mb-1">أخر التحديثات</h4>
                    <div className="h-1 bg-blue-600 rounded w-full"></div>
                </div>
                <p className='text-sm mb-4 text-gray-500 mt-2'>
                    ابق على اتصال معنا للحصول على تحديثات منتظمة من خلال تقديم اسمك وعنوان بريدك الإلكتروني
                </p>
                {/* Example placeholders for latest updates */}
                <div className="flex items-center mb-3 text-gray-500">
                    <input type="text" readOnly value="اسم المستخدم" className="w-full p-2 bg-white bg-opacity-0 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right placeholder-gray-500 shadow-sm"/>
                    <span className="absolute pl-1 text-blue-600">
                        <User size={20}/>
                    </span>
                </div>

                <div className="flex items-center text-gray-500">
                    <span className="absolute pl-1 text-blue-600">
                        <Mail size={20}/>
                    </span>
                    <input type="email" readOnly value="البريد الالكتروني" className="w-full p-2 bg-white bg-opacity-0 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right placeholder-gray-500 shadow-sm"/>
                
                </div>

                {/* Add more update items as needed */}
            </div>

            {/* Column 2: Information Links */}
            <div className="text-center">
                <div className="inline-block">
                    <h4 className="text-lg font-semibold text-black mb-1">المعلومات</h4>
                    <div className="h-1 bg-blue-600 rounded w-full"></div>
                </div>
                <ul className='mt-2'>
                    <li className="mb-2"><a href="#" className="text-sm hover:underline text-gray-500">الرئيسية</a></li>
                    <li className="mb-2"><a href="#" className="text-sm hover:underline text-gray-500">من نحن</a></li>
                    <li className="mb-2"><a href="#" className="text-sm hover:underline text-gray-500">الخدمات</a></li>
                    <li className="mb-2"><a href="#" className="text-sm hover:underline text-gray-500">المقالات</a></li>
                    <li className="mb-2"><a href="#" className="text-sm hover:underline text-gray-500">تواصل معنا</a></li>
                </ul>
            </div>

            {/* Column 3: Latest Updates */}
            <div className="items-center">

                {/* Replace with your actual Logo component or image */}
                <img src={logo} alt="DALIL Logo" className="h-16 lg:h-20 w-auto mb-4 mx-auto" /> 
                <p className="text-sm mb-4 text-gray-500 text-right">
                {/* Example Description */}
                    نسعى لتمكين ذوي الاحتياجات الخاصة من الوصول إلى الخدمات بسهولة وكرامة، من خلال تصميم حلول مبتكرة وشاملة تلبي 
                    احتياجاتهم وتعزز استقلاليتهم في الحياة اليومية.
                </p>

                {/* Social Media Icons */}
                
            </div>
            

          
        </div>

        {/* Copyright */}
        <div className="flex border-t border-gray-600 mt-8 pt-6 text-right text-sm  text-black">
            <div className="flex space-x-4 text-blue-600 text-right w-1/2">
                <a href="#" aria-label="Facebook"><Facebook size={20} /></a>
                <a href="#" aria-label="Twitter"><Twitter size={20} /></a>
                <a href="#" aria-label="LinkedIn"><Linkedin size={20} /></a>
            </div>
            <p className='text-right w-1/2'> جميع الحقوق محفوظة 2025 <span className='text-blue-700'>Dalil Team</span> تم الإنشاء بواسطة </p>    
        </div>
      </div>
    </footer>
  );
};

export default Footer;