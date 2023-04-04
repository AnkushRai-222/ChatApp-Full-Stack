/*  Question 1 */
SELECT 
  u.name AS user_name,
  SUM(t.amount) AS revenue,
  SUM(t.distance) AS distance_travelled,
  COUNT(DISTINCT t.cabId) AS number_of_cabs,
  COUNT(t.id) AS total_trips,
  (SELECT c.regNumber FROM cabs c WHERE c.id = 
    (SELECT t1.cabId FROM trips t1 WHERE t1.driverId = 
      (SELECT t2.driverId FROM trips t2 WHERE t2.date = '2023-04-04' GROUP BY t2.driverId ORDER BY COUNT(*) DESC LIMIT 1)
    ORDER BY t1.date DESC LIMIT 1)
  ) AS most_active_cab
FROM users u
  INNER JOIN cabs c ON u.id = c.userId
  INNER JOIN trips t ON c.id = t.cabId
WHERE DATE(t.createdAt) = '2023-04-04'
GROUP BY u.id;


/*
  Question 2 :-

  To make the above query run faster, the following indexes can be created:

1.For the trips table, indexes on created_at, cabId, and id would help to speed up the query.
2.For the cabs table, indexes on userId, id, and isActive would help to speed up the query.
3.For the users table, an index on id would help to speed up the query.
  

*/



