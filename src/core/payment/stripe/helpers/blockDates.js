import { Reservation, ListBlockedDates } from '../../../../data/models';

export async function blockDates(
    reservationId
  ) {
    var dates = [];
    const reservation = await Reservation.findOne({
      where: {
        id: reservationId,
      }
    });

    if(reservation){
      var dates = [];
      var start = reservation.checkIn;
      var end = reservation.checkOut;
      var copy = new Date(start);
      let endTimevalue = end.setDate(end.getDate() - 1);
      let endTime = new Date(endTimevalue);
      dates.push(copy);
      while(start < endTime){
         dates.push(start);
         var newDate = start.setDate(start.getDate() + 1);
         start = new Date(newDate);
      }
      dates.map(async (blockedDates) => {
        await ListBlockedDates.findOrCreate({
          where: {
            listId: reservation.listId,
            reservationId,
            blockedDates
          },
          defaults: {
            //properties you want on create
            listId: reservation.listId,
            reservationId,
            blockedDates
          }
        });
      });    
    }
}