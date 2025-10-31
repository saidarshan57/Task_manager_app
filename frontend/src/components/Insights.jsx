import React from 'react'
import { Card, Button } from 'react-bootstrap'

export default function Insights({ insights, refresh }) {
    if (!insights)
        return <Card className="mb-4"><Card.Body>Loading insights...</Card.Body></Card>

    return (
        <Card className="mb-4">
            <Card.Body>
                <Card.Title>Task Insights</Card.Title>
                <ul>
                    <li>Total Open Tasks: {insights.total_open_tasks}</li>
                    <li>Open Tasks Due in 3 Days: {insights.due_soon_open_tasks}</li>
                </ul>
                <Card.Text>{insights.readable}</Card.Text>
                <Button onClick={refresh}>Refresh</Button>
            </Card.Body>
        </Card>
    )
}
