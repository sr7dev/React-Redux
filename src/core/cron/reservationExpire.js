var CronJob = require('cron').CronJob;
import sequelize from '../../data/sequelize';
import { Reservation, ListBlockedDates, ThreadItems } from '../../data/models';
import fetch from '../fetch';
import {emailBroadcast} from './expiredEmail';

const reservationExpire = app => {

	new CronJob('0 0 * * * *', async function() {
		console.log('holy moly expire reservation');
		// get all reservation id
		const getReservationIds = await Reservation.findAll({
			attributes: ['id','reservationState',[sequelize.literal('TIMESTAMPDIFF(HOUR, createdAt, NOW())'), 'hours_difference']],
			having: {
				'hours_difference': {
	    			$gt: 24
	    		},
	    		reservationState: 'pending',
			}
	    });

		// Store them in an array
	    if(getReservationIds != null && getReservationIds.length > 0){
	    	getReservationIds.map(async (item) => {

	    		// Update Reservation Status
	    		let updateReservation = await Reservation.update({
	    			reservationState: 'expired'
	    		}, {
	    			where: {
	    				id: item.id
	    			}
	    		});

	    		// Update ThreadItems
	    		let updateThreadItems = await ThreadItems.update({
	    			type: 'expired'
	    		}, {
	    			where: {
	    				reservationId: item.id
	    			}
	    		});

	    		// Unblock blocked dates
	    		let unblockDates = await ListBlockedDates.destroy({
	    			where: {
	    				reservationId: item.id
	    			}
	    		});

	    		await emailBroadcast(item.id);
	    	})
	    }

	}, null, true, 'America/Los_Angeles');

};

export default reservationExpire;