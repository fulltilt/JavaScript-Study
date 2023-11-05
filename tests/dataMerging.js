function mergeData(sessions) {
  throw "Not implemented";
}

module.exports = mergeData;

/*
A data set of gym sessions looks like this:

[
  { user: 8, duration: 50, equipment: ['bench'] },
  { user: 7, duration: 150, equipment: ['dumbbell'] },
  { user: 1, duration: 10, equipment: ['barbell'] },
  { user: 7, duration: 100, equipment: ['bike', 'kettlebell'] },
  { user: 7, duration: 200, equipment: ['bike'] },
  { user: 2, duration: 200, equipment: ['treadmill'] },
  { user: 2, duration: 200, equipment: ['bike'] },
];
Each session has the following fields:

user: User ID of the session's user.
duration: Duration of the session, in minutes.
equipment: Array of equipment used during the sessions, in alphabetical order. There are only 5 different equipments.
Implement a method mergeData, which is used to return a unified view of each user's activities by merging data from each user. It has the interface mergeData(sessions). Sessions from the same user should be merged into one object. When merging:

Sum up the duration fields.
Combine all the equipment used, de-duplicating the values and sorting alphabetically.
The order of the results should always remain unchanged from the original set, and in the case of merging sessions with the same users, the row should take the place of the earliest occurrence of that user. The input objects should not be modified.

Examples
The following example uses the data set above:

mergeData(sessions);
// [
//   { user: 8, duration: 50, equipment: ['bench'] },
//   { user: 7, duration: 450, equipment: ['bike', 'dumbbell', 'kettlebell'] },
//   { user: 1, duration: 10, equipment: ['barbell'] },
//   { user: 2, duration: 400, equipment: ['bike', 'treadmill'] },
// ];
Data of user 7 and user 2 are merged into the first occurrence of that user.
*/

/*
Solution
We have to merge the data for sessions with the same user field and also preserve the order. Note the requirement that:

in the case of merging sessions with duplicate users, the row should take the place of the earliest occurrence of that user. The input objects should not be modified.

We can initialize a new array results, and adding user sessions into it. Before adding we need to check if there's a session for that user already in results, and update that object instead of adding to the new array. There are two ways to go about this:

For every session item, iterate through the results array and check for existing users. The iteration through the results array will result in O(n2) time complexity.
Maintain a hash map sessionsForUser (via Object or Map in JavaScript), and use it to retain a reference to the session for a specific user, by having the user ID as the key. This will allow O(1) user look up complexity at the cost of O(n) memory space. The overall time complexity will be O(n).
The values within results and sessionsForUser point to the same object instances, such that updating the object instance will update the contents of both containers. To efficiently combine the equipment field, we can use a Set while processing and convert the field back into an array at the end just before returning. The time complexity required for sorting of the equipment field while merging is considered constant because there are only 5 different equipments.


JavaScript

TypeScript
/**
 * @param {Array<{user: number, duration: number, equipment: Array<string>}>} sessions
 * @return {Array<{user: number, duration: number, equipment: Array<string>}>}
 *
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
Techniques
Familiarity with JavaScript data structures like Arrays, Maps, and Sets.
*/
