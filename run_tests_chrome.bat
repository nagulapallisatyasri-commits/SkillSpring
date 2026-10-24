@echo off
echo ========================================================
echo Running SkillSpring Selenium Suite on Google Chrome
echo ========================================================
cd /d "%~dp0"
python -m pytest tests/test_cases/ --browser=chrome
pause
