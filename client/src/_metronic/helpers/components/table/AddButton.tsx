import React from "react";
import { KTIcon } from "../KTIcon";
import { Link } from "react-router-dom";
function AddButton() {
  return (
    <Link to="../create">
       <button type="button" className="btn btn-primary me-3">
        <KTIcon iconName="plus" className="fs-2" />
        Agregar
      </button>
    </Link>
  );
}

export { AddButton };
