# نشر المشروع على Vercel (دليل مبسّط)

## لماذا يفشل البناء عندك الآن؟

على GitHub يوجد **11 ملفاً فقط** (مثل `package.json` و `vercel.json`).
**لا يوجد** مجلد `artifacts` الذي فيه صفحة المتجر!

Vercel يشغّل `pnpm install` ويفشل لأن المشروع غير مكتمل على GitHub.

---

## الحل: ارفع المشروع كاملاً

### 1) على جهازك

1. افتح PowerShell في مجلد المشروع:
   `Design-Analyzer`
2. شغّل:
   ```powershell
   powershell -ExecutionPolicy Bypass -File .\prepare-for-github.ps1
   ```
3. سيُنشأ مجلد `github-upload-ready` وملف `final-landing-page-upload.zip`

### 2) على GitHub

1. افتح: https://github.com/hahadede2019-art/final-landing-page
2. **Add file** → **Upload files**
3. اسحب **كل محتويات** مجلد `github-upload-ready` (أو فك ZIP وارفع الملفات)
4. يجب أن ترى مجلدات: `artifacts` ، `lib` ، `api`
5. **Commit changes**

### 3) على Vercel

1. **Deployments** → **Redeploy**
2. انتظر **Ready**

### 4) متغيرات البيئة (للطلبات)

Settings → Environment Variables:

- `TELEGRAM_TOKEN`
- `TELEGRAM_CHAT_ID`
- `FB_CAPI_TOKEN`

---

## ماذا يجب أن يظهر على GitHub؟

```
final-landing-page/
├── artifacts/     ← مهم جداً (صفحة المتجر)
├── lib/
├── api/
├── package.json
├── vercel.json
└── pnpm-lock.yaml
```

إذا لم يظهر مجلد `artifacts`، البناء سيفشل دائماً.
