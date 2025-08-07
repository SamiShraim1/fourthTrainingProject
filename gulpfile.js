import gulp from "gulp";
import browserSync from "browser-sync";
import { deleteAsync } from "del";

const server = browserSync.create();

// مسارات الملفات
const paths = {
  html: {
    src: "index.html",
    dest: "dist/"
  },
  styles: {
    src: "styles/**/*.css",
    dest: "dist/styles/"
  },
  scripts: {
    src: "src/**/*.js",
    dest: "dist/src/"
  },
  data: {
    src: "data/**/*.js",
    dest: "dist/data/"
  },
  images: {
    src: "images/**/*.*",
    dest: "dist/images/"
  }
};

// مهام النسخ
export const copyHtml = () => gulp.src(paths.html.src).pipe(gulp.dest(paths.html.dest));
export const copyStyles = () => gulp.src(paths.styles.src).pipe(gulp.dest(paths.styles.dest));
export const copyScripts = () => gulp.src(paths.scripts.src).pipe(gulp.dest(paths.scripts.dest));
export const copyData = () => gulp.src(paths.data.src).pipe(gulp.dest(paths.data.dest));
export const copyImages = () =>
  gulp.src(paths.images.src, { encoding: null }).pipe(gulp.dest(paths.images.dest));

// مهمة حذف مجلد dist
export const clean = () => deleteAsync(["dist"]);

// نسخ الكل دفعة واحدة
export const copyAll = gulp.parallel(copyHtml, copyStyles, copyScripts, copyData, copyImages);

// تشغيل السيرفر المحلي ومراقبة التغييرات
export const serve = () => {
  server.init({
    server: {
      baseDir: "dist"
    },
    port: 3000,
    notify: false
  });

  gulp.watch(paths.html.src, copyHtml).on("change", server.reload);
  gulp.watch(paths.styles.src, copyStyles).on("change", server.reload);
  gulp.watch(paths.scripts.src, copyScripts).on("change", server.reload);
  gulp.watch(paths.data.src, copyData).on("change", server.reload);
  gulp.watch(paths.images.src, copyImages).on("change", server.reload);
};

// المهمة الافتراضية
export default gulp.series(clean, copyAll, serve);
