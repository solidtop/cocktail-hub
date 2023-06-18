"use client";

import {
  FC,
  useEffect,
  useRef,
  useState,
  Children,
  cloneElement,
  ReactElement,
  useCallback,
} from "react";

type ReactElementProps = {
  className: string;
};

type DropdownMenuProps = {
  label: string;
  icon?: ReactElement<React.SVGProps<SVGSVGElement>>;
  children: ReactElement<ReactElementProps>[];
  responsive?: boolean;
};

const DropdownMenu: FC<DropdownMenuProps> = ({
  label,
  icon,
  children,
  responsive = false,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback((ev: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(ev.target as Node)
    ) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const menuStyling = `${
    responsive
      ? "mx-4 md:absolute md:mx-0 animate-dropdown-reveal md:animate-none"
      : "absolute"
  } top-full mt-2 z-50 rounded bg-backdrop-color max-h-96 overflow-scroll shadow-xl`;
  const itemStyling = `${
    responsive ? "text-center md:text-left" : "text-left"
  } relative whitespace-nowrap hover:bg-hover-color rounded`;

  return (
    <div ref={dropdownRef} className="relative flex flex-col">
      <button
        className="px-4 py-2 bg-container-color rounded border-b-2 border-border-color flex justify-center items-center gap-4"
        type="button"
        onClick={() => setIsOpen((prevState) => !prevState)}
      >
        {icon}
        {label}
        <svg height="1em" viewBox="0 0 320 512" fill="white">
          <path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z" />
        </svg>
      </button>

      {isOpen && (
        <menu className={menuStyling}>
          {Children.map(children, (child, index) => (
            <li
              key={index}
              className={itemStyling}
              onClick={() => setIsOpen(false)}
            >
              {cloneElement(child, {
                className: "block w-full h-full px-4 py-2 text-left",
              })}
            </li>
          ))}
        </menu>
      )}
    </div>
  );
};

export default DropdownMenu;
