import './TodoList.css';
import axios from 'axios';
import { useEffect, useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function TodoList() {
    const [todoList, setTodoList] = useState([]);
    const [editableId, setEditableId] = useState(null);
    const [state, setState] = useState({
        newTask: "",
        newStatus: "",
        newDeadline: "",
        newEmail: "",
        editedTask: "",
        editedStatus: "",
        editedDeadline: "",
        editedEmail: "",
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [token, setToken] = useState(() => localStorage.getItem('token') || "");

    const fetchTodoList = useCallback(() => {
        if (token) {
            axios.get('https://todo-list-backend-bian.onrender.com/auth/getTodoList', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(result => {
                    const todos = result.data.map(todo => ({
                        ...todo,
                        deadline: new Date(todo.deadline).toLocaleDateString()
                    }));
                    setTodoList(todos);
                    setLoading(false);
                })
                .catch(err => {
                    toast.error("Error loading todos, Please refresh the page");
                    setError("Error loading todos");
                });
        }
    }, [token]);

    useEffect(() => {
        fetchTodoList();
    }, [fetchTodoList]);

    const toggleEditable = (id) => {
        const rowData = todoList.find(data => data._id === id);
        if (!rowData) {
            setEditableId(null);
            setState(prevState => ({
                ...prevState,
                editedTask: "",
                editedStatus: "",
                editedDeadline: "",
                editedEmail: ""
            }));
            return;
        }

        setEditableId(id);
        setState(prevState => ({
            ...prevState,
            editedTask: rowData.task,
            editedStatus: rowData.status,
            editedDeadline: rowData.deadline || "",
            editedEmail: rowData.email
        }));
    };

    const validateDate = (date) => {
        const today = new Date()
        today.setHours(0, 0, 0, 0) // Set time to 00:00:00 for today
        const inputDate = new Date(date)
        inputDate.setHours(0, 0, 0, 0) // Set time to 00:00:00 for the input date
        return inputDate >= today
    }

    const validateEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    }

    const validateTask = (task) => {
        return task.trim().length > 0
    }

    const validateStatus =(status) => {
        return status !== 'Select Status'
    }

    const addTask = () => {
        const { newTask, newStatus, newDeadline, newEmail } = state;

        if (!newTask || !newStatus || !newDeadline || !newEmail) {
            toast.error("All fields must be filled out.");
            return;
        } else if (!token) {
            toast.error("Please Register/Login first");
            return;
        } else if (!validateDate(newDeadline)) {
            toast.error("Deadline must be a future date.");
            return;
        } else if (!validateEmail(newEmail)) {
            toast.error("Invalid email format.");
            return;
        } else if (!validateTask(newTask)) {
            toast.error("Task cannot be empty.");
            return;
        }
        else if (!validateStatus(newStatus)) {
            toast.error("Invalid status.");
            return;
        }

        axios.post('https://todo-list-backend-bian.onrender.com/addTodoList', {
            task: newTask,
            status: newStatus,
            deadline: newDeadline,
            email: newEmail
        }, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(() => {
                fetchTodoList();
                setState({
                    newTask: "",
                    newStatus: "",
                    newDeadline: "",
                    newEmail: "",
                    editedTask: "",
                    editedStatus: "",
                    editedDeadline: "",
                    editedEmail: ""
                });
            })
            .catch(() => {
                toast.error("Error adding todo, Please try again");
            });
    };

    const deleteTask = (id) => {
        axios.delete(`https://todo-list-backend-bian.onrender.com/deleteTodoList/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(() => {
                fetchTodoList();
            })
            .catch(() => {
                toast.error("Error deleting todo, Please try again");
            });
    };

    const saveEditedTask = (id) => {
        const { editedTask, editedStatus, editedDeadline, editedEmail } = state;

        if (!editedTask || !editedStatus || !editedDeadline || !editedEmail) {
            toast.error("All fields must be filled out.");
            return;
        } else if (!validateDate(editedDeadline)) {
            toast.error("Deadline must be a future date.");
            return;
        } else if (!validateEmail(editedEmail)) {
            toast.error("Invalid email format.");
            return;
        } else if (!validateTask(editedTask)) {
            toast.error("Task cannot be empty.");
            return;
        } else if (!validateStatus(editedStatus)) {
            toast.error("Invalid status.");
            return;
        }

        axios.post(`https://todo-list-backend-bian.onrender.com/updateTodoList/${id}`, {
            task: editedTask,
            status: editedStatus,
            deadline: editedDeadline,
            email: editedEmail
        }, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(() => {
                fetchTodoList();
                setEditableId(null);
                setState(prevState => ({
                    ...prevState,
                    editedTask: "",
                    editedStatus: "",
                    editedDeadline: "",
                    editedEmail: ""
                }));
            })
            .catch(() => {
                toast.error("Error saving todo, Please try again");
            });
    };

    return (
        <>
            <div className="todo-list-container">
                <div className="todos-input-box">
                    <input
                        type="text"
                        placeholder='Enter Todo'
                        className='todo-input-box'
                        id='task'
                        value={state.newTask}
                        onChange={(e) => setState(prevState => ({ ...prevState, newTask: e.target.value }))}
                    />
                    <select
                        className='todo-input-box'
                        id='status'
                        value={state.newStatus}
                        onChange={(e) => setState(prevState => ({ ...prevState, newStatus: e.target.value }))}
                    >
                        <option value="Select Status">Select Status</option>
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                    </select>
                    <input
                        type="date"
                        placeholder='Deadline'
                        className='todo-input-box'
                        id='deadline'
                        value={state.newDeadline}
                        onChange={(e) => setState(prevState => ({ ...prevState, newDeadline: e.target.value }))}
                    /> 
                    <input
                        type="email"
                        placeholder='Your Email'
                        className='todo-input-box'
                        id='email'
                        value={state.newEmail}
                        onChange={(e) => setState(prevState => ({ ...prevState, newEmail: e.target.value }))}
                    />
                    <p className="email-note">Note: We will use this email to remind you about the task on the deadline date.</p>
                    <button id='add-todo' onClick={addTask}>Add Todo</button>
                </div>
                <div className="todos-list">
                    <h2 id="todo-list-heading">Todo List</h2>
                    {todoList.length === 0 ? (
                        <div id='no-todos-row'>
                        <div className="table-wrapper">
                            <table className="table">
                                <thead>
                                    <tr id="todo-list-sub-headings">
                                        <th className='todo-list-sub-heading' id='todo-list-task-heading'>Todo</th>
                                        <th className='todo-list-sub-heading' id='todo-list-status-heading'>Status</th>
                                        <th className='todo-list-sub-heading' id='todo-list-deadline-heading'>Deadline</th>
                                        <th className='todo-list-sub-heading' id='todo-list-actions-heading'>Actions</th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                            <div className='no-todos'>
                                {Array.from("Please add todo...").map((char, index) => (
                                    <span key={index}>
                                        {char === ' ' ? '\u00A0' : char}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ) : loading ? (
                        <div id='loading-todos-row'>
                            <span className='loading-todos'>Loading todos...</span>
                        </div>
                    ) : error ? (
                        <div id='error-todos-row'>
                            <span className='error-todos'>{error}</span>
                        </div>
                    ) : (
                        <div className="todo-list-table">
                            <div className="table-wrapper">
                                <table className="table">
                                    <thead>
                                        <tr id="todo-list-sub-headings">
                                            <th className='todo-list-sub-heading' id='todo-list-task-heading'>Todo</th>
                                            <th className='todo-list-sub-heading' id='todo-list-status-heading'>Status</th>
                                            <th className='todo-list-sub-heading' id='todo-list-deadline-heading'>Deadline</th>
                                            <th className='todo-list-sub-heading' id='todo-list-actions-heading'>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {todoList.map(data => (
                                            <tr key={data._id} id="todo-list-content">
                                                <td className="todo-list-sub-content" id='todo-list-task-content'>
                                                    {editableId === data._id ? (
                                                        <input
                                                            type="text"
                                                            value={state.editedTask}
                                                            onChange={(e) => setState(prevState => ({ ...prevState, editedTask: e.target.value }))}
                                                            id="edit-task"
                                                            className="edit-input-box"
                                                        />
                                                    ) : (
                                                        data.task
                                                    )}
                                                </td>
                                                <td className="todo-list-sub-content" id='todo-list-status-content'>
                                                    {editableId === data._id ? (
                                                        <select
                                                            value={state.editedStatus}
                                                            onChange={(e) => setState(prevState => ({ ...prevState, editedStatus: e.target.value }))}
                                                            className="edit-input-box" id="edit-status"
                                                        >
                                                            <option value="Select Status">Select Status</option>
                                                            <option value="Pending">Pending</option>
                                                            <option value="In Progress">In Progress</option>
                                                            <option value="Completed">Completed</option>
                                                        </select>
                                                    ) : (
                                                        data.status
                                                    )}
                                                </td>
                                                <td className="todo-list-sub-content" id='todo-list-deadline-content'>
                                                    {editableId === data._id ? (
                                                        <input
                                                            type="date"
                                                            value={state.editedDeadline}
                                                            onChange={(e) => setState(prevState => ({ ...prevState, editedDeadline: e.target.value }))}
                                                            className="edit-input-box" id="edit-deadline"
                                                        />
                                                    ) : (
                                                        new Date(data.deadline).toLocaleDateString()
                                                    )}
                                                </td>
                                                <td className="todo-list-sub-content actions-container" id='todo-list-actions-content'>
                                                    {editableId === data._id ? (
                                                        <>
                                                            <button id='save-btn' className='action-btn' onClick={() => saveEditedTask(data._id)}>Save</button>
                                                            <button id='delete-btn' className='action-btn' onClick={() => toggleEditable(null)}>Cancel</button>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <button id='edit-btn' className='action-btn' onClick={() => toggleEditable(data._id)}>Edit</button>
                                                            <button id='delete-btn' className='action-btn' onClick={() => deleteTask(data._id)}>Delete</button>
                                                        </>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
