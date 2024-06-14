import EventEmitter from "events";

export type Vote = {
    id: string,
    name: string,
    user_id: string,
    vote: number
}
export class VoteService {
    private readonly eventEmitter: EventEmitter;
    private votes: Vote[] = [];

    constructor() {
        this.eventEmitter = new EventEmitter();
    }

    getEvents() {
        return this.eventEmitter;
    }

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

        this.eventEmitter.emit('vote', this.votes)
    }
}

export const voteService = new VoteService();
