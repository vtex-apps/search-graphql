# managed-by: golden-path v1
# Schema-only app: no test runner, no executable code at runtime.
APP_NAME := search-graphql
PKG_MGR ?= yarn
VTEX_SETUP ?= vtex setup
VTEX_LINK ?= vtex link

.DEFAULT_GOAL := help
SHELL := /usr/bin/env bash
.SHELLFLAGS := -o pipefail -c

.PHONY: help dev build test lint format-check check link run clean

help: ## Show available targets
	@awk 'BEGIN {FS=":.*##"; printf "Targets:\n"} /^[a-zA-Z_-]+:.*##/ {printf "  \033[36m%-14s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

dev: ## Install dependencies and prepare VTEX IO tooling
	@command -v node >/dev/null 2>&1 || { echo "node is required"; exit 1; }
	@command -v vtex >/dev/null 2>&1 || { echo "vtex CLI is required — run: npm i -g vtex"; exit 1; }
	$(PKG_MGR) install --frozen-lockfile
	$(VTEX_SETUP)

build: ## Validate app build inputs without publishing
	@echo "VTEX IO builds run on the platform via vtex link/publish."
	@echo "Run 'make check' for local validations before linking."

test: ## No test runner for a schema-only repo
	@echo "No tests in this repo — schema is consumed and tested by vtex.search-resolver."
	@echo "Run that repo's 'make test' to exercise the resolvers against the schema."

lint: ## Run the schema lint wrapper (bash lint.sh)
	bash lint.sh

format-check: ## Check formatting without rewriting files
	npx prettier --check "**/*.{json,md,yml,yaml,graphql}"

check: lint ## Run all quality checks (pre-PR gate — lint only for schema-only repo)

link: ## Link app in the active VTEX development workspace
	@echo "This targets the active VTEX account/workspace. Confirm with 'vtex whoami' before running."
	$(VTEX_LINK)

run: link ## Alias for the VTEX IO platform development loop

clean: ## Remove local dependencies
	rm -rf node_modules
