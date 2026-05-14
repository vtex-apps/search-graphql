<!-- managed-by: golden-path v1 — generated from .agents/skills/golden-path/sdd-mode.md.
     Model references can drift as new Claude versions ship.
     Re-run `/golden-path apply` to refresh. -->
# SDD Model Guide

Reference model tiers for Spec-Driven Development (SDD) commands.

## Models per command

| Command | Tier | Reference model |
|---|---|---|
| `/speckit.constitution` | Tier 1 reasoning | Claude 4.7 Opus or higher |
| `/speckit.specify` | Tier 1 reasoning | Claude 4.7 Opus or higher |
| `/speckit.plan` | Tier 1 reasoning | Claude 4.7 Opus or higher |
| `/specification` | Tier 1 reasoning | Claude 4.7 Opus or higher |
| `/implementing` | Tier 1 reasoning | Claude 4.7 Opus or higher |
| `/speckit.clarify` | Standard execution | Claude 4.6 Sonnet or higher |
| `/speckit.tasks` | Standard execution | Claude 4.6 Sonnet or higher |
| `/speckit.analyze` | Standard execution | Claude 4.6 Sonnet or higher |
| `/speckit.implement` | Standard execution | Claude 4.6 Sonnet or higher |

## SDD approach for this repo

**Both modes apply per-task** — but the repo is schema-only, so the calculus tilts toward Full when the change has cross-app impact.

- **SDD Lite** for: documentation updates, new optional arguments on existing queries, additive types/enums, directive clarifications. Use `/specification` + `/implementing` from `vtex-agent-skills`.
- **SDD Full** for: breaking schema changes (field removal, type rename, required-argument additions, directive semantics changes). These ripple to `vtex.search-resolver`, `vtex.search-result`, and any private storefront consumers. Use the spec-kit pipeline.

## Multi-repo storage

This is one repo in the `is-io-specs` multi-repo workspace. SpecKit artifacts live at `is-io-specs/.specify/` and `is-io-specs/specs/`. See the [Multi-repo spec-kit extension](https://github.com/vtex/speckit-multi-repo).
