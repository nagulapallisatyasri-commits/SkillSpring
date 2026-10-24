@echo off
echo ========================================================
echo Running SkillSpring Python unittest Comparison Suite
echo ========================================================
cd /d "%~dp0"
python -m unittest tests.test_cases.test_comparison_unittest
pause
