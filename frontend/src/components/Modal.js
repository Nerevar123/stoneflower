import React, {useEffect, useState} from "react";

function Modal({ children }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setTimeout(()=>{
      setIsMounted(true);
    }, 50)
  },[])
  return <div className={`modal ${isMounted?'modal_visible':''}`}>{children}</div>;
}

export default Modal;
