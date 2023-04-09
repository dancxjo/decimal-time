import { parse } from "https://deno.land/std@0.181.0/flags/mod.ts";

function secondsOfDay(now: Date, offset = 1): number {
  const h = (now.getUTCHours() + offset) % 24;
  const m = now.getUTCMinutes();
  const s = now.getUTCSeconds();
  const ms = now.getUTCMilliseconds();
  return h * 3600 + m * 60 + s + ms / 1000;
}

function toBeats(now: Date, offset = 1): number {
  return secondsOfDay(now, offset) / 86.4;
}

function formatted(n: number, decimalPlaces = 2, significantDigits = 3): string {
  const i = Math.floor(n)
  const f = n - i;
  const j = i.toString().padStart(significantDigits, "0")
  const k = f.toString().replace(/^0\./, '').slice(0, decimalPlaces).padEnd(decimalPlaces, "0")
  return `${j}.${k}`;
}

const flags = parse(Deno.args, {
  string: ["format"],
  default: { format: "swatch" },
});

const now = new Date();

switch (flags.format.toLocaleLowerCase()) {
  case "umt":
  case "umtc":
    {
      console.log(formatted(toBeats(now, 12) / 10, 2, 2));
      break;
    }
  case "lmt":
  case "lmtc": {
    const offset = 24-(now.getTimezoneOffset() / 60);
    console.log(formatted(toBeats(now, offset) / 10, 2, 2));
    break;
  }
  case "swatch":
  default: {
    const beats = formatted(toBeats(now), 1, 3);
    console.log(`@${beats}`);
  }
}
