import React, { useEffect, useState } from "react";
import {
  useParams,
} from "react-router-dom";

function PortfolioItem({ content }) {
  const params = useParams();
  console.log(params.itemId, content);
  const [item, setItem] = useState();
  useEffect(() => {
    const selectedElement = content.find((el) => el._id === params.itemId);
     setItem(selectedElement);
  }, [content, params])
  console.log(item);
  return ( 
      <div>
    {item && 
      <><h1>{item.title}</h1></>}
      </div>
  );
}

export default PortfolioItem;
