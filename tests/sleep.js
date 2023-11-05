function sleep(duration) {}

module.exports = sleep;

/*
export default function mergeData(sessions) {
  const results = [];
  const sessionsForUser = new Map();

  sessions.forEach((session) => {
    if (sessionsForUser.has(session.user)) {
      const userSession = sessionsForUser.get(session.user);
      userSession.duration += session.duration;
      session.equipment.forEach((equipment) => {
        userSession.equipment.add(equipment);
      });
    } else {
      const clonedSession = {
        ...session,
        equipment: new Set(session.equipment),
      };
      sessionsForUser.set(session.user, clonedSession);
      results.push(clonedSession);
    }
  });

  // Sort equipment of each session and convert back into array.
  return results.map((session) => ({
    ...session,
    equipment: Array.from(session.equipment).sort(),
  }));
}
*/

/*
Solution
The sleep function takes a duration parameter representing the time in milliseconds for which the execution should be paused.
It returns a Promise that will resolve after the specified duration.
Inside the Promise constructor, use setTimeout to delay the execution of the resolve function, effectively pausing the execution for the specified time.

JavaScript

TypeScript
/**
 * @param {number} duration
 * @return {Promise<void>}
 *
export default async function sleep(duration) {
  return new Promise((resolve) => setTimeout(resolve, duration));
}
Blocking version of sleep()
A synchronous, blocking function of sleep can be implemented as such, where the CPU does nothing except repeatedly check if duration has passed since the function started running. Hence, it will pause all execution on the main thread and is usually not desired.

function sleep(duration) {
  let now = new Date().getTime();
  while (new Date().getTime() < now + duration) {
    // Do nothing.
  }
  // Proceed when `duration` has passed since `now`.
}
Here's an example to illustrate the difference between the two versions of sleep:

Asynchronous sleep
async function greeting() {
  console.log('Hello!');
  await sleep(2000);
  console.log('Bye.');
}

setInterval(() => {
  console.log('Tick');
}, 500);

greeting();
// t = 0: Hello!
// t = 500: Tick
// t = 1000: Tick
// t = 1500: Tick
// t = 2000: Tick
// t = 2000: Bye.
// t = 2500: Tick
// t = 3000: Tick
// ...
Synchronous/blocking sleep
async function greeting() {
  console.log('Hello!');
  sleep(2000);
  console.log('Bye.');
}

setInterval(() => {
  console.log('Tick');
}, 500);

greeting();
// t = 0: Hello!
// t = 2000: Bye.
// t = 2000: Tick
// t = 2500: Tick
// t = 3000: Tick
// ...
Note that in this example, the first "Tick" is only printed because the sleep() function was executing the entire time (checking the while condition for the full duration).

Resources
How to Make JavaScript Sleep or Wait
*/
