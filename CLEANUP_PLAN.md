# Component Cleanup Plan

This document tracks the cleanup of legacy components after the migration to the modular app architecture.

## Status: ⚠️ IN PROGRESS

---

## Phase 1: Verify No Breaking Changes ✅

- [x] Ensure all 9 apps are implemented
- [x] Apps use existing UI components
- [ ] Test intent navigation between apps
- [ ] Verify ServiceContainer provides real state
- [ ] Manual testing of each app

---

## Phase 2: Component Analysis

### Components to Keep (Shared/Global)

These components are used across multiple apps or are global UI elements:

**Global UI Components:**
- ✅ `src/components/LoginScreen.tsx` - Authentication flow
- ✅ `src/components/DashboardScreen.tsx` - Main hub
- ✅ `src/components/SettingsScreen.tsx` - Global settings
- ✅ `src/components/Header.tsx` - Global header
- ✅ `src/components/Footer.tsx` - Global footer
- ✅ `src/components/MobileFooter.tsx` - Mobile navigation
- ✅ `src/components/Sidebar.tsx` - Desktop sidebar
- ✅ `src/components/Taskbar.tsx` - Task management
- ✅ `src/components/AppDrawer.tsx` - App selector
- ✅ `src/components/Logo.tsx` - Brand logo
- ✅ `src/components/ErrorBoundary.tsx` - Error handling
- ✅ `src/components/OnboardingGuide.tsx` - First-time user guide

**Shared Display Components:**
- ✅ `src/components/GeneratedImage.tsx`
- ✅ `src/components/CodeBlock.tsx`
- ✅ `src/components/FileDisplay.tsx`
- ✅ `src/components/NewsDisplay.tsx`
- ✅ `src/components/JobListingDisplay.tsx`
- ✅ `src/components/PracticeDisplay.tsx`
- ✅ `src/components/StudyGuideDisplay.tsx`
- ✅ `src/components/VideoDisplay.tsx`
- ✅ `src/components/MeetingReportDisplay.tsx`
- ✅ `src/components/SummaryDisplay.tsx`
- ✅ `src/components/SynergyAnalysisDisplay.tsx`
- ✅ `src/components/ResearchDossierDisplay.tsx`
- ✅ `src/components/InteractiveChartDisplay.tsx`
- ✅ `src/components/ItineraryDisplay.tsx`
- ✅ `src/components/FlashcardDisplay.tsx`
- ✅ `src/components/SWOTDisplay.tsx`
- ✅ `src/components/QuizDisplay.tsx`
- ✅ `src/components/LearningPathDisplay.tsx`
- ✅ `src/components/RecipeDisplay.tsx`
- ✅ `src/components/BudgetPlannerDisplay.tsx`
- ✅ `src/components/GroundingSourcesDisplay.tsx`
- ✅ `src/components/PersonProfileDisplay.tsx`
- ✅ `src/components/PlaceProfileDisplay.tsx`

**Chat Components (Used by ChatApp):**
- ✅ `src/components/ChatUI.tsx`
- ✅ `src/components/chat/AnimatedAiMessage.tsx`
- ✅ `src/components/chat/ChatInput.tsx`
- ✅ `src/components/chat/MessageActionsToolbar.tsx`
- ✅ `src/components/chat/SuggestionChips.tsx`
- ✅ `src/components/chat/ThinkingIndicator.tsx`
- ✅ `src/components/chat/ToolUseIndicator.tsx`

**Cyberpunk Design System:**
- ✅ `src/components/cyberpunk/` - All design system components
- ✅ `src/components/DeepSpaceBackground.tsx`
- ✅ `src/components/TalkingEmoji.tsx`

**Modals & Overlays:**
- ✅ `src/components/StatsModal.tsx`
- ✅ `src/components/KeyboardShortcutsModal.tsx`
- ✅ `src/components/SubscriptionModal.tsx`
- ✅ `src/components/ProactiveActionModal.tsx`
- ✅ `src/components/MeetingSetupModal.tsx`
- ✅ `src/components/MemoryMatrixModal.tsx`
- ✅ `src/components/WorkflowEditorModal.tsx`

**Special Components:**
- ✅ `src/components/CognitiveMap.tsx`
- ✅ `src/components/AgentPresence.tsx`
- ✅ `src/components/LiveMeetingReport.tsx`
- ✅ `src/components/WebSearchIndicator.tsx`
- ✅ `src/components/SharedContentViewer.tsx`
- ✅ `src/components/ApiKeyInput.tsx`
- ✅ `src/components/ApiKeyWarning.tsx`
- ✅ `src/components/ProactiveCalendarSuggestion.tsx`
- ✅ `src/components/Window.tsx`

### App-Specific Components (Now in Apps)

These components are now wrapped by app modules and should eventually be refactored into the app folders:

**Used by Apps (Keep for now, migrate later):**
- 🔄 `src/components/NewsDesk.tsx` → Used by NewsApp
- 🔄 `src/components/LiveRadioPlayer.tsx` → Used by NewsApp
- 🔄 `src/components/QuizConsole.tsx` → Used by QuizApp
- 🔄 `src/components/DebateStageUI.tsx` → Used by DebateApp
- 🔄 `src/components/TranslatorConsole.tsx` → Used by TranslatorApp
- 🔄 `src/components/AIWritingAssistant.tsx` → Used by AIWriterApp
- 🔄 `src/components/CodeHelper.tsx` → Used by CodeHelperApp
- 🔄 `src/components/VoiceJournal.tsx` → Used by VoiceJournalApp
- 🔄 `src/components/StudyHubScreen.tsx` → Used by StudyApp
- 🔄 `src/components/CalendarScreen.tsx` → Should be in calendar app
- 🔄 `src/components/WhiteboardView.tsx` → Should be in whiteboard app
- 🔄 `src/components/WhiteboardCanvas.tsx` → Should be in whiteboard app
- 🔄 `src/components/AdminDashboard.tsx` → Should be in admin app
- 🔄 `src/components/MobileHomeScreen.tsx` → Dashboard variant
- 🔄 `src/components/DesktopAssistant.tsx` → Assistant feature
- 🔄 `src/components/GlobalModeSelector.tsx` → Part of UI system

### Components to Remove (Future)

None yet - all components are currently in use. After full app implementation and testing, these can be moved into their respective app folders:

**Phase 2 (After Testing):**
- [ ] Move `NewsDesk.tsx` → `src/apps/news/components/`
- [ ] Move `QuizConsole.tsx` → `src/apps/quiz/components/`
- [ ] Move `DebateStageUI.tsx` → `src/apps/debate/components/`
- [ ] Move `TranslatorConsole.tsx` → `src/apps/translator/components/`
- [ ] Move `AIWritingAssistant.tsx` → `src/apps/ai-writing/components/`
- [ ] Move `CodeHelper.tsx` → `src/apps/code-helper/components/`
- [ ] Move `VoiceJournal.tsx` → `src/apps/voice-journal/components/`
- [ ] Move `StudyHubScreen.tsx` → `src/apps/study/components/`

**Phase 3 (Create Missing Apps):**
- [ ] Create `CalendarApp.tsx` and move `CalendarScreen.tsx`
- [ ] Create `WhiteboardApp.tsx` and move whiteboard components
- [ ] Create `AdminApp.tsx` and move `AdminDashboard.tsx`

---

## Phase 3: Update Imports

After components are moved:

### Files to Update

**App.tsx:**
- [ ] Remove imports of moved components
- [ ] Update to use app registry for all features
- [ ] Verify ServiceContainer wiring

**App Manifests:**
- [ ] Update lazy imports if components moved
- [ ] Verify all apps load correctly

**Service Files:**
- [ ] Check for any component imports
- [ ] Update to use only type imports

---

## Phase 4: Organize Shared Components

Move truly shared components to better locations:

### Proposed Structure

```
src/
├── components/
│   ├── ui/                    # Basic UI components
│   │   ├── LoginScreen.tsx
│   │   ├── DashboardScreen.tsx
│   │   ├── SettingsScreen.tsx
│   │   └── ...
│   ├── displays/              # Content display components
│   │   ├── NewsDisplay.tsx
│   │   ├── FlashcardDisplay.tsx
│   │   ├── QuizDisplay.tsx
│   │   └── ...
│   ├── modals/                # Modal components
│   │   ├── StatsModal.tsx
│   │   ├── SubscriptionModal.tsx
│   │   └── ...
│   ├── cyberpunk/             # Design system (keep as-is)
│   │   └── ...
│   └── chat/                  # Chat system (keep as-is)
│       └── ...
```

### Migration Checklist
- [ ] Create new folder structure
- [ ] Move components to appropriate folders
- [ ] Update all imports across the codebase
- [ ] Test all components still render
- [ ] Update documentation

---

## Phase 5: Folder Consolidation

### Study-Hub vs Study

**Issue:** Two folders exist for study functionality:
- `src/apps/study-hub/` (has services)
- `src/apps/study/` (has app implementation)

**Decision:** ⚠️ NEEDS REVIEW
- Option A: Merge both into `src/apps/study/`
- Option B: Keep separate (study = flashcards, study-hub = materials)
- Option C: Rename study-hub to study-materials

**Recommendation:** Option A - Merge into single `study` app

### Action Items
- [ ] Review study vs study-hub functionality
- [ ] Decide on merge or keep separate
- [ ] If merging: Move services from study-hub to study
- [ ] Update imports and registry
- [ ] Delete empty folder

---

## Phase 6: Service Organization

### Current State

Services are split between:
- `src/services/` - Core services (gemini, calendar, user)
- `src/apps/*/services/` - App-specific services (mostly re-exports)
- `src/system/services/` - System service implementations

### Proposed Cleanup

**Keep in `src/services/`:**
- ✅ `geminiService.ts` - Core AI operations
- ✅ `calendarService.ts` - Calendar operations
- ✅ `userService.ts` - User management

**App services (currently re-exports):**
Most app services just re-export from geminiService. Options:
- Option A: Keep as-is for future customization
- Option B: Remove and import geminiService directly in apps
- Option C: Create app-specific service wrappers

**Recommendation:** Option A - Keep for future extensibility

---

## Testing Checklist

### Manual Testing Required

**Per App:**
- [ ] ChatApp - Send messages, view history
- [ ] StudyApp - Create flashcards, review materials
- [ ] NewsApp - Generate radio broadcast
- [ ] QuizApp - Start quiz, answer questions
- [ ] DebateApp - Start debate, view rounds
- [ ] TranslatorApp - Real-time translation
- [ ] AIWriterApp - Generate content
- [ ] CodeHelperApp - Generate/explain code
- [ ] VoiceJournalApp - Record entry, view analysis

**Intent System:**
- [ ] Voice Journal → Study App (create flashcard)
- [ ] Chat → Study App (share content)
- [ ] News → Chat (discuss article)
- [ ] Any app → Chat (share)

**Global Features:**
- [ ] Login/Logout
- [ ] Dashboard navigation
- [ ] Settings changes
- [ ] Mode switching
- [ ] Mobile responsive
- [ ] Desktop sidebar
- [ ] Keyboard shortcuts

---

## Documentation Updates

### Files to Update After Cleanup

- [x] `ARCHITECTURE.md` - Updated with full architecture
- [ ] `README.md` - Update with new structure
- [ ] `CONTRIBUTING.md` - Add app development guide
- [ ] `API.md` - Document system services API

---

## Timeline

### Week 1: Verification & Testing
- Day 1-2: Manual testing of all apps
- Day 3-4: Intent system testing
- Day 5: Bug fixes

### Week 2: Migration (If needed)
- Day 1-2: Move app components to app folders
- Day 3-4: Update imports across codebase
- Day 5: Test after migration

### Week 3: Organization
- Day 1-2: Reorganize shared components
- Day 3-4: Consolidate folders (study-hub)
- Day 5: Final testing

### Week 4: Documentation & Polish
- Day 1-2: Update all documentation
- Day 3-4: Code review and cleanup
- Day 5: Final review and sign-off

---

## Risk Assessment

### High Risk Changes
- ⚠️ Moving `ChatUI` (heavily used)
- ⚠️ Changing service imports (could break multiple apps)
- ⚠️ Removing old components (need thorough testing first)

### Medium Risk Changes
- ⚠️ Reorganizing folder structure
- ⚠️ Merging study folders
- ⚠️ Updating imports across codebase

### Low Risk Changes
- ✅ Creating new folders
- ✅ Moving documentation
- ✅ Updating README

---

## Success Criteria

- ✅ All apps functional
- ✅ Intent system working
- ✅ No duplicate components
- ✅ Clear folder structure
- ✅ Complete documentation
- ✅ All tests passing
- ✅ No console errors
- ✅ Mobile & desktop work
- ✅ Performance maintained

---

## Notes

### Decisions Made
- 2025-01-17: All components kept for now, apps wrap existing components
- 2025-01-17: Architecture documentation completed
- 2025-01-17: All 9 apps implemented

### Decisions Pending
- Study-hub vs study folder consolidation
- App-specific service organization
- Component migration to app folders
- Shared component reorganization

### Blockers
- None currently

---

## Contact

Questions about cleanup plan? Contact architecture team or see `ARCHITECTURE.md`.

**Status Last Updated:** 2025-01-17
**Next Review:** After Phase 1 testing complete
