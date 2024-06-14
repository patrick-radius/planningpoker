import type { NextApiRequest, NextApiResponse } from 'next'
import {Vote, voteService} from "../../service/VoteService";

type ResponseData = {
    votes: Vote[]
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    if (req.method === 'DELETE') {
        voteService.clearVotes();
    }

    res.status(200).json({ votes: voteService.getVotes() })
}
