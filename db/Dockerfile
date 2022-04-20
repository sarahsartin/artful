FROM postgres:14-alpine

WORKDIR '/app'

ADD scripts/init.sql /docker-entrypoint-initdb.d
ADD scripts/insertData.sql /docker-entrypoint-initdb.d

RUN chmod a+r /docker-entrypoint-initdb.d/*

EXPOSE 5432
