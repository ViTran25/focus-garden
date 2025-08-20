import { useContext, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AppContext } from "../App";

function AddTask({ onClose, onCreate }) {
  // Get token
  const { token, API_URL } = useContext(AppContext);

  // States for login information
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState(null);
  const [priority, setPriority] = useState("");
  const [tags, setTags] = useState("");

  const sendTask = async (task) => {
    console.log(task);
    try {
      const response = await fetch(`${API_URL}/api/tasks/`, {
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
    const addResult = await sendTask({
      title,
      description,
      due_date: dueDate,
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
                  type="datetime-local"
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
  const [tasks, setTasks] = useState([]);
  const [showAddTask, setShowAddTask] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  // Get token
  const { token, API_URL } = useContext(AppContext);

  const fetchTasks = async () => {
    try {
      const response = await fetch(`${API_URL}/api/tasks/`, {
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

  const finishTask = async (id) => {
    try {
      const response = await fetch(`${API_URL}/api/tasks/${id}`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ is_done: true }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error: Status ${response.status}`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchHistory = async () => {
    try {
      const response = await fetch(`${API_URL}/api/tasks/history`, {
        method: "GET",
        headers: {
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

  // Fetch task list in the beginning
  useEffect(() => {
    fetchTasks();
  }, []);

  const handleTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
    finishTask(taskId);
  };
  const handleAddTask = () => {
    fetchTasks();
  };

  const getHistory = () => {
    fetchHistory();
    setShowHistory(true);
  };

  const getBackToMainTask = () => {
    fetchTasks();
    setShowHistory(false);
  };

  return (
    <div className="container">
      <div className="mb-4">
        {!showHistory ? (
          <>
            <button
              className="button is-rounded is-link is-normal is-responsive"
              onClick={() => setShowAddTask(true)}
            >
              <span className="icon">
                <i className="fas fa-plus"></i>
              </span>
              <span>New Task</span>
            </button>
            <div
              className="is-flex is-justify-content-flex-end"
              style={{
                position: "fixed",
                bottom: "1rem",
                right: "1rem",
                zIndex: "1000",
              }}
            >
              <button
                className="tag is-dark is-medium is-responsive ml-3"
                onClick={() => getHistory()}
              >
                <span className="icon">
                  <i className="fas fa-history"></i>
                </span>
                <span>History</span>
              </button>
            </div>
          </>
        ) : (
          <button
            className="button is-link is-normal is-responsive ml-3"
            onClick={() => getBackToMainTask()}
          >
            <span className="icon">
              <i className="fas fa-arrow-left"></i>
            </span>
            <span>Back</span>
          </button>
        )}
      </div>
      {showAddTask &&
        createPortal(
          <AddTask
            onClose={() => setShowAddTask(false)}
            onCreate={handleAddTask}
          />,
          document.body
        )}

      <h1
        className="title has-text-light"
        style={{ textShadow: "0px 0px 10px #19241cff" }}
      >
        {!showHistory ? "Your Tasks" : "History"}
      </h1>
      {tasks.length == 0 && (
        <p
          className="is-size-5 has-text-light has-text-weight-semibold"
          style={{ textShadow: "0px 0px 10px #19241cff" }}
        >
          You're all caught up! 🎉
        </p>
      )}
      <div className="container">
        <ul className="grid is-col-min-12">
          {tasks.map((task) => {
            return (
              <div className="cell" key={task.title}>
                <li
                  className={`card has-text-light m-2`}
                  style={{
                    position: "relative",
                    backgroundColor: "rgba(15,23,20,0.55)",
                    backdropFilter: "blur(10px)",
                  }}
                  key={task.title}
                >
                  <div className="card-content">
                    <div className="media">
                      <div className="media-content">
                        <p className="is-size-4 has-text-weight-bold">
                          {task.title}
                        </p>
                        <p className="is-size-6">{task.description}</p>
                      </div>
                      <div className="media-right">
                        <span
                          className={`tag is-rounded is-medium ${
                            task.priority === "High"
                              ? "is-danger"
                              : task.priority === "Medium"
                              ? "is-warning"
                              : "is-success"
                          }`}
                        >
                          {task.priority}
                        </span>
                      </div>
                    </div>

                    <div className="content">
                      <span className="icon-text has-text-grey-light is-size-6">
                        <span>
                          {new Intl.DateTimeFormat("en-US").format(
                            new Date(task.due_date)
                          )}
                        </span>
                      </span>

                      <span className="is-pulled-right has-text-grey-light">
                        <span className="icon">
                          <i className="fas fa-clock"></i>
                        </span>
                        {new Intl.DateTimeFormat("en-US", {
                          hour: "numeric",
                          minute: "numeric",
                        }).format(new Date(task.due_date))}
                      </span>
                    </div>

                    <span className="tag is-info">{task.tags}</span>

                    <div className="is-flex is-justify-content-flex-end mt-4">
                      <button
                        className="button is-rounded is-success"
                        onClick={() => handleTask(task.id)}
                        style={{
                          position: "absolute",
                          bottom: "1rem",
                          right: "1rem",
                        }}
                        title={
                          showHistory
                            ? "Task Completed"
                            : "Mark task as complete"
                        }
                        disabled={showHistory}
                      >
                        <span className="icon">
                          <i className="fas fa-circle-check"></i>
                        </span>
                        <span>Done</span>
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
