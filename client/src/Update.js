import React, { Fragment, useState } from "react";

const UpdateTodo = ({ todo }) => {
    const [title, setTitle] = useState(todo.title);
    
    const updateTitle = async e => {
        e.preventDefault();
        try {
            const body = { title };
            const response = await fetch(`http://localhost:5000/todos/${todo.todo_id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body) 
            });

            window.location = "/";
        } catch (error) {
            console.error(error.message);
        }
    }

    return (
        <Fragment>
            <button type="button" class="btn btn-primary" data-toggle="modal" data-target={`#id${todo.todo_id}`}>Update</button>
            <div id={`id${todo.todo_id}`} class="modal fade" role="dialog">
                <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                    <   h4 class="modal-title">Update Title</h4>
                    </div>
                    <div class="modal-body">
                        <input type="text" className="form-control" onChange={e => setTitle(e.target.value)}/>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" data-dismiss="modal" onClick={e => updateTitle(e)}>Update</button>
                        <button type="button" class="btn btn-danger" data-dismiss="modal" onClick={() => setTitle(todo.title)}>Close</button>
                    </div>
                </div>
                </div>
            </div>
        </Fragment>
    );
}

export default UpdateTodo;