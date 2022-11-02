
INSERT INTO  general_parameters(id,name,value) values 
(1,'minutes_before_notification', '180');



INSERT INTO work_schedule_days(id, day, start, "end") values 
(1, 'Lunes', '8:00:00', '12:00:00'),
(2, 'Martes', '8:00:00', '12:00:00'),
(3, 'Miércoles', '8:00:00', '12:00:00'),
(4, 'Jueves', '8:00:00', '12:00:00'),
(5, 'Viernes', '8:00:00', '12:00:00'),
(6, 'Sábado', '8:00:00', '12:00:00'),
(7, 'Domingo', '8:00:00', '12:00:00');

INSERT INTO work_hour_intervals(work_schedule_day_id, start,"end") values 
(1, '00:00:00','23:55:00'),
(2, '00:00:00','23:55:00'),
(3, '00:00:00','23:55:00'),
(4, '00:00:00','23:55:00'),
(5, '00:00:00','23:55:00'),
(6, '00:00:00','23:55:00'),
(7, '00:00:00','23:55:00');