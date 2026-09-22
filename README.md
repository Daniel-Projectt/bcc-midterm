# Biblical Care & Counseling - Midterm Review

Study site for the Cedarville midterm: https://daniel-projectt.github.io/bcc-midterm/

Built from the Unit 1 and Unit 2 lecture slides, the Biblical Counseling Movement Basic Map,
and the Mid-Term Exam Guidance. Same look as the Greek study sheet.

## Tabs
- Midterm Guide - the exam guidance item by item, with short answers, links and check-offs
- Key Figures, Organizations, History & Generations, Theology - chart/notes, flashcards, match, quiz
- Essays & Cases - outlines, a timed practice room with self-checks, the lecture case studies
- Mock Exam - multiple choice + true/false from all topics, reshuffled each run

## Edit and rebuild
Content lives in `src/02*.js`. Rebuild and test with:

    sh build.sh

Optional click-through test in a simulated browser (needs jsdom somewhere):

    node src/test-dom.js <folder containing node_modules/jsdom>

`src/tools-preview.ps1` redraws `preview.png` and `icon.png`.
