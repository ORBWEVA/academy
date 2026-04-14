# Tracks

A **track** is a base program — one per install. Pick the one that matches how you're engaging with ORBWEVA.

## Track summary

| Track | For | Skills | Typical duration |
|---|---|---|---|
| [`accelerator`](#accelerator) | 12-week cohort — zero-to-one founders | 15 | 12 weeks |
| [`course`](#course) | Self-paced founder fundamentals | 9 | ~8 weeks |
| [`mentoring`](#mentoring) | 1:1 operator support for existing businesses | 13 | Ongoing |
| [`founder`](#founder) | Partner-delivered lean base | 10 | Varies |
| [`full`](#full) | Everything — no tradeoffs | 15 | — |

---

## Accelerator

**Who:** Founders going zero-to-one with direct mentor access from Ryan Ahamer.
**Format:** 12-week cohort, daily meetings, fortnightly reviews, graduation criteria at week 12.
**Cost:** $2,500–$5,000 one-time (no equity).

### Skills (15)

**Required (7 repos, 9 skills):**
- `secure-setup` — git-ignore rules, credential hygiene
- `core` — ORBWEVA CORE Method (/core:assess, /core:arc, /core:aer, /core:grow)
- `resume` — `/resume` for session continuity
- `discovery` — customer discovery, Mom Test interviews, JTBD
- `design-thinking` — 5-stage design thinking exercises
- `startup-metrics` — PMF, unit economics, churn, runway
- `geo`, `gtm-launch`, `seo-toolkit` — all three from gtm-skills

**Optional (4 repos, 6 skills):**
- `pitch` — investor outreach, deck, financials
- `hiring`, `legal-essentials`, `retention` — from founder-ops
- `solo` — solopreneur toolkit
- `agents` — AI agent design recipes

### Command

```bash
npx @orbweva/academy@latest --track accelerator
```

### Related

- [ORBWEVA Accelerator Curriculum](https://github.com/ORBWEVA/accelerator-template) — 12-week week-by-week program guide
- [Graduation Criteria](https://github.com/ORBWEVA/accelerator-template/blob/main/docs/GRADUATION_CRITERIA.md)

---

## Course

**Who:** Self-paced learners who want the foundational skills without the cohort commitment.
**Format:** No cohort, no meetings. Ryan is unavailable for direct support; community-only.
**Cost:** $497–$997 one-time.

### Skills (9)

**Required (5 repos, 5 skills):** `secure-setup`, `core`, `resume`, `discovery`, `design-thinking`

**Optional (2 repos, 4 skills):** `startup-metrics`, `geo`, `gtm-launch`, `seo-toolkit`

### Command

```bash
npx @orbweva/academy@latest --track course
```

---

## Mentoring

**Who:** Operators of existing businesses (not zero-to-one) who want 1:1 strategic support.
**Format:** Weekly or biweekly 1:1s, quarterly CORE reviews.
**Cost:** $1,500–$3,500 per month.

### Skills (13)

**Required (5 repos, 7 skills):**
- `secure-setup`, `core`, `resume`
- `startup-metrics`
- `hiring`, `legal-essentials`, `retention` (all three from `founder-ops`)

**Optional (4 repos, 6 skills):** `pitch`, `geo`, `gtm-launch`, `seo-toolkit`, `solo`, `agents`

### Command

```bash
npx @orbweva/academy@latest --track mentoring
```

---

## Founder

**Who:** Clients of partners who resell an ORBWEVA-powered founder base (e.g. Leanne Knowles / Headswitch clients).
**Format:** Delivered by the partner; ORBWEVA provides skills + occasional escalation.
**Cost:** Set by the partner.

### Skills (10)

**Required (5 repos, 5 skills):** `secure-setup`, `core`, `resume`, `discovery`, `design-thinking`

**Optional (3 repos, 5 skills):** `startup-metrics`, `pitch`, `geo`, `gtm-launch`, `seo-toolkit`

Notably excludes `founder-ops` (hiring/legal/retention — partner handles those), `solo`, and `agents`. Leaner than Accelerator.

### Command

```bash
npx @orbweva/academy@latest --track founder
```

### Who uses this track

Partners who want a consistent ORBWEVA foundation across their client base without the 12-week cohort structure. Example: Headswitch running its own coaching methodology on top of the ORBWEVA CORE method.

---

## Full

**Who:** ORBWEVA staff, contributors, power users, curious explorers.
**Format:** Everything, no tradeoffs.

### Skills (15)

All 11 public ORBWEVA skill repos, all 15 skills.

### Command

```bash
npx @orbweva/academy@latest --track full --yes --global
```

---

## Adding a new track

See [CONTRIBUTING.md](../CONTRIBUTING.md). In short: add an entry under `tracks` in `manifest.json`. No code changes needed.
