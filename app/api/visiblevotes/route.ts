import {voteService} from "../VoteService";

export async function DELETE(req: Request) {
    voteService.hideVotes();

    return Response.json({
        votes: voteService.getVotes(),
        visible: voteService.getShowVotes()
    })
}
export async function POST(req: Request) {
    voteService.showVotes();

    return Response.json({
        votes: voteService.getVotes(),
        visible: voteService.getShowVotes()
    })
}
