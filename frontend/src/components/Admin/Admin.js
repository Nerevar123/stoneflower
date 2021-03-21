import React, { useState, useEffect, createRef, useRef } from "react";
import { Link } from "react-router-dom";
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
import AdminSurfaces from "./AdminSurfaces";
import AdminRequests from "./AdminRequests";

function Admin({
  adminItems,
  validation,
  texts,
  images,
  services,
  phasesIcons,
  advices,
  suppliers,
  onSaveData,
  onPatchData,
  onDeleteData,
  onDeleteRequest,
  surfaces,
  onLogout,
  requests,
  portfolio,
}) {
  const [selectedItem, setSelectedItem] = useState("requests");
  const [offset, setOffset] = useState(106);

  // eslint-disable-next-line react-hooks/exhaustive-deps
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
    buttonRefs.forEach((item) => {
      item.current.id === selectedItem
        ? item.current.classList.add("admin__button_selected")
        : item.current.classList.remove("admin__button_selected");
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedItem, adminItems]);

  function handleButtonClick(ref) {
    changeUrl(`edit=${ref.current.id}`);
    changeFloatingItemOffset(ref);
    setSelectedItem(ref.current.id);
  }

  useEffect(() => {
    handlePageLoad();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <Link className="admin__sub-heading" to="/">
          Студия Керамогранита «Каменный цветок»
        </Link>
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
        <button
          className="admin__button admin__button_type_logout"
          onClick={onLogout}
        >
          Выйти
        </button>
        <div
          className="admin__floating-block"
          style={{ transform: `translateY(${offset}px)` }}
        ></div>
      </div>
      <div
        className={`admin__edit-section ${
          selectedItem === "requests"
            ? "admin__edit-section_type_fullscreen"
            : ""
        }`}
      >
        {requests && (
          <>
            {selectedItem === "requests" && (
              <AdminRequests
                onDeleteData={onDeleteRequest}
                requests={requests}
              />
            )}
          </>
        )}
        {images && (
          <>
            {selectedItem === "lead" && (
              <AdminLeadEditor
                menuRef={menuRef}
                validation={validation}
                onPatchData={onPatchData}
                leadContent={texts.lead}
                leadBgImage={images.leadBgImage}
              />
            )}
          </>
        )}
        {services && (
          <>
            {selectedItem === "services" && (
              <AdminServices
                menuRef={menuRef}
                validation={validation}
                services={services}
                onPatchData={onPatchData}
              />
            )}
          </>
        )}
        {selectedItem === "advantages" && (
          <AdminAdvantages
            menuRef={menuRef}
            validation={validation}
            advantagesText={texts.advantages}
            onPatchData={onPatchData}
          />
        )}
        {selectedItem === "disadvantages" && (
          <AdminDisadvantages
            menuRef={menuRef}
            validation={validation}
            disadvantagesText={texts.disadvantages}
            onPatchData={onPatchData}
          />
        )}
        {selectedItem === "phases" && (
          <AdminPhases
            menuRef={menuRef}
            validation={validation}
            phasesText={texts.phases}
            onPatchData={onPatchData}
            phasesIcons={phasesIcons}
          />
        )}
        {selectedItem === "pricing" && (
          <AdminPricing
            menuRef={menuRef}
            validation={validation}
            pricingContent={texts.pricing}
            onPatchData={onPatchData}
          />
        )}
        {advices && (
          <>
            {selectedItem === "advices" && (
              <AdminAdvices
                menuRef={menuRef}
                validation={validation}
                advices={advices}
                onSaveData={onSaveData}
                onPatchData={onPatchData}
                onDeleteData={onDeleteData}
              />
            )}
          </>
        )}
        {images && (
          <>
            {selectedItem === "contacts" && (
              <AdminContacts
                menuRef={menuRef}
                validation={validation}
                contactsContent={texts.contacts}
                onPatchData={onPatchData}
                entranceImage={images.contactsEntranceImage}
              />
            )}
          </>
        )}
        {images && (
          <>
            {selectedItem === "postform" && (
              <AdminPostForm
                menuRef={menuRef}
                validation={validation}
                onPatchData={onPatchData}
                postFormContent={texts.postForm}
                postFormOffer={images.postFormOffer}
              />
            )}
          </>
        )}
        {portfolio && (
          <>
            {selectedItem === "portfolio" && (
              <AdminPortfolio
                menuRef={menuRef}
                validation={validation}
                portfolio={portfolio}
                onSaveData={onSaveData}
                onPatchData={onPatchData}
                onDeleteData={onDeleteData}
              />
            )}
          </>
        )}
        {suppliers && (
          <>
            {selectedItem === "suppliers" && (
              <AdminSuppliers
                menuRef={menuRef}
                validation={validation}
                suppliers={suppliers}
                suppliersTextContent={texts.suppliers}
                onSaveData={onSaveData}
                onPatchData={onPatchData}
                onDeleteData={onDeleteData}
              />
            )}
          </>
        )}
        {surfaces && (
          <>
            {selectedItem === "surfaces" && (
              <AdminSurfaces
                menuRef={menuRef}
                validation={validation}
                surfaces={surfaces}
                surfacesTextContent={texts.surfaces}
                onPatchData={onPatchData}
              />
            )}
          </>
        )}
      </div>
    </main>
  );
}

export default Admin;
