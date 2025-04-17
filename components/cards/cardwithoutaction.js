'use client';

export default function Card({ title, description, Score }) {
  return (
    <div className="w-full h-full text-center bg-backgroundforcard rounded-lg p-7">
      <div className="flex items-start gap-4">
        <div className="flex-1">
          <h3 className="font-roboto text-white text-3xl font-semibold mb-2">
            {title}
          </h3>
          <p className="font-roboto text-[#a3a3a3] text-base leading-snug line-clamp-1">
            {description}
          </p>
          {Score !== undefined && (
            <p className="text-3xl mt-4 text-slate-300">
              {Score}%
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
