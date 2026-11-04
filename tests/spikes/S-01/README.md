# S-01 Architecture Spike

This spike tests whether the planned scraper can read the approved event
sources and produce normalized JSON. It is P2 evidence, not production code.

**Spike ID and title:** S-01 — Read approved sources and produce normalized JSON

**Risk, decision, or quality scenario:** ADR-02 — Event refresh strategy

**Question:** Can the planned scraper read both approved event sources and
produce valid normalized JSON containing at least 20 usable events?

## Setup

The experiment uses Node.js, the built-in `fetch`, and Cheerio. It requests:

- UTD Calendar: <https://calendar.utdallas.edu/calendar>
- Nebula Labs Club Calendar: <https://clubs.utdnebula.com/events?page=1>

The script writes its normalized output to `events.json`.

## Measurement

Run this command from the repository root:

```bash
npm run spike:s1
```

The script prints the HTTP status, response size, fetch/parse duration, event
count per source, duplicate count, and final valid-event count. The first run produced the following results:

| Measurement | Result | Target |
| --- | ---: | ---: |
| UTD Calendar status | HTTP 200 | HTTP 200 |
| UTD Calendar events | 21 | At least 1 |
| Nebula Labs status | HTTP 200 | HTTP 200 |
| Nebula Labs events | 20 | At least 1 |
| Total valid events | 41 | At least 20 |
| Duplicate events removed | 0 | Report actual count |
| Total run duration | 648 ms | Record actual duration |

Required fields (`id`, `title`, `date`, `source`, and `sourceUrl`) were present
on all 41 events. Optional source fields remain nullable when the listing page
does not provide them: UTD has no organizer on 21 events, and Nebula has no
location on 20 events.

If a source returns an error, the script retains that source's events from the
previous `events.json` output and reports the failure. This models the planned
keep-last-successful-data behavior.

## Conclusion

**Result:** Yes. Both sources responded successfully and the script generated
41 valid normalized events, exceeding the 20-event target. The measured total
runtime was 455 ms.

**What it changed or confirmed:** This confirms that a scheduled scraper can
read both approved sources and produce the static JSON dataset planned for the
application. It supports ADR-02's scheduled-refresh option. The experiment
should be repeated if either source changes its HTML structure or access rules.

Do not commit passwords, API keys, or other credentials.
