// src/components/PlayerList.js
import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

export default function Players(params) {
  const [teams, setTeams] = useState([]);
  const [page, setPage] = useState(10);
  const [hasMore, setHasMore] = useState(true);

  const fetchTeams = async () => {
    try {
      const response = await fetch(
        `https://www.balldontlie.io/api/v1/teams?per_page=${page}}`
      );
      const data = await response.json();
      setTeams((prevTeams) => [...prevTeams, ...data.data]);
      setHasMore(data.data.length === 10);
    } catch (error) {
      console.error("Error fetching teams:", error);
    }
  };
  useEffect(() => {
    fetchTeams();
  }, [page]);

  const TeamCard = ({ player }) => {
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
        dataLength={teams.length}
        next={() => setPage(page + 10)}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
      >
        {teams.map((player, index) => (
          <TeamCard key={index} player={player} />
        ))}
      </InfiniteScroll>
    </div>
  );
}
