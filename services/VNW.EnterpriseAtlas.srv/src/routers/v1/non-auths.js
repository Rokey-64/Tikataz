/**
 * Router thuộc nhóm công khai
 * 
 * Người dùng có thể truy cập mà không cần xác thực, ví dụ như đăng nhập, đăng ký, xem dữ liệu công khai.
 * Tuy nhiên, dữ liệu có thể bị giới hạn theo quyền truy cập của người dùng.
 * 
 * Việc phân chia này giúp mã nguồn trở nên dễ hiểu và bảo trì hơn.
 */

import { Router } from "express";

const router = Router();

let atlasRouter, nationRouter, timezonesRouter, languagesRouter;
let supplierRFQRouter;

try {
  atlasRouter = await import("#@/api/atlas/controllers/index.js").then(m => m.default);
  nationRouter = await import("#@/api/nation_category/nationCategoryController.js").then(m => m.default);
  timezonesRouter = await import("#@/api/timezone_category/timezoneController.js").then(m => m.default);
  languagesRouter = await import("#@/api/languages_category/languageCategoryController.js").then(m => m.default);
  supplierRFQRouter = await import("#@/api/rfq_supliers/controllers/index.js").then(m => m.default);
} catch (err) {
  console.error("🚨 Lỗi khi import route:", err);
  process.exit(1);
}

router.use('/atlas', atlasRouter);
router.use('/nations', nationRouter);
router.use('/timezones', timezonesRouter);
router.use('/languages', languagesRouter);
router.use('/quotes', supplierRFQRouter);

export default router;