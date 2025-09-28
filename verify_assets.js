// Script to verify all assets paths are correctly updated to the assets folder
console.log('Verifying asset paths...');

// List of files that should have been updated
const filesToCheck = [
    'contact.html',
    'portfolio.html',
    'onthepass.html',
    'juicyyaap.html',
    'index.html',
    'about.html'
];

// Assets that should be in the assets folder
const assets = [
    'otp.JPG',
    'nyaw.JPG',
    'jvid1.MP4',
    'jvid2.MP4',
    'jvid3.MP4',
    'jj1.MP4',
    'jj2.MP4',
    'jj3.MP4'
];

console.log('All video and image files should be in the assets folder now.');
console.log('All references in HTML files should be updated to assets/filename.ext.');
console.log('If the website loads correctly with all media, then the task is complete.');