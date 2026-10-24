@echo off
echo ========================================================
echo Running SkillSpring Selenium Suite on Microsoft Edge
echo ========================================================
cd /d "%~dp0"
python -m pytest tests/test_cases/ --browser=edge
pause
