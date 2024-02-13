import React from "react";

interface Props {
  title: string;
  rightComponent?: React.ReactNode;
}
export default function PageHeader({ title, rightComponent }: Props) {
  return (
    <div className="flex items-center justify-between gap-4">
      <h3 className="text-lg font-semibold capitalize">{title}</h3>
      {rightComponent}
    </div>
  );
}
