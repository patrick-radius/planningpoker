import {Vote} from "./api/VoteService";

export const connectSSE = (url: string, onVote: (votes: Vote[]) => void) => {
    // Create a new EventSource instance
    const eventSource = new EventSource(url)

    // Handle an open event
    eventSource.onopen = (e) => {
        console.info('Connection to server opened')
    }

    // Handle a message event
    eventSource.onmessage = (e) => {
        const data = JSON.parse(e.data)
        console.info('New message from server:', data)
        onVote(data.votes)
    }

    // Handle an error event (or close)
    eventSource.onerror = (e) => {
        console.info('EventSource closed:', e)
        eventSource.close() // Close the connection if an error occurs
    }

    // Cleanup function
    return () => {
        eventSource.close()
    }
}
