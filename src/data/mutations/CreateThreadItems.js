// GrpahQL
import {
  GraphQLList as List,
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLNonNull as NonNull,
} from 'graphql';

import ThreadItemsType from '../types/ThreadItemsType';

// Sequelize models
import { Threads, ThreadItems } from '../../data/models';

const CreateThreadItems = {

  type: ThreadItemsType,

  args: {
    listId: { type: new NonNull(IntType)},
    host: { type: new NonNull(StringType)},
    content: { type: new NonNull(StringType) },
    type: { type: StringType },
    startDate: { type: StringType },
    endDate: { type: StringType },
    personCapacity: { type: IntType },
  },

  async resolve({ request, response }, {
    listId,
    host,
    content,
    type,
    startDate,
    endDate,
    personCapacity
  }) {

    // Check if user already logged in
    if(request.user && !request.user.admin) {

        const userId = request.user.id;

        // Check if a thread is already there or create a new one
        const thread = await Threads.findOrCreate({
          where: {
            listId,
            host,
            guest: userId,
          },
          defaults: {
            //properties you want on create
            listId,
            host,
            guest: userId,
          }
        });

        if(thread) {
          // Create a thread item
          const threadItems = await ThreadItems.create({
            threadId: thread[0].dataValues.id,
            sentBy: userId,
            content,
            type,
            startDate,
            endDate,
            personCapacity
          });
          if(threadItems){
            const updateThreads = await Threads.update({
              isRead: false
            },
              {
                where: {
                  id: thread[0].dataValues.id
                }
              }
            );
            return threadItems;
          } else {
            return {
              status: 'failed to create thread items'
            }
          }
        } else {
          return {
            status: 'failed to create a thread'
          }
        }
    } else {
        return {
          status: "notLoggedIn",
        };
    }
  },
};

export default CreateThreadItems;

/**
mutation CreateThreadItems(
  $listId: Int!, 
  $host: String!,
  $content: String!,
  $type: String,
  $startDate: String,
  $endDate: String,
  $personCapacity: Int
){
    CreateThreadItems(
      listId: $listId,
      host: $host,
      content: $content,
      type: $type,
      startDate: $startDate,
      endDate: $endDate,
      personCapacity: $personCapacity
    ) {
        id
        sentBy
        content
        type
        startDate
        endDate
        personCapacity
        createdAt
    }
}
**/  
