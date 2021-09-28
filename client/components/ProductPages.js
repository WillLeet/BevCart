import React from "react";
import { Link } from "react-router-dom";

export default function ProductPages(props) {
  const index = props.index;
  return (
    <Link to={`/products?page=${index + 1}`} className="page-link">
      {index + 1}
    </Link>
  );
}
