import React, { useState, useEffect } from "react";
import { Router, Route, useHistory, Switch } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Admin from "./Admin/Admin";
import Main from "./Main";
import Login from "./Login";
import ModalWithImage from "./ModalWithImage";
import PageNotFound from "./PageNotFound";
import { api } from "../utils/api";
import {
  // servicesItems,
  // advantagesTextContent,
  // lead,
  advantagesIconsList,
  adminItems,
  applicabilityTableImage,
  disadvantagesContentItems,
  phasesIcons,
  // pricing,
  surfaces,
  // advices,
  portfolio,
  suppliers,
  // postForm,
  // contacts,
} from "../utils/config";
import ModalWithCarousel from "./ModalWIthCarousel";
import ModalWithConfirmation from "./ModalWithConfirmation";
import useFormWithValidation from "../hooks/useFormWithValidation";
// import ProtectedRoute from "./ProtectedRoute";

function App() {
  const history = useHistory();
  const validation = useFormWithValidation();
  const [services, setServices] = useState([]);
  const [images, setImages] = useState({});
  const [leadContent, setLeadContent] = useState({});
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
  const [modalCarouselContent, setModalCarouselContent] = useState();
  const [contactsContent, setContactsContent] = useState({});
  // const [isLoggedIn, setIsLoggedIn] = useState(null);

  function showModalWithImage(image) {
    setModalImage(image);
    setModalWithImageOpen(true);
    console.log(isModalWithImageOpen);
  }

  function ShowModalWithCarousel(slideIndex, content) {
    setModalCarouselContent(content)
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
    Promise.all([
      api.getServices(),
      api.getTexts(),
      api.getAdvices(),
      api.getImages(),
    ])
      .then(([services, texts, advices, images]) => {
        Object.keys(images).map((key) => {
          console.log(key);
          images[key].path =
            process.env.REACT_APP_URL + images[key].path.replace(/\\/g, "/");
          return images;
        });
        setImages(images);
        setPostFormContent(texts.postForm);
        setPricingContent(texts.pricing);
        setAdvantagesText(texts.advantages);
        setContactsContent(texts.contacts);
        setLeadContent(texts.lead);
        setServices(services);
        setAdvicesContent(advices);
        console.log(images);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    setAdvantagesIcons(advantagesIconsList);
    setApplicabilityTable(applicabilityTableImage);
    setDisadvantagesContent(disadvantagesContentItems);
    setPhasesIconList(phasesIcons);
    setSurfacesContent(surfaces);
    // setAdvicesContent(advices);
    setPortfolioContent(portfolio);
    setSuppliersContent(suppliers);
    // setLeadContent(lead)
    // setPostFormContent(postForm);
    // setServices(servicesItems);
    // setPricingContent(pricing);
    // setAdvantagesText(advantagesTextContent);
    // setContactsContent(contacts);
  }, []);

  // function handleLogin(user) {
  //   setIsSaving(true);
  //   api
  //     .login(user)
  //     .then((user) => {
  //       setIsLoggedIn(true);
  //     })
  //     .catch((err) => {
  //       if (typeof err === "object") {
  //         validation.setErrors({ submit: "Ошибка сервера" });
  //       } else {
  //         validation.setErrors({ submit: err });
  //       }
  //       console.log(err);
  //     })
  //     .finally(() => {
  //       setIsSaving(false);
  //     });
  // }

  function handleSaveText(data, id) {
    api
      .patchText(data, id)
      .then((data) => {
        window.location.reload();
        console.log("Сохранено", data);
      })
      .catch((err) => console.log(err));
  }

  function handleSaveImage(data, id) {
    console.log(data, id);
    api
      .patchImage(data, id)
      .then((data) => {
        // window.location.reload();
        console.log("Сохранено", data);
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
      <Router history={history} basename="/">
        <Switch>
          <Route exact path="/stoneflower">
            <Header />
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
              leadContent={leadContent}
              images={images}
            />
            {isModalWithImageOpen && (
              <ModalWithImage closeModal={closeModal} image={modalImage} />
            )}
            {isModalWithCarouselOpen && (
              <ModalWithCarousel
                isModalWithCarouselOpen={isModalWithCarouselOpen}
                closeModal={closeModal}
                content={modalCarouselContent}
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
            <Footer content={contactsContent} />
          </Route>
          <Route exact path="/login">
            <Login validation={validation} />
          </Route>
          <Route exact path="/admin">
            {/* <ProtectedRoute exact path="/admin" loggedIn={isLoggedIn}> */}
            <Admin
              adminItems={adminItems}
              validation={validation}
              onSaveText={handleSaveText}
              onSaveImage={handleSaveImage}
              leadContent={leadContent}
              images={images}
            />
            {/* </ProtectedRoute> */}
          </Route>
          <Route path="*">
            <PageNotFound />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
