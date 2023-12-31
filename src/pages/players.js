// src/components/PlayerList.js
import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

export default function Players(params) {
  const [players, setPlayers] = useState([]);
  const [page, setPage] = useState(10);

  const fetchPlayers = async () => {
    try {
      const response = await fetch(
        `https://www.balldontlie.io/api/v1/players?per_page=${page}}`
      );
      const data = await response.json();
      setPlayers((prevPlayers) => [...prevPlayers, ...data.data]);
    } catch (error) {
      console.error("Error fetching players:", error);
    }
  };
  useEffect(() => {
    fetchPlayers();
  }, [page]);

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 10);
  };
  const fetchMoreData = () => {
    setTimeout(async () => {
      const response = await fetch(
        `https://www.balldontlie.io/api/v1/players?per_page=${page}`
      );
      const data = await response.json();
      setPlayers((prevPlayers) => [...prevPlayers, ...data.data]);
    }, 1500);
  };
  const PlayerCard = ({ player }) => {
    return (
      <div className="max-w-sm mx-auto bg-white rounded overflow-hidden shadow-lg m-4">
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-2">
            {player.first_name} {player.last_name}
          </h2>
          <p className="text-gray-700">{player.position}</p>
        </div>
      </div>
    );
  };
  return (
    <div className="container mx-auto my-8">
      <InfiniteScroll
        dataLength={players.length}
        next={() => setPage(page + 10)}
        loader={<h4>Loading...</h4>}
        hasMore={true}
      >
        {players.map((player, index) => (
          <PlayerCard key={index} player={player} />
        ))}
      </InfiniteScroll>
    </div>
  );
}
