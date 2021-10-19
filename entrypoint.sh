#!/bin/sh

echo "Replacing env vars in JS"
export EXISTING_VARS=$(printenv | grep 'VUE_APP_' | awk -F= '{print $1}' | sed 's/^/$/g' | paste -sd,);
echo "Vars to replace: $EXISTING_VARS";
for file in /usr/share/nginx/html/js/app*.js*
do
  echo "Processing $file ...";
  cat $file | envsubst $EXISTING_VARS | tee $file > /dev/null
done