import {Vote, voteService} from "../VoteService";


export async function POST(req: Request) {
    const newVote = await req.json() as Vote

    voteService.addVote(
        newVote
    )

    return Response.json({ votes: voteService.getVotes() })
}

