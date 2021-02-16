import React, { useState, useEffect, createRef, useRef } from "react";
import AdminLeadEditor from "./AdminLeadEditor";
import AdminServices from "./AdminServices";
import AdminAdvantages from "./AdminAdvantages";
import AdminDisadvantages from "./AdminDisadvantages";
import AdminPhases from "./AdminPhases";
import AdminPricing from "./AdminPricing";
import AdminAdvices from "./AdminAdvices";
import AdminContacts from "./AdminContacts";
import AdminPostForm from "./AdminPostForm";
import AdminPortfolio from "./AdminPortfolio";
import AdminSuppliers from "./AdminSuppliers";
import { findAllByPlaceholderText } from "@testing-library/react";

function Admin({
  adminItems,
  validation,
  onSaveText,
  onSaveImage,
  onSaveService,
  leadContent,
  images,
  services,
  advantagesText,
  disadvantagesText,
  phasesText,
  phasesIcons,
  pricingContent,
  contactsContent,
  onSaveAdvice,
  onPatchAdvice,
  onDeleteAdvice,
  advices,
  postFormContent,
  suppliers,
  onSaveSupplier,
  onPatchSupplier,
  onDeleteSupplier,
  suppliersTextContent,
}) {
  const [selectedItem, setSelectedItem] = useState("requests");
  const [offset, setOffset] = useState(106);

  let buttonRefs = [];
  const menuRef = useRef();

  adminItems.forEach(() => {
    buttonRefs.push(createRef());
  });
  function changeFloatingItemOffset(ref) {
    ref ? setOffset(ref.current.offsetTop) : setOffset(106);
  }

  useEffect(() => {
    const index = adminItems.findIndex((item) => item.id === selectedItem);
    index !== -1
      ? setSelectedItem(adminItems[index].id)
      : setSelectedItem("requests");
    console.log(selectedItem);
    buttonRefs.forEach((item) => {
      item.current.id === selectedItem
        ? item.current.classList.add("admin__button_selected")
        : item.current.classList.remove("admin__button_selected");
    });
  }, [selectedItem, adminItems]);

  function handleButtonClick(ref) {
    changeUrl(`edit=${ref.current.id}`);
    changeFloatingItemOffset(ref);
    setSelectedItem(ref.current.id);
  }

  useEffect(() => {
    handlePageLoad();
  }, []);

  function handlePageLoad() {
    const searchParams = new URLSearchParams(window.location.search);
    const type = searchParams.get("edit");
    const index = adminItems.findIndex((item) => item.id === type);
    index !== -1
      ? searchParams.set("edit", type)
      : searchParams.set("edit", "requests");
    setSelectedItem(type);
    changeFloatingItemOffset(buttonRefs[index]);
    changeUrl(searchParams);
  }
  function changeUrl(searchParams) {
    let newurl =
      window.location.protocol +
      "//" +
      window.location.host +
      window.location.pathname +
      "?" +
      searchParams.toString();
    window.history.pushState({ path: newurl }, "", newurl);
  }

  return (
    <main ref={menuRef} className="admin">
      <div className="admin__button-block">
        <h2 className="admin__sub-heading">
          Студия Керамогранита «Каменный цветок»
        </h2>
        {adminItems.map((item, index) => (
          <button
            key={index}
            onClick={() => {
              handleButtonClick(buttonRefs[index]);
            }}
            ref={buttonRefs[index]}
            id={item.id}
            className="admin__button admin__button_type_navigation"
          >
            {item.content}
          </button>
        ))}
        <button className="admin__button admin__button_type_logout">
          Выйти
        </button>
        <div
          className="admin__floating-block"
          style={{ transform: `translateY(${offset}px)` }}
        ></div>
      </div>
      <div className="admin__edit-section">
        {images && (
          <>
            {selectedItem === "lead" && (
              <AdminLeadEditor
                menuRef={menuRef}
                validation={validation}
                onSaveText={onSaveText}
                leadContent={leadContent}
                leadBgImage={images.leadBgImage}
                onSaveImage={onSaveImage}
              />
            )}
          </>
        )}
        {services && (
          <>
            {selectedItem === "services" && (
              <AdminServices
                validation={validation}
                services={services}
                onSaveService={onSaveService}
              />
            )}
          </>
        )}
        {selectedItem === "advantages" && (
          <AdminAdvantages
            validation={validation}
            advantagesText={advantagesText}
            onSaveText={onSaveText}
          />
        )}
        {selectedItem === "disadvantages" && (
          <AdminDisadvantages
            validation={validation}
            disadvantagesText={disadvantagesText}
            onSaveText={onSaveText}
          />
        )}
        {selectedItem === "phases" && (
          <AdminPhases
            validation={validation}
            phasesText={phasesText}
            onSaveText={onSaveText}
            phasesIcons={phasesIcons}
          />
        )}
        {selectedItem === "pricing" && (
          <AdminPricing
            validation={validation}
            pricingContent={pricingContent}
            onSaveText={onSaveText}
          />
        )}
        {advices && (
          <>
            {selectedItem === "advices" && (
              <AdminAdvices
                validation={validation}
                advices={advices}
                onSaveAdvice={onSaveAdvice}
                onPatchAdvice={onPatchAdvice}
                onDeleteAdvice={onDeleteAdvice}
              />
            )}
          </>
        )}
        {selectedItem === "contacts" && (
          <AdminContacts
            validation={validation}
            contactsContent={contactsContent}
            onSaveText={onSaveText}
          />
        )}
        {images && (
          <>
            {selectedItem === "postform" && (
              <AdminPostForm
                validation={validation}
                onSaveText={onSaveText}
                postFormContent={postFormContent}
                postFormOffer={images.postFormOffer}
                onSaveImage={onSaveImage}
              />
            )}
          </>
        )}
        {/* {images && (
          <>
            {selectedItem === "portfolio" && (
              <AdminPortfolio
                validation={validation}
                onSaveText={onSaveText}
                postFormContent={postFormContent}
                postFormOffer={images.postFormOffer}
                onSaveImage={onSaveImage}
              />
            )}
          </>
        )} */}
        {suppliers && (
          <>
            {selectedItem === "suppliers" && (
              <AdminSuppliers
                validation={validation}
                suppliers={suppliers}
                suppliersTextContent={suppliersTextContent}
                onSaveSupplier={onSaveSupplier}
                onPatchSupplier={onPatchSupplier}
                onDeleteSupplier={onDeleteSupplier}
                onSaveText={onSaveText}
              />
            )}
          </>
        )}
      </div>
    </main>
  );
}

export default Admin;
