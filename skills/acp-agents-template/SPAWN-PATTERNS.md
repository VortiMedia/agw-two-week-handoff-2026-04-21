# ACP Spawn Patterns — What Works

## Bad: vague open-ended task
```
Fix the mobile form UX
```
Result: museum tour, 50% completion, declares victory

## Bad: multi-stage monolith
```
Add address autocomplete, fix the form flow, update the submit handler, 
make it deploy clean, and fix the stacking bug on mobile
```
Result: 80% completion, breaks something, needs shepherding

## Good: atomic with explicit targets
```
Edit src/components/MultiStepForm.tsx:
- Change the step count from 7 to 6 by removing the email gate step
- Update the progress bar to reflect the new step count
- Ensure handleSubmit still fires on the final step

Verify: npx tsc --noEmit && npm run build
```
Result: does exactly this, verifiable, done or clearly failed

## Good: chained atomic tasks (Morgan spawns sequentially)
```
Task 1 (oneshot): 
  Edit src/components/Hero.tsx — add smooth scroll to #get-offer on CTA click
  Verify: npm run build

Task 2 (oneshot, after 1 completes):
  Edit src/components/MultiStepForm.tsx — remove step 3 (email gate), reindex remaining steps
  Verify: npx tsc --noEmit && npm run build

Task 3 (oneshot, after 2 completes):
  Review the git diff of the last 2 changes. Report any broken imports, 
  missing props, or type errors. Do not edit — just report.
```

## Pattern: editor + reviewer
Spawn two agents:
1. **Editor** (oneshot, approve-all): makes the changes, runs build
2. **Reviewer** (oneshot, approve-reads): reads the diff, checks for regressions, reports issues

The reviewer catches what the editor misses. If reviewer finds issues, 
spawn a third editor task with the reviewer's findings as the prompt.

## Key rules for spawn prompts
- Name exact files to edit
- Name exact functions/components to change
- State the expected behavior after the change
- Include the verify command
- One concern per task, not three
