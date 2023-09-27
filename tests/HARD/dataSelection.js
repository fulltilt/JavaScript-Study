function selectData(sessions, options) {
  throw "Not implemented!";
}

module.exports = selectData;

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
Implement a method selectData, which is used to return sessions from the data. It has the interface selectData(sessions [, options]). The options available should include:

user: Select only sessions with this id.
minDuration: Select only sessions with duration equal to or greater than this value.
equipment: Select only sessions where at least one of the specified equipments were used.
merge: If set to true
Sessions from the same user should be merged into one object. When merging:
Sum up the duration fields.
Combine all the equipment used, de-duplicating the values and sorting alphabetically.
The other filter options should be applied to the merged data.
The order of the results should always remain unchanged from the original set, and in the case of merging user sessions, the row should take the place of the latest occurrence of that user. The input objects should not be modified.

Examples
The following examples use the data set above:


selectData(sessions);
// [
//   { user: 8, duration: 50, equipment: ['bench'] },
//   { user: 7, duration: 150, equipment: ['dumbbell', 'kettlebell'] },
//   { user: 1, duration: 10, equipment: ['barbell'] },
//   { user: 7, duration: 100, equipment: ['bike', 'kettlebell'] },
//   { user: 7, duration: 200, equipment: ['bike'] },
//   { user: 2, duration: 200, equipment: ['treadmill'] },
//   { user: 2, duration: 200, equipment: ['bike'] },
// ];

selectData(sessions, { user: 2 });
// [
//   { user: 2, duration: 200, equipment: ['treadmill'] },
//   { user: 2, duration: 200, equipment: ['bike'] },
// ];

selectData(sessions, { minDuration: 200 });
// [
//   { user: 7, duration: 200, equipment: ['bike'] },
//   { user: 2, duration: 200, equipment: ['treadmill'] },
//   { user: 2, duration: 200, equipment: ['bike'] },
// ];

selectData(sessions, { minDuration: 400 });
// [];

selectData(sessions, { equipment: ['bike', 'dumbbell'] });
// [
//   { user: 7, duration: 150, equipment: ['dumbbell', 'kettlebell'] },
//   { user: 7, duration: 100, equipment: ['bike', 'kettlebell'] },
//   { user: 7, duration: 200, equipment: ['bike'] },
//   { user: 2, duration: 200, equipment: ['bike'] },
// ];

selectData(sessions, { merge: true });
// [
//   { user: 8, duration: 50, equipment: ['bench'] },
//   { user: 1, duration: 10, equipment: ['dumbbell'] },
//   { user: 7, duration: 450, equipment: ['bike', 'dumbbell', 'kettlebell'] },
//   { user: 2, duration: 400, equipment: ['bike', 'treadmill'] },
// ];

selectData(sessions, { merge: true, minDuration: 400 });
// [
//   { user: 7, duration: 450, equipment: ['bike', 'dumbbell', 'kettlebell'] },
//   { user: 2, duration: 400, equipment: ['bike', 'treadmill'] },
// ];
*/

/*
This question assesses one's familiarity with JavaScript language.

Clarification Questions
What is the expected behavior if options contains equipment: []?
It should treat it as equipment is not specified at all, but we won't test that case.
Solution
Let's break the question down into two parts:

Filtering the sessions according to the options.
Merging the sessions by the user field if merge: true is present in the options.
Filtering the sessions according to the options
Filtering according to the user and minDuration is pretty straightforward. We can use basic operators to check if the user fields match and whether duration > minDuration.

To match the equipments, we have to determine if the equipment between the options and each session has overlaps. One way is to convert both equipment fields into Sets so that we can perform lookup in O(1) time. We implement a setHasOverlap function to achieve that.

Merging the sessions by user field
This is the tricky part of the question. We have to merge the data for sessions with the same user field and also preserve the order. Note the requirement that:

in the case of merging sessions with duplicate users, the row should take the place of the latest occurrence of that user. The input objects should not be modified.

It would be easier if the question asked for first occurrence of that user as we can push the session into the array and the position will be the correct final position. If we encounter sessions for the same user again, we can update that earlier session without changing its position in the array. Thankfully, an elegant trick would be to reverse the input array first as reversedSessions and we can treat it as if the question asked to maintain the order of first occurrence of the user.

We use a new array sessionsProcessed, which will eventually contain sessions in the correct order and the merged user sessions. The array will be be the one we operate on when filtering according to the options.

As we iterate through reversedSessions, for each session, we see if the user has been encountered before. If it is the first time, we add a new entry to sessionsProcessed. Otherwise, we update the combined session with the current session data.

To modify the combined session for a user, we create a Map (sessionsForUser) with the key being the user ID and value being the combined session object. Modifying the combined session object can be done through looking up sessionsForUser with the user ID and modifying the value if it exists. The object within sessionsProcessed will be updated as well because they are the same object.


JavaScript

TypeScript
function setHasOverlap(setA, setB) {
  // Bundler doesn't transpile properly when doing for-of for sets.
  for (const val of Array.from(setA)) {
    if (setB.has(val)) {
      return true;
    }
  }

  return false;
}

/**
 * @param {Array<{user: number, duration: number, equipment: Array<string>}>} sessions
 * @param {{user?: number, minDuration?: number, equipment?: Array<string>, merge?: boolean}} [options]
 * @return {Array}
 *
export default function selectData(sessions, options = {}) {
    const reversedSessions = sessions.slice().reverse(); // Make a copy and reverse.
    const sessionsForUser = new Map();
    const sessionsProcessed = [];
  
    reversedSessions.forEach((session) => {
      if (options.merge && sessionsForUser.has(session.user)) {
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
  
        if (options.merge) {
          sessionsForUser.set(session.user, clonedSession);
        }
  
        sessionsProcessed.push(clonedSession);
      }
    });
  
    sessionsProcessed.reverse();
  
    const results = [];
    const optionEquipments = new Set(options.equipment);
    sessionsProcessed.forEach((session) => {
      if (
        (options.user != null && options.user !== session.user) ||
        (optionEquipments.size > 0 &&
          !setHasOverlap(optionEquipments, session.equipment)) ||
        (options.minDuration != null && options.minDuration > session.duration)
      ) {
        return;
      }
  
      results.push({
        ...session,
        equipment: Array.from(session.equipment).sort(),
      });
    });
  
    return results;
  }
  Techniques
  Familiarity with JavaScript data structures like Arrays and Sets.
*/
