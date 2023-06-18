import { FC, ReactNode } from "react";

type NoResultsMessageProps = {
  children: ReactNode;
};

const NoResultsMessage: FC<NoResultsMessageProps> = ({ children }) => {
  return (
    <div className="flex justify-center items-center max-w-md mx-auto my-10 py-10 bg-container-color rounded">
      <p className="text-center text-xl">{children}</p>
    </div>
  );
};

export default NoResultsMessage;
