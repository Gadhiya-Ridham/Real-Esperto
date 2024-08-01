import "./App.css";
import Header from "./components/header/header";
import Routes from "./routes/routes";
import Footer from "./components/Footer/footer";

function App() {
  const email = sessionStorage.getItem("email");
  return (
    <>
      {email === "admin@gmail.com" ? (
        <>
          <Header />
          <Routes />
        </>
      ) : (
        <>
          <Header />
          <Routes />
          <Footer />
        </>
      )}
    </>
  );
}

export default App;
