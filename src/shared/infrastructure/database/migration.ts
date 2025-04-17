import { pool } from './database.config'

async function migrationRunDatabase() {

    await pool.execute('DROP TABLE IF EXISTS related_titles');

    await pool.execute('DROP TABLE IF EXISTS favorites');
    await pool.execute('DROP TABLE IF EXISTS comments');

    await pool.execute('DROP TABLE IF EXISTS audiovisual_contents');

    await pool.execute('DROP TABLE IF EXISTS format_types');
    await pool.execute('DROP TABLE IF EXISTS geners');

    await pool.execute('DROP TABLE IF EXISTS payments');
    await pool.execute('DROP TABLE IF EXISTS subscriptions');

    await pool.execute('DROP TABLE IF EXISTS users');
    await pool.execute('DROP TABLE IF EXISTS streaming_services');
    await pool.execute('DROP TABLE IF EXISTS subscription_statuses');
    await pool.execute('DROP TABLE IF EXISTS images');

    await pool.execute(`CREATE TABLE users(
        id int PRIMARY KEY AUTO_INCREMENT,
        username VARCHAR(256),
        email VARCHAR(256),
        password VARCHAR(256),
        code_verification CHAR(6),
        time_expired TIMESTAMP
        );`);
    console.log('se creo users')

    await pool.execute(`CREATE TABLE format_types(
        id int PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(256)
        );`);
    console.log('se creo format_types');

    await pool.execute(`CREATE TABLE geners(
        id int PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(256)
        );`);
    console.log('se creo geners');

    await pool.execute(`CREATE TABLE subscription_statuses(
        id int PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(256)
        );`);
    console.log('se creo subscription_statuses');

    await pool.execute(`CREATE TABLE streaming_Services(
        id int PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(256),
        description TEXT,
        price DECIMAL(5,2)
        );`);
    console.log('se creo streaming_Services');

    await pool.execute(`CREATE TABLE audiovisual_contents(
        id int PRIMARY KEY AUTO_INCREMENT,
        title VARCHAR(256),
        description VARCHAR(256),
        release_date DATE,
        exclusiveness BOOLEAN,
        views INT,
        url_youtube VARCHAR(256),
        format_type_id INT,
        gener_id INT,
        FOREIGN KEY(format_type_id) REFERENCES format_types(id) ON DELETE CASCADE,
        FOREIGN KEY(gener_id) REFERENCES geners(id)
        );`);
    console.log('se creo audiovisual_contents');

    await pool.execute(`CREATE TABLE related_titles(
        aduvisual_content_id INT,
        related_content_id INT,
        FOREIGN KEY(aduvisual_content_id) REFERENCES audiovisual_contents(id),
        FOREIGN KEY(related_content_id) REFERENCES audiovisual_contents(id)
        );`);
    console.log('se creo related_titles');

    await pool.execute(`CREATE TABLE subscriptions(
        id int PRIMARY KEY AUTO_INCREMENT,
        start_date DATE,
        user_id INT,
        service_id INT,
        status_id INT,
        FOREIGN KEY(user_id) REFERENCES users(id),
        FOREIGN KEY(service_id) REFERENCES streaming_services(id),
        FOREIGN KEY(status_id) REFERENCES subscription_statuses(id)
        );`);
    console.log('se creo subscriptions')

    await pool.execute(`CREATE TABLE payments(
        id int PRIMARY KEY AUTO_INCREMENT,
        payment_method VARCHAR(256),
        payment_date DATE,
        date_generate DATE,
        subscription_id INT,
        FOREIGN KEY(subscription_id) REFERENCES subscriptions(id)
        );`);
    console.log('se creo payments');

    await pool.execute(`CREATE TABLE comments(
        id int PRIMARY KEY AUTO_INCREMENT,
        comment_text VARCHAR(256),
        rating DECIMAL(5,2),
        audiovisual_content_id INT,
        user_id INT,
        FOREIGN KEY(audiovisual_content_id) REFERENCES audiovisual_contents(id),
        FOREIGN KEY(user_id) REFERENCES users(id)
        );`);
    console.log('se creo comments');

    await pool.execute(`CREATE TABLE favorites(
        id int PRIMARY KEY AUTO_INCREMENT,
        user_id INT,
        audiovisual_content_id INT,
        FOREIGN KEY(user_id) REFERENCES users(id),
        FOREIGN KEY(audiovisual_content_id) REFERENCES audiovisual_contents(id)
        );`);
    console.log('se creo favorites');

    await pool.execute(`CREATE TABLE images(
        id int PRIMARY KEY AUTO_INCREMENT,
        imageble_id INT,
        imageble_type VARCHAR(50),
        url VARCHAR(256)
        );`);
    console.log('se creo images');
}
migrationRunDatabase();
