export const newReservation = (data) => async (dispatch) => {
    console.log(data)
    const reservationsData = {
        checkIn: "",
        checkOut: "",
        nightStaying: "",
        guestNumber: "",
        price: "",
    }
    dispatch({
        type: "NEW_RESERVATIONS_DATA",
        // payload: reservationsData
    })
}