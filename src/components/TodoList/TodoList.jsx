import './TodoList.css'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

export default function TodoList() {
    const [todoList, setTodoList] = useState([])
    const [editableId, setEditableId] = useState(null)
    const [editedTask, setEditedTask] = useState("")
    const [editedStatus, setEditedStatus] = useState("")
    const [editedDeadline, setEditedDeadline] = useState("")
    const [editedEmail, setEditedEmail] = useState("")
    const [newTask, setNewTask] = useState("")
    const [newStatus, setNewStatus] = useState("")
    const [newDeadline, setNewDeadline] = useState("")
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [token, setToken] = useState("")
    const [newEmail, setNewEmail] = useState("")

    const fetchTodoList = () => {
        const userToken = localStorage.getItem('token')
        if (userToken) {
            setToken(userToken)
            axios.get('https://todo-list-backend-bian.onrender.com/auth/getTodoList', {
            // axios.get('http://127.0.0.1:5173/getTodoList', {
                headers: {
                    'Authorization': `Bearer ${userToken}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(result => {
                    const todos = result.data.map(todo => ({
                        ...todo,
                        deadline: new Date(todo.deadline).toLocaleDateString()
                    }))
                    setTodoList(todos)
                    setLoading(false)
                })
                .catch(err => {
                    // alert(`Error in loading todos, Please refresh the page`)
                    toast.error("Error loading todos, Please refresh the page")
                    setError("Error loading todos")
                })
        }
    }

    useEffect(() => {
        fetchTodoList()
    }, [])

    const toggleEditable = (id) => {
        const rowData = todoList.find(data => data._id === id)
        if (!rowData) {
            setEditableId(null);
            setEditedTask("");
            setEditedStatus("");
            setEditedDeadline("");
            setEditedEmail("");
            return
        }

        setEditableId(id)
        setEditedTask(rowData.task)
        setEditedStatus(rowData.status)
        setEditedDeadline(rowData.deadline || "")
        setEditedEmail(rowData.email)
    }

    const addTask = () => {
        if (!newTask || !newStatus || !newDeadline || !newEmail) {
            // alert(`All fields must be filled out.`)
            toast.error("All fields must be filled out.")
            return
        }
        else if (!token) {
            // alert(`Please Register/Login first`)
            toast.error("Please Register/Login first")
            return
        }

        axios.post('https://todo-list-backend-bian.onrender.com/addTodoList', {
        // axios.post('http://127.0.0.1:5173/addTodoList', {
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
            .then(res => {
                // console.log(res)
                // toast.success("Todo added successfully!")
                // window.location.reload()
                // navigate('/')
                fetchTodoList()
                setNewTask("")
                setNewStatus("")
                setNewDeadline("")
                setNewEmail("")
            })
            .catch(err => {
                // alert(`Error in adding todo, Please add again`)
                toast.error("Error adding todo, Please try again")
            })
    }

    const deleteTask = (id) => {
        axios.delete('https://todo-list-backend-bian.onrender.com/deleteTodoList/' + id, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(result => {
                // console.log(result)
                // toast.success("Todo deleted successfully!")
                // window.location.reload()
                // navigate('/')
                fetchTodoList()
            })
            .catch(error => {
                // alert(`Error in deleting todo, Please delete again`)
                toast.error("Error deleting todo, Please try again")
            })
    }

    const saveEditedTask = (id) => {
        const editedData = {
            task: editedTask,
            status: editedStatus,
            deadline: editedDeadline,
            email: editedEmail
        }

        if (!editedTask || !editedStatus || !editedDeadline || !editedEmail) {
            // alert("All fields must be filled out.")
            toast.error("All fields must be filled out.")
            return
        }

        axios.post('https://todo-list-backend-bian.onrender.com/updateTodoList/' + id, editedData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(result => {
                // console.log(result)
                // toast.success("Todo updated successfully!")
                fetchTodoList()
                setEditableId(null)
                setEditedTask("")
                setEditedStatus("")
                setEditedDeadline("")
                setEditedEmail("")
                // window.location.reload()
                // navigate('/')
            })
            .catch(err => {
                // alert(`Error in saving todo, Please save again`)
                toast.error("Error saving todo, Please try again")
            })
    }

    return (
        <>
            <div className="todo-list-container">
                <div className="todos-input-box">
                    <input type="text" placeholder='Enter Todo' className='todo-input-box' id='task' value={newTask} onChange={(e) => setNewTask(e.target.value)} />
                    <input type="text" placeholder='Enter Status' className='todo-input-box' id='status' value={newStatus} onChange={(e) => setNewStatus(e.target.value)} />
                    <input type="date" placeholder='Deadline' className='todo-input-box' id='deadline' value={newDeadline}
                        onChange={(e) => {
                            setNewDeadline(e.target.value);
                        }} />
                    <input type="email" placeholder='Your Email' className='todo-input-box' id='email' value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
                    <p className="email-note">Note: We will use this email to remind you about the task on the deadline date.</p>
                    <button id='add-todo' onClick={addTask}>Add Todo</button>
                </div>
                <div className="todos-list">
                    <h2 id="todo-list-heading">Todo List</h2>
                    {todoList.length === 0 ? (
                        <div id='no-todos-row'>
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
                                                        <input type="text" value={editedTask} onChange={(e) => setEditedTask(e.target.value)} id="edit-task" className="edit-input-box" />
                                                    ) : (
                                                        data.task
                                                    )}
                                                </td>
                                                <td className="todo-list-sub-content" id='todo-list-status-content'>
                                                    {editableId === data._id ? (
                                                        <input type="text" value={editedStatus} onChange={(e) => setEditedStatus(e.target.value)} id="edit-status" className="edit-input-box" />
                                                    ) : (
                                                        data.status
                                                    )}
                                                </td>
                                                <td className="todo-list-sub-content" id='todo-list-deadline-content'>
                                                    {editableId === data._id ? (
                                                        <input type="date" value={editedDeadline} onChange={(e) => setEditedDeadline(e.target.value)} id="edit-deadline" className="edit-input-box" />
                                                    ) : (
                                                        data.deadline ? data.deadline : ''
                                                    )}
                                                </td>
                                                <td className="todo-list-sub-content actions-container" id='todo-list-actions-content'>
                                                    {editableId === data._id ? (
                                                        <button id='save-btn' className='action-btn' onClick={() => saveEditedTask(data._id)}>Save</button>
                                                    ) : (
                                                        <button id='edit-btn' className='action-btn' onClick={() => toggleEditable(data._id)}>Edit</button>
                                                    )}
                                                    <button id='delete-btn' className='action-btn' onClick={() => deleteTask(data._id)}>Delete</button>
                                                </td>
                                            </tr>
                                        ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </div>

        </>
    )
}