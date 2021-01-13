import React, { useState, useEffect } from "react";
import Lead from "./Lead";
import Advantages from "./Advantages";
import Surfaces from "./Surfaces";
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
  contactsContent
}) {
  const window = useWindowSize();
  return (
    <main className="content">
      <Lead />

      <Services elements={services} />

      <Advantages
        textContent={advantagesText}
        icons={advantagesIcons}
        showModal={showModalWithImage}
        image={applicabilityTable}
      />

      {window.width > 849 && <Applicability table={applicabilityTable} />}

      <Disadvantages tableItems={disadvantagesContent} />

      <Phases phasesIcons={phasesIcons} />

      <Pricing content={pricingContent} />

      <Surfaces content={surfacesContent} />

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
      />


    </main>
  );
}

export default Main;
