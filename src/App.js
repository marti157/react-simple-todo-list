import React, { useState } from 'react';
import './App.css';

export default function App() {
    const [tasks, setTasks] = useState([]);
    const [input, setInput] = useState('');

    const handleChange = (e) => {
        setInput(e.target.value);
    };

    const addTask = () => {
        if (input === '') return;
        setTasks([...tasks, {name: input, checked: false}]);
        setInput('');
    };

    const handleCheck = (i) => {
        let taskArray = [...tasks];
        taskArray[i].checked = !taskArray[i].checked;
        setTasks(taskArray);
    };

    const handleRemove = (i) => {
        let taskArray = [...tasks];
        taskArray.splice(i, 1);
        setTasks(taskArray);
    };

    const Item = (props) => {
        return (
            <li className={props.checked ? "completed" : ""}>
            <div className="form-check">
                <label className="form-check-label">
                    <input className="checkbox" type="checkbox" checked={props.checked} onChange={() => handleCheck(props.index)} />
                    {props.name}
                    <i className="input-helper"></i>
                </label>
            </div>
            <i className="remove mdi mdi-close-circle-outline" onClick={() => handleRemove(props.index)}></i>
        </li> 
        );
    };
    
    const List = (props) => {
        return props.items.map(function(task, i) {
            return <Item name={task.name} key={i} index={i} checked={task.checked} />
        });
    };

    return (
        <div>
            <div className="add-items d-flex">
                <input type="text" value={input} onChange={handleChange} className="form-control todo-list-input" placeholder="What do you need to do today?" />
                <button className="add btn btn-primary font-weight-bold todo-list-add-btn" onClick={addTask}>
                    Add
                </button>
            </div>
            <div className="list-wrapper">
                <ul className="d-flex flex-column-reverse todo-list">
                    {
                        tasks.length === 0 ?
                        <li>
                            <div className="form-check">
                                <b>Add a new task!</b>
                            </div>
                        </li>
                    :
                        <List items={tasks} />
                    }
                </ul>
            </div>
        </div>
    );
}