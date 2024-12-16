import { AddButton } from "../../AddButton";


const ListHeader = ({ children, headerAddButton }: any) => {
  return (
    <div className="card-header border-0 pt-6">
      {/* begin::Card toolbar */}
      <div className="mb-10">
        {children}
      </div>
      <div className="card-toolbar">
        {headerAddButton && <AddButton />}
      </div>
    </div>
  );
};

export { ListHeader };
