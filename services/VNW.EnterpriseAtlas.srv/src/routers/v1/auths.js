/**
 * Router thuộc nhóm xác thực
 * 
 * File này chứa các route yêu cầu người dùng phải xác thực (đăng nhập) để truy cập.
 * Các route này bao gồm các chức năng truy cập nâng cao, báo giá, thay đổi thông tin cá nhân, và xem đầy đủ thông tin công ty.
 * 
 * Việc phân chia này giúp mã nguồn trở nên dễ hiểu và bảo trì hơn.
 */

import { Router } from "express";

const router = Router();

// let atlasRouter, nationRouter, timezonesRouter, languagesRouter;
let profileRouter, branchesRouter, leadersRouter, settingsRouter;
let feedbackRouter, cardsRouter, custRFQRouter, supplierRFQRouter;

try {
  // atlasRouter = await import("#@/api/atlas/controllers/index.js").then(m => m.default);
  // nationRouter = await import("#@/api/nation_category/nationCategoryController.js").then(m => m.default);
  // timezonesRouter = await import("#@/api/timezone_category/timezoneController.js").then(m => m.default);
  // languagesRouter = await import("#@/api/languages_category/languageCategoryController.js").then(m => m.default);
  profileRouter = await import("#@/api/company_profile/controllers/profileController.js").then(m => m.default);
  branchesRouter = await import("#@/api/company_branches/controllers/branchController.js").then(m => m.default);
  leadersRouter = await import("#@/api/company_leaders/controllers/leadersController.js").then(m => m.default);
  settingsRouter = await import("#@/api/settings/controllers/settings.js").then(m => m.default);
  feedbackRouter = await import("#@/api/feedback/controllers/feedback.js").then(m => m.default);
  cardsRouter = await import("#@/api/studio_cards/controllers/index.js").then(m => m.default);
  custRFQRouter = await import("#@/api/rfq_customer/controllers/index.js").then(m => m.default);
  // supplierRFQRouter = await import("#@/api/rfq_supliers/controllers/index.js").then(m => m.default);
} catch (err) {
  console.error("🚨 Lỗi khi import route:", err);
  process.exit(1);
}

// app.use('/nations', nationRouter);
// app.use('/timezone', timezonesRouter);
// app.use('/lang', languagesRouter);
router.use('/profile', profileRouter);
router.use('/branches', branchesRouter);
router.use('/leaders', leadersRouter);
router.use('/settings', settingsRouter);
router.use('/feedback', feedbackRouter);
router.use('/cards', cardsRouter);
router.use('/rfq', custRFQRouter);
// app.use('/quotes', supplierRFQRouter);

export default router;