import React, {useState, useEffect} from "react";
import Axios from 'axios';

export default function Artists() {
    const [artistList, setArtistList] = useState([]);

    useEffect(() => {
        Axios.get('http://localhost:3002/api/artists/15').then((response) => {
            setArtistList(response.data)
        })
    },[])

    return (
        <div>
            <h1>Artist List</h1>
            <ul>
                {artistList.map((artist) => (
                    <li>{artist.name}</li>
                ))}
            </ul>
        </div>
    )
}