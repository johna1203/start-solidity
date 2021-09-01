#!/bin/bash

source .env

ganache-cli -m "$MNEMONIC" -i 1203

