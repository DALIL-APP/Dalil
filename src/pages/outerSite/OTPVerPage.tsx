import React, {useState, useRef, useEffect} from 'react';
import AuthLayout from '../../components/AuthLayout';
import SubmitButton from '../../components/SubmitButton';


const OTPVerPage: React.FC = () => {
    const OTP_LENGTH = 4;
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(''));
  const [secondsLeft, setSecondsLeft] = useState<number>(30);
  const [canResend, setCanResend] = useState<boolean>(false);
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  // Countdown timer effect
  useEffect(() => {
    if (secondsLeft <= 0) {
      setCanResend(true);
      return;
    }

    const timer = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [secondsLeft]);

  // Resend button handler
  const handleResend = () => {
    if (!canResend) return;

    // TODO: Trigger resend logic here
    console.log('OTP Resent');
    setOtp(Array(OTP_LENGTH).fill(''));
    setSecondsLeft(30);
    setCanResend(false);
    inputsRef.current[0]?.focus();
  };

    const handleChange = (value: string, index: number) => {
        if (!/^[0-9]$/.test(value)) return;
        const updated = [...otp];
        updated[index] = value;
        setOtp(updated);
        if (index < otp.length - 1) {
            inputsRef.current[index + 1]?.focus();
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === 'Backspace') {
          if (otp[index]) {
            const updated = [...otp];
            updated[index] = '';
            setOtp(updated);
          } else if (index > 0) {
            inputsRef.current[index - 1]?.focus();
          }
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('OTP Submitted:', otp.join(''));
        // TODO: Submit OTP
      };

      return(
        <AuthLayout>
            <h2 className="text-2xl lg:text-3xl font-bold text-blue-700 mb-2 text-right">
                التحقق  
            </h2>
            <p className="text-sm text-gray-700 mb-6 text-right">
                أدخل الرمز المكون من 4 أرقام الذي تم إرساله على بريدك الإلكتروني    
            </p>
            <form onSubmit={handleSubmit} className='w-full'>
            <div dir="ltr" className='flex justify-center gap-3'>
                {[0, 1, 2, 3].map((i) => {
            return (
              <input
                key={i}
                ref={(el) => void (inputsRef.current[i] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={otp[i]}
                onChange={(e) => handleChange(e.target.value, i)}
                onKeyDown={(e) => handleKeyDown(e, i)}
                className="w-20 h-20 text-center bg-white bg-opacity-0 border border-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
              />
            );
          })}
                </div>
                <p className="text-center text-sm text-gray-500 mt-1 p-4">
                    {secondsLeft > 0 ? `00:${secondsLeft.toString().padStart(2, '0')}` : 'انتهى الوقت'}
                </p>

                <SubmitButton lable="تأكيد" />

                <p className="text-center text-base text-gray-600 p-2">
                  إذا لم تتلقَ الرمز؟{' '}
                    <button
                        type="button"
                        disabled={!canResend}
                        onClick={handleResend}
                        className={`font-medium ${canResend ? 'text-red-500 hover:underline': 'text-gray-400 cursor-not-allowed'}`}
                    >
                        إعادة الإرسال       
                    </button>
                </p>
            </form>
        </AuthLayout>
    );
};

export default OTPVerPage;