pcregrep -o1 '"([a-z_]+)"' ../src/libs/i18n/locales/en.json | grep '_' | while read key; do fgrep -q "\"$key\"" COLUMNS.csv && echo "+$key" || echo "-$key" ; done > COLUMNS.txt
