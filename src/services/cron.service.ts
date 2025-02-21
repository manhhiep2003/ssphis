// import cron from "node-cron";
// import { TimeSlotService } from "./timeSlot.service";

// export class CronService {
//   static initCronJobs() {
//     // Auto update time slot status every 5 minutes
//     cron.schedule("*/5 * * * *", async () => {
//       console.log("Running auto update time slot status...");
//       try {
//         await TimeSlotService.autoUpdateTimeSlotStatus();
//       } catch (error) {
//         console.error("Auto update time slot status failed:", error);
//       }
//     });

//     // Reset time slots daily at midnight
//     cron.schedule("0 0 * * *", async () => {
//       console.log("Running daily time slot reset...");
//       try {
//         await TimeSlotService.resetDailyTimeSlots();
//       } catch (error) {
//         console.error("Daily time slot reset failed:", error);
//       }
//     });
//   }
// }
