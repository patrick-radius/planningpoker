"use client";

import {useEffect, useState} from "react";
import  {v4 as uuid } from "uuid";
import {Vote} from "./api/VoteService";

export default function Home() {
    const fibonacci = [0, 1, 2, 3, 5, 8, 13, 21, 34];


    let [votes, setVotes] = useState<Vote[]>([]);
    let [votesVisible, setVotesVisible] = useState<boolean>(false);

    let [name, setName] = useState<string>('');

    const fetchVotes = async () => {
        fetch('/api/votes').then(resp => resp.json()).then(resp => {
            setVotes(resp.votes.sort((a, b) => a.name.localeCompare(b.name)))
            setVotesVisible(resp.visible);
        });
    }

    const vote = (item) => {
        if (!name || name.length < 3) {
            alert("Please enter a name");
            return;
        }

        fetch('/api/vote', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({id: uuid(), name, vote: item},)
        }).then(resp => resp.json()).then(fetchVotes);
    }

    const clearVotes = () => {
        fetch('/api/votes', {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
            },
        }).then(resp => resp.json()).then(fetchVotes);
    }
    const hideVotes = () => {
        fetch('/api/visiblevotes', {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
            },
        }).then(resp => resp.json()).then(fetchVotes);
    }

    const showVotes = () => {
        fetch('/api/visiblevotes', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
        }).then(resp => resp.json()).then(fetchVotes);
    }


    useEffect(() => {
        fetchVotes();
    }, []);

    useEffect(() => {
        const name = localStorage.getItem("name")
        setName(name ?? '')
    }, [])

    const saveName = (name) => {
        localStorage.setItem("name", name);
        setName(name);
    }

    useEffect(() => {
        setInterval(() => {
            fetchVotes();
        }, 1000);
        // const host = window.location.origin;
        //
        // connectSSE(`${host}/api/sse`, (votes) => {
        //     setVotes(votes)
        // })
    }, [])

    return (
        <>
            <main>
                <header>
                    US-2 super awesome ad-free planning poker
                </header>

                <div className="auth-container">
                    <input type="text" placeholder="Your Name" value={name} onChange={(e) => saveName(e.target.value)}></input>
                </div>

                <div className='card-container'>
                    {fibonacci.map((item, index) => (
                        <span key={item} onClick={() => vote(item)}>{item}</span>
                    ))}
                </div>

                <div className="vote-container">
                    <table>
                        <tbody>
                        {votes.map((item) => (
                            <tr key={item.name}>
                                <td>{item.name}</td>
                                <td>
                                    {votesVisible &&<span>
                                        {item.vote}
                                    </span>}
                                    {!votesVisible &&<span>
                                        #
                                    </span>}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </main>
            <footer>
                <div>
                    <button onClick={() => clearVotes()}>clear votes</button>
                    {votesVisible && <button onClick={() => hideVotes()}>hide votes</button>}
                    {!votesVisible && <button onClick={() => showVotes()}>show votes</button>}
                </div>
            </footer>
        </>
    );
}
