#!/bin/bash
# Check if a file name is provided
if [ -z "$1" ]
then
    echo "No file name provided. Usage: ./disassemble.sh <filename>"
    exit 1
fi

# Print BITS 32
echo "BITS 32"
echo "org 437613h"

# Disassemble the file and clean the output
ndisasm -b 32 -o 0x437613 $1 | awk '{ $1=""; $2=""; print $0 }' | sed 's/^[ \t]*//'