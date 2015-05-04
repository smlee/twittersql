SELECT actors.first_name, actors.last_name
FROM actors
INNER JOIN roles ON actors.id = roles.actor_id
INNER JOIN movies ON movies.id = roles.movie_id
GROUP BY actors.id HAVING movies.year < 1900;

select a.first_name,a.last_name,a.id
from actors AS a
inner join roles AS r1 on r1.actor_id = a.id
inner join movies m1 on r1.movie_id = m1.id
inner join roles r2 on r2.actor_id = a.id
inner join movies m2 on r2.movie_id = m2.id
where m1.year >=2000 and m2.year <1900
GROUP BY a.id;

select distinct a.first_name,a.last_name, m.name, m.year, count(roles.actor_id)
from actors as a
inner join roles on a.id = roles.actor_id
inner join movies as m on m.id = roles.movie_id
group by a.id having count(roles.actor_id) >= 5 and m.year > 1990;

select m.year, count(m.id) as femaleOnlyMovies
from
    movies as m,
    roles as r,
    actors as a
left join roles as r2 on r2.movie_id = m.id
inner join actors as a2 on a2.id = r2.actor_id
where a.gender = 'F' and
a2.gender = 'M'
group by m.year;

--KEVIN BACON

SELECT m.name, a2.first_name, a2.last_name
FROM
    actors a,
    roles r,
    movies m,
    movies_genres mg,
    roles r2,
    actors a2
WHERE
    a.first_name = 'Kevin' AND a.last_name = 'Bacon' AND
    a.id = r.actor_id AND
    r.movie_id = m.id AND
    m.id = mg.movie_id AND
    mg.genre = 'Drama' AND
    m.id = r2.movie_id AND
    r2.actor_id = a2.id AND
    a2.id != a.id
ORDER BY a2.last_name;

select m.year, count(*) as femaleOnly From movies as mwhere m.id not in (select movies.id
from roles as ma, actors as a, movies
where a.id = ma.actor_id
and ma.movie_id = movies.id
and a.gender = 'm')
group by m.year;