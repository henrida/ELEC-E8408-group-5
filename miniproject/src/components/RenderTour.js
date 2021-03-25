import React from 'react'
import Select from 'react-select'

const UpdateStatus = ({ tour, handleDepart, handleArrival, restartTour }) => {
    console.log("starttour")
    console.log(tour)
    console.log(tour.current_port)
    console.log(tour.origin)
    if (tour.origin === "not selected" || tour.destination === "not selected") {
        return <p>Select origin and destination ports to start a new tour</p>
    } else if (tour.current_port === tour.destination) {
        return (
            <div>
                <p>TOUR FINISHED</p>
                <button onClick={() => restartTour(tour)}>
                    Restart tour
                </button>
            </div>)
    } 
    else if (tour.current_port === tour.origin && tour.status !== "on the move") {
        return (<button onClick={() => handleDepart(tour)}>
            Start tour
        </button>)
    }
    return ((tour.status === "at port") ?
        <button onClick={() => handleDepart(tour)}>
            Depart for next port
            </button>
        :
        <button onClick={() => handleArrival(tour)}>
            Arrived at port
            </button>
    )
}

const StartTour = ({ tour, setOrigin, setDestination, ports }) => {
    console.log(ports)
    if ((tour.origin !== "not selected" && tour.destination !== "not selected" && tour.current_port !== tour.origin) || tour.status === "on the move") {
        return (
            <>
                <p>Origin: {tour.origin}</p>
                <p>Destination: {tour.destination}</p>
            </>
        )
    }
    const options = ports.map(port => ({ label: port.name, value: port.name }))
    console.log(options)
    return (
        <div>
            <p>Origin:</p>
            <Select onChange={setOrigin} options={options} />
            <p>Destination:</p>
            <Select onChange={setDestination} options={options} />
        </div>)
}

const NextPort = ({ tour, handlePortSelect, ports }) => {
    if (tour.current_port === tour.destination) {
        return <p>Next port: Destination port reached</p>
    }
    if (tour.current_port === tour.next_port || tour.next_port === "not selected") {
        let port = ports.find(port => port.name === tour.current_port)
        if (port.connections.find(connection => connection === tour.destination)) {
            handlePortSelect({ value: tour.destination })
            return <p>Next port: {tour.destination}</p>
        }
        const options = port.connections.map(connection => ({ label: connection, value: connection }))
        return (
            <div>
                <p>Next port:</p>
                <Select onChange={handlePortSelect} options={options} />
            </div>)
    }
    return <p>Next port: {tour.next_port}</p>
}

const RenderTour = ({ tour, handleDepart, handleArrival, handlePortSelect, ports, restartTour, setDestination, setOrigin }) => {
    return ((tour) ?
        <div>
            <h3>Tour information:</h3>

            <p>Id: {tour.id}</p>
            <StartTour tour={tour} setOrigin={setOrigin} setDestination={setDestination} ports={ports}></StartTour>
            <p>Current port: {tour.current_port}</p>
            <NextPort tour={tour} handlePortSelect={handlePortSelect} ports={ports}></NextPort>
            <p>Departure time: {tour.departure_time}</p>
            <p>Status: {tour.status}</p>
            <UpdateStatus tour={tour} handleDepart={handleDepart} handleArrival={handleArrival} restartTour={restartTour} ></UpdateStatus>
        </div> :
        <div>
        </div>
    )
}

export default RenderTour