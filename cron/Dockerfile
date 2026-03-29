FROM alpine:3.18

RUN apk add --no-cache curl bash

COPY app_uptime.sh /scripts/app_uptime.sh
COPY crontab /etc/crontabs/root

RUN chmod +x /scripts/app_uptime.sh

CMD ["crond", "-f", "-l", "2"]