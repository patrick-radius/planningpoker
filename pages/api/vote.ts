import type { NextApiRequest, NextApiResponse } from 'next'
import {Vote, voteService} from "../../service/VoteService";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const newVote = req.body as Vote;
        voteService.addVote(
            newVote
        )
    }

    res.status(200).json({ votes: voteService.getVotes() })
}
