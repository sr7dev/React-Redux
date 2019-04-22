import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
  GraphQLFloat as FloatType,
} from 'graphql';

const GetAddressComponentsType = new ObjectType({
  name: 'GetAddressComponents',
  fields: {
    addressComponents: { type: StringType },
    lat: { type: FloatType },
    lng: { type: FloatType },
    geoType: { type: StringType },
  },
});

export default GetAddressComponentsType;
