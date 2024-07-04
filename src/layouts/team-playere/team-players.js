import React, { useEffect, useState } from "react";
import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import { BASE_URL } from "BASE_URL";

const Teamplayer = () => {
    const [players, setPlayers] = useState([]);
    const [teams, setTeams] = useState([]);
    const [teamPlayerDetails, setTeamPlayerDetails] = useState([]);

    console.log(teamPlayerDetails)

    const getAllPlayers = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`${BASE_URL}/api/player/detailsList`, {
                method: "GET",
                headers: {
                    Authorization: token,
                },
            });
            const responseData = await response.json();
            setPlayers(responseData.data);
        } catch (error) {
            console.log(error);
        }
    };

    const getTeams = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(
                `${BASE_URL}/api/team/displayList/6630cf57e9418e29a2fe07b4`,
                {
                    method: "GET",
                    headers: {
                        Authorization: token,
                    },
                }
            );
            const responseData = await response.json();

            const teamDetails = responseData.data.map((team) => ({
                team: team,
                players: [],
            }));

            setTeams(responseData.data);
            setTeamPlayerDetails(teamDetails);
            getAllPlayers();
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getTeams();
    }, []);

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (!over) return;

        const activeId = active.id;
        const overId = over.id;

        setTeamPlayerDetails((prevDetails) => {
            // Find the team the player is currently in
            let sourceTeamId = null;
            let draggedPlayer = null;

            const newDetails = prevDetails.map((teamDetail) => {
                const playerIndex = teamDetail.players.findIndex(
                    (player) => player._id === activeId
                );
                if (playerIndex > -1) {
                    sourceTeamId = teamDetail.team._id;
                    draggedPlayer = teamDetail.players[playerIndex];
                    teamDetail.players.splice(playerIndex, 1);
                }
                return teamDetail;
            });

            if (!draggedPlayer) {
                // If player is not found in team, check if it's in the players list
                const playerIndex = players.findIndex(
                    (player) => player._id === activeId
                );
                if (playerIndex > -1) {
                    draggedPlayer = players[playerIndex];
                    setPlayers((prevPlayers) =>
                        prevPlayers.filter((player) => player._id !== activeId)
                    );
                }
            }

            if (draggedPlayer) {
                if (overId === "players") {
                    setPlayers((prevPlayers) => [
                        ...prevPlayers,
                        draggedPlayer,
                    ]);
                } else if (sourceTeamId !== overId) {
                    const targetTeam = newDetails.find(
                        (teamDetail) => teamDetail.team._id === overId
                    );
                    if (targetTeam) {
                        targetTeam.players.push(draggedPlayer);
                    }
                }
            }

            return newDetails;
        });
    };

    return (
        <DashboardLayout>
            <DndContext onDragEnd={handleDragEnd}>
                <div style={{ display: "flex" }}>
                    {/* Teams Container */}
                    <div style={{ flex: 1, marginRight: "20px" }}>
                        {teamPlayerDetails.map((teamDetail) => (
                            <DroppableContainer
                                key={teamDetail.team._id}
                                id={teamDetail.team._id}
                                team={teamDetail.team}
                                items={teamDetail.players}
                            />
                        ))}
                    </div>

                    {/* Players Container */}
                    <div style={{ flex: 1 }}>
                        <DroppableContainer id="players" items={players} />
                    </div>
                </div>
            </DndContext>
        </DashboardLayout>
    );
};

export default Teamplayer;

const DroppableContainer = ({ id, items = [], team }) => {
    const { isOver, setNodeRef } = useDroppable({
        id: id,
    });
    const style = {
        color: isOver ? "green" : undefined,
        border: "1px solid black",
        padding: "20px",
        minHeight: "400px",
        marginBottom: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    };

    return (
        <div ref={setNodeRef} style={style}>
            {id === "players" ? (
                <>
                    <h3>Players</h3>
                    {items.map((player) => (
                        <Draggable key={player._id} id={player._id}>
                            {player.player_name}
                        </Draggable>
                    ))}
                </>
            ) : (
                <>
                    <h3>{team.team_name}</h3>
                    {items.map((player) => (
                        <Draggable key={player._id} id={player._id}>
                            {player.player_name}
                        </Draggable>
                    ))}
                </>
            )}
        </div>
    );
};

function Draggable(props) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: props.id,
    });
    const style = transform
        ? {
              transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
              margin: "10px",
          }
        : {
              margin: "10px",
          };

    return (
        <button ref={setNodeRef} style={style} {...listeners} {...attributes}>
            {props.children}
        </button>
    );
}
