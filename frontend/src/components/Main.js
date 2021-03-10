import React, { useEffect } from "react";
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
  texts,
  services,
  advantagesIcons,
  phasesIcons,
  suppliersContent,
  images,
  formRef,
  mainRef,
  servicesRef,
  advantagesRef,
  applicabilityRef,
  phasesRef,
  pricingRef,
  suppliersRef
}) {
  const size = useWindowSize();
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);
  return (
    <main className="content">
      {images && texts && (
        <Lead
          mainRef={mainRef}
          content={texts.lead}
          leadBgImage={images.leadBgImage}
        />
      )}
      {services && <Services elements={services} servicesRef={servicesRef} />}
      {images && texts && (
        <Advantages
          textContent={texts.advantages}
          icons={advantagesIcons}
          showModal={showModalWithImage}
          image={images.applicabilityTable}
          withIcons
          advantagesRef={advantagesRef}
        />
      )}
      {images && (
        <>
          {size.width > 849 && (
            <Applicability table={images.applicabilityTable} applicabilityRef={applicabilityRef} />
          )}
        </>
      )}
      {texts && <Disadvantages disadvantagesContent={texts.disadvantages} />}
      {texts && <Phases phasesIcons={phasesIcons} phasesText={texts.phases} phasesRef={phasesRef}/>}
      {texts && <Pricing content={texts.pricing} pricingRef={pricingRef}/>}
      {suppliersContent && (
        <Suppliers
          content={suppliersContent}
          textContent={texts.suppliers}
          showModal={showModalWithLink}
          suppliersRef={suppliersRef}
        />
      )}
      {images && texts && (
        <PostForm
          content={texts.postForm}
          offer={images.postFormOffer}
          showModal={showModalWithConfirmation}
          formRef={formRef}
        />
      )}
    </main>
  );
}

export default Main;
