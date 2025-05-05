/**
 * Router chính cho ứng dụng.
 * 
 * File này chứa các route gốc của ứng dụng, phân chia thành 2 nhóm:
 * 1. `/public`: Các route không yêu cầu xác thực, ví dụ như đăng nhập, đăng ký, xem dữ liệu công khai.
 * 2. `/auth`: Các route yêu cầu xác thực người dùng, ví dụ như thay đổi mật khẩu, xem hồ sơ cá nhân.
 * 
 * Việc phân chia này giúp mã nguồn trở nên dễ hiểu và bảo trì hơn.
 */

import { Router } from "express";
import publicRouter from "./non-auths.js";
import authRouter from "./auths.js";

const router = Router();

router.use("/public", publicRouter);
router.use("/auths", authRouter);

export default router;
