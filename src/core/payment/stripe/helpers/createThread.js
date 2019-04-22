import { Reservation, Threads, ThreadItems } from '../../../../data/models';

export async function createThread(
    reservationId
  ) {

    // Find Reservation and collect data
    const reservation = await Reservation.findOne({
      where: {
        id: reservationId,
      }
    });

    if(reservation){
        //Find or create a thread
        const thread = await Threads.findOrCreate({
          where: {
            listId: reservation.listId,
            host: reservation.hostId,
            guest: reservation.guestId
          },
          defaults: {
            //properties you want on create
            listId: reservation.listId,
            host: reservation.hostId,
            guest: reservation.guestId
          }
        });

        if(thread){
          let bookType;
          if(reservation.reservationState === 'pending'){
            bookType = 'requestToBook';
          } else {
            bookType = 'intantBooking';
          }
          const threadItems = await ThreadItems.findOrCreate({
          where: {
            threadId: thread[0].dataValues.id,
            reservationId: reservation.id, 
            sentBy: reservation.guestId,
            startDate: reservation.checkIn,
            endDate: reservation.checkOut,
            type: bookType,
          },
          defaults: {
              //properties you want on create
              threadId: thread[0].dataValues.id,
              reservationId: reservation.id, 
              sentBy: reservation.guestId,
              content: reservation.message,
              type: bookType,
              startDate: reservation.checkIn,
              endDate: reservation.checkOut,
              personCapacity: reservation.guests
            }
          });

          const updateThreads = await Threads.update({
            isRead: false
          },
            {
              where: {
                id: thread[0].dataValues.id
              }
            }
          );

        }
    }
}