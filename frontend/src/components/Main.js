import React from "react";
import Lead from "./Lead";
import Advantages from "./Advantages";
import Services from "./Services";
import Applicability from "./Applicability";
import useWindowSize from "../hooks/useWindowSize";
import Disadvantages from "./Disadvantages";
import Phases from "./Phases";
import Pricing from "./Pricing";
import Suppliers from "./Suppliers";
import PostForm from "./PostForm";

function Main({
  showModalWithImage,
  showModalWithConfirmation,
  showModalWithLink,
  services,
  advantagesText,
  advantagesIcons,
  applicabilityTable,
  disadvantagesContent,
  phasesIcons,
  phasesText,
  pricingContent,
  suppliersContent,
  suppliersTextContent,
  postFormContent,
  leadContent,
  images,
}) {
  const size = useWindowSize();
  return (
    <main className="content">
      {images && (
        <Lead content={leadContent} leadBgImage={images.leadBgImage} />
      )}
      {services && <Services elements={services} />}
      <Advantages
        textContent={advantagesText}
        icons={advantagesIcons}
        showModal={showModalWithImage}
        image={applicabilityTable}
        withIcons
      />
      {size.width > 849 && <Applicability table={applicabilityTable} />}
      <Disadvantages disadvantagesContent={disadvantagesContent} />
      <Phases phasesIcons={phasesIcons} phasesText={phasesText} />
      <Pricing content={pricingContent} />
      {suppliersContent && (
        <Suppliers
          content={suppliersContent}
          textContent={suppliersTextContent}
          showModal={showModalWithLink}
        />
      )}
      {images && (
        <PostForm
          content={postFormContent}
          offer={images.postFormOffer}
          showModal={showModalWithConfirmation}
        />
      )}
    </main>
  );
}

export default Main;
