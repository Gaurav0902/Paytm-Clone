import React from "react";

export function Card({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}): JSX.Element {
  return (
    <div
      className="p-4 shadow-xl rounded-lg bg-slate-100"
    >
      <h1 className="text-xl border-b pb-2 border-slate-400 mb-4">
        {title}
      </h1>
      <p>{children}</p>
    </div>
  );
}