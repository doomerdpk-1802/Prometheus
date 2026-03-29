#! /bin/bash

PUSHGATEWAY_URL="http://pushgateway:9091"

HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://node-app:3000)
UP=$([ "$HTTP_STATUS" -eq 200 ] && echo 1 || echo 0)

cat <<EOF | curl -X POST --silent --data-binary @- "${PUSHGATEWAY_URL}/metrics/job/website_uptime"
website_up ${UP}
website_http_status ${HTTP_STATUS}
EOF