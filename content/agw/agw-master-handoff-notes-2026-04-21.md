# AGW Master Handoff Notes

This document captures the major asks, constraints, and decisions that were surfaced during the AGW consolidation and handoff work.

## Primary Repo Decision

- GitHub is the handoff point
- fresh pull beats stale local folder
- `projects/agw/website-review-build/` is the canonical app for future work
- `projects/agw/live-site-reference/` stays as archive/reference unless explicitly needed

## What Needed To Be Preserved

- brand assets and brand authority
- AGW audit and production-readiness notes
- prior AGW landing-page learnings
- GHL chat/calendar context
- room for another AI or machine to continue work cleanly

## Current Handoff Material

- production readiness audit
- AGW brand reference doc
- `claude-design/` implementation bridge
- canonical app snapshot
- live-site reference snapshot
- custom skills bundle copied from the local OpenClaw environment

## Calendar / GHL Direction

The working direction is:

- use a custom intake flow first
- then show the GHL calendar as the final booking step
- preserve GHL as the source of truth for appointment creation in the safer first pass

Important constraint:

- do not break the existing customer-care appointment notification workflow

## Chat Widget

Current widget family:

- LeadConnector chat widget loader
- AGW-specific widget ID

This should be preserved unless there is an intentional decision to replace it.

## Landing Page Logic That Still Matters

From the AGW painting landing-page work and related Pace lessons, the parts worth preserving or replicating are:

- explicit GTM event pushes instead of vague implicit tracking
- form validation controlled in code
- low-friction intake
- deliberate lead-source tagging
- careful separation between UX improvements and operational booking safety

## Pace Lessons Requirement

There was a request to provide a reusable lessons structure based on the Pace Home Buyers build. That structure now exists in the repo-level skills/docs pass and should be reused for future build retrospectives:

- build context
- visible failures before work
- what changed
- technical decisions and why
- tracking contract
- QA checklist
- residual risks
- reusable lessons

## Skills Requirement

There was also a request to upload the skills that have already been built locally rather than routing through ClawHub.

This repo now carries the local skills bundle directly under `skills/`.

## Practical Rule For Future Work

- Do not keep editing parallel AGW app copies
- Do not redesign booking in a way that breaks existing ops
- Do not assume host-page CSS can fix iframe internals
- Do not use stale local state as source of truth when GitHub is available

## Good Next Questions

- which intake fields must exist before booking
- which fields customer care actually needs in the appointment context
- whether GHL custom form visibility inside appointment details is required, or whether contact custom fields plus notifications are enough
- when to graduate from embed-first booking to API-backed custom booking
