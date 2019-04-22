import { 
    User, 
    UserProfile, 
    Reservation,
    Listing,
    ListingData
} from '../../data/models';
import sequelize from '../../data/sequelize';

export async function users() {
    let dataItems = [];
    const data = await User.findAll({
        include: [
            {model: UserProfile, as: 'profile'}
        ]
    });
    if(data && data.length > 0) {
        data.map((item) => {
            let consolidatedData = Object.assign( 
                { 
                    Email: item.email, 
                    EmailConfirmed: item.emailConfirmed,
                    Type: item.type
                },
                item.profile.dataValues
            );
            dataItems.push(consolidatedData);
        })
    }
    return dataItems;
}

export async function reservations() {
    let dataItems = [];
    const data = await sequelize.query(`SELECT 
        Reservation.*, User.email as HostEmail, GuestUser.email as GuestEmail 
        from Reservation, User, User as GuestUser 
        where Reservation.hostId=User.id and Reservation.guestId=GuestUser.id`, 
        { type: sequelize.QueryTypes.SELECT }
    );
    
    if (data && data.length > 0) {
        data.map(async (item) => {
            let consolidatedData = Object.assign(
                item,
            );
            dataItems.push(consolidatedData);
        })
    }
    return dataItems;
}

export async function listings() {
    let dataItems = [];
    const data = await Listing.findAll({
        include: [
            { model: ListingData, as: 'listingData' },
            { model: User, as: 'user' }
        ]
    });
    if (data && data.length > 0) {
        data.map((item) => {
            let listingOtherData = item.listingData ? item.listingData.dataValues : {};
            let hostEmail = item.user ? item.user.dataValues.email : {}
            let consolidatedData = Object.assign(
                item.dataValues,
                { hostEmail },
                { listingData: ''},
                { user: '' },
                listingOtherData
            );
            dataItems.push(consolidatedData);
        })
    }
    return dataItems;
}