import React, { useState, useEffect, useRef } from "react";
import { Router, Route, useHistory, Switch, Redirect } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Admin from "./Admin/Admin";
import Main from "./Main";
import Login from "./Login";
import Surfaces from "./Surfaces";
import SurfacesMobile from "./SurfacesMobile";
import Advices from "./Advices";
import Portfolio from "./Portfolio";
import Contacts from "./Contacts";
import ModalWithImage from "./ModalWithImage";
import ModalWithLink from "./ModalWithLink";
import useWindowSize from "../hooks/useWindowSize";
import Breadcrumbs from "./Breadcrumbs";
import PortfolioItem from "./PortfolioItem";
import ProtectedRoute from "./ProtectedRoute";
import Preloader from "./Preloader";

import {
  getServices,
  getTexts,
  getAdvices,
  getImages,
  getSuppliers,
  getSurfaces,
  login,
  logout,
  // checkCookies,
  getEmails,
} from "../utils/api";
import {
  // servicesItems,
  // advantagesTextContent,
  // lead,
  advantagesIconsList,
  adminItems,
  applicabilityTableImage,
  // disadvantagesTextContent,
  phasesIcons,
  // phasesTextContent,
  // pricing,
  // surfaces,
  // advices
  portfolio,
  // suppliers,
  // postForm,
  // contacts,
  portfolioContentRaw,
  requests,
} from "../utils/config";
import ModalWithCarousel from "./ModalWIthCarousel";
import ModalWithConfirmation from "./ModalWithConfirmation";
import useFormWithValidation from "../hooks/useFormWithValidation";
// import ProtectedRoute from "./ProtectedRoute";
//safari compatibility;
import smoothscroll from "smoothscroll-polyfill";

function App() {
  const history = useHistory();
  const validation = useFormWithValidation();
  const [services, setServices] = useState(null);
  const [images, setImages] = useState(null);
  const [leadContent, setLeadContent] = useState({});
  const [advantagesText, setAdvantagesText] = useState({});
  const [advantagesIcons, setAdvantagesIcons] = useState({});
  const [applicabilityTable, setApplicabilityTable] = useState();
  const [disadvantagesContent, setDisadvantagesContent] = useState({});
  const [isModalWithImageOpen, setModalWithImageOpen] = useState(false);
  const [modalImage, setModalImage] = useState();
  const [isModalWithCarouselOpen, setModalWithCarouselOpen] = useState(false);
  const [phasesIconList, setPhasesIconList] = useState({});
  const [phasesText, setPhasesText] = useState({});
  const [pricingContent, setPricingContent] = useState({});
  const [surfacesContent, setSurfacesContent] = useState(null);
  const [advicesContent, setAdvicesContent] = useState(null);
  const [portfolioContent, setPortfolioContent] = useState([]);
  const [portfolioContentNew, setPortfolioContentNew] = useState([]);
  const [modalInitialSlide, setModalInitialSlide] = useState(0);
  const [suppliersContent, setSuppliersContent] = useState(null);
  const [postFormContent, setPostFormContent] = useState({});
  const [isModalWithConfirmationOpen, setModalWithConfirmationOpen] = useState(
    false
  );
  const [isModalWithLinkOpen, setIsModalWithLinkOpen] = useState(false);
  const [modalCarouselContent, setModalCarouselContent] = useState();
  const [contactsContent, setContactsContent] = useState({});
  const [suppliersTextContent, setSuppliersTextContent] = useState({});
  const [surfacesTextContent, setSurfacesTextContent] = useState({});
  const [modalLink, setModalLink] = useState();
  const size = useWindowSize();
  const [portfolioItem, setPortfolioItem] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [requestsItems, setRequestsItems] = useState(null);
  //safari compatibility;
  smoothscroll.polyfill();

  const formRef = useRef();
  const mainRef = useRef();

  useEffect(() => {
    Promise.all([
      getServices(),
      getTexts(),
      getAdvices(),
      getImages(),
      getSuppliers(),
      getSurfaces(),
    ])
      .then(([services, texts, advices, images, suppliers, surfaces]) => {
        Object.keys(images).map((key) => {
          images[key].path =
            process.env.REACT_APP_URL + images[key].path.replace(/\\/g, "/");
          return images;
        });
        setImages(images);
        setPostFormContent(texts.postForm);
        setPricingContent(texts.pricing);
        setAdvantagesText(texts.advantages);
        setContactsContent(texts.contacts);
        setDisadvantagesContent(texts.disadvantages);
        setPhasesText(texts.phases);
        setLeadContent(texts.lead);
        setSuppliersTextContent(texts.suppliers);
        setSurfacesTextContent(texts.surfaces);
        setServices(services);
        setAdvicesContent(advices);
        setSuppliersContent(suppliers);
        setSurfacesContent(surfaces);
      })
      .then(() => {
        getEmails()
          .then((emails) => {
            setIsLoggedIn(true);
            setRequestsItems(emails);
          })
          .catch((err) => {
            setIsLoggedIn(false);
          });
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    setAdvantagesIcons(advantagesIconsList);
    setApplicabilityTable(applicabilityTableImage);
    // setDisadvantagesContent(disadvantagesTextContent);
    setPhasesIconList(phasesIcons);
    // setPhasesText(phasesTextContent);
    // setSurfacesContent(surfaces);
    // setAdvicesContent(advices);
    setPortfolioContent(portfolio);
    // setSuppliersContent(suppliers);
    // setLeadContent(lead)
    // setPostFormContent(postForm);
    // setServices(servicesItems);
    // setPricingContent(pricing);
    // setAdvantagesText(advantagesTextContent);
    // setContactsContent(contacts);
    setPortfolioContentNew(portfolioContentRaw);
    setRequestsItems(requests);
  }, []);

  function showModalWithImage(image) {
    document.body.style.overflow = "hidden";
    setModalImage(image);
    setModalWithImageOpen(true);
  }

  function ShowModalWithCarousel(slideIndex, item) {
    document.body.style.overflow = "hidden";
    setModalCarouselContent(item);
    setModalInitialSlide(slideIndex);
    setModalWithCarouselOpen(true);
  }

  function showModalWithConfirmation() {
    document.body.style.overflow = "hidden";
    setModalWithConfirmationOpen(true);
  }

  function showModalWithLink(link) {
    document.body.style.overflow = "hidden";
    setModalLink(link);
    setIsModalWithLinkOpen(true);
  }
  function closeModal() {
    document.body.style.overflow = "unset";
    setTimeout(() => {
      setModalImage();
      setModalWithImageOpen(false);
      setModalWithCarouselOpen(false);
      setModalWithConfirmationOpen(false);
      setIsModalWithLinkOpen(false);
    }, 300);
  }

  function handleLogin(user) {
    login(user)
      .then(() => {
        setIsLoggedIn(true);
        history.push("/admin");
      })
      .catch((err) => {
        if (typeof err === "object") {
          validation.setErrors({ submit: "Ошибка сервера" });
        } else {
          validation.setErrors({ submit: err });
        }
        console.log(err);
      })
      .finally(() => {});
  }

  function handleLogout() {
    logout()
      .then(() => {
        setIsLoggedIn(false);
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleSaveData(data, handler) {
    handler(data)
      .then((data) => {
        window.location.reload();
        console.log("Сохранено", data);
      })
      .catch((err) => console.log(err));
  }

  function handlePatchData(data, id, handler) {
    handler(data, id)
      .then((data) => {
        window.location.reload();
        console.log("Сохранено", data);
      })
      .catch((err) => console.log(err));
  }

  function handleDeleteData(id, handler) {
    console.log(id);
    handler(id)
      .then((data) => {
        window.location.reload();
        console.log("Удалено", data);
      })
      .catch((err) => console.log(err));
  }

  const handleRequestButtonClick = () => {
    setTimeout(() => {
      const offset = -80;
      const yCoordinate =
        formRef.current.getBoundingClientRect().top +
        window.pageYOffset +
        offset;
      window.scrollTo({ top: yCoordinate, behavior: "smooth" });
    }, 200);
  };

  const handleMainLinkClick = () => {
    setTimeout(() => {
      const offset = 0;
      const yCoordinate =
        mainRef.current.getBoundingClientRect().top +
        window.pageYOffset +
        offset;
      window.scrollTo({ top: yCoordinate, behavior: "smooth" });
    }, 200);
  };

  if (isLoggedIn === null) {
    return <Preloader />;
  }

  return (
    <>
      <Router history={history} basename="/">
        <Switch>
          <Route exact path="/">
            <Header
              handleRequestButtonClick={handleRequestButtonClick}
              handleMainLinkClick={handleMainLinkClick}
            />
            <Main
              showModalWithImage={showModalWithImage}
              showModalWithConfirmation={showModalWithConfirmation}
              showModalWithLink={showModalWithLink}
              services={services}
              advantagesText={advantagesText}
              advantagesIcons={advantagesIcons}
              applicabilityTable={applicabilityTable}
              disadvantagesContent={disadvantagesContent}
              phasesIcons={phasesIconList}
              phasesText={phasesText}
              pricingContent={pricingContent}
              suppliersContent={suppliersContent}
              suppliersTextContent={suppliersTextContent}
              postFormContent={postFormContent}
              leadContent={leadContent}
              images={images}
              formRef={formRef}
              mainRef={mainRef}
            />
          </Route>
          <Route exact path="/surfaces">
            <Header
              handleRequestButtonClick={handleRequestButtonClick}
              handleMainLinkClick={handleMainLinkClick}
            />
            <main className="content">
              <Breadcrumbs link="/surfaces" name="Поверхности" />
              {surfacesContent && (
                <>
                  {size.width > 849 && (
                    <Surfaces
                      content={surfacesContent}
                      showModal={showModalWithImage}
                      textContent={surfacesTextContent}
                    />
                  )}
                  {size.width < 850 && (
                    <SurfacesMobile
                      content={surfacesContent}
                      showModal={showModalWithImage}
                      textContent={surfacesTextContent}
                    />
                  )}
                </>
              )}
            </main>
          </Route>
          <Route path="/portfolio">
            <Header
              handleRequestButtonClick={handleRequestButtonClick}
              handleMainLinkClick={handleMainLinkClick}
            />
            <main className="content">
              <Breadcrumbs
                link="/portfolio"
                name="Портфолио"
                portfolioItem={portfolioItem}
              />
              <Route exact path="/portfolio">
                <Portfolio
                  content={portfolioContent}
                  showModal={ShowModalWithCarousel}
                  isModalWithCarouselOpen={isModalWithCarouselOpen}
                  portfolioContentNew={portfolioContentNew}
                  setPortfolioItem={setPortfolioItem}
                />
              </Route>
              <Route path="/portfolio/items/:itemId">
                <PortfolioItem
                  content={portfolioContentNew}
                  showModal={ShowModalWithCarousel}
                  isModalWithCarouselOpen={isModalWithCarouselOpen}
                ></PortfolioItem>
              </Route>
            </main>
          </Route>
          <Route exact path="/advices">
            <Header
              handleRequestButtonClick={handleRequestButtonClick}
              handleMainLinkClick={handleMainLinkClick}
            />
            <main className="content">
              <Breadcrumbs link="/advices" name="Советы дизайнера" />
              {advicesContent && <Advices content={advicesContent} />}
            </main>
          </Route>
          <Route exact path="/contacts">
            <Header
              handleRequestButtonClick={handleRequestButtonClick}
              handleMainLinkClick={handleMainLinkClick}
            />
            <main className="content">
              <Breadcrumbs link="/contacts" name="Контакты" />
              {images && (
                <Contacts
                  content={contactsContent}
                  entranceImage={images.contactsEntranceImage}
                />
              )}
            </main>
          </Route>
          <Route exact path="/login">
            <Login validation={validation} onAuthorize={handleLogin} />
          </Route>
          {isLoggedIn === true && (
            <>
              <ProtectedRoute path="/admin" loggedIn={isLoggedIn}>
                <Admin
                  adminItems={adminItems}
                  validation={validation}
                  onSaveData={handleSaveData}
                  onPatchData={handlePatchData}
                  onDeleteData={handleDeleteData}
                  onLogout={handleLogout}
                  leadContent={leadContent}
                  images={images}
                  services={services}
                  advantagesText={advantagesText}
                  disadvantagesText={disadvantagesContent}
                  phasesText={phasesText}
                  phasesIcons={phasesIcons}
                  pricingContent={pricingContent}
                  contactsContent={contactsContent}
                  advices={advicesContent}
                  postFormContent={postFormContent}
                  suppliers={suppliersContent}
                  suppliersTextContent={suppliersTextContent}
                  surfacesTextContent={surfacesTextContent}
                  surfaces={surfacesContent}
                  requests={requestsItems}
                />
              </ProtectedRoute>
            </>
          )}
          {isLoggedIn === false && (
            <Route>{isLoggedIn ? "" : <Redirect to="/" />}</Route>
          )}
        </Switch>
      </Router>
      <Footer content={contactsContent} />
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
      {isModalWithLinkOpen && (
        <ModalWithLink
          closeModal={closeModal}
          isModalWithLinkOpen={isModalWithLinkOpen}
          link={modalLink}
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
    </>
  );
}

export default App;
