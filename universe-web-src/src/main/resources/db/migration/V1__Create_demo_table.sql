create table demotable (
    id INT(10) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(100) not null,
    description VARCHAR(255),
    status INT(2),
    create_date DATETIME,
    update_date DATETIME
);