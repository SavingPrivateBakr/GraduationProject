export default function InputField({ id, type, value, onChange, label, Icon,...props }) {
    return (
        <div className="relative mt-6">
            <input
                id={id}
                type={type}
                value={value}
                onChange={onChange}
                className="peer h-14 w-full cursor-text appearance-none
                border-b-2  text-base
                text-white placeholder-transparent  md:text-xl
                
                bg-[#0F172A] border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
                placeholder={``}
                {...props}
            />
            <label
                htmlFor={id}
                className="absolute left-1 -top-5 cursor-text text-sm text-gray-600 transition-all
                peer-placeholder-shown:top-4 peer-placeholder-shown:text-base
                peer-placeholder-shown:text-gray-400 peer-focus:-top-6 peer-focus:text-sm
                peer-focus:text-gray-600 md:text-base md:peer-placeholder-shown:text-xl md:peer-focus:text-base"
            >
                <span className="flex items-center space-x-3">
                    <Icon />
                    <span className="font-semibold">{label}</span>
                </span>
            </label>
        </div>
    );
}