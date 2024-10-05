![Publish](https://github.com/levma/timebutler-api-client/actions/workflows/publish.yml/badge.svg)

# Timebutler API

This is an API for the Timebutler service. It allows one to call the defined
endpoints of Timebutler as described
[here](https://timebutler.de/do?ha=api&ac=10).

## Status

This client is not production ready! (Early beta stage and subject to change)

## Installation

```bash
npm i timebutlar-api-client
```

## Configuation

Provide API keys in the `.env` file:

- TIMEBUTLER_API_KEY: needed for standard calls
- TIMEBUTLER_API_KEY_EXTENDED: optional, only needed for priviledged calls like
  salaries

## Usage

In your Node project:

```typescript
import { absences, createTimebutlerApiCaller } from "timebutler-api-client";

const apiKey = process.env.TIMEBUTLER_API_KEY;
const caller = createTimebutlerApiCaller(apiKey!);
const result = await absences(caller);
```

Directly inside a html page (download `client.js` from
[Releases](https://github.com/levma/timebutler-api-client/releases)):

```html
<script src="client.js"></script>
<script>
  const timebutler = globalThis["TimebutlerApi"];
  const caller = timebutler.createTimebutlerApiCaller("a-timebutler-api-key");
  const result = await timebutler.absences(caller);
</script>
```
