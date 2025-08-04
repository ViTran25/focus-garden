import { useContext, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AppContext } from "../App";

const listTask = [
  {
    title: "Go to Ebisu",
    description:
      "Buy a One Piece figure, and then get a pack of One Piece 11, and then go to 98K",
    due_date: new Date(),
    priority: "Low",
    tags: "Entertainment",
    is_done: false,
  },
  {
    title: "Read Manga",
    description:
      "Find a manga with good adventure journey, powerscaling and romance!",
    due_date: new Date(),
    priority: "High",
    tags: "Entertainment",
    is_done: false,
  },
];

function AddTask({ onClose, onCreate }) {
  // Get token
  const { token } = useContext(AppContext);

  // States for login information
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState(null);
  const [priority, setPriority] = useState("");
  const [tags, setTags] = useState("");

  const sendTask = async (task) => {
    console.log(task);
    try {
      const response = await fetch("http://127.0.0.1:5000/api/tasks/", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(task),
      });

      if (!response.ok) {
        throw new Error(`HTTP error: Status ${response.status}`);
      }

      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({ title, description, dueDate, priority, tags });
    const formattedDueDate = dueDate
      ? new Date(dueDate).toISOString()
      : new Date().toISOString();
    const addResult = await sendTask({
      title,
      description,
      due_date: formattedDueDate,
      priority,
      tags,
      is_done: false,
    });

    if (!addResult) {
      console.log("Couldn't add new task");
    } else {
      onCreate({
        title,
        description,
        due_date: dueDate,
        priority,
        tags,
      });
      onClose();
    }
  };
  return (
    <div className="modal is-active">
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">New Task</p>
          <button
            className="delete"
            aria-label="close"
            onClick={onClose}
          ></button>
        </header>
        <section className="modal-card-body">
          <form id="newTaskForm" action="" onSubmit={handleSubmit}>
            <div className="field has-text-left">
              <label
                className="label has-text-weight-semibold has-text-primary"
                htmlFor="title"
              >
                Title
              </label>
              <div className="control">
                <input
                  className="input is-rounded"
                  type="text"
                  name={title}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  id="title"
                  placeholder="Title"
                  required
                />
              </div>
            </div>

            <div className="field has-text-left">
              <label
                className="label has-text-weight-semibold has-text-primary"
                htmlFor="description"
              >
                Description
              </label>
              <div className="control">
                <input
                  className="input is-rounded"
                  type="text"
                  name={description}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  id="description"
                  placeholder="Description"
                />
              </div>
            </div>

            <div className="field has-text-left">
              <label
                className="label has-text-weight-semibold has-text-primary"
                htmlFor="dueDate"
              >
                Due Date
              </label>
              <div className="control">
                <input
                  className="input is-rounded"
                  type="date"
                  name={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  id="dueDate"
                />
              </div>
            </div>

            <div className="field has-text-left">
              <label
                className="label has-text-weight-semibold has-text-primary"
                htmlFor="priority"
              >
                Priority
              </label>
              <div className="radios">
                <label className="radio has-text-success">
                  <input
                    type="radio"
                    name="priority"
                    value="Low"
                    checked={priority === "Low"}
                    onChange={(e) => setPriority(e.target.value)}
                    required
                  />
                  Low
                </label>
                <label className="radio has-text-warning">
                  <input
                    type="radio"
                    name="priority"
                    value="Medium"
                    checked={priority === "Medium"}
                    onChange={(e) => setPriority(e.target.value)}
                  />
                  Medium
                </label>
                <label className="radio has-text-danger">
                  <input
                    type="radio"
                    name="priority"
                    value="High"
                    checked={priority === "High"}
                    onChange={(e) => setPriority(e.target.value)}
                  />
                  High
                </label>
              </div>
            </div>

            <div className="field has-text-left">
              <label
                className="label has-text-weight-semibold has-text-primary"
                htmlFor="tags"
              >
                Tag
              </label>
              <div className="control">
                <input
                  className="input is-dark is-rounded"
                  type="text"
                  name={tags}
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  id="tags"
                  placeholder="Tag"
                />
              </div>
            </div>
          </form>
        </section>
        <footer className="modal-card-foot">
          <div className="buttons">
            <button
              className="button is-success"
              type="submit"
              form="newTaskForm"
            >
              Create
            </button>
            <button className="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}

function Task() {
  const [tasks, setTasks] = useState(listTask);
  const [showAddTask, setShowAddTask] = useState(false);

  // Get token
  const { token } = useContext(AppContext);

  const fetchTasks = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/api/tasks/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error: Status ${response.status}`);
      }

      const data = await response.json();
      setTasks(data);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  const deleteTask = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/tasks/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error: Status ${response.status}`);
      }

      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  // Fetch task list in the beginning
  useEffect(() => {
    fetchTasks();
  }, []);

  const handleTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
    deleteTask(taskId);
  };
  const handleAddTask = (task) => {
    setTasks([...tasks, task]);
    fetchTasks();
  };

  return (
    <div>
      <div className="mb-4">
        <button
          className="button is-link is-medium is-responsive"
          onClick={() => setShowAddTask(true)}
        >
          New Task
        </button>
      </div>
      {showAddTask &&
        createPortal(
          <AddTask
            onClose={() => setShowAddTask(false)}
            onCreate={handleAddTask}
          />,
          document.body
        )}

      <h1 className="title">Your Tasks</h1>
      <div className="container">
        <ul className="grid is-col-min-12">
          {tasks.map((task) => {
            return (
              <div className="cell" key={task.title}>
                <li
                  className={`card ${
                    task.priority === "High"
                      ? "has-background-danger-60 has-text-danger-invert"
                      : task.priority === "Medium"
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
                        {new Date(task.due_date).toLocaleDateString()}
                      </time>
                    </div>
                    <div className="card-footer-item">
                      <p className="has-text-weight-semibold">{task.tags}</p>
                    </div>
                    <div className="card-footer-item">
                      <button
                        className="button is-info"
                        onClick={() => handleTask(task.id)}
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
