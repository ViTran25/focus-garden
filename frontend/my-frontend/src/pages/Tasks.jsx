import { useState } from "react";

const listTask = [
  {
    title: "Go to Ebisu",
    description:
      "Buy a One Piece figure, and then get a pack of One Piece 11, and then go to 98K",
    due_date: new Date(),
    priority: "low",
    tags: "Entertainment",
    is_done: false,
  },
  {
    title: "Read Manga",
    description:
      "Find a manga with good adventure journey, powerscaling and romance!",
    due_date: new Date(),
    priority: "high",
    tags: "Entertainment",
    is_done: false,
  },
];

function Task() {
  const [tasks, setTasks] = useState(listTask);

  const handleTask = (title) => {
    setTasks(tasks.filter((task) => task.title !== title));
  };
  return (
    <div>
      <h1 className="title">Your Tasks</h1>
      <div className="container">
        <ul className="grid is-col-min-12">
          {tasks.map((task) => {
            return (
              <div className="cell" key={task.title}>
                <li
                  className={`card ${
                    task.priority === "high"
                      ? "has-background-danger-60 has-text-danger-invert"
                      : task.priority === "medium"
                      ? "has-background-warning-60 has-text-warning-invert"
                      : "has-background-light has-text-success-invert"
                  } m-2`}
                  key={task.title}
                >
                  <header className="card-header"></header>
                  <div className="card-content">
                    <p className="is-size-4 has-text-weight-bold">
                      {task.title}
                    </p>
                    <div className="is-size-6">{task.description}</div>
                  </div>
                  <div className="card-footer">
                    <div className="card-footer-item">
                      <time dateTime={task.due_date}>
                        {task.due_date.toLocaleDateString()}
                      </time>
                    </div>
                    <div className="card-footer-item">
                      <p className="has-text-weight-semibold">{task.tags}</p>
                    </div>
                    <div className="card-footer-item">
                      <button
                        className="button is-info"
                        onClick={() => handleTask(task.title)}
                      >
                        Done
                      </button>
                    </div>
                  </div>
                </li>
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default Task;
