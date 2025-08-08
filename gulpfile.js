import gulp from "gulp";
import browserSync from "browser-sync";
import { deleteAsync } from "del";
import { cp } from "fs/promises";         // ⬅️ سنستخدم نسخ نظام الملفات المباشر
import { mkdir } from "fs/promises";      // لتأمين وجود مجلد الوجهة

const server = browserSync.create();

const paths = {
  html:   { src: "index.html",        dest: "dist/" },
  styles: { src: "styles/**/*.css",   dest: "dist/styles/" },
  scripts:{ src: "src/**/*.js",       dest: "dist/src/" },
  data:   { src: "data/**/*.js",      dest: "dist/data/" },
  images: { src: "images",            dest: "dist/images" },  // ⬅️ مجلد كامل
  favicon:{ src: "favicon.ico",       dest: "dist/" }
};

// نسخ عادي للملفات النصية
export const copyHtml    = () => gulp.src(paths.html.src,    { allowEmpty: true }).pipe(gulp.dest(paths.html.dest));
export const copyStyles  = () => gulp.src(paths.styles.src,  { allowEmpty: true }).pipe(gulp.dest(paths.styles.dest));
export const copyScripts = () => gulp.src(paths.scripts.src, { allowEmpty: true }).pipe(gulp.dest(paths.scripts.dest));
export const copyData    = () => gulp.src(paths.data.src,    { allowEmpty: true }).pipe(gulp.dest(paths.data.dest));

// ⬅️ نسخ الصور باستخدام fs.cp (يحافظ على البينري 100%)
export const copyImages = async () => {
  await mkdir(paths.images.dest, { recursive: true });
  await cp(paths.images.src, paths.images.dest, { recursive: true, force: true });
};

// نسخ الفافيكون (اختياري)
export const copyFavicon = () => gulp.src(paths.favicon.src, { allowEmpty: true }).pipe(gulp.dest(paths.favicon.dest));

// تنظيف dist
export const clean = () => deleteAsync(["dist"]);

// ⬅️ نفّذ بالتسلسل بدل parallel
export const copyAll = gulp.series(copyHtml, copyStyles, copyScripts, copyData, copyImages, copyFavicon);

export const serve = () => {
  server.init({ server: { baseDir: "dist" }, port: 3000, notify: false });

  gulp.watch(paths.html.src,    gulp.series(copyHtml,    (d)=>{ server.reload(); d(); }));
  gulp.watch(paths.styles.src,  gulp.series(copyStyles,  (d)=>{ server.reload(); d(); }));
  gulp.watch(paths.scripts.src, gulp.series(copyScripts, (d)=>{ server.reload(); d(); }));
  gulp.watch(paths.data.src,    gulp.series(copyData,    (d)=>{ server.reload(); d(); }));
  gulp.watch(`${paths.images.src}/**/*.*`, gulp.series(copyImages, (d)=>{ server.reload(); d(); }));
  gulp.watch(paths.favicon.src, gulp.series(copyFavicon, (d)=>{ server.reload(); d(); }));
};

export default gulp.series(clean, copyAll, serve);
