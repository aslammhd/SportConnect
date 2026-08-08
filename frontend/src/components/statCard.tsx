import type { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: number;
  icon: ReactNode;
}

function StatCard({
  title,
  value,
  icon,
}: StatCardProps) {
  return (
    <div
      className="
        bg-white
        rounded-2xl
        shadow-md
        p-6
        flex
        flex-col
        items-center
        justify-center
        text-center
        hover:shadow-xl
        transition
      "
    >
      <div className="text-blue-600 mb-3">
        {icon}
      </div>

      <h3 className="text-gray-600 text-sm">
        {title}
      </h3>

      <p className="text-3xl font-bold mt-2">
        {value}
      </p>
    </div>
  );
}

export default StatCard;