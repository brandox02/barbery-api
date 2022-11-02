select * from formularies fm 
where id = (select id from formularies where code = fm.code order by version desc);



select * from schedules 
     left join haircuts on haircuts.id = schedules.haircut_id
     where 
     haircuts.enabled is true and 
     schedules.schedule_date between "19:00:00" and '19:00:00'::timestamp + interval '01:00:00' or
     schedules.schedule_date + CAST(haircuts.duration AS Interval) 
	 between '19:00:00' and '19:00:00'::timestamp + interval '01:00:00'