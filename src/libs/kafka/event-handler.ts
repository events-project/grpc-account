import { db } from '@libs/database/db';

export const handleEvent = async (event: any) => {
  try {
    // Check if the event is valid
    if (!event || !event.type) {
      console.warn('Invalid event:', event);
      return;
    }

    // Handle the event based on its type
    switch (event.type) {
      case 'event':
        await db.creditUsage.upsert({
          where: {
            appId_type: { appId: event.appId, type: event.type },
          },
          update: {
            credits: { increment: 5 },
          },
          create: {
            appId: event.appId,
            type: event.type,
            credits: 5,
          },
        });
        break;
      case 'webhook':
        await db.creditUsage.upsert({
          where: {
            appId_type: { appId: event.appId, type: event.type },
          },
          update: {
            credits: { increment: 10 },
          },
          create: {
            appId: event.appId,
            type: event.type,
            credits: 10,
          },
        });
        break;
      case 'api-call':
        await db.creditUsage.upsert({
          where: {
            appId_type: { appId: event.appId, type: event.type },
          },
          update: {
            credits: { increment: 20 },
          },
          create: {
            appId: event.appId,
            type: event.type,
            credits: 20,
          },
        });
        break;

      default:
        console.warn('Unknown event type:', event.type);
    }
  } catch (error) {
    console.error('Failed to handle event:', error);
  }
};
