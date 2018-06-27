CREATE DATABASE letsgo;

\c letsgo;

CREATE TABLE trips
(
  id SERIAL PRIMARY KEY,
  trip VARCHAR,
  end_date VARCHAR,
  start_date VARCHAR
);

INSERT INTO trips (trip, start_date, end_date) VALUES ('chicago', '2018-01-11', '2018-01-19');
INSERT INTO trips (trip, start_date, end_date) VALUES ('london', '2018-02-24', '2018-02-27');
INSERT INTO trips (trip, start_date, end_date) VALUES ('texas', '2018-03-13', '2018-03-20');
INSERT INTO trips (trip, start_date, end_date) VALUES ('taiwan', '2018-04-11', '2018-04-18');
INSERT INTO trips (trip, start_date, end_date) VALUES ('yosemite', '2018-05-16', '2018-05-22');
INSERT INTO trips (trip, start_date, end_date) VALUES ('tahoe', '2018-06-23', '2018-07-03');
INSERT INTO trips (trip, start_date, end_date) VALUES ('berlin', '2018-07-15', '2018-07-28');
INSERT INTO trips (trip, start_date, end_date) VALUES ('germany', '2018-08-02', '2018-08-18');
INSERT INTO trips (trip, start_date, end_date) VALUES ('netherlands', '2018-09-01', '2018-09-13');
INSERT INTO trips (trip, start_date, end_date) VALUES ('mongolia', '2018-10-06', '2018-10-10');
INSERT INTO trips (trip, start_date, end_date) VALUES ('italy', '2018-11-11', '2018-11-25');
INSERT INTO trips (trip, start_date, end_date) VALUES ('spain', '2018-12-09', '2018-12-28');


CREATE TABLE shared_items
(
  id SERIAL PRIMARY KEY,
  trip_id INT NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
  item VARCHAR,
  added_by VARCHAR,
  claimed_by VARCHAR
);

INSERT INTO shared_items (trip_id, item, added_by, claimed_by) VALUES (1, 'tent', 'mary', '');
INSERT INTO shared_items (trip_id, item, added_by, claimed_by) VALUES (1,'pot', 'sam', 'kent');
INSERT INTO shared_items (trip_id, item, added_by, claimed_by) VALUES (2, 'tent', 'mary', 'rachel');
INSERT INTO shared_items (trip_id, item, added_by, claimed_by) VALUES (2,'lamp', 'kent', 'tom');
INSERT INTO shared_items (trip_id, item, added_by, claimed_by) VALUES (2,'water filter', 'rachel', 'tom');
INSERT INTO shared_items (trip_id, item, added_by, claimed_by) VALUES (2,'pot', 'sam', 'kent');
INSERT INTO shared_items (trip_id, item, added_by, claimed_by) VALUES (3, 'tent', 'mary', '');
INSERT INTO shared_items (trip_id, item, added_by, claimed_by) VALUES (3,'lamp', 'kent', 'tom');
INSERT INTO shared_items (trip_id, item, added_by, claimed_by) VALUES (3,'water filter', 'rachel', 'ztom');
INSERT INTO shared_items (trip_id, item, added_by, claimed_by) VALUES (3,'pot', 'sam', 'kent');
INSERT INTO shared_items (trip_id, item, added_by, claimed_by) VALUES (4, 'tent', 'mary', 'rachel');
INSERT INTO shared_items (trip_id, item, added_by, claimed_by) VALUES (4,'lamp', 'kent', 'tom');
INSERT INTO shared_items (trip_id, item, added_by, claimed_by) VALUES (4,'water filter', 'rachel', 'tom');
INSERT INTO shared_items (trip_id, item, added_by, claimed_by) VALUES (4,'pot', 'sam', 'kent');


CREATE TABLE favor_items
(
  id SERIAL PRIMARY KEY,
  trip_id INT NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
  item VARCHAR,
  added_by VARCHAR,
  claimed_by VARCHAR
);

INSERT INTO favor_items (trip_id, item, added_by, claimed_by) VALUES (1, 'hiking poles', 'mary', 'david');
INSERT INTO favor_items (trip_id, item, added_by, claimed_by) VALUES (1,'head lamps', 'mary', '');
INSERT INTO favor_items (trip_id, item, added_by, claimed_by) VALUES (1,'boots', 'mary', '');
INSERT INTO favor_items (trip_id, item, added_by, claimed_by) VALUES (2, 'hiking poles', 'mary', 'rachel');
INSERT INTO favor_items (trip_id, item, added_by, claimed_by) VALUES (2,'head lamps', 'mary', 'tom');
INSERT INTO favor_items (trip_id, item, added_by, claimed_by) VALUES (3, 'hiking poles', 'mary', 'rachel');
INSERT INTO favor_items (trip_id, item, added_by, claimed_by) VALUES (3,'head lamps', 'mary', 'tom');
INSERT INTO favor_items (trip_id, item, added_by, claimed_by) VALUES (4, 'hiking poles', 'mary', 'rachel');
INSERT INTO favor_items (trip_id, item, added_by, claimed_by) VALUES (4,'head lamps', 'mary', 'tom');
INSERT INTO favor_items (trip_id, item, added_by, claimed_by) VALUES (5, 'hiking poles', 'mary', 'rachel');
INSERT INTO favor_items (trip_id, item, added_by, claimed_by) VALUES (5,'head lamps', 'mary', 'tom');


CREATE TABLE personal_items
(
  id SERIAL PRIMARY KEY,
  trip_id INT NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
  item VARCHAR
);

INSERT INTO personal_items (trip_id, item) VALUES (1, 'water bottle');
INSERT INTO personal_items (trip_id, item) VALUES (1,'sweater');
INSERT INTO personal_items (trip_id, item) VALUES (1, 'cap');
INSERT INTO personal_items (trip_id, item) VALUES (1,'sunscreen');
INSERT INTO personal_items (trip_id, item) VALUES (1, 'lip balm');
INSERT INTO personal_items (trip_id, item) VALUES (1,'hiking shoes');
INSERT INTO personal_items (trip_id, item) VALUES (1, 'boots');
INSERT INTO personal_items (trip_id, item) VALUES (1,'towel');
INSERT INTO personal_items (trip_id, item) VALUES (1, 'toothbursh');
INSERT INTO personal_items (trip_id, item) VALUES (1,'hand sanitizer');
INSERT INTO personal_items (trip_id, item) VALUES (2, 'water bottle');
INSERT INTO personal_items (trip_id, item) VALUES (2,'sweater');
INSERT INTO personal_items (trip_id, item) VALUES (2, 'cap');
INSERT INTO personal_items (trip_id, item) VALUES (2,'sunscreen');
INSERT INTO personal_items (trip_id, item) VALUES (2, 'lip balm');
INSERT INTO personal_items (trip_id, item) VALUES (2,'hiking shoes');
INSERT INTO personal_items (trip_id, item) VALUES (2, 'boots');
INSERT INTO personal_items (trip_id, item) VALUES (2,'towel');
INSERT INTO personal_items (trip_id, item) VALUES (2, 'toothbursh');
INSERT INTO personal_items (trip_id, item) VALUES (2,'hand sanitizer');


CREATE TABLE photos
(
  id SERIAL PRIMARY KEY,
  photo VARCHAR,
  trip_id INT NOT NULL REFERENCES trips(id) ON DELETE CASCADE
);


INSERT INTO photos (photo, trip_id) VALUES ('1NruM3IFPWx5UcGXWjg0lA', 1);
INSERT INTO photos (photo, trip_id) VALUES ('4d3jPFu1wrVsJhXRbnle3w', 1);
INSERT INTO photos (photo, trip_id) VALUES ('4eUbJFUFRXgOP8OrE8FjXg', 1);
INSERT INTO photos (photo, trip_id) VALUES ('51M9PB--2jgNchZ5XTFD0w', 1);
INSERT INTO photos (photo, trip_id) VALUES ('5oTpgb6ToN86x1IS26Nk-w', 1);
INSERT INTO photos (photo, trip_id) VALUES ('5umEZ6N6InQkzhCO4uM61g', 1);
INSERT INTO photos (photo, trip_id) VALUES ('6Iv3gRk6ZiULCU1GXxdZGw', 1);
INSERT INTO photos (photo, trip_id) VALUES ('6xXWz3ze2lZpSNldf37U0g', 1);
INSERT INTO photos (photo, trip_id) VALUES ('8LOBsIss1WxnJQWQy9zQQQ', 1);
INSERT INTO photos (photo, trip_id) VALUES ('96JOlkGF-wvdR1N1pL_t2g', 1);
INSERT INTO photos (photo, trip_id) VALUES ('AGx7jd9GGMRktPuq0Tu_pA', 1);
INSERT INTO photos (photo, trip_id) VALUES ('BFeSKp2bxTVDjszcm08Fng', 1);
INSERT INTO photos (photo, trip_id) VALUES ('Cl2qkI67AS2QZsEUuN6QCQ', 1);
INSERT INTO photos (photo, trip_id) VALUES ('FY-CYPT3TxjSNGZ4az0egw', 1);
INSERT INTO photos (photo, trip_id) VALUES ('G6oIFp2hZLDLQh3g1tROQQ', 1);
INSERT INTO photos (photo, trip_id) VALUES ('GAdIyQAoWl-WLShvqKatWg', 1);
INSERT INTO photos (photo, trip_id) VALUES ('Hg-nwcIF8aLEeKFSxFlnPw', 1);
INSERT INTO photos (photo, trip_id) VALUES ('JAh74e3iPt3PC6la8_25nA', 1);
INSERT INTO photos (photo, trip_id) VALUES ('JnCx1bugY4MxCRrsTTaieA', 1);
INSERT INTO photos (photo, trip_id) VALUES ('KY40_07FXjx0BKsgiK2Ngw', 1);
INSERT INTO photos (photo, trip_id) VALUES ('N0mnBfdiz7yY0jPcS3NW2w', 1);
INSERT INTO photos (photo, trip_id) VALUES ('NF9dNJy6nL6e8FT6PZ8DmA', 1);
INSERT INTO photos (photo, trip_id) VALUES ('Okb8OvAo6Y2DnM2a2AEk3w', 1);
INSERT INTO photos (photo, trip_id) VALUES ('Qtb0AHMdO1fFSeqmPyxsYA', 1);
INSERT INTO photos (photo, trip_id) VALUES ('RgIyExyQO9i0Hm1ujDhAJA', 1);
INSERT INTO photos (photo, trip_id) VALUES ('yrLMDjtRozB4tvuNYP-TUw', 1);
INSERT INTO photos (photo, trip_id) VALUES ('yVyY-iTx3AY8SkgTP_fwnQ', 1);
INSERT INTO photos (photo, trip_id) VALUES ('x3MVfS36BIwIQCdlUynIrQ', 1);
INSERT INTO photos (photo, trip_id) VALUES ('vALJ57swVMsZan7xkgZHHA', 1);
INSERT INTO photos (photo, trip_id) VALUES ('uCJwJBMXjLAD3oGMZg5T8Q', 1);
INSERT INTO photos (photo, trip_id) VALUES ('tWd2ivCAPj_5GxIK2IkYOg', 1);
INSERT INTO photos (photo, trip_id) VALUES ('sDbbnh3czMf3-mf3KwNCrQ', 1);
INSERT INTO photos (photo, trip_id) VALUES ('rMpctOhyAYeDDZXqD7LD2g', 1);
INSERT INTO photos (photo, trip_id) VALUES ('olWDsgDr2MsJFIu4UniZCw', 1);
INSERT INTO photos (photo, trip_id) VALUES ('oU0nqUAC8pLbi9laEbRhEA', 1);
INSERT INTO photos (photo, trip_id) VALUES ('nz6XlJBjD8V21QEPle90AQ', 1);
INSERT INTO photos (photo, trip_id) VALUES ('msFNYPfTXYsF4jlzWlrWuw', 1);
INSERT INTO photos (photo, trip_id) VALUES ('mI8btAAAF0HfQJNI1q12Dg', 1);
INSERT INTO photos (photo, trip_id) VALUES ('1NruM3IFPWx5UcGXWjg0lA', 2);
INSERT INTO photos (photo, trip_id) VALUES ('4d3jPFu1wrVsJhXRbnle3w', 2);
INSERT INTO photos (photo, trip_id) VALUES ('4eUbJFUFRXgOP8OrE8FjXg', 2);
INSERT INTO photos (photo, trip_id) VALUES ('51M9PB--2jgNchZ5XTFD0w', 2);
INSERT INTO photos (photo, trip_id) VALUES ('5oTpgb6ToN86x1IS26Nk-w', 2);
INSERT INTO photos (photo, trip_id) VALUES ('5umEZ6N6InQkzhCO4uM61g', 2);
INSERT INTO photos (photo, trip_id) VALUES ('6Iv3gRk6ZiULCU1GXxdZGw', 2);
INSERT INTO photos (photo, trip_id) VALUES ('6xXWz3ze2lZpSNldf37U0g', 2);
INSERT INTO photos (photo, trip_id) VALUES ('8LOBsIss1WxnJQWQy9zQQQ', 2);
INSERT INTO photos (photo, trip_id) VALUES ('96JOlkGF-wvdR1N1pL_t2g', 2);
INSERT INTO photos (photo, trip_id) VALUES ('AGx7jd9GGMRktPuq0Tu_pA', 2);
INSERT INTO photos (photo, trip_id) VALUES ('BFeSKp2bxTVDjszcm08Fng', 2);
INSERT INTO photos (photo, trip_id) VALUES ('Cl2qkI67AS2QZsEUuN6QCQ', 2);
INSERT INTO photos (photo, trip_id) VALUES ('FY-CYPT3TxjSNGZ4az0egw', 2);
INSERT INTO photos (photo, trip_id) VALUES ('G6oIFp2hZLDLQh3g1tROQQ', 2);
INSERT INTO photos (photo, trip_id) VALUES ('GAdIyQAoWl-WLShvqKatWg', 2);
INSERT INTO photos (photo, trip_id) VALUES ('Hg-nwcIF8aLEeKFSxFlnPw', 2);
INSERT INTO photos (photo, trip_id) VALUES ('JAh74e3iPt3PC6la8_25nA', 2);
INSERT INTO photos (photo, trip_id) VALUES ('JnCx1bugY4MxCRrsTTaieA', 2);
INSERT INTO photos (photo, trip_id) VALUES ('KY40_07FXjx0BKsgiK2Ngw', 2);
INSERT INTO photos (photo, trip_id) VALUES ('N0mnBfdiz7yY0jPcS3NW2w', 2);
INSERT INTO photos (photo, trip_id) VALUES ('NF9dNJy6nL6e8FT6PZ8DmA', 2);
INSERT INTO photos (photo, trip_id) VALUES ('Okb8OvAo6Y2DnM2a2AEk3w', 2);
INSERT INTO photos (photo, trip_id) VALUES ('Qtb0AHMdO1fFSeqmPyxsYA', 2);
INSERT INTO photos (photo, trip_id) VALUES ('RgIyExyQO9i0Hm1ujDhAJA', 2);
INSERT INTO photos (photo, trip_id) VALUES ('yrLMDjtRozB4tvuNYP-TUw', 2);
INSERT INTO photos (photo, trip_id) VALUES ('yVyY-iTx3AY8SkgTP_fwnQ', 2);
INSERT INTO photos (photo, trip_id) VALUES ('x3MVfS36BIwIQCdlUynIrQ', 2);
INSERT INTO photos (photo, trip_id) VALUES ('vALJ57swVMsZan7xkgZHHA', 2);
INSERT INTO photos (photo, trip_id) VALUES ('uCJwJBMXjLAD3oGMZg5T8Q', 2);
INSERT INTO photos (photo, trip_id) VALUES ('tWd2ivCAPj_5GxIK2IkYOg', 2);
INSERT INTO photos (photo, trip_id) VALUES ('sDbbnh3czMf3-mf3KwNCrQ', 2);
INSERT INTO photos (photo, trip_id) VALUES ('rMpctOhyAYeDDZXqD7LD2g', 2);
INSERT INTO photos (photo, trip_id) VALUES ('olWDsgDr2MsJFIu4UniZCw', 2);
INSERT INTO photos (photo, trip_id) VALUES ('oU0nqUAC8pLbi9laEbRhEA', 2);
INSERT INTO photos (photo, trip_id) VALUES ('nz6XlJBjD8V21QEPle90AQ', 2);
INSERT INTO photos (photo, trip_id) VALUES ('msFNYPfTXYsF4jlzWlrWuw', 2);
INSERT INTO photos (photo, trip_id) VALUES ('mI8btAAAF0HfQJNI1q12Dg', 2);

