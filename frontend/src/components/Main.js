import React from "react";
import Lead from "./Lead";
import Advantages from "./Advantages";
import Surfaces from "./Surfaces";
import SurfacesMobile from "./SurfacesMobile";
import Services from "./Services";
import Applicability from "./Applicability";
import useWindowSize from "../hooks/useWindowSize";
import Disadvantages from "./Disadvantages";
import Phases from "./Phases";
import Pricing from "./Pricing";
import Advices from "./Advices";
import Portfolio from "./Portfolio";
import Suppliers from "./Suppliers";
import PostForm from "./PostForm";
import Contacts from "./Contacts";

function Main({
  services,
  advantagesText,
  advantagesIcons,
  applicabilityTable,
  disadvantagesContent,
  showModalWithImage,
  phasesIcons,
  pricingContent,
  surfacesContent,
  advicesContent,
  portfolioContent,
  showModalWithCarousel,
  isModalWithCarouselOpen,
  suppliersContent,
  postFormContent,
  showModalWithConfirmation,
  contactsContent,
  leadContent,
  images,
}) {
  const window = useWindowSize();
  return (
    <main className="content">
      <Lead content={leadContent} leadBgImage={images.leadBgImage} />
      {services && <Services elements={services} />}

      <Advantages
        textContent={advantagesText}
        icons={advantagesIcons}
        showModal={showModalWithImage}
        image={applicabilityTable}
        withIcons
      />

      {window.width > 849 && <Applicability table={applicabilityTable} />}

      <Disadvantages tableItems={disadvantagesContent} />

      <Phases phasesIcons={phasesIcons} />

      <Pricing content={pricingContent} />
      {window.width > 849 && (
        <Surfaces content={surfacesContent} showModal={showModalWithImage} />
      )}
      {window.width < 850 && (
        <SurfacesMobile
          content={surfacesContent}
          showModal={showModalWithImage}
        />
      )}
      <Advices content={advicesContent} />

      <Portfolio
        content={portfolioContent}
        showModal={showModalWithCarousel}
        isModalWithCarouselOpen={isModalWithCarouselOpen}
      />
      <Suppliers content={suppliersContent} />
      <PostForm
        content={postFormContent}
        showModal={showModalWithConfirmation}
      />
      <Contacts
        content={contactsContent}
        entranceImage={images.contactsEntranceImage}
      />
    </main>
  );
}

export default Main;
