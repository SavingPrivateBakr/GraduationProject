'use client'
import { useRouter } from "next/navigation"; 

export default function ActionCard({ title, description, icon, route }) {
  const router = useRouter(); 

  function handleClick() {
    router.push(route); 
  }

  return (
    <div
      className="inline-block w-1/3 cursor-pointer h-90 bg-backgroundforcard rounded-lg p-9 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-lg border border-[#3d3d3d] hover:border-[#6b46c1]"
      onClick={handleClick}
    >
      <div className="flex items-start gap-4">
        <div className="text-[#6b46c1] text-2xl">
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="font-roboto text-white text-xl font-semibold mb-2">
            {title}
          </h3>
          <p className="font-roboto text-[#a3a3a3] text-xl">{description}</p>
        </div>
      </div>
    </div>
  );
}
