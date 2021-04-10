import { FLOOR_CALL_PRESS } from "../classes/constants";

export const onFloorCallPress = ({ callsQueue, to, elevators }) => {
    const elevator = selectElevator(to, elevators);
    const task = {
        action: FLOOR_CALL_PRESS,
        from: elevator.row,
        to,
        elevator
    }
    callsQueue.enqueue(task);
}

export const selectElevator = (toFloor, elevators) => {
    let callElevators = elevators.filter(elevator => elevator.status === "call" || elevator.status === "arrived");
    let elevatorsDistances = [];
    callElevators.forEach(elevator => {
        let distance = Math.abs(toFloor - elevator.row);
        elevatorsDistances.push({ distance, elevator });
    })

    let minDistance = elevatorsDistances[0].distance;
    let closestElevator = elevators[0];
    elevatorsDistances.forEach(elevatorDis => {
        if (elevatorDis.distance < minDistance) {
            minDistance = elevatorDis.distance;
            closestElevator = elevatorDis.elevator;
        }
    })
    return closestElevator;
}

export const updateElevator = ({ to, elevator, elevators }) => {
    elevators[elevator.ID].row = to;
    return elevators;
}

export const updateBoard = ({ board, from, to, elevator }) => {
    board[from][elevator.ID].elevatorID = null;
    board[to][elevator.ID].elevatorID = elevator.ID;
    return board;
}