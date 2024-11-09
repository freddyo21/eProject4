INSERT INTO `user` (`user_id`, `email`, `display_name`, `password`, `user_role`, `user_status`) VALUES
(1, 'freddy.preo21@gmail.com', 'Jason', '12345678', 'admin', 'true'),
(2, 'trungnh@gmail.com', 'Trung', '123', 'user', 'true'),
(3, 'LeVanA@gmail.com', 'A', '1234', 'user', 'true'),
(4, 'trungnh@gmail.com', 'Trung Nguyen', '123456', 'admin', 'true');


CREATE TABLE `bill` (
  `id` int(11) PRIMARY KEY NOT NULL,
  `contactnumber` varchar(255) DEFAULT NULL,
  `createdby` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `paymentmethod` varchar(255) DEFAULT NULL,
  `productdetails` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`productdetails`)),
  `total` int(11) DEFAULT NULL,
  `uuid` varchar(255) DEFAULT NULL
  
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `bill` (`id`, `contactnumber`, `createdby`, `email`, `name`, `paymentmethod`, `productdetails`, `total`, `uuid`) VALUES
(10, '000001', 'trungnh@gmail.com', 'trungnh@gmail.com', 'Trung', 'Credit Card', 
'[{"id":30,"name":"American Coffee","category":"Drink","quantity":"2","price":1000,"total":2000}]', 2000, 'BILL1696714571927'),
(20, '000002', 'LeVanA@gmai.com', 'LeVanA@gmai.com', 'A', 'Cash', 
'[{"id":46,"name":"Chocolate Cake","category":"Desserts","quantity":"1","price":12000,"total":12000},
  {"id":50,"name":"Pancakes","category":"Breakfast","quantity":"2","price":7000,"total":14000}]', 26000, 'BILL1696715791933');
  
SELECT * FROM user;

alter table `user` MODIFY COLUMN `user_role` tinyint;