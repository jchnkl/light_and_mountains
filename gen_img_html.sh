#!/bin/sh

imgdir=$1

thumbdir=$2

origimg=$3

thumb=$(basename $(echo ${origimg} | sed -e 's/\.jpg/_t\.jpg/'))

title=$(exiftool -p '$Title' -Title ${origimg})

geom=$(identify -format 'height="%h" width="%w"' ${thumbdir}/${thumb})

if [ ! -e ${thumbdir}/${thumb} ]; then
    exit 1
fi

cat << EOF
<a href="img/${origimg}">
<img alt="${title}"
     src="img/tns/${img}" ${geom}/>
</a>
EOF


# echo -e "<a href=\"img/${origimg}\">\n<img alt=\"${title}\"\n    src=\"img/tns/${img}\" ${geom}/>\n</a>"
