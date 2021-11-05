#! /usr/bin/env node

import open from 'open';
import fetch from 'node-fetch';
import yargs from 'yargs';
import { JSDOM }  from 'jsdom';

const { argv } = yargs(process.argv);
const url = 'https://wol.jw.org/en/wol/h/r4/lp-s';
const res = await fetch(url);
const text = await res.text();

const { document } = (new JSDOM(text)).window;

const dailyText = document.getElementById('p12');

const today = dailyText.previousElementSibling.textContent;
const quote = dailyText.textContent;
const explanation = dailyText.nextElementSibling.textContent;

if (argv.showme) {
  console.log(`
    ${today}
    ${quote}
    ${explanation}
  `)
}else {
  open(url);
}
