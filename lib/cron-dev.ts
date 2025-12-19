import cron from "node-cron";

// Syntaxe cron :
// minute hour dayOfTheMonth month dayOfTheWeek
// "0 8 * * *"

/**
 * - 0 (Minute)
 * - 8 (Hour)
 * - * (everyDayOfTheMonth (*) OR dayOfTheMonth (5))
 * - * (everyMonth (*) OR month (15))
 * - * (everyDayOfTheWeek (*) OR dayOfTheWeek (0-6))
 */
cron.schedule("0 8 * * *", async () => {
  await fetch(`${process.env.APP_URL}/api/cron/notify-rdv`, {
    headers: {
      Authorization: `Bearer ${process.env.CRON_SECRET}`,
    },
  });
});
