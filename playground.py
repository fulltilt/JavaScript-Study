
from collections import Counter, deque
import heapq

def leastInterval(tasks, n):
    count = Counter(tasks)
    maxHeap = [-cnt for cnt in count.values()]
    heapq.heapify(maxHeap)

    time = 0
    q = deque()  # pairs of [-cnt, idleTime]
    while maxHeap or q:
        time += 1

        if not maxHeap:
            time = q[0][1]
        else:
            cnt = 1 + heapq.heappop(maxHeap)
            if cnt:
                q.append([cnt, time + n])
        if q and q[0][1] == time:
            heapq.heappush(maxHeap, q.popleft()[0])
        print(time, maxHeap, q)
    return time

print(leastInterval(["A","A","A","A","A","A","B","C","D","E","F","G"], 2))