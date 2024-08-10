import './TodoList.css'
import axios from 'axios'
import { useEffect, useState } from 'react'

export default function TodoList() {
    const [todoList, setTodoList] = useState([])
    const [editableId, setEditableId] = useState(null)
    const [editedTask, setEditedTask] = useState("")
    const [editedStatus, setEditedStatus] = useState("")
    const [editedDeadline, setEditedDeadline] = useState("")
    const [newTask, setNewTask] = useState("")
    const [newStatus, setNewStatus] = useState("")
    const [newDeadline, setNewDeadline] = useState("")
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [token, setToken] = useState("")

    useEffect(() => {
        const userToken = localStorage.getItem('token')
        if(userToken) {
            setToken(userToken)
            axios.get('https://master--todo-hub-app.netlify.app/auth/getTodoList', {
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
                    alert(`Error in loading todos, Please refresh the page`)
                    setError("Error loading todos")
                })
        }
    }, [])

    const toggleEditable = (id) => {
        const rowData = todoList.find(data => data._id === id)
        if(!rowData) {
            setEditableId(null);
            setEditedTask("");
            setEditedStatus("");
            setEditedDeadline("");
            return
        }

        setEditableId(id)
        setEditedTask(rowData.task)
        setEditedStatus(rowData.status)
        setEditedDeadline(rowData.deadline || "")
    }

    const addTask = () => {
        if(!newTask || !newStatus || !newDeadline) {
            alert(`All fields must be filled out.`)
            return
        }
        else if(!token) {
            alert(`Please Register/Login first`)
            return
        }

        axios.post('https://master--todo-hub-app.netlify.app/addTodoList', {
            task: newTask,
            status: newStatus,
            deadline: newDeadline
        }, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res=> {
                // console.log(res)
                window.location.reload()
            }) 
            .catch(err => {
                alert(`Error in adding todo, Please add again`)
            }) 
    }

    const deleteTask = (id) => {
        axios.delete('https://master--todo-hub-app.netlify.app/deleteTodoList/' + id, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(result => {
                // console.log(result)
                window.location.reload()
            })
            .catch(error => {
                alert(`Error in deleting todo, Please delete again`)
            })
    }

    const saveEditedTask = (id) => {
        const editedData = {
            task: editedTask,
            status: editedStatus,
            deadline: editedDeadline
        }

        if (!editedTask || !editedStatus || !editedDeadline) {
            alert("All fields must be filled out.")
            return
        }

        axios.post('https://master--todo-hub-app.netlify.app/updateTodoList/' + id, editedData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(result => {
                // console.log(result)
                setEditableId(null)
                setEditedTask("")
                setEditedStatus("")
                setEditedDeadline("")
                window.location.reload()
            })
            .catch(err => {
                alert(`Error in saving todo, Please save again`)
            })
    }
 
    return (
        <>
            <div className="todo-list-container">
                <div className="todos-input-box">
                    <input type="text" placeholder='Enter Task' className='todo-input-box' id='task' value={newTask} onChange={(e) => setNewTask(e.target.value)} />
                    <input type="text" placeholder='Enter Status' className='todo-input-box' id='status' value={newStatus} onChange={(e) => setNewStatus(e.target.value)} />
                    <input type="date" placeholder='Deadline' className='todo-input-box' id='deadline' value={newDeadline}
                    onChange={(e) => {
                        setNewDeadline(e.target.value);
                    }} />
                    <button id='add-todo' onClick={addTask}>Add Todo</button>
                </div>
                <div className="todos-list">
                    <h2 id="todo-list-heading">Todo List</h2>
                    <div className="todo-list-table">
			<div className="table-wrapper">
                        <table className="table">
                            <thead>
                                <tr id="todo-list-sub-headings">
                                    <th className='todo-list-sub-heading' id='todo-list-task-heading'>Task</th>
                                    <th className='todo-list-sub-heading' id='todo-list-status-heading'>Status</th>
                                    <th className='todo-list-sub-heading' id='todo-list-deadline-heading'>Deadline</th>
                                    <th className='todo-list-sub-heading' id='todo-list-actions-heading'>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {todoList.length === 0 ? (
                                        <tr id='no-todos-row'>
                                            <td colSpan='4' className='no-todos'>
                                                {Array.from("Please add todo...").map((char, index) => (
                                                    <span key={index}>
                                                        {char === ' ' ? '\u00A0' : char} 
                                                    </span>
                                                ))}
                                            </td>
                                        </tr>
                                    ) : loading ? (
                                        <tr id='loading-todos-row'>
                                            <td colSpan='4' className='loading-todos'>Loading todos...</td>
                                        </tr>
                                    ) : error ? (
                                        <tr id='error-todos-row'>
                                            <td colSpan='4' className='error-todos'>{error}</td>
                                        </tr>
                                    ) : (
                                    todoList.map(data => (
                                        <tr key={data._id} id="todo-list-content">
                                            <td className="todo-list-sub-content" id='todo-list-task-content'>
                                                {editableId === data._id ? (
                                                    <input type="text" value={editedTask} onChange={(e) => setEditedTask(e.target.value)} id="edit-task" className="edit-input-box"/>
                                                ) : (
                                                    data.task
                                                )}
                                            </td>
                                            <td className="todo-list-sub-content" id='todo-list-status-content'>
                                                {editableId === data._id ? (
                                                    <input type="text" value={editedStatus} onChange={(e) => setEditedStatus(e.target.value)} id="edit-status" className="edit-input-box"/>
                                                ) : (
                                                    data.status
                                                )}
                                            </td>
                                            <td className="todo-list-sub-content" id='todo-list-deadline-content'>
                                                {editableId === data._id ? (
                                                    <input type="date" value={editedDeadline} onChange={(e) => setEditedDeadline(e.target.value)} id="edit-deadline" className="edit-input-box"/>
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
                            )}
                            </tbody>
                        </table>		
			</div>
                    </div>
                </div>
            </div>
            
        </>
    )
}