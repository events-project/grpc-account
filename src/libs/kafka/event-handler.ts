import { db } from '@libs/database/db';

export const handleEvent = async (event: any) => {
  try {
    if (!event || !event.type || !event.appId) {
      console.warn('Invalid event received:', event);
      return;
    }

    await db.creditUsage.create({
      data: {
        appId: event.appId,
        type: event.type,
      },
    });
  } catch (error) {
    console.error('Failed to handle event:', error);
  }
};
