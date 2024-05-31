import React from "react";

// Interface for the props expected by ListWrapper component
interface ListWrapperProps {
  children: React.ReactNode;
}

const ListWrapper = ({ children }: ListWrapperProps) => {
  return (
    <li className={"h-full w-[272px] shrink-0 select-none"}>{children}</li>
  );
};

export default ListWrapper;
