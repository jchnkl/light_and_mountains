#!/bin/bash

annotate=false

if [ "$1" = '--annotate' ]; then
  annotate=true
  shift
fi

function usage() {
  cat << EOF

  $0 [--annotate] \$height \$image

  Expects the following directories to exist relative to \$image:

  \$(dirname \$image)/1.0x
  \$(dirname \$image)/2.0x
  \$(dirname \$image)/3.0x
  \$(dirname \$image)/4.0x
EOF
}

function resize() {
  local geometry=$1
  local in=$2
  local out=$3
  convert \
     -strip \
     -interlace Plane \
     -sampling-factor 4:2:0 \
     -define jpeg:dct-method=float \
     -quality 75% \
     -geometry ${geometry} \
     ${in} ${out}
  if [ ${annotate} = 'true' ]; then
    mogrify \
      -strip \
      -interlace Plane \
      -sampling-factor 4:2:0 \
      -define jpeg:dct-method=float \
      -quality 75% \
      -font DejaVu-Sans-Bold\
      -pointsize 40\
      -undercolor '#000080'\
      -fill white\
      -gravity NorthEast\
      -annotate +30+30 "${geometry}" \
      ${out}
  fi
}

# re='^(x[0-9]+|[0-9]+x|[0-9]+x[0-9]+|[0-9]+%)$'
re='^[0-9]+$'
if [[ ${#@} -lt 2 || ! ($1 =~ $re) ]]; then
  usage
  exit 1
fi

height=$1
shift

imgs=$@

for img in ${imgs}; do

  dir=$(dirname ${img})

  bsn=$(basename ${img})

  if [[ ! (-d "${dir}/1.0x" && -d "${dir}/2.0x" \
        && -d "${dir}/3.0x" && -d "${dir}/4.0x" \
        && -d "${dir}/tiny") ]]; then
      usage
      exit 1
  fi

  resize x25 ${img} ${dir}/tiny/${bsn}
  resize x$((4 * ${height})) ${img} ${dir}/4.0x/${bsn}
  resize x$((3 * ${height})) ${img} ${dir}/3.0x/${bsn}
  resize x$((2 * ${height})) ${img} ${dir}/2.0x/${bsn}
  resize x$((1 * ${height})) ${img} ${dir}/1.0x/${bsn}
done
