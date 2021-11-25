import React, { useEffect, useState } from "react";
import Navbar from "./NavBar";
import "./App.css";

const image_API = "https://image.tmdb.org/t/p/w1280";

let page = 1;

function Movie() {
    const [datas, setDatas] = useState([]);
    const [loading, setloading] = useState(true);

    const getfetch = () => {
        let url = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=${page}`;
        fetch(url)
            .then((res) => res.json())
            .then((D) => {
                setDatas([...datas, D.results]);
                setloading(false);
            })

    }

    useEffect(() => {
        getfetch();
    }, []);


    const loadMore = () => {
        page += 1;
        getfetch();
    }

    return (
        <>
            <Navbar setData={setDatas} />
            <div className="content">
                {(loading) ? <h1>Loading...</h1> :
                    datas.map((data, index) => {
                        return (
                            <div key={index} className="Movies">
                                {(loading) ? <h1>Loading</h1> : data.map((da) => {
                                    const { id, title, poster_path, vote_average, overview, release_date } = da;
                                    let year;
                                    if (release_date) {
                                        year = release_date.substr(0, 4);
                                    } else {
                                        year = "";
                                    }
                                    let votecolor = "";
                                    if (vote_average <= 5) {
                                        votecolor = "red";
                                    }
                                    else if (vote_average > 5) {
                                        votecolor = "orange";
                                    }
                                    else if (vote_average > 8) {
                                        votecolor = "green";
                                    }

                                    let vote = vote_average;
                                    return (
                                        <div className="Movie" key={id}>
                                            <div className="img-div">
                                                <img src={(!poster_path) ? "https://propertywiselaunceston.com.au/wp-content/themes/property-wise/images/no-image@2x.png" : image_API + poster_path} alt={title} className="image" />
                                            </div>
                                            <div className="info">
                                                <h1>{title} (<span>{year}</span>)</h1>
                                                <p style={{ color: `${votecolor}` }}>{vote}</p>
                                            </div>
                                            <div className="overviewtxt">
                                                <h1>{title} (<span>{year}</span>)</h1>
                                                <p>{overview}</p>
                                            </div>
                                        </div>
                                    )
                                }
                                )}
                            </div>
                        )
                    })
                }
                <button className="loadmore-btn" onClick={() => loadMore()}>Load More</button>
            </div>
        </>
    )

}

export default Movie;
