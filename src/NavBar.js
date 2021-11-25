import React, { useState } from "react";

const search = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";



const Navbar = ({ setData, Data }) => {
    const [searchterm, setsearchterm] = useState("");

    const Search = (e) => {
        e.preventDefault();
        if (searchterm) {
            const data = search + searchterm;
            fetch(data).then((res) => res.json()).then((d) => setData([d.results]));
        }
        if (!Data) {
            fetch("https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1").then((res) => res.json()).then((d) => setData([d.results]));
        }
    }

    const handlechange = (e) => {
        setsearchterm(e.target.value)
        if (searchterm) {
            const data = search + searchterm;
            fetch(data).then((res) => res.json()).then((d) => setData([d.results]));

        }
        if (!Data) {
            fetch("https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1").then((res) => res.json()).then((d) => setData([d.results]));
        }
    }
    return (
        <div className="Nav-bar">
            <form onSubmit={Search}>
                <input type="search" placeholder="Search..." className="search-inp" value={searchterm} onChange={handlechange} />
            </form>
        </div>
    )
}

export default Navbar;