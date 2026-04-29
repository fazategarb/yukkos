import type { ChangeEvent, FC, ReactNode } from "react";

interface InputBoxProps {
    label?: string;
    name: string;
    value: string;
    placeholder?: string;
    type?: 'text' | 'password' | 'email' | 'number';
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    error?: string;
    disabled?: boolean;
    className?: string;
    rightIcon?: ReactNode; // Tambahkan ini
}

const InputBox: FC<InputBoxProps> = ({
    label,
    name,
    value,
    placeholder,
    type = 'text',
    onChange,
    error,
    disabled = false,
    className = '',
    rightIcon // Tambahkan ini
}) => {
    return (
        <div className={`flex flex-col gap-1.5 w-full ${className}`}>
            {label && (
                <label htmlFor={name} className="text-sm font-semibold text-gray-700">
                    {label}
                </label>
            )}
      
            {/* Bungkus input dengan div relative agar icon bisa absolute */}
            <div className="relative flex items-center">
                <input
                    id={name}
                    name={name}
                    type={type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    disabled={disabled}
                    className={`px-4 py-2 border rounded-lg transition-all outline-none focus:ring-2 w-full
                        ${disabled ? 'bg-gray-100 cursor-not-allowed text-gray-500' : 'bg-white'}
                        ${error 
                            ? 'border-red-500 focus:ring-red-200' 
                            : 'border-gray-300 focus:border-blue-500 focus:ring-blue-100'}
                        ${rightIcon ? 'pr-10' : ''} // Beri jarak kanan jika ada icon
                    `}
                />
                
                {rightIcon && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-600 transition-colors">
                        {rightIcon}
                    </div>
                )}
            </div>

            {error && (
                <span className="text-xs text-red-500 font-medium italic">
                    {error}
                </span>
            )}
        </div>
    );
};

export default InputBox;