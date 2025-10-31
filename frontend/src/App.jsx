import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import Insights from './components/Insights'
import { fetchTasks, createTask, updateTask, fetchInsights } from './api'


export default function App() {
    const [tasks, setTasks] = useState([])
    const [filters, setFilters] = useState({})
    const [insights, setInsights] = useState(null)


    async function loadTasks(fs = {}) {
        const data = await fetchTasks(fs)
        if (data.ok) setTasks(data.tasks)
    }


    async function loadInsights() {
        const data = await fetchInsights()
        if (data.ok) setInsights(data.insights)
    }


    useEffect(() => { loadTasks(filters); loadInsights() }, [filters])


    async function onAdd(task) {
        const data = await createTask(task)
        if (data.ok) { loadTasks(filters); loadInsights() }
    }


    async function onUpdate(id, patch) {
        const data = await updateTask(id, patch)
        if (data.ok) { loadTasks(filters); loadInsights() }
    }


    return (
        <Container className="mt-4">
            <h1 className="mb-4">Mini Task Tracker</h1>
            <Row>
                <Col md={4}>
                    <TaskForm onAdd={onAdd} />
                    <Insights insights={insights} refresh={loadInsights} />
                </Col>
                <Col md={8}>
                    <TaskList tasks={tasks} setFilters={setFilters} onUpdate={onUpdate} />
                </Col>
            </Row>
        </Container>
    )
}