Faiza Noor photo favicon

This uses the uploaded real-photo image in a circular crop. The area outside the circle is transparent; the original photo background remains inside the circle.

Copy icon.png into:
D:\faiza-noor-portfolio\app

Recommended: use app/icon.png. If app/favicon.ico causes the earlier Next.js ICO decode error, remove app/favicon.ico and keep app/icon.png only. Then run:
npm run build

If successful:
git add app/icon.png
git commit -m "Use profile photo as website favicon"
git push
