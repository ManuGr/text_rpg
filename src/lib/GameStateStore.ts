import { writable } from "svelte/store";

const gameState = writable({
    currentLocation: "start",
    feedbackMessage: "",
    locations: {
        start: {
            description: "You find yourself trapped at the bottom of a well. A passage however seems to lead you north.",
            exits: {
                north: "cave"
            }
        },
        cave: {
            description: "A bare cave opens up before you. Paths seem to lead in all directions. The east and west paths seems to have light at the end.",
            exits: {
                north: "cave2",
                east: "beach",
                south: "start",
                west: "forest"
            }
        },
        cave2: {
            description: "An altar to a broken statue is the only thing that greets you. You can only go back south.",
            exits: {
                south: "cave"
            }
        },
        beach: {
            description: "Your feet feel the heat of from sand and all you can see is water as far as the eye can see. You can walk seaside southward or go back west.",
            exits: {
                south: "port",
                west: "cave"
            }
        },
        forest: {
            description: "You can only see pine trees everywhere. A wornout sign however points to the possibility of a village due west.",
            exits: {
                east: "cave",
                west: "village"
            }
        },
        port: {
            description: "An old seemingly abandoned port is all you see. No ship would dock here. You can only go back north.",
            exits: {
                north: "beach"
            }
        },
        village: {
            description: "A desolate village appears at the end of the forest. Some wary eyes examine you. Maybe the forest was safer.",
            exits: {
                east: "forest"
            }
        }
    }
})

function move(direction: string) {
    gameState.update(state => {
        const currentLocation = state.currentLocation;
        const locationData = state.locations[currentLocation];

        if (locationData.exits[direction]) {
            const newLocation = locationData.exits[direction];
            return {
                ...state,
                currentLocation: newLocation,
                feedbackMessage: `You moved ${direction} to the ${newLocation}.`
            };
        } else {
            return {
                ...state,
                feedbackMessage: `You can't go ${direction} from here`
            }
        }
    });
}

export {gameState, move}