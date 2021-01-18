import React, { useState, useEffect } from "react";
import { Router, Route, useHistory, Switch } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import ModalWithImage from "./ModalWithImage";
import { api } from "../utils/api";
import {
  // servicesItems,
  advantagesTextContent,
  advantagesIconsList,
  applicabilityTableImage,
  disadvantagesContentItems,
  phasesIcons,
  // pricing,
  surfaces,
  advices,
  portfolio,
  suppliers,
  // postForm,
  contacts,
} from "../utils/config";
import ModalWithCarousel from "./ModalWIthCarousel";
import ModalWithConfirmation from "./ModalWithConfirmation";

function App() {
  const history = useHistory();
  const [services, setServices] = useState([]);
  const [advantagesText, setAdvantagesText] = useState({});
  const [advantagesIcons, setAdvantagesIcons] = useState({});
  const [applicabilityTable, setApplicabilityTable] = useState();
  const [disadvantagesContent, setDisadvantagesContent] = useState([]);
  const [isModalWithImageOpen, setModalWithImageOpen] = useState(false);
  const [modalImage, setModalImage] = useState();
  const [isModalWithCarouselOpen, setModalWithCarouselOpen] = useState(false);
  const [phasesIconList, setPhasesIconList] = useState({});
  const [pricingContent, setPricingContent] = useState({});
  const [surfacesContent, setSurfacesContent] = useState({});
  const [advicesContent, setAdvicesContent] = useState([]);
  const [portfolioContent, setPortfolioContent] = useState([]);
  const [modalInitialSlide, setModalInitialSlide] = useState(0);
  const [suppliersContent, setSuppliersContent] = useState([]);
  const [postFormContent, setPostFormContent] = useState({});
  const [isModalWithConfirmationOpen, setModalWithConfirmationOpen] = useState(
    false
  );
  const [contactsContent, setContactsContent] = useState({});

  function showModalWithImage(image) {
    setModalImage(image);
    setModalWithImageOpen(true);
    console.log(isModalWithImageOpen);
  }

  function ShowModalWithCarousel(slideIndex) {
    setModalInitialSlide(slideIndex);
    setModalWithCarouselOpen(true);
  }


  function showModalWithConfirmation() {
    setModalWithConfirmationOpen(true);
  }
  function closeModal() {
    setModalImage();
    setModalWithImageOpen(false);
    setModalWithCarouselOpen(false);
    setModalWithConfirmationOpen(false);
  }

  useEffect(() => {
    Promise.all([api.getServices(), api.getTexts()])
      .then(([services, texts]) => {
        setPostFormContent(texts.postForm);
        setPricingContent(texts.pricing);
        setServices(services);
      })
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    setAdvantagesText(advantagesTextContent);
    setAdvantagesIcons(advantagesIconsList);
    setApplicabilityTable(applicabilityTableImage);
    setDisadvantagesContent(disadvantagesContentItems);
    setPhasesIconList(phasesIcons);
    setSurfacesContent(surfaces);
    setAdvicesContent(advices);
    setPortfolioContent(portfolio);
    setSuppliersContent(suppliers);
    // setPostFormContent(postForm);
    // setServices(servicesItems);
    // setPricingContent(pricing);
    setContactsContent(contacts);
  }, []);

  return (
    <>
      <Router history={history} basename="/">
        <Header />
        <Switch>
          <Route exact path="/">
            <Main
              services={services}
              advantagesText={advantagesText}
              advantagesIcons={advantagesIcons}
              applicabilityTable={applicabilityTable}
              disadvantagesContent={disadvantagesContent}
              showModalWithImage={showModalWithImage}
              phasesIcons={phasesIconList}
              pricingContent={pricingContent}
              surfacesContent={surfacesContent}
              advicesContent={advicesContent}
              portfolioContent={portfolioContent}
              showModalWithCarousel={ShowModalWithCarousel}
              isModalWithCarouselOpen={isModalWithCarouselOpen}
              suppliersContent={suppliersContent}
              postFormContent={postFormContent}
              showModalWithConfirmation={showModalWithConfirmation}
              contactsContent={contactsContent}
            />
          </Route>
          <Route exact path="/materials">
            <div className="smth">dqwefewfr2r2sdg3g</div>
          </Route>
        </Switch>
      </Router>

      {isModalWithImageOpen && (
        <ModalWithImage closeModal={closeModal} image={modalImage} />
      )}
{isModalWithCarouselOpen && (
        <ModalWithCarousel
          isModalWithCarouselOpen={isModalWithCarouselOpen}
          closeModal={closeModal}
          content={portfolioContent}
          initialSlide={modalInitialSlide}
        />
        )}
      {isModalWithConfirmationOpen && (
        <ModalWithConfirmation
          isModalWithCarouselOpen={isModalWithCarouselOpen}
          closeModal={closeModal}
          content={portfolioContent}
          initialSlide={modalInitialSlide}
        />
      )}
      <Footer
        content={contactsContent}
      />
    </>
  );
}

export default App;
