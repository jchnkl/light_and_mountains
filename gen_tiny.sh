#!/bin/bash

annotate=false

if [ "$1" = '--annotate' ]; then
  annotate=true
  shift
fi

function usage() {
  cat << EOF

  $0 [--annotate] \$height \${image}

  Expects the following directories to exist relative to \${image}:

  \$(dirname \${image})/1.0x
  \$(dirname \${image})/2.0x
  \$(dirname \${image})/3.0x
  \$(dirname \${image})/4.0x
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
    -define jpeg:dct-method=float -quality 50% -geometry 25x $< $@
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
      -font DejaVu-Sans-Bold\
      -pointsize 40\
      -undercolor '#000080'\
      -fill white\
      -gravity NorthEast\
      -annotate +50+50 "${geometry}" \
      ${out}
  fi
}

if [ ${#@} -lt 2 ]; then
  usage
  exit 1
fi

height=$1
shift

img=$1

dir=$(dirname ${img})

bsn=$(basename ${img})

if [[ ! (-d "${dir}/1.0x" && -d "${dir}/2.0x" \
      && -d "${dir}/3.0x" && -d "${dir}/4.0x") ]]; then
    usage
    exit 1
fi

resize $((4 * ${height})) ${img} ${dir}/4.0x/${bsn}
resize $((3 * ${height})) ${img} ${dir}/3.0x/${bsn}
resize $((2 * ${height})) ${img} ${dir}/2.0x/${bsn}
resize $((1 * ${height})) ${img} ${dir}/1.0x/${bsn}
