import React, {useState, useEffect} from "react";
import Axios from 'axios';

export default function SongList() {
    const [songList, setSongList] = useState([]);

    useEffect(() => {
        Axios.get('http://localhost:3002/api/songs/15').then((response) => {
            setSongList(response.data)
        })
    },[])

    return (
        <div>
            <h1>Song List</h1>
            <ul>
                {songList.map((song) =>(
                    <li>{song.name}</li>
                ))}
            </ul>
        </div>
    )
}