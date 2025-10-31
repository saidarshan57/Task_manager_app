import React, { useState } from 'react'
import { ListGroup, Button, Row, Col, Form } from 'react-bootstrap'


export default function TaskList({ tasks, setFilters, onUpdate }) {
    const [localFilter, setLocalFilter] = useState({ status: '', priority: '' })


    function apply() {
        const f = {}
        if (localFilter.status) f.status = localFilter.status
        if (localFilter.priority) f.priority = localFilter.priority
        setFilters(f)
    }


    return (
        <div>
            <h4>Tasks</h4>
            <Row className="mb-2">
                <Col>
                    <Form.Select value={localFilter.status} onChange={e => setLocalFilter({ ...localFilter, status: e.target.value })}>
                        <option value="">All Statuses</option>
                        <option value="open">Open</option>
                        {/* <option value="in-progress">In Progress</option> */}
                        <option value="done">Done</option>
                    </Form.Select>
                </Col>
                <Col>
                    <Form.Select value={localFilter.priority} onChange={e => setLocalFilter({ ...localFilter, priority: e.target.value })}>
                        <option value="">All Priorities</option>
                        <option>Low</option>
                        <option>Medium</option>
                        <option>High</option>
                    </Form.Select>
                </Col>
                <Col>
                    <Button onClick={apply}>Apply Filters</Button>
                </Col>
            </Row>
            <ListGroup>
                {tasks.length === 0 && <ListGroup.Item>No tasks yet</ListGroup.Item>}
                {tasks.map(t => (
                    <ListGroup.Item key={t.id} className={`d-flex justify-content-between align-items-start`}>
                        <div>
                            <div><strong>{t.title}</strong></div>
                            <div>{t.description}</div>
                            <div>Due: {t.due_date || '—'}</div>
                            <div>Status: {t.status}, Priority: {t.priority}</div>
                        </div>
                        <div className="d-flex flex-column gap-1">
                            <Button size="sm" onClick={() => onUpdate(t.id, { status: t.status === 'done' ? 'open' : 'done' })}>Done</Button>
                        </div>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    )
}