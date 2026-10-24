#!/usr/bin/env bash
# SkillSpring - Run Single Smoke Test Case
set -e
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$PROJECT_ROOT"

if [ -f ".venv/bin/activate" ]; then
    source .venv/bin/activate
fi

echo "=========================================================="
echo "SkillSpring — Executing Single Selenium Smoke Test Case"
echo "Target: test_skillspring_complete_ui_smoke_journey"
echo "=========================================================="

python3 -m pytest tests/test_cases/test_ui_smoke.py::TestSkillSpringUISmoke::test_skillspring_complete_ui_smoke_journey -v "$@"
