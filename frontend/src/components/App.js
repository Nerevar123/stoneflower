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
import PageNotFound from "./PageNotFound";
import Blocker from './Blocker';

import {
  getServices,
  getTexts,
  getAdvices,
  getImages,
  getSuppliers,
  getSurfaces,
  getPortfolio,
  login,
  logout,
  getEmails,
} from "../utils/api";
import {
  adminItems,
  phasesIcons,
  servicesItems,
  advantagesIconsList,
  textContent,
  surfacesItems,
  advicesItems,
  suppliersItems,
  imagesItems,
  portfolioItems,
} from "../utils/config";
import ModalWithCarousel from "./ModalWIthCarousel";
import ModalWithConfirmation from "./ModalWithConfirmation";
import useFormWithValidation from "../hooks/useFormWithValidation";
//safari compatibility;
import smoothscroll from "smoothscroll-polyfill";

function App() {
  const history = useHistory();
  const validation = useFormWithValidation();
  const [services, setServices] = useState(null);
  const [images, setImages] = useState(null);
  const [texts, setTexts] = useState(null);
  const [advantagesIcons, setAdvantagesIcons] = useState({});
  const [isModalWithImageOpen, setModalWithImageOpen] = useState(false);
  const [modalImage, setModalImage] = useState();
  const [isModalWithCarouselOpen, setModalWithCarouselOpen] = useState(false);
  const [phasesIconList, setPhasesIconList] = useState({});
  const [surfacesContent, setSurfacesContent] = useState(null);
  const [advicesContent, setAdvicesContent] = useState(null);
  const [portfolioContent, setPortfolioContent] = useState([]);
  const [modalInitialSlide, setModalInitialSlide] = useState(0);
  const [suppliersContent, setSuppliersContent] = useState(null);
  const [isModalWithConfirmOpen, setModalWithConfirmOpen] = useState(false);
  const [isModalWithLinkOpen, setIsModalWithLinkOpen] = useState(false);
  const [modalCarouselContent, setModalCarouselContent] = useState();
  const [modalLink, setModalLink] = useState();
  const size = useWindowSize();
  const [portfolioItem, setPortfolioItem] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [requestsItems, setRequestsItems] = useState(null);
  const [isOfferAccepted, setIsOfferAccepted] = useState({
    status: false,
    date: null,
  });

  const formRef = useRef();
  const mainRef = useRef();

  //safari compatibility;
  smoothscroll.polyfill();

  useEffect(() => {
    setAdvantagesIcons(advantagesIconsList);
    setPhasesIconList(phasesIcons);

    Promise.all([
      getServices(),
      getTexts(),
      getAdvices(),
      getImages(),
      getSuppliers(),
      getSurfaces(),
      getPortfolio(),
    ])
      .then(
        ([
          services,
          texts,
          advices,
          images,
          suppliers,
          surfaces,
          portfolio,
        ]) => {
          Object.keys(images).map((key) => {
            images[key].path =
              process.env.REACT_APP_URL + images[key].path.replace(/\\/g, "/");
            return images;
          });
          setImages(images);
          setTexts(texts);
          setServices(services);
          setAdvicesContent(advices);
          setSuppliersContent(suppliers);
          setSurfacesContent(surfaces);
          setPortfolioContent(portfolio);
        }
      )
      .then(() => {
        getEmails()
          .then((emails) => {
            setIsLoggedIn(true);
            setRequestsItems(emails);
          })
          .catch(() => {
            setIsLoggedIn(false);
          });
      })
      .catch((err) => {
        console.log(err);
        setIsLoggedIn(false);
        setImages(imagesItems);
        setServices(servicesItems);
        setTexts(textContent);
        setSurfacesContent(surfacesItems);
        setAdvicesContent(advicesItems);
        setPortfolioContent(portfolioItems);
        setSuppliersContent(suppliersItems);
      });
  }, [isLoggedIn]);

  useEffect(() => {
    if((Date.now() - parseInt(localStorage.getItem('offerAcceptDate'))) > 604800000) {
      setIsOfferAccepted({status: false, date: null});
    } else {
      setIsOfferAccepted({status: true, date: localStorage.getItem('offerAcceptDate')})
    }
  }, [])

  function handlePortfolioItemSelection(item) {
    setPortfolioItem(item);
  }

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
    setModalWithConfirmOpen(true);
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
      setModalWithConfirmOpen(false);
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
      .then(() => {
        window.location.reload();
      })
      .catch((err) => {
        if (typeof err === "object") {
          validation.setErrors({ submit: "Ошибка сервера" });
        } else {
          validation.setErrors({ submit: err });
        }
        console.log(err);
      });
  }

  function handlePatchData(data, id, handler) {
    handler(data, id)
      .then(() => {
        window.location.reload();
      })
      .catch((err) => {
        if (typeof err === "object") {
          validation.setErrors({ submit: "Ошибка сервера" });
        } else {
          validation.setErrors({ submit: err });
        }
        console.log(err);
      });
  }

  function handleDeleteData(id, handler) {
    handler(id)
      .then(() => {
        window.location.reload();
      })
      .catch((err) => console.log(err));
  }

  function handleDeleteRequest(id, handler) {
    handler(id)
      .then(() => {
        const newRequests = requestsItems.filter((r) => r._id !== id);
        setRequestsItems(newRequests);
      })
      .catch((err) => console.log(err));
  }

  const handleScrollToElement = (ref) => {
    setTimeout(() => {
      const offset = -80;
      const yCoordinate =
        ref.current.getBoundingClientRect().top + window.pageYOffset + offset;
      window.scrollTo({ top: yCoordinate, behavior: "smooth" });
    }, 200);
  };

  if (isLoggedIn === null) {
    return <Preloader />;
  }

  const handleOfferAcception = () => {
    setIsOfferAccepted({status: true, date: Date.now()})
    localStorage.setItem('offerAcceptDate', isOfferAccepted.date)
  }

  return (
    <>
      <Router history={history} basename="/">
        <Switch>
          <Route exact path="/">
          {images && !isOfferAccepted.status && <Blocker offer={images.postFormOffer} handleOfferAcception={handleOfferAcception}/>}
            <Header
              handleScrollToElement={handleScrollToElement}
              mainRef={mainRef}
              formRef={formRef}
              isOfferAccepted={isOfferAccepted.status}
            />
            <Main
              showModalWithImage={showModalWithImage}
              showModalWithConfirmation={showModalWithConfirmation}
              showModalWithLink={showModalWithLink}
              texts={texts}
              services={services}
              advantagesIcons={advantagesIcons}
              phasesIcons={phasesIconList}
              suppliersContent={suppliersContent}
              images={images}
              formRef={formRef}
              mainRef={mainRef}
            />

            {texts && <Footer content={texts.contacts} extended={true} />}
          </Route>
          <Route exact path="/surfaces">
          {images && !isOfferAccepted.status && <Blocker offer={images.postFormOffer} handleOfferAcception={handleOfferAcception}/>}
            <Header
              handleScrollToElement={handleScrollToElement}
              mainRef={mainRef}
              formRef={formRef}
              isOfferAccepted={isOfferAccepted.status}
            />
            <main className="content">
              <Breadcrumbs link="/surfaces" name="Поверхности" />
              {surfacesContent && (
                <>
                  {size.width > 849 && (
                    <Surfaces
                      content={surfacesContent}
                      showModal={showModalWithImage}
                      textContent={texts.surfaces}
                    />
                  )}
                  {size.width < 850 && (
                    <SurfacesMobile
                      content={surfacesContent}
                      showModal={showModalWithImage}
                      textContent={texts.surfaces}
                    />
                  )}
                </>
              )}
            </main>
            {texts && <Footer content={texts.contacts} extended={true} />}
          </Route>
          <Route path="/portfolio">
          {images && !isOfferAccepted.status && <Blocker offer={images.postFormOffer} handleOfferAcception={handleOfferAcception}/>}
            <Header
              handleScrollToElement={handleScrollToElement}
              mainRef={mainRef}
              formRef={formRef}
              isOfferAccepted={isOfferAccepted.status}
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
                  handlePortfolioItemSelection={handlePortfolioItemSelection}
                />
              </Route>
              <Route path="/portfolio/items/:itemId">
                <PortfolioItem
                  content={portfolioContent}
                  showModal={ShowModalWithCarousel}
                  isModalWithCarouselOpen={isModalWithCarouselOpen}
                  handlePortfolioItemSelection={handlePortfolioItemSelection}
                ></PortfolioItem>
              </Route>
            </main>
            {texts && <Footer content={texts.contacts} extended={true} />}
          </Route>
          <Route exact path="/advices">
          {images && !isOfferAccepted.status && <Blocker offer={images.postFormOffer} handleOfferAcception={handleOfferAcception}/>}
            <Header
              handleScrollToElement={handleScrollToElement}
              mainRef={mainRef}
              formRef={formRef}
              isOfferAccepted={isOfferAccepted.status}
            />
            <main className="content">
              <Breadcrumbs link="/advices" name="Советы дизайнера" />
              {advicesContent && <Advices content={advicesContent} />}
            </main>
            {texts && <Footer content={texts.contacts} extended={true} />}
          </Route>
          <Route exact path="/contacts">
          {images && !isOfferAccepted.status && <Blocker offer={images.postFormOffer} handleOfferAcception={handleOfferAcception}/>}
            <Header
              handleScrollToElement={handleScrollToElement}
              mainRef={mainRef}
              formRef={formRef}
              isOfferAccepted={isOfferAccepted.status}
            />
            <main className="content">
              <Breadcrumbs link="/contacts" name="Контакты" />
              {images && texts && (
                <Contacts
                  content={texts.contacts}
                  entranceImage={images.contactsEntranceImage}
                />
              )}
            </main>
            {texts && <Footer content={texts.contacts} extended={false} />}
          </Route>
          <Route exact path="/login">
            {isLoggedIn ? (
              <Redirect to="/admin" />
            ) : (
              <Login validation={validation} onAuthorize={handleLogin} />
            )}
          </Route>
          <ProtectedRoute exact path="/admin" loggedIn={isLoggedIn}>
            {isLoggedIn === true && (
              <>
                <Admin
                  adminItems={adminItems}
                  validation={validation}
                  onSaveData={handleSaveData}
                  onPatchData={handlePatchData}
                  onDeleteData={handleDeleteData}
                  onDeleteRequest={handleDeleteRequest}
                  onLogout={handleLogout}
                  texts={texts}
                  images={images}
                  services={services}
                  phasesIcons={phasesIcons}
                  advices={advicesContent}
                  suppliers={suppliersContent}
                  surfaces={surfacesContent}
                  requests={requestsItems}
                  portfolio={portfolioContent}
                />
              </>
            )}
          </ProtectedRoute>
          <Route path="*">
            <PageNotFound />
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
      {isModalWithConfirmOpen && (
        <ModalWithConfirmation closeModal={closeModal} />
      )}
    </>
  );
}

export default App;
