import { NextRequest } from 'next/server'

export const runtime = 'nodejs'
// This is required to enable streaming
export const dynamic = 'force-dynamic'
import {voteService} from "../VoteService";

export async function GET(request: NextRequest) {
    let responseStream = new TransformStream()
    const writer = responseStream.writable.getWriter()
    const encoder = new TextEncoder()

    // Close if client disconnects
    request.signal.onabort = () => {
        console.log('closing writer')
        writer.close()
    }

    // Function to send data to the client
    function sendData(data: any) {
        try {
            const formattedData = `data: ${JSON.stringify(data)}\n\n`
            writer.write(encoder.encode(formattedData))
        } catch (e) {
            console.error(e)
        }
    }

    // Initial Progress
    sendData({ votes: voteService.getVotes() });

    voteService.getEvents().on('vote', (e) => {
        sendData({votes: e})
    })

    return new Response(responseStream.readable, {
        headers: {
            'Content-Type': 'text/event-stream',
            Connection: 'keep-alive',
            'Cache-Control': 'no-cache, no-transform'
        }
    })
}

