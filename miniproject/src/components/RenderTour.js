import React from 'react'
import Select from 'react-select'

const StartTour = ({ tour, handleDepart, handleArrival, restartTour }) => {
    console.log("starttour")
    console.log(tour)
    console.log(tour.current_port)
    console.log(tour.origin)
    if (tour.current_port === tour.destination) {
        return (
            <div>
                <p>TOUR FINISHED</p>
                <button onClick={() => restartTour(tour)}>
                    Restart tour
                </button>
            </div>)
    } else if (tour.current_port === tour.origin) {
        <button onClick={() => handleDepart(tour)}>
            Start tour
    </button>
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

const NextPort = ({ tour, handlePortSelect, ports }) => {
    if (tour.current_port === tour.destination) {
        return <p>Next port: Destination port reached</p>
    }
    if (tour.current_port === tour.next_port || tour.next_port === "not selected") {
        let port = ports.find(port => port.name === tour.current_port)
        if (port.connections.find(connection => connection === tour.destination)) {
            handlePortSelect({value: tour.destination})
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

const RenderTour = ({ tour, handleDepart, handleArrival, handlePortSelect, ports, restartTour }) => {
    return ((tour) ?
        <div>
            <h3>Tour information:</h3>

            <p>Id: {tour.id}</p>
            <p>Origin: {tour.origin}</p>
            <p>Destination: {tour.destination}</p>
            <p>Current port: {tour.current_port}</p>
            <NextPort tour={tour} handlePortSelect={handlePortSelect} ports={ports}></NextPort>
            <p>Departure time: {tour.departure_time}</p>
            <p>Status: {tour.status}</p>
            <StartTour tour={tour} handleDepart={handleDepart} handleArrival={handleArrival} restartTour={restartTour} ></StartTour>
        </div> :
        <div>
        </div>
    )
}

export default RenderTour