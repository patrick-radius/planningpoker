import {voteService} from "../VoteService";

export async function DELETE(req: Request) {
    voteService.clearVotes();

    return Response.json({ votes: voteService.getVotes() })
}
export async function GET(req: Request) {
    return Response.json({ votes: voteService.getVotes() })
}
