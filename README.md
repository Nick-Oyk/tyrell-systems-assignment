# Tyrell Systems test

## 
This application was built using docker, consisting of a react.js app and node.js app and was completed in 24 hours.

## Prerequisite

Docker and docker compose must be installed on your machine in order to run the program.

## Getting Started

Clone the repository or unzip the source file into your desired folder.

navigate into the source folder.

issue the command below to start the app.

```
docker-compose up
```

issue the command below to stop the app.

```
docker-compose down
```

## Client

### React App
simple react app that allows interaction with user to ask for input and generate the distrubition of cards randomly based on the number of people.

## Server

### Distribute cards
Method: POST
```
http://localhost:3300/distribute-cards/:numPeople
```

## SQL Assignment 

### Indexing
Ensure that columns used in join conditions and WHERE clauses are indexed appropriately. Indexing can significantly improve the query's performance by reducing the time taken to search through tables.

### Simplify WHERE Conditions
The query's WHERE clause contains many OR conditions using wildcard searches (LIKE '%text%'). Wildcard searches can be resource-intensive, especially when there's no specific column specified.

### Avoid Unnecessary Joins
Some may not be required for the final result set and could be omitted to simplify the query.

### Grouping and Ordering
While using GROUP BY and ORDER BY clauses, ensure that the columns you're grouping/ordering by are properly indexed to enhance query performance.

### Use EXISTS Instead of LEFT JOIN
In some cases, using EXISTS might be more efficient than LEFT JOIN, especially when you're interested only in the existence of related rows rather than their actual values.

### Limit and Offset
Be cautious with using LIMIT and OFFSET, especially with large datasets. They can impact performance, especially if used on highly complex queries.

### Example 
```
SELECT
    Jobs.id AS `Jobs__id`,
    Jobs.name AS `Jobs__name`,
    Jobs.media_id AS `Jobs__media_id`,
    Jobs.job_category_id AS `Jobs__job_category_id`,
    Jobs.job_type_id AS `Jobs__job_type_id`,
    Jobs.description AS `Jobs__description`,
    -- Include other necessary columns here...

FROM jobs Jobs

-- Joining only necessary tables for optimization
INNER JOIN job_categories JobCategories ON JobCategories.id = Jobs.job_category_id
INNER JOIN job_types JobTypes ON JobTypes.id = Jobs.job_type_id

-- Simplified WHERE clause for readability and efficiency
WHERE
    (
        JobCategories.name LIKE '%キャビンアテンダント%'
        OR JobTypes.name LIKE '%キャビンアテンダント%'
        OR Jobs.name LIKE '%キャビンアテンダント%'
        -- Add other necessary conditions here...
    )
    AND Jobs.publish_status = 1
    AND Jobs.deleted IS NULL

-- Ordering by indexed columns for better performance
ORDER BY Jobs.sort_order DESC, Jobs.id DESC

-- Limiting the number of results fetched
LIMIT 50 OFFSET 0;

```