
export type Vote = {
    id: string,
    name: string,
    user_id: string,
    vote: number
}
export class VoteService {
    private votes: Vote[] =  [
        {id: "1", name: 'Jasmin', vote: 1, user_id: 'jasmin'},
        {id: "2", name: 'Mihiran', vote: 3, user_id: 'mihiran'},
        {id: "3", name: 'Nejat', vote: 5, user_id: 'nejat'},
        {id: "4", name: 'Patrick', vote: 21, user_id: 'patrick'},
        {id: "5", name: 'Sebastian', vote: 5, user_id: 'sebastian'},
        {id: "6", name: 'Shakeel', vote: 3, user_id: 'shakeel'},
        {id: "7", name: 'Victor', vote: 0, user_id: 'victor'},
    ] ;
    getVotes() {
        return this.votes;
    }
    clearVotes() {
        this.votes = [];
    }

    addVote(newVote: Omit<Vote, 'user_id'>) {
        const user_id = newVote.name?.toLowerCase() ?? '';

        this.votes = this.votes
            .filter((v) => v.user_id !== user_id);

        this.votes.push({...newVote, user_id});
    }
}

export const voteService = new VoteService();
