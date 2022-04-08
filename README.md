# WordPress phpunit Container

[![docker build automated?](https://img.shields.io/docker/cloud/automated/josh412/wp-phpunit.svg)](https://hub.docker.com/r/josh412/wp-phpunit/builds)
[![docker build passing?](https://img.shields.io/docker/cloud/build/josh412/wp-phpunit.svg)](https://hub.docker.com/r/josh412/wp-phpunit/builds)
[![image size and number of layers](https://images.microbadger.com/badges/image/josh412/wp-phpunit.svg)](https://hub.docker.com/r/josh412/wp-phpunit/dockerfile)
[![Built For Plugin Machine](https://img.shields.io/badge/Built%20For-Plugin%20Machine-lightgrey)](https://pluginmachine.com)


## How To Use

Example docker-compose.yml for mysql:

```yaml
---
version: '3.8'
services:
  database:
    environment:
      MYSQL_ROOT_PASSWORD: examplepass
    image: mysql:5.7

  phpunit:
    command:
      - bash
    depends_on:
      - database
    environment:
      DATABASE_PASSWORD: examplepass
    image: josh412/wp-phpunit
    stdin_open: true
    tty: true
    volumes:
      - ./:/plugin
```

Run ```docker-compose run phpunit```, wait for it to initialize completely, when prompt is displayed, run ```phpunit``` or ```phpcs``` (as appropriate).

## Environment Variables

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

## License: GPL 3.0

Forked from [yukihiko-shinoda/dockerfile-phpunit-wordpress-plugin](https://github.com/yukihiko-shinoda/dockerfile-phpunit-wordpress-plugin).

View license information for the software contained in this image.

As with all Docker images, these likely also contain other software which may be under other licenses (such as Bash, etc from the base distribution, along with any direct or indirect dependencies of the primary software being contained).


As for any pre-built image usage, it is the image user's responsibility to ensure that any use of this image complies with any relevant licenses for all software contained within.
