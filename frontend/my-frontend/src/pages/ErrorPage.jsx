import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div>
      <section className="hero is-danger is-fullheight">
        <div className="hero-head">
          <h1 className="title m-5">Oh no, this route doesn't exist!</h1>
        </div>
        <div className="hero-body has-text-justified">
          <Link
            to="/"
            className="has-text-danger-invert is-size-4 has-text-weight-medium"
          >
            You can go back to the home page by clicking here, though 🐔!
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ErrorPage;
