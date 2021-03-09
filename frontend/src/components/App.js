import React, { useState, useEffect, useRef } from "react";
import { Router, Route, useHistory, Switch } from "react-router-dom";
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
  //safari compatibility;
  smoothscroll.polyfill();

  const formRef = useRef();
  const mainRef = useRef();

  function handlePortfolioItemSelection(item) {
    setPortfolioItem(item);
  }

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
              texts={texts}
              services={services}
              advantagesIcons={advantagesIcons}
              phasesIcons={phasesIconList}
              suppliersContent={suppliersContent}
              images={images}
              formRef={formRef}
              mainRef={mainRef}
            />
            {texts && <Footer content={texts.contacts} />}
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
            {texts && <Footer content={texts.contacts} />}
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
            {texts && <Footer content={texts.contacts} />}
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
            {texts && <Footer content={texts.contacts} />}
          </Route>
          <Route exact path="/contacts">
            <Header
              handleRequestButtonClick={handleRequestButtonClick}
              handleMainLinkClick={handleMainLinkClick}
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
            {texts && <Footer content={texts.contacts} />}
          </Route>
          <Route exact path="/login">
            <Login validation={validation} onAuthorize={handleLogin} />
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
