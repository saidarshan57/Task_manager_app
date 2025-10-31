import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'


export default function TaskForm({ onAdd }) {
    const [form, setForm] = useState({ title: '', description: '', priority: 'Medium', due_date: '', status: 'open' })


    function change(e) {
        setForm({ ...form, [e.target.name]: e.target.value })
    }


    function submit(e) {
        e.preventDefault()
        const payload = { ...form }
        if (!payload.due_date) delete payload.due_date
        onAdd(payload)
        setForm({ title: '', description: '', priority: 'Medium', due_date: '', status: 'open' })
    }


    return (
        <Form onSubmit={submit} className="mb-4">
            <h4>Add Task</h4>
            <Form.Group className="mb-2">
                <Form.Control name="title" placeholder="Title" value={form.title} onChange={change} required />
            </Form.Group>
            <Form.Group className="mb-2">
                <Form.Control as="textarea" name="description" placeholder="Description" value={form.description} onChange={change} />
            </Form.Group>
            <Form.Group className="mb-2">
                <Form.Select name="priority" value={form.priority} onChange={change}>
                    <option>Low </option>
                    <option>Medium </option>
                    <option>High</option>
                </Form.Select>
            </Form.Group>
            <Form.Group className="mb-2">
                <Form.Control type="date" name="due_date" value={form.due_date} onChange={change} />
            </Form.Group>
            <Button type="submit" variant="primary">Add</Button>
        </Form>
    )
}