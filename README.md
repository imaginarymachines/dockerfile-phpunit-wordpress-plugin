# WordPress phpunit Container

![Docker Automated build](https://img.shields.io/docker/automated/josh412/wp-phpunit)
[![Built For Plugin Machine](https://img.shields.io/badge/Built%20For-Plugin%20Machine-lightgrey)](https://pluginmachine.com)
![Docker Image Size (latest by date)](https://img.shields.io/docker/image-size/josh412/wp-phpunit)

- 🌲 [Example Plugin](https://github.com/imaginarymachines/everything-all-of-the-time)
- 🌲 [Local Development and Testing With Plugin Machine](https://pluginmachine.com/automated-testing-local-development-ci/)

## How To Use

Example docker-compose.yml for mysql:

```yaml
---
version: '3.9'
services:
   # Integration Testing - Tests that run in phpunit with WordPress + MySQL
  ## Runner for phpunit
  phpunit:
    image: josh412/wp-phpunit
    command:
      - bash
    ## Wait to start until the database server for testing is ready.
    depends_on:
      - testwpdb
    environment:
      DATABASE_PASSWORD: examplepass
      DATABASE_HOST: testwpdb
    stdin_open: true
    tty: true
    volumes:
      ## Map this directory into the test plugin directory
      - ./:/plugin

  #Database for tests
  testwpdb:
    environment:
      MYSQL_ROOT_PASSWORD: examplepass
    image: mariadb:10.5.8
    healthcheck:
      test: "/usr/bin/mysql --user=wordpress --password=wordpress --execute \"SHOW DATABASES;\""
      interval: 3s
      timeout: 1s
      retries: 5
```

Run ```docker-compose run phpunit```, wait for it to initialize completely, when prompt is displayed, run ```phpunit``` or ```phpcs``` (as appropriate).

## WordPress and PHP Version

You can set WordPress and PHP versions in two ways:

1. Set `WORDPRESS_VERSION` and/ or `PHP_IMAGE_TAG` environment variables.
2. Use a provided tag

You can see the full list of tags [here](https://hub.docker.com/r/josh412/wp-phpunit/tags). This is an example of using PHP 8.1 and WordPress 5.7:

```yaml
---
version: '3.9'
services:
   # Integration Testing - Tests that run in phpunit with WordPress + MySQL
  ## Runner for phpunit
  phpunit:
    image: josh412/wp-phpunit:php-8.1-wp-5.7
    command:
      - bash
    ## Wait to start until the database server for testing is ready.
    depends_on:
      - testwpdb
    environment:
      DATABASE_PASSWORD: examplepass
      DATABASE_HOST: testwpdb
    stdin_open: true
    tty: true
    volumes:
      ## Map this directory into the test plugin directory
      - ./:/plugin

  #Database for tests
  testwpdb:
    environment:
      MYSQL_ROOT_PASSWORD: examplepass
    image: mariadb:10.5.8
    healthcheck:
      test: "/usr/bin/mysql --user=wordpress --password=wordpress --execute \"SHOW DATABASES;\""
      interval: 3s
      timeout: 1s
      retries: 5
```


## Environment Variables

### ```WORDPRESS_VERSION```

Which version of WordPress to use. Must be a valid tag for [WordPress image](https://hub.docker.com/_/wordpress)

### ```PHP_IMAGE_TAG```

Which version of PHP to use.

### ```DATABASE_NAME```

Database name to create for WordPress. (default: ```wordpress```)

### ```DATABASE_USER```

Database user to connect from WordPress. (default: ```root```)

### ```DATABASE_PASSWORD```

Database password to connect from WordPress.

### ```DATABASE_HOST```

Database host name to connect from WordPress. (default: ```database```)

### ```DATABASE_PORT```

Database port to connect from WordPress. (default: ```3306```)


## Development

- Build
  - `docker-compose -f docker-compose.test.yml build`
- Test
  - `docker-compose -f docker-compose.test.yml run phpunit`
  - Shows version numbers
  - 

## License: GPL 3.0

Forked from [yukihiko-shinoda/dockerfile-phpunit-wordpress-plugin](https://github.com/yukihiko-shinoda/dockerfile-phpunit-wordpress-plugin).

View license information for the software contained in this image.

As with all Docker images, these likely also contain other software which may be under other licenses (such as Bash, etc from the base distribution, along with any direct or indirect dependencies of the primary software being contained).


As for any pre-built image usage, it is the image user's responsibility to ensure that any use of this image complies with any relevant licenses for all software contained within.
