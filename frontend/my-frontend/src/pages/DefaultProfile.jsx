import { Link } from "react-router-dom";

function DefaultProfile() {
  return (
    <section
      className="section has-text-light"
      style={{
        width: "100%",
        maxWidth: "100%",
        textShadow: "0px 0px 10px #19241cff",
      }}
    >
      {/* Hero Section */}
      <div
        className="container has-text-centered mb-6 p-6 is-flex is-flex-direction-column	is-justify-content-space-evenly"
        style={{
          minHeight: "300px",
          backgroundColor: "rgba(15,23,20,0.55)",
          backdropFilter: "blur(6px)",
        }}
      >
        <h1 className="title is-size-1 mb-4 has-text-light">Focus Garden</h1>
        <h2 className="subtitle is-size-4 has-text-light has-text-weight-semibold">
          A sleek, nature-inspired productivity platform that helps you grow
          your focus in a workspace that wraps you in a peaceful garden with a
          gentle breeze.
        </h2>
        <p className="is-size-5 has-text-weight-medium">
          Plan your day. Track focus. Immerse in calming nature.
        </p>
      </div>

      {/* Demo Sections */}
      <div
        className="container p-6 mb-6"
        style={{
          backgroundColor: "rgba(15,23,20,0.55)",
          backdropFilter: "blur(6px)",
        }}
      >
        {/* Dashboard Section */}
        <div className="columns is-vcentered">
          <div className="column is-half">
            <figure
              className="image is-5by4"
              style={{
                borderRadius: "3px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
                overflow: "hidden",
              }}
            >
              <img src="/demo_dashboard.jpg" alt="Dashboard Demo" />
            </figure>
          </div>
          <div className="column">
            <h3 className="title is-size-3">Your Daily Overview</h3>
            <p className="is-size-5 has-text-weight-medium">
              {" "}
              Track your daily focused minutes, focus streak and completed
              tasks. Dive into today's priorities, plan upcoming tasks. A new
              motivation quote every day to inspire your action and positive
              thinking.
            </p>
          </div>
        </div>

        {/* Task Section */}
        <div className="columns is-vcentered my-6">
          <div className="column">
            <h3 className="title is-size-3">Simple Task Management</h3>
            <p className="is-size-5 has-text-weight-medium">
              {" "}
              A clean, minimalist task list, cuts mental clutter and keeps your
              focus flowing. Tracking tasks with priority tags, due dates, and
              categories.
            </p>
          </div>
          <div className="column is-half">
            <figure
              className="image is-5by4"
              style={{
                borderRadius: "3px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
                overflow: "hidden",
              }}
            >
              <img src="/demo_tasks.jpg" alt="Task Demo" />
            </figure>
          </div>
        </div>

        {/* Pomodoro Section */}
        <div className="columns is-vcentered my-6">
          <div className="column is-half">
            <figure
              className="image is-5by4"
              style={{
                borderRadius: "3px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
                overflow: "hidden",
              }}
            >
              <img src="/demo_pomo_1.jpg" alt="Pomodoro Demo" />
            </figure>
          </div>
          <div className="column is-half">
            <h3 className="title is-size-3">Focus Sessions That Work</h3>
            <p className="is-size-5 has-text-weight-medium">
              {" "}
              Use the Pomodoro technique to stay on track and improve focus.
              Alternate between focused work and short breaks to maintain energy
              and recharge motivation.
            </p>
          </div>
        </div>
      </div>

      {/* Nature Image Showcase */}
      <div
        className="section has-text-centered p-6 is-flex is-flex-direction-column is-justify-content-center"
        style={{
          // backgroundColor: "rgba(62, 135, 74, 0.5)",
          backdropFilter: "blur(6px)",
          backgroundImage: "url(/background_collage.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
          boxShadow: "0 0px 12px rgba(0, 0, 0, 0.6)",
          overflow: "hidden",
        }}
      >
        <h3 className="title is-size-2">Surround Yourself with Nature</h3>
        <p className="is-size-4 has-text-weight-semibold mt-4">
          From majestic mountain tops, to lush green forests, to vast fields,
          and to blue beaches, Focus Garden offerss a rotating gallery of nature
          images to calm your mind and enhance your focus.
        </p>
        <p className="is-size-6 has-text-weight-medium mt-4">
          Nature imagery creates a peaceful workspace that supports deep
          concentration and emotional balance. Let your workspace bloom.
        </p>
      </div>

      {/* Benefits Section */}
      <div
        className="container my-6 p-6"
        style={{
          backgroundColor: "rgba(15,23,20,0.55)",
          backdropFilter: "blur(6px)",
        }}
      >
        <div className="columns">
          <div className="column">
            <h4 className="title is-size-4">
              <span className="icon has-text-success mr-2">
                <i className="fas fa-seedling"></i>
              </span>{" "}
              Manage Tasks with Clarity
            </h4>
            <p className="is-size-6 has-text-weight-medium">
              A well-organized task list helps increase mental clarity, reduced
              stress, and sharper focus.
            </p>
          </div>

          <div className="column">
            <h4 className="title is-size-4">
              <span className="icon has-text-success mr-2">
                <i className="fas fa-hourglass"></i>
              </span>{" "}
              Boost Focus with Pomodoro
            </h4>
            <p className="is-size-6 has-text-weight-medium">
              Structured work sessions improve productivity and help you stay
              mentally fresh throughout the day.
            </p>
          </div>

          <div className="column">
            <h4 className="title is-size-4">
              <span className="icon has-text-success mr-2">
                <i className="fas fa-leaf"></i>
              </span>{" "}
              Focus in a Calming Environment
            </h4>
            <p className="is-size-6 has-text-weight-medium">
              Brief views of natural scenes can reduce stress hormone levels and
              sharpen your attention.
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div
        className="section has-text-centered my-6"
        style={{
          backgroundColor: "rgba(15,23,20,0.55)",
          backdropFilter: "blur(6px)",
        }}
      >
        <h3 className="title is-size-2">Ready to Grow Your Focus?</h3>
        <p className="is-size-5 mb-5">
          Step into Focus Garden today and start cultivating your productivity.
        </p>
        <Link
          to="/signup"
          className="button is-primary is-rounded is-large"
          style={{
            textShadow: "0px 0px 0px #19241cff",
          }}
        >
          Sign Up Now
        </Link>
      </div>

      {/* Footer */}
      <footer
        className="footer has-text-light"
        style={{
          backgroundColor: "rgba(15,23,20,0.85)",
          backdropFilter: "blur(6px)",
          padding: "2rem 1rem",
        }}
      >
        <div className="content has-text-centered">
          <p className="is-size-6">
            <strong>Focus Garden</strong> — Cultivate your productivity.
          </p>
          <p className="is-size-7 has-text-grey-light">
            Built by <strong>Vi Tran</strong> · Powered by{" "}
            <strong>React</strong> · Inspired by <strong>Nature</strong>
          </p>
          <div className="mt-3">
            <a
              href="https://github.com/ViTran25"
              target="_blank"
              rel="noopener noreferrer"
              className="has-text-grey-light mx-2"
            >
              <span className="icon">
                <i className="fab fa-github"></i>
              </span>
              <span>GitHub</span>
            </a>
          </div>
          <p className="is-size-7 has-text-grey-light mt-4">
            © {new Date().getFullYear()} Focus Garden. All rights reserved.
          </p>
        </div>
      </footer>
    </section>
  );
}

export default DefaultProfile;
